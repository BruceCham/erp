var mongoose = require('mongoose'), 
	settings = require('../settings'); 
mongoose.connect('mongodb://'
	+settings.host+':'
	+settings.port+'/'
	+settings.db);
exports.mongoose = mongoose;