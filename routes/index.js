const Router = require('koa-router');
const router = new Router();
const mySqliteDB = require('../sqlite/index')
const mySqliteCodes = require('../sqlite/codeInfo');
const myCodesController = require('../controller/codes');


router.get('/codes', async (ctx) => {
  let title = '首页',id="";
  await ctx.render('index', {
    title,id
  })
})

router.get('/codes/:id', async (ctx) => {
    let title = '首页'
    var id = ctx.params.id;
    await ctx.render('index', {
        id,
    })
})
router.get('/hello', async (ctx) => {
  let title = 'hello跳转页面'
    await ctx.render('hello', {
        title,
    })
})
router.get('/about', async (ctx) => {
  ctx.body = 'aboutPage'
})

//sqlite连接测试
mySqliteDB.authenticate().then(() => {
    console.log('successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
});
// 定义接口
router.post('/setCode', myCodesController.createNewInfo);
router.get('/getCode/:id', myCodesController.getCodeInfo);

module.exports = router;