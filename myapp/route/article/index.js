const express = require('express');
const router = express.Router();

const Article = require('../../model/article/article');


// router.get('/', (req, res)=> {
//   res.send('测试')
// })

router.get('/getArticle', (req, res) => {
  Article.find({}, {surface: 0, __v: 0,}).then(data => {
    res.json({
      code: 0,
      msg: '请求成功',
      data
    });
  }).catch(()=>{
    res.json({
      code: 4,
      msg: '服务器错误',
      data: []
    });
  })
})

//增加文章 以及 修改文章(共用一个借口)
router.post('/addArticle', (req, res) => {
  // console.log(req.body)
  let {type, title, tag, content, _id} = req.body;
  let imgUrl = req.body.imgUrl ? req.body.imgUrl : 'http://localhost:5002/image/defaultImg.jpg';
  // console.log(_id)
  //判断是否有该篇文章
  Article.findById(_id).then((data) => {
    if(data) {//有文章=>修改
      Article.findOneAndUpdate({_id}, {type, title, tag, content, surface: imgUrl})
      .then(()=>{
        res.json({
          code: 0,
          msg: '修改文章成功'
        });
        return
      }).catch(()=>{});
    }else {
      // 无此篇文章 =》 创建
      Article.create({
        type,
        title,
        tag,
        content,
        surface: imgUrl
      }).then(data => {
        res.json({
          code: 0,
          msg: '添加成功'
        })
      }).catch(()=>{})
    };
  }).catch((err) => {
    console.log(err)
    res.json({
      code: 4,
      msg: '服务器错误, 请稍后再试'
    })
  });
});

//删除文章
router.post('/removeArticle', (req, res) => {
  let {_id} = req.body;
  Article.findByIdAndDelete(_id).then(() => {
    res.json({
      code: 0,
      msg: '删除文章成功'
    })
  }).catch(()=>{
    res.json({
      code: 4,
      msg: '服务器错误'
    })
  })
})

module.exports = router