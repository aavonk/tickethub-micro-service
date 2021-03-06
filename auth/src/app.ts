import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true); // Trust traffic even though its coming from ingress nginx proxy
app.use(express.json());
app.use(
  // We are going to disable encryption (signed: false) of the cookie itsself so
  // that it can easily be understood by other services that may be written
  // in a different language and doesn't have access to Nodes/NPM 'cookie session' and
  // whatever encryption algorithm they use.
  // The JWT that will be inside the cookie should be tamper proof and shouldn't contain
  // sensitive information
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // use only on HTTPS if not in test env
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
