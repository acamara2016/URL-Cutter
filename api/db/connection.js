const mongoose = require('mongoose')

// Create the connection
mongoose.connect('mongodb+srv://url_member:3cVwtPLUEbzMO46I@cluster0.nr8aa.mongodb.net/urls?retryWrites=true&w=majority', {
	useNewUrlParser: true
})
.catch((err) => {
	console.log(err)
})

// Store the connection
const db = mongoose.connection

module.exports = db