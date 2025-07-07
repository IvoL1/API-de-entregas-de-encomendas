import z from 'zod';

const environmentSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  AUTH_SECRET_EXPIRES_IN: z.string(),
});

export const env = environmentSchema.parse(process.env);
