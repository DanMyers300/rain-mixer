FROM debian:bookworm-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    mesa-utils \
    libgl1-mesa-glx \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxtst6 \
    libxss1 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libnss3 \
    libasound2 \
    curl \
    unzip \
    xauth

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Install TypeScript
RUN bun install -g typescript

WORKDIR /app

# Install Electron dependencies (will be overridden by mounted volume)
COPY package.json .
RUN bun install

CMD ["./start"]
