const Koa = require('koa');
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
var koaBody = require('koa-body');
const sequelize = require('sequelize');
const mySqliteDB = require('./sqlite/index')
const mySqliteUtil = require('./sqlite/codeInfo')
const router = require('./routes/index')
const app = new Koa()

app.use(static(__dirname,'./static/css'))
var bodyParser = require('koa-bodyparser');
app.use(bodyParser({
    formLimit: '10000kb'
}))

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
// mySqliteUtil.createTable();
// (async () => {
//   console.log('createTable');
//   await mySqliteUtil.createTable();
//   console.log('create');
//   await  mySqliteUtil.createCodeInfo("router.get('/getCode/:id', myCodesController.getCodeInfo);");
// })();

app.use(router.routes(), router.allowedMethods())
app.listen(3000)

