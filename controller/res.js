var Res = require('../models/res');
module.exports = function(app) {
	app.get('/Res/getAllRes', checkLogin);
	app.get('/Res/getAllRes', function(req, res) {
		console.log('checklogin2');
		Res.getAll(function(err, resList) {
			if (err) {
				return res.send({
					'resultCode': '000044',
					'resultMsg': '数据库操作失败',
					'result': {}
				})
			}
			return res.send({
				'resultCode': '000000',
				'resultMsg': 'success',
				'result': resList
			})
		});
	});

	app.post('/Res/getAllRes', checkLogin);
	app.post('/Res/getAllRes', function(req, res) {
		console.log('checklogin2');
		Res.getAll(function(err, resList) {
			if (err) {
				return res.send({
					'resultCode': '000044',
					'resultMsg': '数据库操作失败',
					'result': {}
				})
			}
			return res.send({
				'resultCode': '000000',
				'resultMsg': 'success',
				'result': resList
			})
		});
	});

	function checkLogin(req, res, next) {
		console.log('checklogin');
		if (!req.session.user) {
			//用户还未登陆
			res.send({
				"resultCode": "000000",
				"result": {
					hasLogin: false
				},
				"resultMsg": "用户未登录"
			});
			return;
		}
		next();
	}
}