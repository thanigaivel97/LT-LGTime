const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const authroute = require('./routes/auth');
const postroute = require('./routes/post');
const stripe = require('stripe')("sk_test_51I3gogB8AVs8qACmN51Ka8IGZ01Ym5NXoOPOGZeFFrZKzzncA6KnunhSECLFpbNWB3DDLAvZZaH6I1kpnEWKYEIj007CF1T4z5")

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.post('/pay', (req, res) => {
    const { product, token } = req.body
    console.log('product ', req.body)
        // const idkey = uuid()

    stripe.customers.create({
            email: "thani@gmail.com",
            source: token.id,
            name: 'Jenny Rosen',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            }
        }).then((customers) => {
            console.log(customers)
            return stripe.charges.create({
                amount: 100 * 100,
                currency: 'usd',
                customer: customers.id,
                "description": "Some description",

            })
        }).then(result => {
            console.log(result)
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            console.error(err)
        })
})

app.use('/auth', authroute);
app.use('/posts', postroute);


mongoose.connect('mongodb+srv://hello:hello@cluster0-acgtj.mongodb.net/hello?retryWrites=true&w=majority').then(res => {
    app.listen(8080);
}).catch(err => {
    console.log(err);
});