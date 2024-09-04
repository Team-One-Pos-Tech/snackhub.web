# Use an official Node.js runtime as the base image
FROM node:20 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use a smaller base image for the production build
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the nginx web server directory
COPY tools/nginx/default.conf /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
