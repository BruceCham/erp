var mongodb = require('./db');

function Res(res) {
  /**
   * ct [classType 班级类型] require 
   * 1:html5 2:android 3:ios 4:ui 5:java 
   */
  this.ct = res.ct;
  /**
   * cn [className 班级名称] require
   * 1601 1602 
   */
  this.cn = res.cn;
  /**
   * cs [classSeat 座位] require 
   * A1 A2 B1 B2
   */
  this.cs = res.cs;
  /**
   * ctns classTypeNameSeat 1-1601
   */
  this.ctn = res.ctn;

  /**
   * ctns classTypeNameSeat 1-1601-A1
   */
  this.ctns = res.ctns;

  /**
   * cst [classStartTime 开班时间]
   * 毫秒
   */
  this.cst = res.cst;
  /**
   * cet [classEndTime 毕业时间]
   * 毫秒
   */
  this.cet = res.cet;
  /**
   * sn [studentName 学生名] require
   */
  this.sn = res.sn || '';
  /**
   * sp [studentPhone 学生手机号] require
   */
  this.sp = res.sp || '';
  /**
   * op [ownerPhone 咨询师手机号] require
   */
  this.op = res.op || '';
};

module.exports = Res;

//存储生源信息
Res.prototype.saveByCtns = function(obj,callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('res', function(err, collections) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //update
      collections.update({ctns: obj.ctns},{
        sn: obj.sn,
        sp: obj.sp,
        op: obj.op
      },false,true,function(err,res){
        mongodb.close();
          if (err) {
            return callback(err); //失败！返回 err 信息
          }
          return callback(null, res); //成功！返回查询的用户信息
        });
    });
  });
};

Res.getResByCtns = function(ctns,callback){
  mongodb.open(function(err,db){
    if(err){
      return callback(err);
    }
    db.collection('res',function(err,collections){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collections.find({ctns:ctns}).toArray(function(err,res){
        mongodb.close();
        if(err){
          return callback(err);
        }
        return callback(null, res);
      });
    })
  });
}

//读取当前账号的资源信息
Res.getAllByOp = function(op, callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('res', function(err, collections) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //查找用户手机号（phone键）值为 phone 一个文档
      collections.find({
        op: op
      }).toArray(function(err, resList) {
        mongodb.close();
        if (err) {
          return callback(err); //失败！返回 err 信息
        }
        return callback(null, resList); //成功！返回查询的用户信息
      });
    });
  });
};
//读取所有资源信息
Res.getAll = function(callback) {
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('res', function(err, collections) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //查找用户手机号（phone键）值为 phone 一个文档
      collections.find().toArray(function(err, resList) {
        mongodb.close();
        if (err) {
          return callback(err); //失败！返回 err 信息
        }
        return callback(null, resList); //成功
      });
    });
  });
};
Res.getAllByC = function(ctn,callback){
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('res', function(err, collections) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //查找用户手机号（phone键）值为 phone 一个文档
      collections.find({ctn:ctn}).toArray(function(err, resList) {
        mongodb.close();
        if (err) {
          return callback(err); //失败！返回 err 信息
        }
        return callback(null, resList); //成功
      });
    });
  });
}
//删除当前账号下的某一资源信息
Res.del = function(ct, cn, cs, callback) {
  var ctns = ct + '-' + cn + '-' + cs;
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('res', function(err, collections) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collections.update({
        ctns: ctns
      }, {
        sn: '',
        sp: '',
        op: ''
      }, function(err, resList) {
        mongodb.close();
        if (err) {
          return callback(err); //失败！返回 err 信息
        }
        return callback(null, resList); //成功！返回查询的用户信息
      })
    })
  });
}