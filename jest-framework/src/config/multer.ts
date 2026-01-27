// multer: 이미지 업로드 # sharp: 패키지(따로 공부)
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs, { mkdirSync } from 'fs';
import type { Request } from 'express';

// 파일 업로드 하기위해 필요한 검증이 뭘까?
// 1. 파일 크기 (용량제한, 실제 서비스에서는 S3 같은 외부 저장소 사용)
// 2. 업로드 폴더 생성 (없으면 자동 생성 기능)
// 3. 파일 저장 방식 검증
// - 확장자 저장
// - 경로 저장
// 4. 실제 이 파일이 오리진이 맞는지?
// - 예를 들어, 이미지.png 이름은 맞는데 실제 파일 안은 이미지가 아닐 경우
// - 확장자가 정확히 위에 저장 방식과 일치하는 지 검증 
// 5. 인스턴스 생성에서 export하기 위해서 라우트에 포함한다 

// 1) 파일 크기 제한 
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

// 계산법

// 1kb가 1024인 이유는 컴퓨터가 2진수이기 떄문에 1000이 아니라 1024(2의 10승)
// 1kb = 1024b
// 1mb = 1024kb
// 1gb = 1024mb
// 일반 API에서는 보통 1~10mb 정도 사용한다.

// 2) 업로드 파일 경로
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// 3) 업로드 폴더 생성
  fs.mkdirSync(uploadDir, { recursive: true });

// 4) 파일 저장 방식 (메모리 스토리지 나중에 공부)
 const storage = multer.diskStorage({
// 4-1) 경로 설정 
    destination: (_req, _file, cb) => 
        cb(null, uploadDir),
    filename: (_req, file, cb ) => {
        
// 4-2) 확장자 설정
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = [ '.jpg', '.png', '.jpeg' ].includes(ext) ? ext : '';
    
// 4-3) 이름 설정
    cb(null, crypto.randomUUID() + safeExt )
 }
});

// 5) 허용 MIME 타입 필터링
  const fileFilter = ( req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback ) => { 
    const validType = [ 'image/jpg', 'image/png', 'image/jpeg' ].includes(file.mimetype);
    if(validType) {
        cb(null, true);
    
    } else {
       cb( new Error('Invalid file type'))
    }
  }

// 6) 최종 업로드 인스턴스
  export const upload = multer({ limits, storage, fileFilter });
  



