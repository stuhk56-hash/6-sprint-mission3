// @ts-nocheck

/**
 * 이 파일의 목적은 dotenv를 사용하여 환경 변수를 로드하는 것입니다.
 * 다른 설정이나 로직은 포함하지 않습니다.
 * prisma-client.ts와 같은 다른 설정 파일에서 이 파일을 가져와야 합니다.
 *
 * 왜 이 파일을 만드는지 꼭 공부하세요!
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
// 이 모듈은 왜 필요한가요? 
import path from 'path';
// 이 모듈을 사용하는 이유는 무엇인가요?


// ===== 아래에 코드를 작성하세요. =======
if (!global.envLoaded) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

  dotenv.config({
    path: path.resolve(process.cwd(), envPath),
  });

  global.envLoaded = true;
}