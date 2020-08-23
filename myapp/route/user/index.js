const express = require('express');
const router = express.Router();

const User = require('../../model/user/user');
//可以请求到用户存的session值
const Session = require('../../model/session/session');

router.get('/getUser', (req, res) => {
  User.find({}, {pwd: 0, __v: 0, photo: 0}).then(data => {
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



router.post('/postUser', (req, res) => {
  // // console.log(req.body._id)
  // Session.updateOne({session: new RegExp(req.body._id)}).then(data => {
  //   console.log(data)
  // }).catch(err=>{console.log(err)})

  // return
  let {user, admin, disabled} = req.body;

  User.updateOne({user}, {admin, disabled}).then(data => {
    res.json({
      code: 0,
      msg: '修改成功',
    })
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误, 修改失败',
    })
  });
  
});

//删除用户
router.post('/deleteUser', (req, res) => {
  let {_id} = req.body;
  User.findOneAndDelete(_id).then(() => {
    res.json({
      code: 0,
      msg: '删除用户成功',
    })
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误, 删除失败'
    })
  })
})

module.exports = router