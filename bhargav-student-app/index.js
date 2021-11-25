const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use('/client', express.static('public'))

const url = 'db_string';
const client = new MongoClient(url);

var dbConnection;

app.get('/', function (req, res) {
    dbConnection.collection('test').find({}).toArray().then((data) => res.send(data));
})

app.post('/createstudent', (req, res) => {
    dbConnection.collection('students').insertOne({ name: req.body.name }).then((_) => res.send({ 'status': "Student Created Succesfully" }));
})

app.get('/getstudents', (req, res) => {
    dbConnection.collection('students').find({ 'mentor_id': { $eq: null } }).toArray().then((data) => res.send(data));
})

app.post('/creatementor', (req, res) => {
    dbConnection.collection('mentors').insertOne({ name: req.body.name }).then((_) => res.send({ 'status': "Mentor Created Succesfully" }));
})

app.get('/getmentors', (req, res) => {
    dbConnection.collection('mentors').find({}).toArray().then((data) => res.send(data));
})

app.post('/linkmentor', async (req, res) => {
    if (!req.body.mentor_id || !req.body.student_id)
        return res.send({ 'status': 'Mentor not Linkes', 'err': 'Please provide IDs' })
    dbConnection.collection('students').updateOne({ '_id': ObjectId(req.body.student_id) }, { $set: { 'mentor_id': req.body.mentor_id } }).then((data) => res.send({ 'status': "Student linked successfully", 'response': data }))
})

client.connect().then((mongoClient) => {
    app.listen(3000, () => {
        console.log("Server startedd...")
    })
    dbConnection = mongoClient.db('vbase');
})

