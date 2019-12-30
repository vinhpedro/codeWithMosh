function authentication(req, res, next) {
    console.log('Authetincating...');
    next();
}

module.exports = authentication;