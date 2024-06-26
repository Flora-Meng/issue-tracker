import express from 'express';
import issueRoutes from './routes/issueRoutes';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use('/api/issues', issueRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
