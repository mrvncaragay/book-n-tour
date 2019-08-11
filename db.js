const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false); //remove the deprecated warning
mongoose.set('useCreateIndex', true); //index deprecated warning
mongoose.set('useNewUrlParser', true); //URL deprecated warning

mongoose
  .connect(process.env.LOCALDB)
  .then(() => console.log('DB successfully connected...'))
  .catch(err => console.log('Connect connect to DB...', err));

module.exports = mongoose;
