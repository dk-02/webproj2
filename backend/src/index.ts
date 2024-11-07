import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Zamijenite s točnom domenom frontend aplikacije
    methods: 'GET,POST', // Dozvolite samo potrebne metode
    allowedHeaders: 'Content-Type,Authorization', // Dozvolite potrebne zaglavlje
    credentials: true
}));


app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {});