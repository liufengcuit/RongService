const jwt = require('jsonwebtoken');
const secret  = 'liufeng';

const token = {
	createToken: function(payload) {
		const _token = jwt.sign(payload, secret, { expiresIn: '3000' })       //可设置1h 1days 1d  默认为ms
		return _token;
	}
}

module.exports = exports = token;