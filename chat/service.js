const appKey = "cpj2xarlctw0n";
const secret = 'p6Vy9XDEwLhs';

var RongSDK = require('rongcloud-sdk')({
    appkey: appkey,
    secret: secret
});

var User = RongSDK.User;
var user = {
    id: 'ujadk90ha',
    name: '刘峰',
    portrait: 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982'
};
User.register(user).then(result => {
    console.log('注册成功：', result);
}, error => {
    console.log('注册失败：', error);
});