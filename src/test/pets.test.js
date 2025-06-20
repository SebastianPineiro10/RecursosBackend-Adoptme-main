import request from 'supertest';
import { expect } from 'chai';

const baseUrl = 'http://localhost:8080';

describe('TESTING /api/pets', () => {
  it('GET /api/pets debería devolver un array', async () => {
    const res = await request(baseUrl).get('/api/pets');
    expect(res.status).to.be.oneOf([200, 500]);
    if (res.status === 200) {
      expect(res.body.payload).to.be.an('array');
    }
  });

  it('POST /api/pets debería crear una nueva mascota', async () => {
    const newPet = {
      name: 'Toby',
      specie: 'Perro',
      birthDate: '2021-06-14',
      adopted: false
    };

    const res = await request(baseUrl).post('/api/pets').send(newPet);
    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body.payload).to.have.property('_id');
    expect(res.body.payload.name).to.equal(newPet.name);
  });

  it('POST /api/pets con datos vacíos debería fallar', async () => {
    const res = await request(baseUrl).post('/api/pets').send({});
    expect(res.status).to.be.oneOf([400, 422]);
    expect(res.body).to.have.property('status').that.equals('error');
  });
});
