# Use an official Node runtime as a parent image
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the project
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Run the project in production mode
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
