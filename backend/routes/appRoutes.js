module.exports = app => {
    const passwordHash = require("password-hash")
    const jwt = require("jsonwebtoken");
    const key = require("../config/key.json");

    const users = require("../models").Users;

    app.get("/", (req, res) => {
        res.send("Working Fine!!");
    });

    app.post("/signup", (req, res) => {
        let data = req.body.password;
        let hash = passwordHash.generate(data);
        users.create({
            email: req.body.email,
            password: hash,
            money: 100.0,
            role: false
        });
        res.send("create Success")
    })

    app.post("/login", (req, res) => {
        let data = req.body;
        users
            .findAll({
                attributes: ["id", "email", "password", "role"],
                where: { email: data.email }
            })
            .then(prom => {
                let val = passwordHash.verify(data.password, prom[0].password);
                var token;
                if (val) {
                    token = {
                        id: jwt.sign(
                            {
                                exp: Date.now() / 1000 + 60 * 60,
                                id: prom[0].id
                            },
                            key.tokenKey
                        ),
                        validity: true,
                        role: prom[0].role
                    };
                } else {
                    token = {
                        id: jwt.sign({ id: prom[0].id }, key.tokenKey),
                        validity: false,
                    };
                }
                res.send(token);
            });
    })
}