// src/index.ts

import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import { PORT } from './lib/constants.js'; // 확장자 .js 유지 (ESM 규칙)
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController.js';

const app: Application = express();

app.use(cors());
app.use(express.json());

// 정적 파일 서빙
app.use(
  STATIC_PATH,
  express.static(path.resolve(process.cwd(), PUBLIC_PATH))
);

// 라우터 등록
app.use('/articles', articlesRouter);
app.use('/products', productsRouter);
app.use('/comments', commentsRouter);
app.use('/images', imagesRouter);

// 에러 핸들러
app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;


