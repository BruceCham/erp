var crypto = require('crypto'),
    UserEntity = require('../models/User').UserEntity;

module.exports = function(app) {
    /**
     * post方式 注册
     */
    app.post('/User/reg', checkNotLogin);
    app.post('/User/reg', function(req, res) {
        var name = req.body.name,
            phone = req.body.phone,
            password = req.body.password,
            password_re = req.body['passwordRepeat'];
        var regex = /^(1[^012][0-9]{9})$/i;
        if (!regex.test(phone)) {
            res.send({
                'resultCode': '000004',
                'result': {},
                'resultMsg': '请输入正确的手机号码'
            });
            return;
        }
        if (password_re != password) {
            res.send({
                'resultCode': '000003',
                'result': {},
                'resultMsg': '两次输入的密码不一致'
            });
            return;
        }
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        UserEntity.findOne({ phone: phone }, '_id', function(err, user) {
            if (err) {
                return res.send({
                    resultCode: '000001',
                    resultMsg: '服务器异常',
                    result: null
                })
            }
            if (user) {
                return res.send({
                    resultCode: '000002',
                    resultMsg: '用户已存在',
                    result: null
                })
            }
            var registerUser = new UserEntity({
                name: name || phone,
                phone: phone,
                password: password
            });
            registerUser.save(function(err, row) {
                if (err) { //服务器保存异常  
                    return res.send({
                        resultCode: '000001',
                        resultMsg: '服务器异常',
                        result: null
                    })
                }
                res.send({
                    resultCode: '000000',
                    result: {},
                    resultMsg: '注册成功'
                });
            });
        });
    });

    /**
     * post方式 登录
     */
    app.post('/User/login', checkNotLogin);
    app.post('/User/login', function(req, res) {
    	console.log('+++++++++++++++++++++++++++++++++++++++')
        var md5 = crypto.createHash('md5'),
            phone = req.body.phone,
            password = md5.update(req.body.password).digest('hex');
        UserEntity.findOne({ phone: phone, password: password }, { password: 0 }, function(err, user) {
            if (err) {
                return res.send({
                    resultCode: '000001',
                    resultMsg: '服务器异常',
                    result: null
                })
            }
            if (!user) {
                return res.send({
                    resultCode: '000003',
                    resultMsg: '用户名或密码错误',
                    result: null
                })
            }
            req.session.user = user;
            res.send({
            	"resultCode": "000000",
                "result": {
                    username: user.name
                },
                "resultMsg": "登陆成功"
            });
            UserEntity.update({_id:user._id},{$set: {lastLoginTime: new Date()}}).exec(); 
        });
    });

    /**
     * post方式 退出登录
     */
    app.get('/User/logout', checkLogin);
    app.get('/User/logout', function(req, res) {
        req.session.user = null;
        res.send({
            "resultCode": "000000",
            "result": {},
            "resultMsg": "退出成功"
        });
        return;
    });

    function checkLogin(req, res, next) {
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

    function checkNotLogin(req, res, next) {
        console.log(req.session);
        var user = req.session.user;
        if (user) {
            //已经登录过的用户
            res.send({
                "resultCode": "000010",
                "result": {
                    username: user.name
                },
                "resultMsg": "用户已登录"
            });
            return;
        }
        next();
    }
};
