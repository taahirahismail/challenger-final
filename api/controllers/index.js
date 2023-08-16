const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();

// import all model objects
const {users, orders, books} = require('../models');

// users router
routes.get('/users', (req, res) => {
    users.fetchUsers(req, res)
});

routes.get('/user/:id', (req, res) => {
    users.fetchUser(req, res)
});

routes.post('/register', bodyParser.json(), (req, res) => {
    users.register(req, res)
});

routes.post('/login',
bodyParser.json(), (req, res) => {
    users.login(req, res)
})

routes.put('/user/:id', bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
});

routes.patch('/user/:id', bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
});

routes.delete('/user/:id', (req, res) => {
    users.deleteUser(req, res)
});

// orders router
routes.get('/checkout/:userID/:bookID', (req, res) => {
    orders.fetchOrders(req, res)
});

routes.post('/order/:userID/:bookID', (req, res) => {
    orders.addOrder(req, res)
});

routes.put('order/:userID/:bookID', (req, res) => {
    orders.updateOrder(req, res)
});

routes.patch('order/:userID/:bookID', (req, res) => {
    orders.updateOrder(req, res)
});

routes.delete('orders/:userID/:bookID', (req, res) => {
    orders.deleteOrder(req,res)
});

// books routes
routes.get('/books', (req, res) => {
    books.fetchBooks(req, res)
});

// get single book!!!

routes.post('/book/:id', (req, res) => {
    books.addBook(req, res)
});

routes.put('/book/:id', (req, res) => {
    orders.updateBook(req, res)
});

routes.patch('/book/:id', (req, res) => {
    orders.updateBook(req, res)
});

routes.delete('/book/:id', (req, res) => {
    orders.deleteBook(req,res)
});

// bookAuthors routes


module.exports = {
    express,
    routes
}