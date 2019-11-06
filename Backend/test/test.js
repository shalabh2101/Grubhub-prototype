var app = require('./index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Grubhub App', function () {

    // it('should create a new user', function (done) {
    //     agent.post('/')
    //         .set('Accept', 'application/json')
    //         .send({
    //             'name': 'Shalabh Neema',
    //             'email': 'shalabhneema@gmail.com',
    //             'password': 'Hello12345@',
    //         })
    //         .then(function (res) {
    //             expect(res.status).to.equal(201);
    //             done();
    //         });
    // });
    it('should login', function (done) {
        agent.post('/signinbuyer')
            .set('Accept', 'application/json')
            .send({
                'email': 'user6',
                'password': 'user6',
                'typer':'buyer'
            })
            .then(function (res) {
                expect(res.status).to.equal(200);
                done();
            });
    });
    // it('should get profile', function (done) {
    //     agent.get(`/users/profile/${userId}`)
    //         .set({
    //             'Accept': 'application/json',
    //         })
    //         .then(function (res) {
    //             expect(res.status).to.equal(200);
    //             done();
    //         });
    // });
    // it('should update profile', function (done) {
    //     agent.put(`/users/profile/${userId}`)
    //         .set({
    //             'Accept': 'application/json'
    //         })
    //         .send({
    //             'name': 'John Snow',
    //             'contactNumber': '1234567890'
    //         })
    //         .then(function (res) {
    //             expect(res.status).to.equal(200);
    //             done();
    //         });
    // });
})