// module.exports = (app) => {
//     const notes = require('../controllers/note.controller.js');
//     const user =  require('../controllers/user.controller.js');

//     app.post('/notes', notes.create);

//     app.get('/notes', notes.findAll).;

//     app.get('/notes/:noteId', notes.findOne);

//     app.put('/notes/:noteId', notes.update);

//     app.delete('/notes/:noteId', notes.delete);  


// }


module.exports = function(app) {
	const notes = require('../controllers/note.controller.js');
    const userHandlers =  require('../controllers/user.controller.js');

	// todoList Routes
	app.route('/notes')
		.get(userHandlers.loginRequired, notes.findAll)
		.post(userHandlers.loginRequired, notes.create);

	app.route('/notes/:noteId')
		.get(notes.findOne)
		.put(notes.update)
		.delete(notes.delete);

	app.route('/auth/register')
		.post(userHandlers.register);

	app.route('/auth/sign_in')
		.post(userHandlers.sign_in);
};