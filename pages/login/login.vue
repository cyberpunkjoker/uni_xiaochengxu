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
						<button type="default" class="btn" @tap="sendCode"><text>发送验证码</text></button>
					</view>
				</view>

				<button form-type="submit" class="submitbtn" @click="toStatusPage">登录</button>
			</form>
		</view>
	</view>
</template>

<script>
	import { parseQueryString } from "../../utils/query.js"
	// import http from "../../utils/api.js"

	export default {
		data() {
			return {
				userPhone: "",
				code: ""
			}
		},

		methods: {
			// formSubmit(e) {
			// 	console.log(e)
			// 	const phone = e.detail.value.phone;
			// 	const code = e.detail.value.code;
			// 	console.log(phone)
			// 	if (phone.length !== 11 || code.length === 0) {
			// 		uni.showModal({
			// 			content: '请确认手机号和验证码是否输入正确',
			// 			showCancel: false
			// 		});
			// 	}
			// },
			
			isTruePhoneNum(str) {
				return /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/ .test(str);
			},

			// 页面跳转表单验证部分
			toStatusPage() {
				const params = {
					userPhone: this.userPhone,
					code: this.code
				}
				const info = parseQueryString(params)

				this.userPhone.length === 11 && this.code.length !== 0 &&
					uni.navigateTo({
						url: '/pages/login/status' + info
					});
			},

			clearText() {
				this.userPhone = '';
			},

			async sendCode() {
				const isTure = this.isTruePhoneNum(this.userPhone);
				if(!isTure) {
					uni.showModal({
						content:"请输入正确的手机号码"
					})
				}
				
				const opts = {
					url: '/sc/sms/send',
					method: 'post'
				};
				let params = {
					phone: this.userPhone,
					smsTypeEnum: "LOGIN_SMS"
				};
				const res = await this.$http.httpRequest(opts, params);
				
				console.log(res);
			},
		},
		
		onLoad() {
			// this.shouquan();
		}

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
