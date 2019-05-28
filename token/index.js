const jwt = require('jsonwebtoken');
const secret  = 'liufeng';

const token = {
	createToken: function(payload) {
		const _token = jwt.sign(payload, secret, { expiresIn: '3000' })
		return _token;
	}
}

module.exports = exports = token;