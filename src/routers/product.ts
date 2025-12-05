import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validateProduct } from '../middlewares/validateProduct';
import { body } from 'express-validator';
import { Op, WhereOptions } from 'sequelize';
import { UserAttributes } from '../models/User';
import { Product } from '../models/Product'; // Product 모델 (TS 버전)
import { FindOptions, OrderItem } from 'sequelize';

const router = Router();

// 유효성 검사 미들웨어
export const validateProduct = [
  body('name')
  .isString()
  .withMessage('Name is required')
  .notEmpty(),

  body('description')
  .isString()
  .withMessage('Description is required')
  .notEmpty(),

  body('price')
  .isFloat({ gt:0 })
  .withMessage('Price must be a positive number'),

  body('tags')
  .optional()
  .isArray()
  .withMessage('Tags must be an array'),
];
  
// 상품 등록 API
router.post('/', validateProduct, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
// req.body 타입 정의
    const { name, description, price, tags } = req.body as {
      name: string;
      description: string;
      price: number;
      tags: string[];
    };
    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
 }
);

export default router;

// 상품 상세 조회 API
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: ['id', 'name', 'description', 'price', 'tags', 'createdAt'],
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 수정 API (PATCH)
router.patch('/:id', validateProduct, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, tags } = req.body;
    await product.update({ name, description, price, tags });
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 삭제 API
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회 API (offset pagination, 검색, 최신순 정렬)
router.get(
  '/',
  [
    query('offset').optional().isInt({ min: 0 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('search').optional().isString(),
    query('sort').optional().isIn(['recent']),
  ],
  // 핸들러 함수
  async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const { offset = 0, limit = 10, search = '', sort } = req.query;
  // ...
} catch(error) {
  next(error);
    }
  }
);

// 검색 조건
    let where: WhereOptions<UserAttributes> = {};
    if (search) {
      where = {
       [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
       ],
      };
    }

  router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { sort,offset = 0, limit = 10 } = req.query;
        
// 정렬 조건   
        const order: OrderItem[] = [];
        if (sort === 'recent') {
          order.push(['createdAt', 'DESC']);
        }

        const where: FindOptions['where'] = {};

        const products = await Product.findAll({
          attributes: ['id', 'name', 'price', 'createdAt'],
          where,
          offset: Number(offset),
          limit: Number(limit),
          order,
        });

        return res.json(products);
      } catch (error) {
        next(error);
      }
    }
  );

// Product 모델 정의
const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true, // 논리 삭제 활성화   
});

module.exports = { Product };

