import request from "supertest";
import prisma from "../src/lib/prisma-client";
import app from "../src/app";

describe("중고거래 플랫폼 API 통합 테스트", () => {
  beforeEach(async () => {
    await prisma.marketProduct.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /market-products", () => {
    test("상품이 없을 때 빈 배열을 반환해야 함", async () => {
      const response = await request(app).get("/market-products");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test("모든 상품을 반환해야 함", async () => {
      // 테스트용 상품 생성
      const product1 = await prisma.marketProduct.create({
        data: { title: "Product 1", description: "Description 1", price: 1000 },
      });
      const product2 = await prisma.marketProduct.create({
        data: { title: "Product 2", description: "Description 2", price: 2000 },
      });

      const response = await request(app).get("/market-products");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe("Product 2");
      expect(response.body[1].title).toBe("Product 1");
    });

    test("count 파라미터에 따라 제한된 수의 상품을 반환해야 함", async () => {
      // 테스트용 상품 생성
      await prisma.marketProduct.create({
        data: { title: "Product 1", description: "Description 1", price: 1000 },
      });
      await prisma.marketProduct.create({
        data: { title: "Product 2", description: "Description 2", price: 2000 },
      });
      await prisma.marketProduct.create({
        data: { title: "Product 3", description: "Description 3", price: 3000 },
      });

      const response = await request(app).get("/market-products?count=2");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    test("sort=oldest 파라미터에 따라 오래된 순으로 정렬해야 함", async () => {
      // 서로 다른 생성일자를 위해 테스트용 상품 생성 후 잠시 대기
      const product1 = await prisma.marketProduct.create({
        data: { title: "Product 1", description: "Description 1", price: 1000 },
      });

      // 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const product2 = await prisma.marketProduct.create({
        data: { title: "Product 2", description: "Description 2", price: 2000 },
      });

      const response = await request(app)
        .get("/market-products")
        .query({ sort: "oldest" });

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe("Product 1");
      expect(response.body[1].title).toBe("Product 2");
    });
  });

  describe("GET /tasks/:id", () => {
    test("존재하는 상품 ID로 요청 시 해당 상품을 반환해야 함", async () => {
      const product = await prisma.marketProduct.create({
        data: { title: "Product 1", description: "Description 1", price: 1000 },
      });

      const response = await request(app).get(`/market-products/${product.id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Product 1");
      expect(response.body.description).toBe("Description 1");
      expect(response.body.price).toBe(1000);
    });

    test("존재하지 않는 상품 ID로 요청 시 404 오류를 반환해야 함", async () => {
      const response = await request(app).get("/market-products/9999");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("상품을 찾을 수 없습니다.");
    });
  });

  describe("POST /market-products", () => {
    test("유효한 데이터로 상품 생성 요청 시 상품이 생성되어야 함", async () => {
      const newProduct = {
        title: "New Product",
        description: "New Description",
        price: 1500,
      };

      const response = await request(app)
        .post("/market-products")
        .send(newProduct);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(newProduct.title);
      expect(response.body.description).toBe(newProduct.description);
      expect(response.body.price).toBe(newProduct.price);
    });

    test("최소한의 데이터로 상품 생성 요청 시에도 상품이 생성되어야 함", async () => {
      const newProduct = {
        title: "Minimal Product",
        price: 500,
      };

      const response = await request(app)
        .post("/market-products")
        .send(newProduct);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(newProduct.title);
      expect(response.body.description).toBeNull();
      expect(response.body.isComplete).toBe(false);
    });
  });

  describe("PATCH /market-products/:id", () => {
    test("존재하는 상품 ID로 업데이트 요청 시 상품이 업데이트되어야 함", async () => {
      const product = await prisma.marketProduct.create({
        data: {
          title: "Original Product",
          description: "Original Description",
        },
      });

      const updateData = {
        title: "Updated Product",
        description: "Updated Description",
        price: 2500,
      };

      const response = await request(app)
        .patch(`/market-products/${product.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updateData.title);
      expect(response.body.description).toBe(updateData.description);
      expect(response.body.price).toBe(updateData.price);
    });

    test("상품을 부분적으로 업데이트해야 함", async () => {
      const product = await prisma.marketProduct.create({
        data: {
          title: "Original Product",
          description: "Original Description",
          price: 1000,
        },
      });

      const updateData = {
        price: 3000,
      };

      const response = await request(app)
        .patch(`/market-products/${product.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(product.title);
      expect(response.body.description).toBe(product.description);
      expect(response.body.price).toBe(updateData.price);
    });

    test("존재하지 않는 상품 ID로 업데이트 요청 시 404 오류를 반환해야 함", async () => {
      const updateData = {
        title: "Updated Product",
        description: "Updated Description",
        price: 2500,
      };

      const response = await request(app)
        .patch("/market-products/non-existent-id")
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("상품을 찾을 수 없습니다.");
    });
  });
});

describe("DELETE /market-products/:id", () => {
  test("존재하는 상품 ID로 삭제 요청 시 상품이 삭제되어야 함", async () => {
    const product = await prisma.marketProduct.create({
      data: {
        title: "Product to Delete",
        description: "Description",
        price: 1000,
      },
    });

    const response = await request(app).delete(
      `/market-products/${product.id}`,
    );
    expect(response.status).toBe(200);

    // 상품이 실제로 삭제되었는지 확인
    const deletedProduct = await prisma.marketProduct.findUnique({
      where: { id: product.id },
    });
    expect(deletedProduct).toBeNull();
  });

  describe("POST /login", () => {
    test("로그인 성공", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("로그인 성공");
      expect(response.header["set-cookie"][0]).toMatch(
        /token=simple-auth-token/,
      );
    });
  });
});

describe("POST /logout", () => {
  test("로그아웃 성공", async () => {
    const response = await request(app).post("/logout");
    expect(response.status).toBe(200);
    expect(response.header["set-cookie"][0]).toEqual(
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    );
    expect(response.body.message).toBe("로그아웃 성공");
  });
});

describe("GET /auth/products", () => {
  test("로그인된 상태에서 요청 시 모든 상품을 반환해야 함", async () => {
    const agent = request.agent(app);

    //로그인 수행
    const loginResponse = await agent
      .post("/login")
      .send({ email: "test@example.com", password: "password" });
    expect(loginResponse.status).toBe(200);

    const productsResponse = await agent.get("/auth/market-products");
    expect(productsResponse.status).toBe(200);
    expect(productsResponse.body.length).toBe(0);
  });

  test("로그인되지 않은 상태에서 요청 시 401 오류를 반환해야 함", async () => {
    const response = await request(app).get("/auth/market-products");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("인증이 필요합니다.");
  });
});
