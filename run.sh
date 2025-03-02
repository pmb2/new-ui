#!/bin/bash
set -e

if ! command -v docker &> /dev/null; then
  echo "Docker command not found. Please install Docker and ensure it is in your PATH."
  exit 1
fi

echo "Cleaning .next directory, node_modules, and package-lock.json..."
rm -rf .next node_modules package-lock.json

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Starting Docker Compose..."
docker-compose up --build
