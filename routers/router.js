var routerModels = {
	router : require('../controller/router'),
	user: require('../controller/user'),
	res: require('../controller/res')
};
module.exports = function (app){
	for (var module in routerModels) {
		try {
			routerModels[module]( app );
		} catch (e) {
			console.log("router加载子模块初始化有误：" + module);
		}
	}
}