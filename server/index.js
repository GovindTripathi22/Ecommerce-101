import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for security and parsing
app.use(helmet({
  contentSecurityPolicy: false, // For development ease
}));
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LUXE RADIANCE Server is healthy' });
});

// Serve frontend in production (if needed)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\x1b[35m[server]\x1b[0m Node.js backend running on http://localhost:${PORT}`);
});
