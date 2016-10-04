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
            var ctn = [];
            var result = [];
            for(var i=0;i<resList.length;i++){
                var obj = resList[i];
                var str = obj.ctn;
                if( ctn.join(',').indexOf(str) > -1){
                    for(var j=0;j<result.length;j++){
                        if( result[j].ctn == str ){
                            result[j].count++;
                        }
                    }
                }else{
                    ctn.push(str);
                    result.push({
                        ctn: str,
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

    app.get('/Res/getAllResByClass', checkLogin);
    app.get('/Res/getAllResByClass', function(req, res){
        var ctn = req.query.ctn;
        var phone = req.session.user.phone;
        Res.getAllByC(ctn ,function(err, resList) {
            if (err) {
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            for(var i=0;i<resList.length;i++){
                if( resList[i].op == phone ){
                    resList[i].byMe = true;
                }else{
                    resList[i].byMe = false;
                }
            }
            return res.send({
                'resultCode': '000000',
                'resultMsg': 'success',
                'result': resList
            })
        });
    });

    app.post('Res/updateResByCtns',checkLogin);
    app.post('Res/updateResByCtns',function(req,res){
        var op = req.session.user.phone;
        var sn = req.body.sn;
        var sp = req.body.sp;
        var ctns = req.body.ctns;
        Res.getResByCtns(ctns, function(err, res){
            if(err){
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            if( res.op !='' && res.op != op ){
                return res.send({
                    "resultCode":'000021',
                    "result": {},
                    "resultMsg": "当前账号没有操作此数据权限"
                });
            }
            Res.saveByCtns({
                op: op,
                sn: sn,
                sp: sp,
                ctns: ctns
            },function(err, res){
                if(err){
                    return res.send({
                        'resultCode': '000044',
                        'resultMsg': '数据库操作失败',
                        'result': {}
                    })
                }
                return res.send({
                    "resultCode":'000000',
                    "result": {},
                    "resultMsg": ""
                });
            });

        });
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
}
