# Use the latest Node.js 22 with Debian Bookworm as the base image
FROM node:22-bookworm

# Set a non-interactive frontend to prevent prompts
ENV DEBIAN_FRONTEND=noninteractive 

# Update package lists and install necessary utilities in a single RUN to reduce image layers
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    coreutils \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies using npm ci for faster, cleaner installations in production
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Switch to the built-in non-root Node.js user for better security
USER node

# Start the Node.js application
CMD ["node", "src/app.js"]
