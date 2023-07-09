/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');
const nextConfig = {
    reactStrictMode: true,
    env: {
        BACKEND_URL: process.env.BASE_URL,
        NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }
}

module.exports = nextConfig
