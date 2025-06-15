# ────────────── Stage 1: Builder ──────────────
FROM node:18-alpine AS builder

# Install build tools
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package manifests & install both prod+dev deps
COPY package*.json tsconfig*.json ./
RUN npm ci

# Copy source
COPY . .

# Build Client (React → dist/ with Vite)
RUN npm run build

# Build Server (TS → dist/server)
RUN npm run build:server

# ────────────── Stage 2: Production Image ──────────────
FROM node:18-alpine AS runner

# Set production env (no dev-deps)
ENV NODE_ENV=production \
    # limit heap to ~180 MB to avoid OOM on 256MB droplet
    NODE_OPTIONS="--max_old_space_size=180"

WORKDIR /app

# Only copy package.json + lockfile and install prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist

# Expose port that Express listens on
EXPOSE 8080

# Launch the server entrypoint
CMD ["node", "dist/server/index.js"]