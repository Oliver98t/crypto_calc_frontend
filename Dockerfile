# Build and Serve stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
#RUN npm run build

# Install serve globally
#RUN npm install -g serve

#EXPOSE 3000

#CMD ["serve", "-s", "build", "-l", "3000"]

