<template>
	<view>
		<view class="imgbgc">
			<image src="../../static/img/gzh.png" mode=""></image>
		</view>

		<view class="title">
			<text>便捷功能</text>
		</view>

		<info-box>
			<view class="inner">
				<view class="item">
					<view class="half" @tap="toApply">
						<image src="../../static/img/yundansq.png" mode=""></image>
						<view class="content">
							<text class="big">运单申请</text>
							<text>选择路线申请运单</text>
						</view>
					</view>

					<view class="half" @tap="toWeight">
						<image src="../../static/img/wuliao.png" mode=""></image>
						<view class="content">
							<text class="big">填写物料重量</text>
							<text>填写物料重量</text>
						</view>
					</view>
				</view>

				<view class="item">
					<view class="half" @tap="toDone">
						<image src="../../static/img/daka.png" mode=""></image>
						<view class="content">
							<text class="big">到货打卡</text>
							<text>上传卸货地点图片</text>
						</view>
					</view>

					<view class="half" @tap="toDownSign">
						<image src="../../static/img/xiehuo.png" mode=""></image>
						<view class="content">
							<text class="big">开始卸货打卡</text>
							<text>上传开始卸货照片</text>
						</view>
					</view>
				</view>

				<view class="item">
					<view class="half" @tap="toUpload">
						<image src="../../static/img/upload.png" mode=""></image>
						<view class="content">
							<text class="big">上传签收单</text>
							<text>上传签收单照片</text>
						</view>
					</view>

					<view class="half">
						<image src="../../static/img/more.png" mode=""></image>
						<view class="content">
							<text class="big">敬请期待</text>
							<text>更多精彩</text>
						</view>
					</view>
				</view>

			</view>
		</info-box>

	</view>
</template>

<script>
	import infoBox from "../components/boxstyle/infobox.vue"
	export default {
		data() {
			return {
				statusNum: 0,
				id: null,
				// orderNo: '4',
				orderStatus: '',
				// 获取经纬度
				longitude: '',
				latitude: ""
			}
		},

		methods: {
			// 页面跳转部分
			toApply() {
				this.getStatus()
				if (this.orderStatus !== '') {
					this.infoToShow()
				}
				this.orderStatus === '' &&
					uni.navigateTo({
						url: "/pages/home/weight/apply?id=" + this.id
					})
			},
			toWeight() {
				this.getStatus()
				if (this.orderStatus !== 1) {
					this.infoToShow()
				}
				this.orderStatus === 1 &&
					uni.navigateTo({
						url: "/pages/home/weight/weight?id=" + this.id
					})
			},
			toDone() {
				this.getStatus()
				if (this.orderStatus !== 2) {
					this.infoToShow()
				}
				this.orderStatus === 2 &&
					uni.navigateTo({
						url: "/pages/home/image/doneimg?id=" + this.id
					})
			},
			toDownSign() {
				this.getStatus()
				if (this.orderStatus !== 3) {
					this.infoToShow()
				}
				this.orderStatus === 3 &&
					uni.navigateTo({
						url: "/pages/home/image/upload?id=" + this.id
					})
			},
			toUpload() {
				this.getStatus()
				if (this.orderStatus !== 4) {
					this.infoToShow()
				}
				this.orderStatus === 4 &&
					uni.navigateTo({
						url: "/pages/home/image/signupload?id=" + this.id
					})
			},
			// 获取当前订单状态
			async getStatus() {
				const opts = {
					url: "/personal/driver/getOrderRecord",
					method: "post"
				}

				const res = await this.$http.httpTokenRequest(opts);
				console.log(res)

				if (res.data.code === 2) {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/login/status"
						})
					}, 800)

				}
				if (res.data.code === 1) {
					this.orderStatus = ''
				} else {
					this.orderStatus = res.data.result.orderStatus;
				}
				this.id = res.data.result.id;
			},

			// 提示内容
			infoToShow() {
				let content = '';
				if (this.orderStatus === "") content = "请填写运单申请页面";
				if (this.orderStatus === 1) content = "请填写物料重量页面";
				if (this.orderStatus === 2) content = "请填写到货打卡页面";
				if (this.orderStatus === 3) content = "请填写开始卸货打卡页面";
				if (this.orderStatus === 4) content = "请填写上传签收单页面";

				uni.showToast({
					title: content,
					icon: "none"
				})
			},

			// 获取当前的身份状态
			statusOfMan() {
				const status = uni.getStorageSync("USER_STATUS");
				console.log(status);
				if (status === "CONSIGNEE") {
					uni.reLaunch({
						url: "/pages/user/user"
					})
					uni.showToast({
						title: "请切换至其它身份",
						icon: "none"
					})
				}
			},
			// 上传身份信息
			async subUserInfo() {
				const info = this.longitude + "," + this.latitude;
				console.log(info);
				const opts = {
					url: "/personal/driver/addPoints",
					method: "post"
				}
				const params = {
					location: info
				}
				console.log(params)
				const res = await this.$http.httpTokenRequest(opts, params);
				console.log(res);

			},
			// 经纬度
			getLocation() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude)
						that.longitude = res.longitude;
						console.log('当前位置的纬度：' + res.latitude);
						that.latitude = res.latitude;
					}
				})
			}
		},

		components: {
			infoBox
		},

		onShow() {
			this.getStatus();
			this.getLocation();
		},

		onLoad() {
			this.statusOfMan();
			setTimeout(() => {
				this.subUserInfo();
				this.getStatus();
				this.subUserInfo();
			}, 500)
		},
	}
</script>

<style lang="less" scoped>
	.imgbgc {
		margin: 12px 16px 0;

		image {
			width: 100%;
			height: 125px;
		}
	}

	.title {
		padding: 18px 0 12px 0;
		margin-left: 16px;
		font-size: 14px;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.inner {
		.item {
			display: flex;
			// padding: 16px;
			height: 90px;
			border-bottom: 1px solid #F6F6F6;

			.half {
				padding-top: 16px;
				width: 50%;
				border-right: 1px solid #F6F6F6;

				image {
					float: left;
					width: 50px;
					height: 50px;
				}

				.content {
					display: flex;
					flex-direction: column;

					text {
						flex: 1;
						font-size: 12px;
						padding-top: 4px;
						margin-left: 4px;
						font-weight: 400;
						color: rgba(199, 199, 199, 1);
					}

					// 上面大的样式
					.big {
						font-size: 14px;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}
			}
		}
	}
</style>
