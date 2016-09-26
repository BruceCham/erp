//用户登陆、注册、退出
var crypto = require('crypto'),
    User = require('../models/user');

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
        var newUser = new User({
            name: name || phone,
            password: password,
            phone: phone
        });
        User.get(newUser.phone, function(err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            if (user) {
                return res.send({
                    'resultCode': '000005',
                    'resultMsg': '用户已存在',
                    'result': {}
                })
            }
            newUser.save(function(err, user) {
                if (err) {
                    return res.send({
                        'resultCode': '000044',
                        'resultMsg': '数据库操作失败',
                        'result': {}
                    })
                }
                req.session.user = user;
                return res.send({
                    'resultCode': '000000',
                    'resultMsg': 'success',
                    'result': {
                        username: user.name
                    }
                })
            });
        });
    });

    /**
     * post方式 登录
     */
    app.post('/User/login', checkNotLogin);
    app.post('/User/login', function(req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        User.get(req.body.phone, function(err, user) {
            if (!user) {
                res.send({
                    "resultCode": "000001",
                    "result": {},
                    "resultMsg": "用户不存在"
                });
                return;
            }
            if (user.password != password) {
                res.send({
                    "resultCode": "000002",
                    "result": {},
                    "resultMsg": "账号或密码不正确"
                });
                return;
            }
            req.session.user = user;
            res.send({
                "resultCode": "000000",
                "result": {
                    username: user.name
                },
                "resultMsg": "登陆成功"
            });
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
