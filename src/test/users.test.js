// src/test/users.test.js
import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('TESTING /api/users y /sessions', () => {
  it('GET /api/users debería devolver un array', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload).to.be.an('array');
  });

  it('POST /api/sessions/register debería registrar un nuevo usuario', async () => {
    const newUser = {
      first_name: 'Sebas',
      last_name: 'Test',
      email: `sebas${Date.now()}@test.com`,
      password: '123456'
    };

    const res = await request(app).post('/api/sessions/register').send(newUser);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload).to.be.a('string'); // ID del usuario
  });

  it('POST /api/sessions/register con datos incompletos debería fallar', async () => {
    const res = await request(app).post('/api/sessions/register').send({});
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal('error');
    expect(res.body).to.have.property('error');
  });
});
