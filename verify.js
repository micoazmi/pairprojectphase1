class verify {
    static isLogin(req, res, next) {
        // Exclude delete route from login check
        if (req.session.loggedin === true || req.path.includes('/home/cart/delete')) {
            next();
            return;
        } else {
            req.session.destroy(function (err) {
                res.redirect('/login');
            });
        }
    }

    static isLogout(req, res, next) {
        if (req.session.loggedin !== true) {
            next();
            return;
        }
        res.redirect('/');
    }
}

module.exports = verify;
