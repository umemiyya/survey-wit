import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // URL ini dipakai khusus oleh Prisma CLI untuk migrate/db push
    // Gunakan DIRECT_DATABASE_URL (port 5432) karena migrasi butuh direct connection, bukan pooler
    url: env('DIRECT_DATABASE_URL'),
  },
})