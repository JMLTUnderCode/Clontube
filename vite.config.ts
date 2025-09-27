import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    base: '/Clontube/',
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/tests/setupTests.ts',
        coverage: {
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'node_modules/',
                'api/',
                'backend/',
                'public/',
                '**/*.d.ts',
                '**/tests/**',
            ],
        },
    },
})
/*
server: {
    proxy: {
        '/api': {
            target: 'https://backend-9tcm.onrender.com',
            changeOrigin: true,
            secure: false,
        },
    }
} */