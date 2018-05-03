
Page({
  data: {
    listData: [
      { "code": "上午", "text": "大兴", },
      { "code": "下午", "text": "本部", }
    ]
  },
  onLoad: function () {
    console.log('onLoad');
      console.log("iv");
      wx.login({//login流程
        success: function (res) {//登录成功
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({//getUserInfo流程
              success: function (res2) {//获取userinfo成功
                console.log(res2);
                var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
                var iv = res2.iv;
                //请求自己的服务器
                var signature =res2.signature ;
                var rawData = res2.rawData;
                wx.request({
                  url: "https://ssl.goduoduo.wang/order.php/login/checkLogin",
                  data: {
                    code: code,
                    encryptedData: res2.encryptedData,
                    signature: signature,
                    rawData: rawData,
                    iv: iv
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (res) {
                    // success
                    wx.hideToast();
                    console.log('服务器返回' + res.data);

                  },
                  fail: function () {
                    // fail
                    // wx.hideToast();
                  },
                  complete: function () {
                    // complete
                  }
                })
     // Login(code, encryptedData, signature, rawData,iv);
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    
  },
  Login: function (code, encryptedData, signature, rawData ,iv){  console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
        //创建一个dialog
        wx.showToast({
          title: '正在登录...',
          icon: 'loading',
          duration: 10000
        });
        //请求服务器
        wx.request({
          url: "https://ssl.goduoduo.wang/order/login/checkLogin",
          data: {
            code: code,
            encryptedData: encryptedData,
            signature: signature,
            rawData: rawData ,
            iv: iv
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: function (res) {
            // success
            wx.hideToast();
            console.log('服务器返回' + res.data);

          },
          fail: function () {
            // fail
            // wx.hideToast();
          },
          complete: function () {
            // complete
          }
        })
     
     
      }

    



 
})