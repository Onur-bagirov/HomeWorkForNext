import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Unpooled Neon URL for migrate / db push
    url: process.env.DATABASE_URL_UNPOOLED!,
  },
})
