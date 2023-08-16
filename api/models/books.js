const db = require('../config');

class Books {
    fetchBooks(req, res) {
        const query = `
        SELECT bookID, bookTitle, amount, category, bookUrl FROM Books;
        `

        db.query(query, (err, results) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    fetchBook(req, res) {
        const query = `SELECT bookID, bookTitle, amount, category, bookUrl FROM Books WHERE bookID = ${req.params.id};
        `

        db.query(query, (err, result) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    addBook(req, res) {
        const query = `
        INSERT INTO Books SET ?;
        `
        db.query(query,
            req.body,
            (err) => {
                if (err) throw err
                
                res.json({
                    status: res.statusCode,
                    msg: "A book has been added!"
                });
            });
    }

    updateBook(req, res) {
        const query = `
        UPDATE Books SET ? WHERE bookID = ?
        `

        db.query(query,
            [req.body, req.params.id],
            (err) => {
                if (err) throw err
                res.json({
                    status: res.statusCode,
                    msg: "A book was updated!"
                });
            });
    }

    deleteBook(req, res) {
        const query = `
        DELETE FROM Books WHERE bookID = ${req.params.id};
        `

        db.query(query, (err) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "A book was deleted!"
            });
        });
    }
}

module.exports = Books;