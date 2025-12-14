import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
    server: {
        port: 5175,
        proxy: {
            '/go/api': {
                target: 'http://localhost:8082',
                changeOrigin: true,
            }
        }
    }
})
