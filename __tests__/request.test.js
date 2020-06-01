const request = require('supertest');
const app = require('../index');

beforeAll(()=>{
  let token;
})

describe('Test all requests', ()=>{
  it('should unauthorize access without token', async ()=>{
    const response = await request(app).get('/')
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('No token provided')
  });
  it('should get token', async ()=>{
    const response = await request(app).get('/get-token')
    expect(response.status).toBe(200)
    token = response.body.token
  });
  it('should authorize access with token', async ()=>{
    const response = await request(app).get('/').set('token', token)
    expect(response.status).toBe(200)
  });
  it('shoul show data on token', async ()=>{
    const response = await request(app).get('/check-token').send({token})
    expect(response.status).toBe(200);
    expect(typeof(response.body.id)).toBe('string');
    expect(typeof(response.body.name)).toBe('string');
  })
})