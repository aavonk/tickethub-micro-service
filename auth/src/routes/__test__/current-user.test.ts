import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/helpers';

it('Responds with details about the current user', async () => {
  const cookie = await signin();

  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});

it('Returns a current user of null if not signed in', async () => {
  const res = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
