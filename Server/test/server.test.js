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

  it('should create an item in the database', () => {
    return request(server)
    .post('/version1/item')
    .send({
      name: "GPU",
      price: 500,
      inStorage: 1,
      amountSold: 100,
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .then((response) => {
      expect.objectContaining({
        name: "GPU",
        image: "../assets/placeholder_image.png",
        price: 500,
        inStorage: 1,
        amountSold: 100,
      })
    })
  })
});
