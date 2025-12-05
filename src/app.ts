import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
const app = express();
export default app;
app.use(cors());
app.use(express.json());
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// 공통 에러 클래스
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
// 간단 유효성 검증
const validateCreate = (req, res, next) => {
    const { name, description, price, tags } = req.body;
    if (!name || !description || price === undefined) {
        return next(new ApiError(400, 'name, description, price는 필수입니다.'));
    }
    if (typeof price !== 'number' || price < 0) {
        return next(new ApiError(400, 'price는 0 이상 숫자여야 합니다.'));
    }
    if (tags && !Array.isArray(tags)) {
        return next(new ApiError(400, 'tags는 문자열 배열이어야 합니다.'));
    }
    next();
};
const validatePatch = (req, res, next) => {
    const { price, tags } = req.body;
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
        return next(new ApiError(400, 'price는 0 이상 숫자여야 합니다.'));
    }
    if (tags !== undefined && !Array.isArray(tags)) {
        return next(new ApiError(400, 'tags는 문자열 배열이어야 합니다.'));
    }
    next();
};
// 라우터
const router = express.Router();
/**
 * 상품 등록 POST /products
 * body: { name, description, price, tags? }
 * 201 Created
 */
router.post('/', validateCreate, async (req, res, next) => {
    try {
        const { name, description, price, tags = [] } = req.body;
        const q = `
      INSERT INTO products (name, description, price, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, description, price, tags, created_at AS "createdAt", updated_at AS "updatedAt";
    `;
        const { rows } = await pool.query(q, [name, description, price, tags]);
        res.status(201).json(rows[0]);
    }
    catch (e) {
        next(e);
    }
});
/**
 * 상품 상세 GET /products/:id
 * 404 Not Found
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const q = `
      SELECT id, name, description, price, tags, created_at AS "createdAt"
      FROM products
      WHERE id = $1;
    `;
        const { rows } = await pool.query(q, [id]);
        if (rows.length === 0)
            return next(new ApiError(404, '상품을 찾을 수 없습니다.'));
        res.json(rows[0]);
    }
    catch (e) {
        next(e);
    }
});
/**
 * 상품 수정 PATCH /products/:id
 * body: { name?, description?, price?, tags? }
 * 200 OK
 */
router.patch('/:id', validatePatch, async (req, res, next) => {
    try {
        const { id } = req.params;
        const fields = [];
        const values = [];
        let idx = 1;
        ['name', 'description', 'price', 'tags'].forEach((key) => {
            if (req.body[key] !== undefined) {
                fields.push(`${key} = $${idx++}`);
                values.push(req.body[key]);
            }
        });
        if (fields.length === 0) {
            return next(new ApiError(400, '업데이트할 필드가 없습니다.'));
        }
        const q = `
      UPDATE products
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING id, name, description, price, tags, created_at AS "createdAt", updated_at AS "updatedAt";
    `;
        values.push(id);
        const { rows } = await pool.query(q, values);
        if (rows.length === 0)
            return next(new ApiError(404, '상품을 찾을 수 없습니다.'));
        res.json(rows[0]);
    }
    catch (e) {
        next(e);
    }
});
/**
 * 상품 삭제 DELETE /products/:id
 * 204 No Content
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rowCount } = await pool.query('DELETE FROM products WHERE id = $1', [id]);
        if (rowCount === 0)
            return next(new ApiError(404, '상품을 찾을 수 없습니다.'));
        res.status(204).send();
    }
    catch (e) {
        next(e);
    }
});
/**
 * 상품 목록 GET /products
 * query:
 *  - page=1, limit=10 (offset 페이지네이션)
 *  - sort=recent (created_at DESC 기본), sort=price_asc|price_desc
 *  - q=검색어 (name, description)
 *
 * 응답 필드: id, name, price, createdAt
 */
router.get('/', async (req, res, next) => {
    try {
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
        const offset = (page - 1) * limit;
        const sort = String(req.query.sort || 'recent');
        let orderBy = 'created_at DESC'; // recent
        if (sort === 'price_asc')
            orderBy = 'price ASC, id ASC';
        else if (sort === 'price_desc')
            orderBy = 'price DESC, id DESC';
        const q = String(req.query.q || '').trim();
        const hasSearch = q.length > 0;
        let whereClause = '';
        const params = [];
        if (hasSearch) {
            whereClause = 'WHERE name ILIKE $1 OR description ILIKE $1';
            params.push(`%${q}%`);
        }
        const countSql = `
      SELECT COUNT(*)::int AS total
      FROM products
      ${whereClause};
    `;
        const countRes = await pool.query(countSql, params);
        const total = countRes.rows[0].total;
        const dataSql = `
      SELECT id, name, price, created_at AS "createdAt"
      FROM products
      ${whereClause}
      ORDER BY ${orderBy}
      OFFSET $${params.length + 1}
      LIMIT $${params.length + 2};
    `;
        const dataParams = [...params, offset, limit];
        const dataRes = await pool.query(dataSql, dataParams);
        res.json({
            page,
            limit,
            total,
            items: dataRes.rows,
        });
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=app.js.map