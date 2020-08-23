const express = require('express');
const router = express.Router();

const Comment = require('../../model/comment/comment');
const Article = require('../../model/article/article');

router.get('/getComment', (req, res) => {
  Comment.find({}, { __v: 0})
  .populate('user', {user: 1})
  .populate('children.user', {user: 1})
  .then(data => {
    res.json({
      code: 0,
      msg: '请求成功',
      data
    })
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误',
      data: []
    })
  });
});

//删除评论
router.post('/removeComment', (req, res) => {
  let {_id, artTit} = req.body;
  Comment.deleteOne({_id}).then(() => {
    console.log(artTit)
    Article.findOneAndUpdate({title: artTit}, {$inc: {comment: -1}})
    .then(()=>{}).catch(()=>{});
    res.json({
      code: 0,
      msg: '删除评论成功'
    });
  }).catch((err) => {
    console.log(err)
    res.json({
      code: 4,
      msg: '服务器错误,删除评论失败'
    });
  });
});
//删除子评论
router.post('/removeChildComment', (req, res) => {
  // console.log(req.body);
  
  let {p_id, s_id} = req.body;
  Comment.findById(p_id).then(data => {
    if(data) {
      // console.log(data)
      Comment.updateOne({_id: p_id}, {$pull: {children: {_id: s_id}}})
      .then((data) => {
        // console.log(data)
        res.json({
          code: 0,
          msg: '删除子评论成功'
        });
      }).catch(() => {});
    }else {
      res.json({
        code: 1,
        msg: '删除失败,回复此条的评论不存在'
      });
    }
  }).catch((err) => {
    // console.log(err)
    res.json({
      code: 4,
      msg: '服务器错误,删除评论失败'
    });
  });

});

module.exports = router