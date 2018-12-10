module.exports = (app) =>{
    const user = require('../controllers/user.controller.js');
    app.post('/signup', user.register);
}