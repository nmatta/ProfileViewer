  
module.exports.manageSession = function () {
	return function sessionManage(req, res, next){
		// console.log("=======I AM CALLED\n\n\n");
       	// req.session.user = 'Naveen Kumar Matta';

       	if (req.session.user) {
       		next();
       	} else {
       		if (req.path !== '/signin') {
       			res.redirect("/signin");
       		} else {
       			next();
       		}
       	}
    }
}

