(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"088c":function(t,e,n){"use strict";n.r(e);var o=n("8374"),u=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=u.a},"26dd":function(t,e,n){"use strict";var o,u=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return u}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return o})},"6e96":function(t,e,n){"use strict";(function(t){n("b05c"),n("921b");o(n("66fd"));var e=o(n("c536"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},8374:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("a34a"));n("132a");function u(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,o,u,a,s){try{var r=t[a](s),c=r.value}catch(i){return void n(i)}r.done?e(c):Promise.resolve(c).then(o,u)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(o,u){var s=t.apply(e,n);function r(t){a(s,o,u,r,c,"next",t)}function c(t){a(s,o,u,r,c,"throw",t)}r(void 0)})}}var r={data:function(){return{userPhone:"",code:"",isture:"disabled",status:!1,btnStatus:!0,count:60,statusCode:{DRIVER:"2",MASTER:"1",CONSIGNEE:"3"}}},methods:{isTruePhoneNum:function(t){return/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(t)},toStatusPage:function(){var e=s(o.default.mark(function e(){var n,u,a,s,r;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t.showLoading({}),!this.status){e.next=15;break}return{userPhone:this.userPhone,code:this.code},n=t.getStorageSync("USER_OPENCODE"),u=t.getStorageSync("USER_STATUS"),a={url:"/sc/user/login",method:"post"},s={phone:this.userPhone,code:this.code,openId:n,identityEnum:u},console.log(s),e.next=10,this.$http.httpRequest(a,s);case 10:r=e.sent,console.log(r),t.setStorage({key:"USER_TOKEN",data:r.data.result}),1===r.data.code&&setTimeout(function(){t.hideLoading(),t.showModal({content:r.data.desc})},700),0===r.data.code&&(t.hideLoading({}),"CONSIGNEE"===u?t.reLaunch({url:"/pages/user/user"}):t.reLaunch({url:"/pages/home/home"}));case 15:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),clearText:function(){this.userPhone=""},sendCode:function(){var e=s(o.default.mark(function e(){var n,u,a,s,r,c,i,d=this;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=this.isTruePhoneNum(this.userPhone),n){e.next=5;break}t.showModal({content:"请输入正确的手机号码"}),e.next=15;break;case 5:return u={url:"/sc/sms/send",method:"post"},a=t.getStorageSync("USER_STATUS"),s=this.statusCode[a],r={phone:this.userPhone,smsTypeEnum:"LOGIN_SMS",type:s},e.next=11,this.$http.httpRequest(u,r);case 11:c=e.sent,console.log(c),0!==c.data.code?(t.showToast({title:c.data.result,icon:"none"}),setTimeout(function(){t.navigateBack({delta:1})},1e3)):(this.count=60,this.btnStatus&&(this.btnStatus=!1,i=setInterval(function(){d.count=d.count-1,0===d.count&&(clearInterval(i),d.btnStatus=!0)},1e3))),setTimeout(function(){d.status=!0},2e3);case 15:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()},onLoad:function(){}};e.default=r}).call(this,n("543d")["default"])},"97a1":function(t,e,n){"use strict";var o=n("f648"),u=n.n(o);u.a},c536:function(t,e,n){"use strict";n.r(e);var o=n("26dd"),u=n("088c");for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);n("97a1");var s,r=n("f0c5"),c=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,"25c4bd95",null,!1,o["a"],s);e["default"]=c.exports},f648:function(t,e,n){}},[["6e96","common/runtime","common/vendor"]]]);