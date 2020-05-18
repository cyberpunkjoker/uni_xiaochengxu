<template>
	<view class="container">
		<view class="logo">
			<image class="imgbox" :mode="item.mode" src="../../static/img/LOGO@3x.png"></image>
			<text>四川顺程物流有限公司欢迎您</text>
		</view>

		<view class="formbox">
			<form @submit="formSubmit">
				<view class="phone">
					<image src="../../static/img/phone.png" mode=""></image>
					<text class="textcon">手机号</text>
					<view class="uni-form-item uni-column fatherbox">
						<input class="uni-input" name="phone" v-model="userPhone" placeholder="请输入您的手机号" />
						<image src="../../static/img/clear.png" @tap="clearText"></image>
					</view>
				</view>
				<!-- 下面验证码 -->
				<view class="code">
					<image src="../../static/img/code.png" mode=""></image>
					<text class="textcon">短信验证码</text>
					<view class="uni-form-item uni-column fatherbox">
						<input class="uni-input" name="code" v-model="code" placeholder="请输入收到的短信验证码" />
						<button type="default" v-if="btnStatus" class="btn" @tap="sendCode"><text>发送验证码</text></button>
						<button type="default" v-if="!btnStatus" disabled="disabled" class="btn"><text>{{count}}秒后再试</text></button>
					</view>
				</view>

				<button class="submitbtn" @click="toStatusPage">登录</button>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		parseQueryString
	} from "../../utils/query.js"

	export default {
		data() {
			return {
				userPhone: "",
				code: "",
				isture: "disabled",
				status: false,
				btnStatus: true,
				count: 60,
				statusCode: {
					"DRIVER": '2',
					"MASTER": '1',
					"CONSIGNEE": '3'
				}
			}
		},

		methods: {
			isTruePhoneNum(str) {
				return /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(str);
			},

			// 页面跳转表单验证部分
			async toStatusPage() {
				uni.showLoading({})
				if (this.status) {
					const params = {
						userPhone: this.userPhone,
						code: this.code
					}
					const openCode = uni.getStorageSync('USER_OPENCODE');

					const statusCode = uni.getStorageSync('USER_STATUS');

					const opts = {
						url: "/sc/user/login",
						method: "post"
					}
					const param = {
						phone: this.userPhone,
						code: this.code,
						openId: openCode,
						identityEnum: statusCode
					}

					console.log(param);

					const res = await this.$http.httpRequest(opts, param);
					console.log(res)

					uni.setStorage({
						key: "USER_TOKEN",
						data: res.data.result,
					})

					if (res.data.code === 1) {
						setTimeout(() => {
							uni.hideLoading();
							uni.showModal({
								content: res.data.desc
							})
						}, 700)
					}
					if (res.data.code === 0) {
						uni.hideLoading({})
						if (statusCode === "CONSIGNEE") {
							uni.reLaunch({
								url: '/pages/user/user'
							})
						} else {
							uni.reLaunch({
								url: '/pages/home/home'
							})
						}
					}


				}
				// else{
				// 	uni.showToast({
				// 		title: "请填写内容",
				// 		icon: "none"
				// 	})
				// }
			},

			clearText() {
				this.userPhone = '';
			},

			async sendCode() {
				const isTure = this.isTruePhoneNum(this.userPhone);

				if (!isTure) {
					uni.showModal({
						content: "请输入正确的手机号码"
					})
				} else {

					const opts = {
						url: '/sc/sms/send',
						method: 'post'
					};

					const man = uni.getStorageSync("USER_STATUS")
					const type = this.statusCode[man];

					let params = {
						phone: this.userPhone,
						smsTypeEnum: "LOGIN_SMS",
						type: type
					};

					const res = await this.$http.httpRequest(opts, params);
					console.log(res);

					// 判断身份类型是否短信倒计时
					if (res.data.code !== 0) {
						uni.showToast({
							title: res.data.result,
							icon: "none"
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
					} else {
						this.count = 60;
						if (this.btnStatus) {
							this.btnStatus = false;
							let timer = setInterval(() => {
								this.count = this.count - 1;
								if (this.count === 0) {
									clearInterval(timer);
									this.btnStatus = true;
								}
							}, 1000);

						}
					}
					// uni.showLoading({})
					setTimeout(() => {
						// uni.hideLoading({});
						this.status = true
					}, 2000)
					// this.code = res.data.result;
				}
			},
		},

		onLoad() {}

	}
</script>

<style lang="less" scoped>
	.container {
		.logo {
			text-align: center;
			font-size: 14px;
			color: #333;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 20px;
			margin-bottom: 49px;

			.imgbox {
				display: block;
				width: 102px;
				height: 102px;
				background-color: #FFF;
				margin: 24px auto 0;
			}
		}

		.formbox {
			margin-bottom: 165px;

			.fatherbox {
				position: relative;
				padding: 0 32px;
				margin: 16px 0;

				image {
					position: absolute;
					right: 32px;
					top: 10px;
					width: 20px;
					height: 20px;
					z-index: 2;
				}
			}

			image {
				vertical-align: bottom;
				width: 20px;
				height: 23px;
				margin-left: 42px;
				margin-right: 12px;
			}

			input {
				box-sizing: border-box;
				height: 40px;
				padding: 0 16px;
				font-size: 14px;
				font-weight: 400;
				background-color: #F6F6F4;
				color: #999999;
				border-radius: 4px;
			}

			.textcon {
				font-size: 14px;
				font-weight: 400;
			}

			.code {
				.fatherbox {
					display: flex;

					input {
						flex: 2;
						margin-right: 16px;
					}

					.btn {
						flex: 1;
						margin: 0px;
						padding: 0px;
						height: 40px;
						background: rgba(255, 203, 41, 1);
						box-shadow: 0px 4px 20px 4px rgba(255, 203, 41, 0.2);
						border-radius: 4px;
						line-height: 40px;

						text {
							font-size: 14px;
							font-weight: 500;
							color: rgba(54, 43, 9, 1);
						}
					}
				}
			}
		}

		.submitbtn {
			margin-top: 165px;
			font-size: 16px;
			width: 295px;
			height: 48px;
			background: rgba(255, 203, 41, 1);
			box-shadow: 0px 4px 20px 4px rgba(255, 203, 41, 0.2);
			border-radius: 7px;
			line-height: 48px;
		}
	}
</style>
