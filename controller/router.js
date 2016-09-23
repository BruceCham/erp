module.exports = function(app) {
	app.get('/*', function(req, res) {
		if (!req.session.user) {
			res.redirect('/static/app/index.html#/login');
		}else{
			res.redirect('/static/app/index.html#/home');
		}
	    // res.sendfile("./public/static/app/index.html");
	 });
};