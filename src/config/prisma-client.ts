// Prisma -Singleton: PrismaClient DB 연결 중복 예방
/**
 * @info
 * PrismaClient는 데이터베이스와 연결을 맺는 핵심 객체이다.
 * 하지만 인스턴스를 매번 새로 만들면 커넥션이 중복 생성되어 메모리 누수, 연결 폭주, 서버 다운 같은 문제가 실제로 발생한다.
 * 그래서 PrismaClient는 "프로젝트 전체에서 단 한번만 생성"하고 모든 모듈이 공통으로 재사용하는 싱글톤 구조가 필수다.
 */ 
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma;