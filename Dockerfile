# Build and Serve stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install --save-dev @types/lodash

# Don't copy source code - will be mounted as volume
# Source code will be mounted at runtime for live reloading
COPY . .

RUN npm run build

# Build the app
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]