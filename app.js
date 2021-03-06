const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./openapi.json')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const ProductName = require("./models/prod")
const mongoose = require("mongoose");
let port = process.env.PORT || 3000;
const app = express()
app.set('view engine', 'ejs');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json())
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc))


async function start() {
    try {
        // await mongoose.connect('mongodb+srv://aliakbar:Buzukbuzuk2003@cluster0.m9pvz.mongodb.net/?retryWrites=true&w=majority')
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        })
    } catch (e) {
        console.log(e)
    }
};

mongoose
    .connect("mongodb+srv://aliakbar:Buzukbuzuk2003@cluster0.m9pvz.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))



start();


app.post('/getusers', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
    }
})



app.post('/api/register', async (req, res) => {
    const { email, password: plainTextPassword } = req.body

    if (!email || typeof email !== 'string') {
        return res.json({ status: 'error', error: 'Invalid email' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 6 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            email,
            password
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'This email already in use' })
        }
        throw error
    }

    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Server up at 9999')
})


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Wrong username or password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.email
            },
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Wrong username or password' })
})


app.use(express.static(__dirname + '/public/image'));
app.use(express.static(__dirname + '/public/css'));
app.get('/', ((req, res) => {
    res.render('main')
}));

app.get('/filter', ((req, res) => {
    res.render('filter')
}));

app.get('/sign', ((req, res) => {
    res.sendFile(__dirname + '/signup.html')
}));

app.get('/login', ((req, res) => {
    res.sendFile(__dirname + '/login.html')
}));

app.get('/contacts', ((req, res) => {
    res.sendFile(__dirname + '/contacts.html')
}));




module.exports = app

