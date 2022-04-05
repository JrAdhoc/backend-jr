import supertest from 'supertest';
import chai,{expect} from 'chai';

const request = supertest('http://localhost:4001');

describe('test API',()=>{
    describe('GET',()=>{
        it('La peticion deberia retornar status 200',async()=>{
            let res = await request.get('/users/getusers');
            expect(res.status).to.equal(200);
        })
    })
    describe('POST',()=>{
        it('Debe poder guardar un usuario', async()=>{
            afterEach(()=>{
                
            })
            let user = {
                first_name: "Juan Ignacio",
                last_name: "Rivero",
                email:"juanii.rivero@gmail.com"
            }
            let res = await request.post('/users/adduser').send(user);
            expect(res.status).to.equal(200);
            const resBody = res.body;
            expect(resBody).to.include.keys('first_name','last_name','email','_id');
        })
    })
})
