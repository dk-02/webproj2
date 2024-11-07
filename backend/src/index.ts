import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
    origin: FRONTEND_URL, 
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type','Authorization']
}));

app.options('*', (_req, res) => {
    res.header("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(204);
});


app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {});
