import { defineConfig } from 'vite'

// Minimal Vite config to allow LAN access from mobile devices.
// Use `npm run dev -- --host` or set `server.host: true` below.
export default defineConfig({
  server: {
    host: true,
    // To enable HTTPS for mobile mic/location, add certs and uncomment:
    // https: {
    //   key: fs.readFileSync('certs/local-key.pem'),
    //   cert: fs.readFileSync('certs/local-cert.pem'),
    // },
  },
})