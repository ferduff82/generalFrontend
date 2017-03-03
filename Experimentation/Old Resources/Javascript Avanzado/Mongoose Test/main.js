var User = require('./user/user');
  
var chris = new User({
  name: 'Chris',
  username: 'sevilayha',
  password: 'password' 
});

var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

chris.dudify(function(err, name) {
  if (err) throw err;

  console.log('Your new name is ' + name);
});

// create a new users
/*
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});

newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});
*/
// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});

// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;

  // object of the user
  console.log(user);
});