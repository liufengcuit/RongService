const express = require('express');
const Qs = require('qs');
const app = express();
const bodyParser = require('body-parser');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart(); 

const publicParams = require("./util/publicParams.js");
const http = require('http');
const router = express.Router();
const config = require('./chat/config.js');

const reqHeaderSet = publicParams.encryptionSha1();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 连接数据库
const $mysql   = require("mysql");
const sql = require("./db/connection");
const $sql = $mysql.createConnection(sql.mysql);
$sql.connect();

const _sql = 'SELECT * FROM user';
$sql.query(_sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    console.log("56",result);  //数据库查询结果返回到result中
});


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/login', multipartMiddleware, (req, res)=>{
    postData(_res=>{
        res.send(_res)
    })
})

console.log(reqHeaderSet)

function postData(call) {
    let req = http.request({
        host: config.rongUrl,
        path: "/user/getToken.json",
        method: 'POST',
        headers: {
            "App-Key": reqHeaderSet.AppKey,
            "Nonce": reqHeaderSet.Nonce,
            "Timestamp": reqHeaderSet.Timestamp,
            "Signature": reqHeaderSet.Signature,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }, res=>{
        let _data = '';
        res.on('data', function(chunk){
            _data += chunk;
        });

        res.on('end', function(){
            call(_data)
            console.log(_data);
        });
    })

    req.write(Qs.stringify({
        userId: 'liufeng',
        name: 'liufeng',
        portraitUri: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1857822258,3817108768&fm=27&gp=0.jpg'
    }))
    req.end();
}

const server = app.listen(8090, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})