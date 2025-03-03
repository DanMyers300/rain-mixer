FROM debian:bookworm

# Install core dependencies
RUN apt-get update && \
    apt-get install -y \
    libdbus-1-3 \
    dbus-x11 \
    libglib2.0-0 \
    libatk1.0-0 \
    libgtk-3-0 \
    libgtk-4-1 \
    libnss3 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    libgbm1 \
    libasound2 \
    libx11-6 \
    libxext6 \
    libxfixes3 \
    dbus-x11 \
    xauth \
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create non-root user (optional, for file ownership)
RUN groupadd -r appuser && \
    useradd -r -g appuser -d /app -s /sbin/nologin appuser

# Copy application
COPY ./dist/linux-unpacked/ /app
RUN chown -R appuser:appuser /app

WORKDIR /app

# Run as root (no USER directive)
ENTRYPOINT ["/app/entrypoint.sh"]
