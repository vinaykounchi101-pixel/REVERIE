import fs from 'fs';
import path from 'path';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#') || !line.includes('=')) continue;
      const eqIdx = line.indexOf('=');
      const key = line.substring(0, eqIdx).trim();
      let val = line.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  } catch (err) {
    // ignore
  }
}

// 1. Check custom ENV_FILE if provided
const customEnv = process.env.ENV_FILE;
if (customEnv) {
  loadEnvFile(path.resolve(process.cwd(), customEnv));
  loadEnvFile(path.resolve(process.cwd(), '..', customEnv));
} else {
  // 2. Load base .env if present
  loadEnvFile(path.resolve(process.cwd(), '.env'));
  loadEnvFile(path.resolve(process.cwd(), '..', '.env'));
  // 3. Load deployment overrides (.env.deployment / .env.frontend.deployment)
  loadEnvFile(path.resolve(process.cwd(), '.env.deployment'));
  loadEnvFile(path.resolve(process.cwd(), '..', '.env.deployment'));
  loadEnvFile(path.resolve(process.cwd(), '.env.frontend.deployment'));
  loadEnvFile(path.resolve(process.cwd(), '..', '.env.frontend.deployment'));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    NEXT_PUBLIC_DEFAULT_USER_EMAIL: process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
    NEXT_PUBLIC_DEFAULT_USER_PASSWORD: process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD,
  },
  async rewrites() {
    const rawBackend = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://reverie-backend.onrender.com/api';
    const cleanBackend = rawBackend.endsWith('/api') ? rawBackend : `${rawBackend.replace(/\/+$/, '')}/api`;
    return [
      {
        source: '/api/:path*',
        destination: `${cleanBackend}/:path*`,
      },
    ];
  },
};

export default nextConfig;
