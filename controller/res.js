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
            var ctns = [];
            var result = [];
            for(var i=0;i<resList.length;i++){
                var obj = resList[i];
                var str = obj.ctns;
                if( ctns.join(',').indexOf(str) > -1){
                    for(var j=0;j<result.length;j++){
                        if( result[j].ctns == str ){
                            result[j].count++;
                        }
                    }
                }else{
                    ctns.push(str);
                    result.push({
                        ctns: str,
                        count: 1,
                        cst: obj.cst,
                        cet: obj.cet
                    });
                }
            }
            return res.send({
                'resultCode': '000000',
                'resultMsg': 'success',
                'result': result
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
        var ctns = req.query.ctns;
        Res.getAllByC(ctns ,function(err, resList) {
            if (err) {
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            console.log(resList);
            console.log('errCCCC++++++++++++');
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
