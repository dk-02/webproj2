import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*', 
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {});
