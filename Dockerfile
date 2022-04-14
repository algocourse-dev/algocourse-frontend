FROM node:14.15.0-alpine

# Set working directory
WORKDIR /app

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run the server at the default port 3000
CMD [ "npm", "run", "start" ]