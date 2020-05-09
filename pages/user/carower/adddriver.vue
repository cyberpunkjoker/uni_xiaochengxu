<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>司机信息填写</text>
				</view>

				<form @submit="formSubmit" @reset="formReset">
					<text class="textcon">姓名</text>
					<view class="uni-form-item uni-column fatherbox">
						<input class="uni-input" name="phone" v-model="name" placeholder="请输入姓名" />
					</view>

					<text class="textcon">手机号</text>
					<view class="uni-form-item uni-column fatherbox">
						<input v-model="phone" class="uni-input" name="phone" placeholder="请输入手机号码" />
						<image src="../../../static/img/clear.png" mode="" @tap="clearPhone"></image>
					</view>
				</form>
			</view>
		</info-box>

		<button form-type="submit" class="submitbtn" @click="submitInfo">提交</button>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import {
		parseQueryString
	} from "../../../utils/query.js"

	export default {
		data() {
			return {
				name: '',
				phone: '',
				id: ''
			}
		},

		methods: {
			clearPhone() {
				this.phone = '';
			},

			async submitInfo() {
				// 请求之前先判断一下
				if (this.name.length === 0 && this.phone.length !== 11) {
					uni.showModal({
						content: "请输入姓名和手机号"
					})
				}

				const params = {
					carId: Number(this.id),
					name: this.name,
					phone: this.phone
				}
				const info = parseQueryString(params);

				console.log(this.id)

				const opts = {
					url: "/sc/driverMng/bindDriver" + info,
					method: "post"
				}
				const res = await this.$http.httpTokenRequest(opts);
				console.log(res)
				
				if (res.data.code === 0) {
					uni.reLaunch({
						url: "/pages/home/home"
					})
				}


			},

			onLoad(options) {
				this.id = options.id
			},

			components: {
				infoBox
			}
		}

	}
</script>

<style lang="less" scoped>
	.outer {
		margin-top: 12px;

		.inner {
			padding: 12px 16px 25px;
		}
	}


	.title {
		font-size: 16px;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.textcon {
		display: block;
		padding: 20px 0 12px 0;
		font-size: 14px;
		font-weight: 400;
	}

	.fatherbox {
		position: relative;

		image {
			position: absolute;
			right: 18px;
			top: 10px;
			width: 20px;
			height: 20px;
			z-index: 2;
		}
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

	.submitbtn {
		margin-top: 100px;
		font-size: 16px;
		width: 295px;
		height: 48px;
		background: rgba(255, 203, 41, 1);
		box-shadow: 0px 4px 20px 4px rgba(255, 203, 41, 0.2);
		border-radius: 7px;
		line-height: 48px;
	}
</style>
