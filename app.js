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
$sql.connect(function(res) {
    // console.log(res)
    console.log('连接中')
});

const _sql = 'SELECT * FROM user';
$sql.query(_sql, function (err,results) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    if (results) {
        for(var i = 0; i < results.length; i++)
        {
            console.log('%s\t%s',results[i].user,results[i].password);
        }
    }
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
        res.send({
            code: 200,
            body: {
                token: JSON.parse(_res).token
            },
            message: 'success'
        })
    })
})

app.post('/register', multipartMiddleware, (req, res)=>{
    console.log(req.body)

    let  userAddSql = 'INSERT INTO user(user,password) VALUES(?,?)';

    let  userAddSql_Params = [req.body.user, req.body.password];

    $sql.query(userAddSql,userAddSql_Params,function (err, result) {

        if(err){

         console.log('[INSERT ERROR] - ',err.message);

         return;

        }       

       console.log('-------INSERT----------');

       //console.log('INSERT ID:',result.insertId);       

       console.log('INSERT ID:',result);       

       console.log('#######################'); 

});
    res.send(req.body)
})


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
            // console.log(_data);
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