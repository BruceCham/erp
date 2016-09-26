module.exports = function(app) {
    app.get('/YG/User', function(req, res) {
        var use = req.session.user;
        if (use) {
            res.render('home', {
                username: use.name
            });
        } else {
            res.render('login', {});
        }
    });
};
