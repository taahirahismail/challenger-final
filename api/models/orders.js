const db = require('../config');

class Orders {
    fetchOrders(req, res) {
        const query = `
        SELECT orderID, quantity, userID, bookID, orderDate FROM Orders WHERE orderID = ${req.params.id};
        `

        db.query(query, (err, result) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    addOrder(req, res) {
        const query = `
        INSERT INTO Orders SET ?;
        `

        db.query(query,
            [req.body, req.params.id],
            (err) => {
                if (err) throw err

                res.json({
                    status: res.statusCode,
                    msg: "An order has been added!"
                });
            });
    }

    updateOrder(req, res) {
        const query = `
        UPDATE Orders SET ? WHERE userID = ?
        `

        db.query(query,
            [req.body, req.params.id],
            (err) => {
                if (err) throw err
                res.json({
                    status: res.statusCode,
                    msg: "An order was updated!"
                });
            });
    }

    deleteOrder(req, res) {
        const query = `
        DELETE FROM Orders WHERE orderID = ${req.params.id};
        `

        db.query(query, (err) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "An order was deleted!"
            });
        });
    }
}

module.exports = Orders;