/**
 * Module dependencies.
 */

var express  = require('express'),
    path     = require('path'),
    mongoose = require('mongoose'),
    hbs      = require('express-hbs'),
    config   = require('./config'),
    routes   = require('./routes');
var passport = require('passport');



mongoose.connect(config.database.url);
mongoose.connection.on('error', function (error) {
  console.log('mongodb connection error >>'+error);
});

var app = express();

hbs.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/**
 * Express configuration.
 */
app.set('port', config.server.port);
//app.engine('hbs', hbs.express3());
app.use("/public",express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.session({ secret: 'your secret code' }));
app.use(app.router);

app.use(function (req, res) {
  //res.status(404).render('404', {title: 'Not Found :('});
    res.send("Not found")
});

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}
app.get('/',function(req,res){
  res.render('index.ejs');
  //res.send(">>>>>>>")
})
routes(app);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
