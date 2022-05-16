const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
// const mongoose = require('mongoose');


// var isWeekend = require('is-weekend')();

// console.log(isWeekend); // True or False;
app.use(express.static(__dirname + '/image'));
app.use(express.static(__dirname + '/css'));
app.get('/', ((req, res) => {
    res.sendFile(__dirname + '/index.html')
}));

app.get('/intel', ((req, res) => {
    res.sendFile(__dirname + '/intel.html')
}));

app.get('/filter', ((req, res) => {
    res.sendFile(__dirname + '/filter_page.html')
}));

app.get('/nvidia', ((req, res) => {
    res.sendFile(__dirname + '/nvidia.html')
}));
app.get('/contacts', ((req, res) => {
    res.sendFile(__dirname + '/contacts.html')
}));
app.get('/amd', ((req, res) => {
    res.sendFile(__dirname + '/amd.html')
}));

async function start(){
    try{
        // await mongoose.connect('mongodb+srv://aliakbar:Buzukbuzuk2003@cluster0.m9pvz.mongodb.net/?retryWrites=true&w=majority')
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        })
    } catch (e){
        console.log(e)
    }
};

start();

