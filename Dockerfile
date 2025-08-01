# Stage 1: Build the React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy built assets to Nginx's default public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 (optional, for documentation)
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]