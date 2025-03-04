# 🌧️ Rain Mixer 🌧️

![Version](https://img.shields.io/badge/version-0.0.2-blue.svg?cacheSeconds=2592000)

A clean web and desktop application for ambient sounds. Perfect for focus, relaxation, or sleep. Features rain and brown noise tracks with vintage vinyl record aesthetics.

**Live Demo**: [rain.danmyers.net](https://rain.danmyers.net)

## Features

- 🎵 Dual-track audio playback (rain & brown noise)
- ▶️ Interactive vinyl record UI with play/pause animation
- 🔊 Logarithmic volume control for smooth adjustment
- 🔁 Automatic track looping
- ↔️ One-click track switching
- 🖥️ Cross-platform support (Web + Electron desktop app)
- 🎚️ Web Audio API integration for professional sound handling

## Tech Stack

**Frontend**:
- React + TypeScript
- Tailwind CSS
- Web Audio API
- Vite

**Desktop**:
- Electron
- Electron Builder

**Tooling**:
- Bun runtime
- Nix package manager
- ESLint + TypeScript type checking

## Installation

### Prerequisites
- Bun 1.1+
- @tailwindcss/cli
- Node.js 20+ (For electron only)

### Quick Start (Web Version)
```bash
bun install
bun run dev

### Quick Start (Electron Version)
```bash
bun install
bun run dev
