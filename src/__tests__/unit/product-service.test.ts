// 예: ProductService가 ProductRepository를 의존성으로 가진다고 가정
const ProductService = require("../../src/services/product.service");
const ProductRepository = require("../../src/repositories/product.repository");

// Repository 모킹 (Mocking)
jest.mock("../../src/repositories/product.repository");

describe("ProductService Unit Tests", () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService();
    jest.clearAllMocks(); // 각 테스트 전 Mock 초기화
  });

  test("createProduct - 비즈니스 로직 검증", async () => {
    // Given: Mock 데이터 설정
    const mockProduct = { id: 1, name: "Test Product", price: 1000 };
    // Spy: repository.create가 호출되면 mockProduct를 반환하도록 설정
    ProductRepository.prototype.createProduct = jest
      .fn()
      .mockResolvedValue(mockProduct);

    // When: 서비스 메서드 실행
    const result = await productService.createProduct("Test Product", 1000);

    // Then: 결과 및 호출 검증
    expect(result).toEqual(mockProduct);
    expect(ProductRepository.prototype.createProduct).toHaveBeenCalledTimes(1);
    expect(ProductRepository.prototype.createProduct).toHaveBeenCalledWith(
      "Test Product",
      1000,
    );
  });

  test("createProduct - 유효성 검사 실패 시 에러 발생", async () => {
    // 예: 가격이 음수면 에러를 던지는 로직 테스트
    await expect(
      productService.createProduct("Bad Product", -100),
    ).rejects.toThrow("Price must be positive");
  });
});
