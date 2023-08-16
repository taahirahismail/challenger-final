const db = require('../config');
const {hash, compare, hashSync} = require("bcrypt");
const {createToken} = require('../middleware/AuthenticateUser');

class Users {
    fetchUsers(req, res) {
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, profileUrl FROM Users;
        `

        db.query(query, (err, results) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    fetchUser(req, res) {
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, profileUrl FROM Users WHERE userID = ${req.params.id};
        `

        db.query(query, (err, result) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    login(req, res) {
        const {emailAdd, userPass} = req.body

        // query
        const query = `
        SELECT firstName, lastName, gender, userDOB, emailAdd, userPass, profileUrl FROM Users WHERE emailAdd = '${emailAdd}';
        `

        db.query(query, async (err, result) => {
            if (err) throw err
            if (!result?.length) {
                res.json({
                    status: res.statusCode,
                    msg: "You provided the wrong email."
                })
            } else {
                await compare(userPass, 
                    result[0].userPass,
                    (cErr, cResult) => {
                        if (cErr) throw cErr

                        // create token
                        const token =
                        createToken({
                            emailAdd,
                            userPass
                        })

                        // save token
                        res.cookie("LegitUser",
                        token, {
                            maxAge: 3600000,
                            httpOnly: true
                        })

                        if (cResult) {
                            res.json({
                                msg: "Logged in",
                                token,
                                result: result[0]
                            })
                        } else {
                            res.json({
                                status: res.statusCode,
                                msg: "Invalid password or unregistered user!"
                            })
                        }
                    })
            }
        })
    }

    async register(req, res) {
        const data = req.body

        // encrypt password
        data.userPass = await hash(data.userPass, 15);

        // payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }

        // query
        const query = `
        INSERT INTO Users SET ?;
        `

        db.query(query,
            [data],
            (err) => {
                if (err) throw err

                // create token
                let token = createToken(user)
                res.cookie("LegitUser", token, {
                    maxAge: 3600000,
                    httpOnly: true
                })
                
                res.json({
                    status: res.statusCode,
                    msg: "You are now registered!"
                })
            })
    }

    updateUser(req, res) {
        const query = `
        UPDATE Users SET ? WHERE userID = ?
        `

        db.query(query,
            [req.body, req.params.id],
            (err) => {
                if (err) throw err
                res.json({
                    status: res.statusCode,
                    msg: "The user record was updated!"
                })
            })
    }

    deleteUser(req, res) {
        const query = `
        DELETE FROM Users WHERE userID = ${req.params.id};
        `

        db.query(query, (err) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "A user record was deleted!"
            })
        })
    }
}

module.exports = Users