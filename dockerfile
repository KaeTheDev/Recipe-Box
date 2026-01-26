# ------------- Stage 1: Build --------------
# Starting the FIRST stage of Docker
# This stage's ONLY job is to build the React app
# It will NOT be the container that actually runs in production

FROM node:20-alpine AS builder
# Use Node.js version 20, alpine version (small + fast)
# Named this stage "builder" so it can be referenced later

WORKDIR /app
# Set the working directory inside the container to /app
# All commands from now on will run inside /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./
# Copy only package.json and package-lock.json into the container
# This lets Docker cache npm installs if depencencies don't change

RUN npm ci
# Install dependencies using package-lock.json
# "npm ci" is faster and more predicatable than "npm install"

# Copy the rest of the app
COPY . .
# Copy the rest of the project files (src, public, config files, etc.)
# Now the container has the full React app source code

# Build the Vite app
RUN npm run build 
# Run the product build
# Vite compiles the app into static files inside a "dist" folder
# After this step, /app/dist exists

# ------------- Stage 2: Run --------------
# This is the SECOND stage
# This stage is what actually runs when the container starts
# It does NOT need source code or build tools

FROM node:20-alpine
# Start a fresh, clean Node image
# This keeps the final image smaller and cleaner

WORKDIR /app
# Set the working directory again to /app

# Install a lightweight static server
RUN npm install -g serve
# Install a simple tool called "serve"
# This tool can serve static files (HTML, CSS, JS)
# We use it instead of a backend server

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
# Copy ONLY the built files from the first stage
# We are NOT copying src/, node_modules, or configs
# This keeps the image small and production-ready

# Expose required port
EXPOSE 3000 
# Tell Docker that this container listens on port 3000

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
# This is the command that runs when the container starts
# "server -s dist" serves the static React app
# "-l 3000" makes it available on port 3000