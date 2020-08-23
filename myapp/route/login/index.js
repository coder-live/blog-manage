const express = require('express');
const router = express.Router();

const User = require('../../model/user/user');

router.post('/', (req, res) => {

  // console.log('服务器响应')
  // console.log(req.body);
  
  const {user, pwd} = req.body;
  if( !user || !pwd ) {
    res.json({
      code: 2,
      msg: '请输入完整信息'
    });
    return 
  };
  
  User.findOne({user}, {__v: 0}).then( _user => {
    // console.log(_user)
    if(!_user) {
      res.json({
        code: 2,
        msg: '用户名不存在'
      }); 
    }else {//有此用户
      if(!_user.admin) {
        res.json({
          code: 2,
          msg: '权限不足'
        });
        return
      };
      if( _user.pwd !== pwd ) {
        // console.log(_user)
        res.json({
          code: 2,
          msg: '密码错误'
        }); 
        return
      };
      //存session中
      req.session.admin = _user.admin;
      //管理员登录
      res.json({
        code: 0,
        msg: '登录成功',
        data: {
          user: _user.user,
          photo: _user.photo,
          admin: _user.admin
        }
      });
      
    }
  } ).catch(err=> {
    console.log(err)
    res.json({
      code: 4,
      msg: '服务器错误'
    })
  });
  
})


module.exports = router