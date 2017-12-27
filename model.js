//引入mongoose组件
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//连接组件，选择数据库
var db = mongoose.createConnection('mongodb://localhost:27017/ceshi');

var ContentSchema = new Schema({
  // _id: {
  //   type: Number,
  // },
  title: {
    type: String,
    default: '未命名博客'
  },
  href: {
    type: String,
    default: '博主很懒，还没有添加任何描述……'
  }
});

module.exports = db.model('Content', ContentSchema);