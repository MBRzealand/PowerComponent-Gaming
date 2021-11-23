const request = require('supertest');
const server = require('../server');

describe(' Route', () => {
  it('should return Json object with name Fredrik', () => {
    return request(server)
      .get('/version1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: 'Fredrik',
          })
        );
      });
  });
});
