const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();

// import all model objects
const {users, orders, books, bookAuthors} = require('../models');

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

routes.put('/order/:userID/:bookID', (req, res) => {
    orders.updateOrder(req, res)
});

routes.patch('/order/:userID/:bookID', (req, res) => {
    orders.updateOrder(req, res)
});

routes.delete('/orders/:userID/:bookID', (req, res) => {
    orders.deleteOrder(req,res)
});

// books routes
routes.get('/books', (req, res) => {
    books.fetchBooks(req, res)
});

routes.get('/book/:id', (req, res) => {
    books.fetchBook(req, res)
});

routes.post('/book', (req, res) => {
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
routes.get('/bookAuthors', (req, res) => {
    bookAuthors.fetchAuthors(req, res)
});

// must still do bookDetails!!!!

routes.put('/bookAuthor/:id', (req, res) => {
    bookAuthors.updateAuthor(req, res)
});

routes.delete('/bookAuthor/:id', (req, res) => {
    bookAuthors.deleteAuthor(req, res)
});


module.exports = {
    express,
    routes
}