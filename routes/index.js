const jwt = require('jsonwebtoken');
const token = require('../token/index');
console.log(token)

module.exports = function(app, multip) {
    app.post("/login", multip, (req, res) => {
        res.send({
            code: 200,
            message: '成功',
            body: {
                token: token.createToken({
                    user: req.body.user,
                    password: req.body.password
                })
            }
        })
    })

    app.post("/verify", (req, res) => {
        console.log(req.body.token)
        jwt.verify(req.body.token, 'liufeng', (error, decoded) => {
            if (error) {
                res.send({
                    code: 200,
                    message: "签名错误"
                })
            } else {
                res.send({
                    code: 200,
                    message: "验证成功"
                })
            }
        })

    })
}