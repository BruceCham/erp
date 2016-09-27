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
   * ctns classTypeNameSeat 1-1601-A1
   */
  this.ctns = res.ct + '-' + res.cn + '-' + res.cs;
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
Res.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var me = this;
  var res = new Res(me);
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
      //将用户数据插入 users 集合
      collections.insert(res, {
        safe: true
      }, function(err, resList) {
        mongodb.close();
        if (err) {
          return callback(err); //错误，返回 err 信息
        }
        callback(null, resList[0]); //成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

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
        callback(null, resList); //成功！返回查询的用户信息
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
        callback(null, resList); //成功
      });
    });
  });
};
Res.getAllByC = function(ctns,callback){
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
      collections.find({ctns:ctns}).toArray(function(err, resList) {
        mongodb.close();
        if (err) {
          return callback(err); //失败！返回 err 信息
        }
        console.log(resList);
        console.log('errModel++++++++++++');
        callback(null, resList); //成功
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
        callback(null, resList); //成功！返回查询的用户信息
      })
    })
  });
}