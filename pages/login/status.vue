<template>
	<view>
		<view class="status">
			<text class="login">登录</text>
			<text class="selected">请选择您的登录身份</text>

			<!-- 三个身份部分 -->
			<view :class="idx===current ? 'state bg' : 'state'" v-for="(item, idx) in statusList" :key="item" @tap="getIdx(idx)">
				<image :src="item" mode=""></image>
				<text>{{contentList[idx]}}</text>
			</view>

			<!-- 提交按钮部分 -->
			<button class="submitbtn" @tap="toChoosePage">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusList: [
					"../../static/img/laosiji.png",
					"../../static/img/chezhu.png",
					"../../static/img/shuoshuo.png"

				],
				contentList: [
					"我是司机",
					"我是车主",
					"我是收货人"
				],
				statusCode: [
					"DRIVER",
					"MASTER",
					"CONSIGNEE"
				],
				current: 0,
				// 获得到首页的传参
				info: null,
			}
		},

		methods: {
			getIdx(i) {
				this.current = i
			},
			// 提交数据并跳转
			async toChoosePage() {
				const openCode = uni.getStorageSync('USER_OPENCODE')

				console.log(openCode)

				const opts = {
					url: "/sc/user/login",
					method: "post"
				}
				const param = {
					phone: this.info.userPhone,
					code: this.info.code,
					openId: openCode,
					identityEnum: this.statusCode[this.current]
				}
				const res = await this.$http.httpRequest(opts, param);
				console.log(res)
				// 保存token到本地
				uni.setStorage({
					key: "USER_TOKEN",
					data: res.data.result,
				})

				// 在页面跳转之前将数据存入本地
				uni.setStorage({
					key: 'USER_STATUS',
					data: this.statusCode[this.current],
				})

				uni.setStorage({
					key: "USER_PHONE",
					data: this.info.userPhone,
				})

				if (res.data.code === 0) {
					if (this.statusCode[this.current] === "CONSIGNEE") {
						uni.reLaunch({
							url: '/pages/user/user'
						})
					} else {
						uni.reLaunch({
							url: '/pages/home/home'
						})
						this.shouquan();
					}
				}
			},

			// 获取提示信息
			shouquan() {
				const tmplIds = 'P0yJj1sqB8oNODpPd5TpUA9I-qMCM-tih783bIpLZLQ'
				wx.requestSubscribeMessage({
					tmplIds: ["P0yJj1sqB8oNODpPd5TpUA9I-qMCM-tih783bIpLZLQ"],
					subscription_type: 'permanent',
					success(res) {
						console.log("成功", res)
					},
					fail(res) {
						console.log("失败", res)
					}
				})
			},

			// 获取小程序openid
			getOpenId() {
				uni.login({
					success: function(res) {
						console.log(res.code)
						uni.setStorage({
							key: "USER_OPENCODE",
							data: res.code,
						})

					}
				})


				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});


			}

		},

		onLoad(options) {
			//options可以接到index 传过来的值
			this.info = options
			this.getOpenId();
		},
	}
</script>


<style lang="less" scoped>
	.status {
		padding: 0 40px;
		margin-top: 72px;

		.bg {
			background: url("../../static/img/bgc.png") no-repeat;
			background-size: 100% 100%;
		}

		.login {
			display: block;
			font-size: 24px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 33px;
		}

		.selected {
			margin-top: 4px;
			font-size: 14px;
			font-weight: 400;
			color: rgba(199, 199, 199, 1);
			line-height: 20px;
		}

		.state {
			background-color: #F6F6F4;
			height: 96px;
			margin-top: 32px;

			image {
				float: left;
				margin: 9px 16px;
				width: 72px;
				height: 78px;
			}

			text {
				margin-left: 34px;
				font-size: 16px;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 96px;
			}
		}
	}


	.submitbtn {
		margin: 40px 0 0 0;
		font-size: 16px;
		height: 48px;
		background: rgba(255, 203, 41, 1);
		box-shadow: 0px 4px 20px 4px rgba(255, 203, 41, 0.2);
		border-radius: 7px;
		line-height: 48px;
	}
</style>
