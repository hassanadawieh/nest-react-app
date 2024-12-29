1. Setup Backend (NestJS)

# Navigate to the backend directory
cd nestjs-project

# Install dependencies
npm install

# Create an .env file in the backend directory with the following content:
cat > .env <<EOL
DATABASE_URL=postgres://postgres:password@db:5432/nestdb
JWT_SECRET=37894674824rukefkbdshf
REACT_APP_URL=http://localhost:3000 
EOL


# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev --name init

# Start the NestJS application
npm run start

2. Setup Frontend (React)

# Navigate to the frontend directory
cd react-app

# Install dependencies
npm install

# Update the .env file with the following variable:
cat > .env <<EOL
REACT_APP_API_URL=http://localhost:5000
EOL

# Start the React application
npm run dev

3. Docker Setup

# Ensure Docker is installed on your machine

# Create an .env file in the backend directory with the following content:
cat > .env <<EOL
DATABASE_URL=postgres://postgres:password@db:5432/nestdb
JWT_SECRET=37894674824rukefkbdshf
REACT_APP_URL=http://localhost
EOL

# Navigate to the project root directory where docker-compose.yml is located
cd your-project-root

# Build and start the containers
docker-compose up --build

# Access the application:
# Frontend: http://localhost
# Backend API: http://localhost:3000

# To stop the containers:
docker-compose down

3. Note

# Swagger documentation:
http://localhost:3000/api

