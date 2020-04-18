/**
 * E2E test For Patient
 */
const should = require('should');
let TOKEN ,EID,product,patientId
const {
    clearDB,
    BASE_URL, 
     handleErrors, sleep
  } = require('./lib/testHelper');
const request = require('superagent');
const prefix = require('superagent-prefix')(BASE_URL);


  describe('HOSPITAL MANAGEMENT APP for Patient  E2E Test', () => {
    
    before(async () => {

      const data = {
        email:'test@email.com',
        password:'123456'
    };

    const login = await request.post('/login')
    .use(prefix)
    .send(data);

      TOKEN = login.body.token;
       patient = {
        firstName:'jean ',
        lastName:'kua',
        sex:'Male',
        hospitalNumber:'211222',
        dateOfBirth:'12/2/1992'
  
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
describe('POST /patient',()=>{

    it('Add Product should get succeeded',async ()=>{
       

    const res = await request.post('/patient')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json')
            .send(patient);
    (res.status).should.equal(200);
    patientId = res.body.id
  })
})
/**
 * test Get Products in /products Api
 */
describe('GET /patient',()=>{

    it('Get all patients  should get succeeded',async ()=>{
       

    const res = await request.get('/patient')
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})

/**
 * test Get One Product in /products Api
 */
describe('GET /patient/:id',()=>{

    it('Get one patient by a correct ID  should get succeeded',async ()=>{
       

    const res = await request.get(`/patient/${patientId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})

/**
 * test Update One patients in /products Api
 */
describe('PUT /patients/:id',()=>{

    it('Modify one patient by a correct ID  should get succeeded',async ()=>{
       
        patient.diseases = 'new'
    const res = await request.put(`/patient/${patientId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .send(patient)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})

/**
 * test delete One patient in /patients Api
 */
describe('Delete /patient/:id',()=>{

    it('DELETE one patient by a correct ID  should get succeeded',async ()=>{
       
    const res = await request.delete(`/patient/${patientId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .use(prefix)
            .accept('application/json');
          
    (res.status).should.equal(200);

    })
})
})