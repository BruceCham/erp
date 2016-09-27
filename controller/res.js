var Res = require('../models/res');
module.exports = function(app) {
    app.get('/Res/getAllRes', checkLogin);
    app.get('/Res/getAllRes', function(req, res) {
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

    app.get('/Res/getAllResByClass', checkLogin);
    app.get('/Res/getAllResByClass', function(req, res){
        var ct = req.query.ct;
        var cn = req.query.cn;
        Res.getAllByC(ct , cn ,function(err, resList) {
            if (err) {
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            var result = null;
            if( resList.length > 0 ){
                result = {
                    ct: ct,
                    cn: cn,
                    cst: resList[0].cst,
                    cet: resList[0].cet,
                    count: resList.length
                }
            }
            return res.send({
                'resultCode': '000000',
                'resultMsg': 'success',
                'result': result
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
