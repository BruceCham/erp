var ResEntity = require('../models/Res').ResEntity;
module.exports = function(app) {
    app.get('/Res/getAllRes', checkLogin);
    app.get('/Res/getAllRes', function(req, res) {
        ResEntity.find().sort({'cs':'asc'}).exec(function(err,docs){
            if(err){
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            var ctn = [];
            var result = [];
            for(var i=0;i<docs.length;i++){
                var obj = docs[i];
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
        ResEntity.find({ctn: ctn},function(err,docs){
            if (err) {
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            var result = [];
            for(var i=0;i<docs.length;i++){
                var _doc = docs[i].toObject();
                if( _doc.op == phone ){
                    _doc.byMe = true;
                }else{
                    _doc.byMe = false;
                }
                result.push( _doc );
            }
            return res.send({
                'resultCode': '000000',
                'resultMsg': 'success',
                'result': result
            })
        });
    });

    app.post('/Res/updateResByCtns',checkLogin);
    app.post('/Res/updateResByCtns',function(req,res){
        var op = req.session.user.phone;
        var sn = req.body.sn;
        var sp = req.body.sp;
        var ctns = req.body.ctns;
        // update({ _id: id }, { $set: { size: 'large' }}, callback);
        ResEntity.findOne({ctns:ctns},function(err,doc){
            if (err) {
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            if( doc.op !='' && doc.op != op ){
                return res.send({
                    "resultCode":'000021',
                    "result": {},
                    "resultMsg": "当前账号没有操作此数据权限"
                });
            }
            ResEntity.update({_id: doc._id},{$set:{
                op: op,
                sn: sn,
                sp: sp,
                lastModifyTime: Date.now()
            }},function(err,docs){
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

    app.get('/Res/getResByMe',checkLogin);
    app.get('/Res/getResByMe',function(req, res){
        var phone = req.session.user.phone;
        ResEntity.find({op: phone},function(err,docs){
            if (err) {
                return res.send({
                    'resultCode': '000044',
                    'resultMsg': '数据库操作失败',
                    'result': {}
                })
            }
            var result = [];
            var _Type = ['','html5','android','ios','ui','java'];
            var infoCount = {
                'html5': 0,
                'android': 0,
                'ios': 0,
                'ui': 0,
                'java': 0
            };
            for(var i=0;i<docs.length;i++){
                var _doc = docs[i].toObject();
                var _type = _Type[ _doc.ct ];
                infoCount[ _type ]++;
                result.push( _doc );
            }
            return res.send({
                'resultCode': '000000',
                'resultMsg': 'success',
                'result': {
                    list: result,
                    count: infoCount
                }
            })
        });
    });
    function checkLogin(req, res, next) {
        if (!req.session.user) {
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
