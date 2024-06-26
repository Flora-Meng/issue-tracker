import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import todoRouter from './routes/todoRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

connectDB();

app.use('/todos', todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
