const request = require('supertest');
const { $where } = require('../model/itemscheme');
const { response } = require('../server');
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
        specifications :[ { 'Hardware' : 'Hardware' }, { 'Software' : 'Software' },{'pik' : 'pik'}],
        categories : ["Hardware" , "Software"] 
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
      .put('/version1/item/619f902dc00f4a18a9a7de63')
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

     
  it('should delete an item in the database', () => {
     
    request(server)
      .post('/version1/item')
      .send({
        name: 'GPU',
        price: 500,
        inStorage: 1,
        amountSold: 10000,
      })
      .then((response) => {
       const idForDelete = response.body.item._id
       return request(server)
      .delete(`/version1/item/${idForDelete}`)
        .expect(410)
        .then((response) => {
          expect.objectContaining({
            name: 'GPU',
            image: '../assets/placeholder_image.png',
            price: 500,
            inStorage: 1,
            amountSold: 10000,
          });
        });
      });
          
      });


    it('should find a specific item in the database', () => {
        return request(server)
            .get('/version1/item/619f902dc00f4a18a9a7de63')
            .expect('Content-Type', /json/)
            .expect(200)
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

      describe('Search Function', () => {

        it('Should find all elements based on name', () => {
          return request(server)
            .get('/version1/search/Hardware')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
              expect.objectContaining(expect.arrayContaining(expect.object))
            })
        })
      })
