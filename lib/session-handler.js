  
module.exports.manageSession = function () {
	return function sessionManage(req, res, next){
       	if (req.session.user) {
       		next();
       	} else {
       		if (req.path !== '/signin') {
       			res.redirect('/signin');
       		} else {
       			next();
       		}
       	}
    }
}

