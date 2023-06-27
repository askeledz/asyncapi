const request = require('supertest')
const expect = require('chai').expect;

const data = require('../testData/posts.json');
const updateddata = require('../testData/updatedposts.json')

describe('Async demo', () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    var postId = 1; //it's fixed becose it's fake

    it('Should successfully create a post using POST request', async () => {
        await request(baseURL)
            .post('/posts')
            .send(data)
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
            .then((res, err) => {
                expect(res.statusCode).to.be.equal(201)
                //postId = res.body.id
                console.log(postId)
                if (err) {
                    throw err;
                }

            });
    })


    it('Should Fetch the posts by id using GET request', async () => {
        await request(baseURL)
            .get('/posts/' + postId)
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
            .then((res, err) => {
                expect(res.statusCode).to.be.equal(200)
                expect(res.body.title).to.contains('reprehenderit')
                if (err) {
                    throw err;
                }
            });
    })
})