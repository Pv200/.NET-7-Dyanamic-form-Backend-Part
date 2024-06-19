import express from 'express';
import bodyParser from 'body-parser';
import submissionRoutes from './routes/submission';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', submissionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
