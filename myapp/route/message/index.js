const express = require('express');
const router = express.Router();

const Message = require('../../model/message/message');

router.get('/getMessage', (req, res) => {
  Message.find({}, { __v: 0})
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
  })
});

//删除留言
router.post('/removeMessage', (req, res) => {
  let {_id} = req.body;
  Message.remove({_id}).then(() => {
    res.json({
      code: 0,
      msg: '删除留言成功'
    });
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误,删除留言失败'
    });
  });
});
//删除子留言
router.post('/removeChildMessage', (req, res) => {
  // console.log(req.body);
  
  let {p_id, s_id} = req.body;
  Message.findById(p_id).then(data => {
    if(data) {
      // console.log(data)
      Message.updateOne({_id: p_id}, {$pull: {children: {_id: s_id}}})
      .then((data) => {
        // console.log(data)
        res.json({
          code: 0,
          msg: '删除子留言成功'
        });
      }).catch(() => {});
    }else {
      res.json({
        code: 1,
        msg: '删除失败,回复此条的留言不存在'
      });
    }
  }).catch((err) => {
    // console.log(err)
    res.json({
      code: 4,
      msg: '服务器错误,删除留言失败'
    });
  });

});



module.exports = router