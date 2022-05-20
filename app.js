var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const socketio = require('socket.io');
var passport = require('passport')
require('./db.js')
const TextMessage = require('./model/textMessageModel')

var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
GOOGLE_CLIENT_ID = '186997672677-psrq723tc53rvgsdh8ki7mtfv2ll8pqh.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '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'


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const req = require('express/lib/request');

var app = express();
const PORT = process.env.PORT || 8085
app.use(session({
  secret: 'cats',
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user,done){
  done(null,user)
})
passport.deserializeUser(function (user,done) { 
  done(null,user)
 })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `https://chatapp-519h0247.herokuapp.com/auth/google/callback`,
  //callbackURL: `http://localhost:${PORT}/auth/google/callback`,
  passReqToCallback: true
},
function(request,accessToken, refreshToken, profile,cb) {
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  //console.log("profile ne")
  //console.log(profile)
  return cb(null,profile);
}
));




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});



app.use('/', indexRouter);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('error')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const httpServer =  app.listen(PORT, ()=> console.log('http:\\localhost:'+PORT))
const io = socketio(httpServer)

io.on('connection',client=>{
  console.log(`Client ${client.id} connected`)

  client.free = true;
  client.loginAt = new Date().toLocaleTimeString()


  let users = Array.from(io.sockets.sockets.values())
    .map(socket => ({id: socket.id,username: socket.username,email: socket.email,free: client.free,loginAt: client.loginAt}))
  console.log(users)


  client.on('disconnect',()=> {
    console.log(`${client.id} has disconnect.`)
    client.broadcast.emit('user-leave',client.id)
  })

  client.on('register-name',(username,email)=>{
    client.username = username
    client.email = email

    
    client.broadcast.emit('register-name',{id: client.id,username: client.username,email: client.email,free: client.free,loginAt: client.loginAt})
  })


  // send user list
  client.emit('list-users',users)
  console.log("user list")
  console.log(users)

  // send chat list
  // let sample = new TextMessage({content: 'test message',sender: 'ductrong@gmail.com',receiver: 'abc',
  // createdAt: new Date().toLocaleTimeString()}).save();
  
  client.on('request-messages',(sender,receiver)=>{
    console.log("r-sender")
    console.log(sender)
    console.log("r-receiver")
    console.log(receiver)

    let chats = TextMessage.find({sender: {$in :[sender,receiver]},receiver: {$in :[sender,receiver]}}).limit(50).sort({createdAt: 1})
    .then(messages=>{
      console.log("request message")
      client.emit('list-messages',messages)
      })
  })

  client.on('typing',(receiver_id)=>{
    console.log("receiver")
    console.log(receiver_id)

    io.to(receiver_id).emit('typing')
  })


  client.on('send-message',(mess)=>{
    console.log("Mess in server")

    // store to mongoDB
    if(mess.type=="file"){
      if( mess.receiver_email != null && mess.receiver_email != "")
        {
          TextMessage({content: mess.message,sender: mess.sender_email,receiver: mess.receiver_email,
            createdAt: new Date().toLocaleTimeString(),type: "file",file: mess.file}).save();
      
            io.to(mess.receiver_id).emit('send-message',{message: mess.message,sender: mess.sender_email,
              createdAt: new Date().toLocaleTimeString(),type: "file",file: mess.file})
        }
    }
    else{
      if( mess.receiver_email != null && mess.receiver_email != "")
        {
          TextMessage({content: mess.message,sender: mess.sender_email,receiver: mess.receiver_email,
            createdAt: new Date().toLocaleTimeString()}).save();
      
      
            io.to(mess.receiver_id).emit('send-message',{message: mess.message,sender: mess.sender_email,
              createdAt: new Date().toLocaleTimeString(),type: "text"})
        }
    }
  })


  client.broadcast.emit('new-user',{id: client.id, username: client.username,free: client.free,loginAt: client.loginAt})
})


module.exports = app;
