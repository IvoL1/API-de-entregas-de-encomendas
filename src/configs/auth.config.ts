import { env } from '../env';

export const authConfig = {
  secret: env.AUTH_SECRET,
  secret_expires_in: env.AUTH_SECRET_EXPIRES_IN,
};
