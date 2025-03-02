FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y \
    libdbus-1-3 \
    libglib2.0-0 \
    libatk1.0-0 \
    libgtk-3-0 \
    libnss3 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd -r appuser && \
    useradd -r -g appuser -d /app -s /sbin/nologin appuser

# Copy application files
COPY ./dist/linux-unpacked/ /app
RUN chown -R appuser:appuser /app

WORKDIR /app

USER appuser
CMD ["./rain-mixer", "--no-sandbox"]
