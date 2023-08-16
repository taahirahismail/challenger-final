const db = require('../config');

class BookAuthors {
    fetchAuthors(req, res) {
        const query = `
        SELECT id, authorName, authorSurname, bookID FROM BookAuthors;
        `

        db.query(query, (err, results) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    updateAuthor(req, res) {
        const query = `
        UPDATE bookAuthors SET ? WHERE id = ?
        `

        db.query(query,
            [req.body, req.params.id],
            (err) => {
                if (err) throw err
                res.json({
                    status: res.statusCode,
                    msg: "An author was updated!"
                });
            });
    }

    deleteAuthor(req, res) {
        const query = `
        DELETE FROM Books WHERE bookID = ${req.params.id}
        `

        db.query(query, (err) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "An author was deleted!"
            })
        })
    }
}

module.exports = BookAuthors;