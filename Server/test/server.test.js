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
        name: 'GPU',
        price: 500,
        inStorage: 1,
        amountSold: 100,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect.objectContaining({
          name: 'GPU',
          image: '../assets/placeholder_image.png',
          price: 500,
          inStorage: 1,
          amountSold: 100,
        });
      });
  });

  it('should get all items from the database', () => {
    return request(server)
      .get('/version1/item')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect.objectContaining(expect.arrayContaining(expect.object));
      });
  });

  it('should update an item in the database', () => {
    return request(server)
      .put('/version1/item/619f5162f968289dbca37112')
      .send({
        price: 600,
        inStorage: 10,
        amountSold: 1000,
        })
        .expect('Content-Type', /json/)
        .expect(202)
        .then((response) => {
          expect.objectContaining({
            name: 'GPU',
            image: '../assets/placeholder_image.png',
            price: 600,
            inStorage: 10,
            amountSold: 1000,
          });
        });
      });

    });
