/**
 * E2E test For Diseases
 */
const should = require('should');
let TOKEN ,EID,diseaseId
const {
    clearDB,
    BASE_URL, 
     handleErrors, sleep
  } = require('./lib/testHelper');
const request = require('superagent');
const prefix = require('superagent-prefix')(BASE_URL);


  describe('HOSPITAL MANAGEMENT APP for Diseases E2E Test', () => {
    
    before(async () => {
      const data = {
        email:'test@email.com',
        password:'123456'
    };

    const login = await request.post('/login')
    .use(prefix)
    .send(data);

      TOKEN = login.body.token;
      diseases = {
        name:'diseases',
        score : 18
      }; 

    });
  
    after(async () => {
    });
  


/**
 * test Add diseases in /diseases/:id Api
 */
describe('POST /diseases',()=>{

    it('Add diseases should get succeeded',async ()=>{
       

    const res = await request.post('/diseases')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json')
            .send(diseases);
    (res.status).should.equal(200);
    diseaseId = res.body.id
    })
})

/**
 * test GET  diseases in /diseases/:id Api
 */
describe('GET /diseases',()=>{

    it('Add diseases should get succeeded',async ()=>{
       

    const res = await request.get('/diseases')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
         
    (res.status).should.equal(200);

    
    })
})

/**
 * test Delete  diseases in /diseases/:id Api
 */
describe('DELETE /diseases',()=>{

    it('Add diseases should get succeeded',async ()=>{
       

    const res = await request.delete(`/diseases/${diseaseId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
         
    (res.status).should.equal(200);

    
    })
})
})
