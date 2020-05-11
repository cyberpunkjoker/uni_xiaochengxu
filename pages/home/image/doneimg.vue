<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>上传开始卸货图片</text>
				</view>
				<!-- 上传图片模块 -->
				<upload-mode @showPath="imgPath"></upload-mode>

				<text class="tips">最多可上传三张</text>

				<messBox tipMess="备注(选填)" @getMess="getMessage"></messBox>

			</view>
		</info-box>

		<view class="btn">
			<btn @tap="submitMessage">提交</btn>
		</view>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"
	import messBox from '../../components/message.vue'
	import uploadMode from '../../components/uploadMode.vue'

	export default {
		data() {
			return {
				// 留言模块接收值
				message: '',
				// 上传图片模块
				imgPathList: [],
				// 获取运单id值
				id: 0,
				longitude: null,
				latitude: null
			}
		},

		methods: {
			getMessage(data) {
				console.log(data)
			},

			imgPath(data) {
				this.imgPathList = data
				console.log(data)
			},

			async submitMessage() {
				const opts = {
					url: "/personal/driver/modArriveImg",
					method: "post"
				}
				const param = {
					id: Number(this.id),
					imgs: this.imgPathList,
					longitude: this.longitude,
					latitude: this.latitude
				}
				console.log(param)
				
				if(this.imgPathList.length !== 0) {
					const res = await this.$http.httpTokenRequest(opts, param);
					console.log(res);
					res.data.code === 0 &&
						uni.navigateBack({
							delta: 1
						})
				}else {
					uni.showModal({
						content: "请至少上传一张图片"
					})
				}
				
				
			},

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

		onShow() {
			this.getLocation()
		},

		onLoad(options) {
			this.id = options.id
		},
		components: {
			infoBox,
			btn,
			messBox,
			uploadMode
		}


	}
</script>

<style lang="less" scoped>
	.outer {
		margin-top: 12px;

		.inner {
			margin: 12px 16px 0;

			.title {
				font-size: 16px;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 12px;
			}

			.tips {
				font-size: 12px;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		.btn {
			margin-top: 140px;
		}
	}
</style>
