var base = require('./Base');
var ObjectId = base.ObjectId;
var ResScheme = new base.Schema({
    lastModifyTime: Date, //最后修改时间
    //['','html5','android','ios','ui','java']
    ct: String,
    cn: String,
    cs: String,
    ctn: String,
    ctns: String,
    cst: Date,
    cet: Date,
    sn: String,
    sp: String,
    op: String
});
ResScheme.index({ ctns: 1,op: 1 }, { "background": true }); //设置索引  
var ResEntity = base.mongoose.model('ResEntity', ResScheme, 'res'); //指定在数据库中的collection名称为user  
exports.ResEntity = ResEntity; //导出实体
