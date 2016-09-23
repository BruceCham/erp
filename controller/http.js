var mongodb = require('../models/db');
var testDatas = {
	'9527': {
		name: '周星驰',
		age: '24',
		desc: '人没有梦想，和咸鱼有什么分别呢？'
	},
	'0001':{
		familyname: 'zhangsan',
		age: '24',
		desc: 'askdfjas;lhflajs;ld'
	},
	"yinguit":{
		name: "银谷科技",
		code: "1601",
		desc: "银谷HTML5，1601班，前程似锦！！！"
	}
}
var imgObj = [
	{
		imgUrl: 'http://10.48.0.41:3000/static/app/images/1.jpg',
		alt: '第一张图片'
	},
	{
		imgUrl: 'http://10.48.0.41:3000/static/app/images/2.jpg',
		alt: '第二张图片'
	},
	{
		imgUrl: 'http://10.48.0.41:3000/static/app/images/3.jpg',
		alt: '第三张图片'
	},
	{
		imgUrl: 'http://10.48.0.41:3000/static/app/images/4.jpg',
		alt: '第四张图片'
	}];
module.exports = function(app) {
	app.get('/User/getUserInfoByGet', function(req, res) {
		console.log( req.query );
		var _id = req.query.id;
		var _name = req.query.name;
		if( _id == "1601" && _name == "yinguit" ){
			res.send( {
				resultCode: "000000",
				result: testDatas["yinguit"]
			} );
		}else{
			res.send({
				param: _id + "&" + _name,
				resultCode: "123456",
				resultMsg: "没有匹配到数据，请检查参数"
			});
		}
	});
	app.post('/User/getUserInfo', function(req, res) {
		var _id = req.body.id;
		_data = testDatas[_id];
		if (_data) {
			res.send( {
				resultCode: "000000",
				result: _data
			} );
		} else {
			res.send({
				param: _id,
				resultCode: "123456",
				resultMsg: "-----nodejs response info : data errors-----"
			});
		}
	});

	app.get('/User/getImgSlide',function (req, res){
		var _id = req.query.id;
		var _name = req.query.name;
		if( _id == "1601" && _name == "yinguit" ){
			res.jsonp({
				resultCode: "000000",
				result: imgObj
			});
			// res.send({
			// 	resultCode: "000000",
			// 	result: imgObj
			// });
		}else{
			res.send({
				resultCode: "123456",
				errMsg: "参数错误"
			});
		}
	});

	app.post('/User/getImgSlide',function (req, res){
		var _id = req.body.id;
		var _name = req.body.name;
		console.log(req);
		if( _id == "1601" && _name == "yinguit" ){
			res.send({
				resultCode: "000000",
				result: imgObj
			});
		}else{
			res.send({
				resultCode: "123456",
				errMsg: "参数错误"
			});
		}
	});

	// mongodb数据库处理
	app.post('/User/addUser',function(req, res){
		var _id = req.body.userid;
		var _name = req.body.username;
		mongodb.open(function(err, db) {
		    if (err) {
		      return ;
		    }
		    //读取 posts 集合
		    db.collection('yingu1601', function(err, collection) {
		      if (err) {
		        mongodb.close();
		        res.send({
					resultCode: "123456",
					result: null,
					resultMsg: "数据库打开失败"
				});
				return;
		      }
		      collection.find({userid: _id}).toArray(function(err, dbdata){
		        if (err) {
		      		mongodb.close();
		        	res.send({
						resultCode: "123456",
						result: null,
						resultMsg: "数据库读取失败"
					});
					return;
		        }
		        if( dbdata.length > 0 ){
		      		mongodb.close();
		        	res.send({
			      		resultCode: '123456',
			      		result: null,
			      		resultMsg: "当前用户id已存在"
			      	});
			      	return;
		        }else{
		        	//将文档插入 posts 集合
				      collection.insert({
				      	userid: _id,
				      	username: _name 
				      }, {
				        safe: true
				      }, function(err) {
				        mongodb.close();
				        if (err) {
				        	res.send({
								resultCode: "123456",
								result: null,
								resultMsg: "数据库入库失败"
							});
							return;
				        }
				        res.send({
							resultCode: "000000",
							result: null,
							resultMsg: "添加成功"
						});
						return;
				      });
		        }
		      });
		    });
		});
	});

	app.get('/User/getUserByUserId', function(req, res){
		var _id = req.query.userid;
		mongodb.open(function(err, db) {
		    if (err) {
		    	res.send({
		    		resultCode: "123456",
		    		result: null,
		    		resultMsg: "数据库打开失败"
		    	});
		      return ;
		    }
		    //读取 posts 集合
		    db.collection('yingu1601', function(err, collection) {
		      if (err) {
		        mongodb.close();
		        res.send({
					resultCode: "123456",
					result: null,
					resultMsg: "数据库查询失败"
				});
				return;
		      }
		      //根据参数id查找相应的数据，并返回数组结构
		      collection.find({userid: _id}).toArray(function(err, dbdata){
		      	mongodb.close();
		        if (err) {
		        	res.send({
		        		resultCode: "123456",
		        		result: null,
		        		resultMsg: "查询数据出错"
		        	});
		          	return;
		        }
		        res.send({
		        	resultCode: "000000",
		        	result: dbdata,
		        	resultMsg: "返回数据成功"
		        });
		        return;
		      });

		    });
		});

	})
};