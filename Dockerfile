# Use an official Node runtime as a parent image
FROM node:22-alpine

# Set the working directory
WORKDIR /react-app/

# Copy package.json and package-lock.json if available
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Build the React app (optional, but recommended for production)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
