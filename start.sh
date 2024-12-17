#!/bin/bash

# Simple script to set up and run the Fullstack Notes App
# Author: [Tu nombre]

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Fullstack Notes App...${NC}"

# Load environment variables
if [ -f backend/.env ]; then
  echo -e "${YELLOW}🔐 Loading environment variables...${NC}"
  source backend/.env
else
  echo -e "${RED}❌ .env file not found in backend folder. Exiting...${NC}"
  exit 1
fi

# Start Backend
echo -e "${YELLOW}📦 Setting up backend...${NC}"
cd backend || exit
npm install

echo -e "${YELLOW}💾 Running database migrations...${NC}"
npx typeorm migration:run

echo -e "${YELLOW}🌱 Importing initial data into MySQL...${NC}"
mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/dump/initial_data.sql

echo -e "${YELLOW}🚀 Starting backend on port 3000...${NC}"
npm run start:dev &
BACKEND_PID=$! # Save the PID of the backend process

# Go back to root folder
cd ..

# Start Frontend
echo -e "${YELLOW}🎨 Setting up frontend...${NC}"
cd frontend || exit
npm install

echo -e "${YELLOW}🌐 Starting frontend on port 5173...${NC}"
npm run dev &
FRONTEND_PID=$! # Save the PID of the frontend process

# Success message
echo -e "${GREEN}✅ Both Backend and Frontend are running!${NC}"
echo -e "${GREEN}🔗 Open the app at http://localhost:5173${NC}"

# Graceful shutdown on script exit
trap "echo -e '${RED}🛑 Shutting down backend and frontend...${NC}'; kill $BACKEND_PID $FRONTEND_PID" SIGINT SIGTERM

# Wait for processes to keep the script running
wait