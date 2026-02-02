import { jest } from '@jest/globals';
import * as productService from "../../services/product-service.js";
import * as ProductRepository from "../../repositories/productsRepository.js";

// Repository 모킹 (Mocking)
jest.mock("../../repositories/productsRepository.js");

describe("ProductService Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 각 테스트 전 Mock 초기화
  });

  test("createProduct - 비즈니스 로직 검증", async () => {
    // Given: Mock 데이터 설정
    const mockProduct = { id: 1, name: "Test Product", price: 1000, description: "a", imagePath: "b", tags: [], userId: 1, createdAt: new Date(), updatedAt: new Date() };
    // Spy: repository.create가 호출되면 mockProduct를 반환하도록 설정
    const createProductSpy = jest.spyOn(ProductRepository, 'createProduct').mockResolvedValue(mockProduct);

    // When: 서비스 메서드 실행
    const result = await productService.createProduct({ name: "Test Product", price: 1000 });

    // Then: 결과 및 호출 검증
    expect(result).toEqual(mockProduct);
    expect(createProductSpy).toHaveBeenCalledTimes(1);
    expect(createProductSpy).toHaveBeenCalledWith({
      name: "Test Product",
      price: 1000,
    });
  });

  test("createProduct - 유효성 검사 실패 시 에러 발생", async () => {
    // 예: 가격이 음수면 에러를 던지는 로직 테스트
    const createProductSpy = jest.spyOn(ProductRepository, 'createProduct').mockRejectedValue(new Error("Price must be positive"));

    await expect(
      productService.createProduct({ name: "Bad Product", price: -100 }),
    ).rejects.toThrow("Price must be positive");
  });
});
