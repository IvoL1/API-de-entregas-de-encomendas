import { app } from '@/app';
import { env } from './env';

const PORT = env.PORT;

app.listen(PORT, () =>
  console.warn(`Server running on http://localhost:${PORT}`)
);
