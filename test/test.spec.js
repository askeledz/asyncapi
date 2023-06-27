const request = require('supertest')
const expect = require('chai').expect;

const data = require('../testData/posts.json');
const updateddata = require('../testData/updatedposts.json')

describe('Async demo', () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    var postId = 1; //it's fixed becose it's fake

    /*     before(function (done) {
        request(baseURL)
            .post('/auth')
            //.send(userauthdata)
            .send({ username: userauthdata.username, password: userauthdata.password })
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200)
                expect(res.body.token).not.to.be.null;
                token = res.body.token;
                console.log(token)
                if (err) {
                    throw err;
                }
                done()
            });
    }) */

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

    it('Should successfully create a post using POST request', async () => {
        await request(baseURL)
            .post('/posts')
            .send(data)
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
            .then((res, err) => {
                expect(res.statusCode).to.be.equal(201)
                //postId = res.body.id
                //console.log(postId)
                if (err) {
                    throw err;
                }

            });
    })

    it('Should Update the posts of the provided post id using PUT request', async () => {
        await request(baseURL)
            .put('/posts/' + postId)
            .send(updateddata)
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
          //  .set('Cookie', 'token=' + token)
            .then((res, err) => {
                expect(res.statusCode).to.be.equal(200)
                expect(res.body.title).to.be.equal(updateddata.title)
                if (err) {
                    throw err;
                }
            });
    })

    it('Should Partial Update the title and body of the provided post id using PATCH request', async () => {
        var title = "Andrej"
        var body = "Skeledzija"
        await request(baseURL)
            .patch('/posts/' + postId)
            .send({title: title, body: body})
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
            //.set('Cookie', 'token=' + token)
            .then((res, err) => {
                expect(res.statusCode).to.be.equal(200)
                expect(res.body.title).to.be.equal(title)
                expect(res.body.body).to.be.equal(body)
                if (err) {
                    throw err;
                }
            });
    })

    it('Should Delete post of the provided postId using DELETE request', async () => {
        await request(baseURL)
            .delete('/posts/' + postId)
            .set("Accept", "application/json")
            .set("Content-Type", 'application/json')
            //.set('Cookie', 'token=' + token)
            .then((res, err) => {
                expect(res.statusCode).to.be.equal(200)
                if (err) {
                    throw err;
                }
            });
    })


})