// 引入依赖
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
// var Content = require('./model.js');

// 建立 express 实例
var app = express();

app.get('/', function(req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end(function(err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function(idx, element) {
        var $element = $(element);
        items.push({
          // _id: idx + '',
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      // Content.create(items, function(err, docs) {
      //     if (err) {
      //       // TODO: handle error
      //     } else {
      //       console.info('%d potatoes were successfully stored.', docs.length);
      //     }
      //   })
      // Content.create(items,
      //   function(err, user) {
      //     if (err) return next(err); // 交给接下来的错误处理中间件
      //     res.status(201).end('注册成功'); // 存储成功
      //   });
      res.send(items);
    });
});

// app.listen(3000, function(req, res) {
//   console.log('app is running at port 3000');
// });
app.listen(process.env.PORT || 5000);