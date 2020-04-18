/**
 * E2E test For Room
 */
const should = require('should');
let TOKEN ,EID,roomId
const {
    clearDB,
    BASE_URL, 
     handleErrors, sleep
  } = require('./lib/testHelper');
const request = require('superagent');
const prefix = require('superagent-prefix')(BASE_URL);


  describe('HOSPITAL MANAGEMENT APP for Room E2E Test', () => {
    
    before(async () => {
 
      const data = {
        email:'test@email.com',
        password:'123456'
    };

    const login = await request.post('/login')
    .use(prefix)
    .send(data);

      TOKEN = login.body.token;
       room = {
        name:'Rom Emergency',
        availability:true,
        
      }; 

    });
  
    after(async () => {
    });
  
    /*
     * Test the GET /users route
     */

/**
 * test Add Product in /product/:id Api
 */
describe('POST /room',()=>{

    it('Add Room should get succeeded',async ()=>{
       

    const res = await request.post('/room')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json')
            .send(room);
    (res.status).should.equal(200);
    roomId = res.body.id
})

})

/**
 * test Get All Rooms in /room/:id Api
 */
describe('GET /room',()=>{

  it('Get all Rooms should get succeeded',async ()=>{
     

  const res = await request.get('/room')
          .set('Authorization', `Bearer ${TOKEN}`)
          .use(prefix)
          .accept('application/json');
          (res.status).should.equal(200);
})

})


/**
 * test DELETE All Rooms in /room/:id Api
 */
describe('DELETE /room',()=>{

  it('DELETE  Room should get succeeded',async ()=>{
     

  const res = await request.delete(`/room/${roomId}`)
          .set('Authorization', `Bearer ${TOKEN}`)
          .use(prefix)
          .accept('application/json');
          (res.status).should.equal(200);
})

})
})