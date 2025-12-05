<<<<<<< HEAD
import type { PrismaConfig } from "prisma";

export default {
  schema: "prisma",  // 또는 "prisma/schema.prisma" 대신 "prisma" 폴더만 지정
} satisfies PrismaConfig;
=======
import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
    },
  },
  generators: {
    client: {
      provider: "prisma-client-js",
    }
  }
  });
>>>>>>> 0c0d25b ([정현준]sprint4)
