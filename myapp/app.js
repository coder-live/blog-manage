var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const routes = require('./route');

var app = express();

//mogoose连接
mongoose.connect( `mongodb://localhost:27017/blog`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => { console.log('连接成功') } )
  .catch( err => { console.log('连接失败') } );

  //配置session
app.use(session({
  secret: 'xiaoyi',
  cookie: {maxAge:10*60*1000},
  rolling: true,
  resave: false,
  saveUninitialized: false,
  //将session储存到数据库中
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog'
  })
}))

//后端配置可跨域
app.use((req,res,next) => {
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    'Content-Type': 'application/json; charset= utf-8'
  });
  //请求方法为option 时,需要传个200,才能执行下一步
  if(req.method === 'OPTIONS') {
    res.sendStatus(200);
  }else{
    next();
  }
})

app.use(function(req,res,next) {
  if(/\/login/.test(req.url)) {
    next();
  }else if(req.session.admin) {
    next();
  }else {
    res.redirect('/');
  }
  
})

app.use(logger('dev'));
//配置bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置路由
app.use('/', routes);


module.exports = app;
