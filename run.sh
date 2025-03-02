#!/bin/bash
set -e

echo "Cleaning .next directory, node_modules, and package-lock.json..."
rm -rf .next node_modules package-lock.json

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Building Docker image..."
docker build -t social-gbp .

echo "Running Docker container on port 3000..."
docker run --rm -p 3000:3000 social-gbp
