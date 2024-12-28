# Use Node.js official image as a base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port
EXPOSE 5000

# Command to start the app
CMD ["npm", "run", "start:prod"]
