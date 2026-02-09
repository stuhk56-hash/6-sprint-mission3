# 1. Builder Stage
FROM node:20-slim AS builder
WORKDIR /app

# Prisma needs openssl
RUN apt-get update && apt-get install -y openssl

# Install all dependencies
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy source code and build
COPY . .
RUN npm run build

# 2. Production Stage
FROM node:20-slim
WORKDIR /app

# Prisma needs openssl
RUN apt-get update && apt-get install -y openssl

# Install production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY prisma ./prisma
COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

VOLUME /app/public/uploads

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "start"]
