<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>上传开始卸货图片</text>
				</view>
				<!-- 上传图片模块 -->
				<upload-mode
				@showPath="imgPath"
				></upload-mode>

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
				reminNum: 200,
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
				uni.showLoading({});
				
				if(this.longitude === null) {
					uni.hideLoading()
					this.reGetLocation();
					uni.showModal({
						content: "请开启定位服务"
					})
				} else {
					const opts = {
						url: "/personal/driver/modUnloadImg",
						method: "post"
					}
					const location = this.longitude+ "," + this.latitude;
					
					const param = {
						id: Number(this.id),
						imgs: this.imgPathList,
						// longitude: this.longitude,
						// latitude: this.latitude
						location: location
					}
					console.log(param)
					
					if(this.imgPathList.length !== 0) {
						const res = await this.$http.httpTokenRequest(opts, param);
						console.log(res);
						if (res.data.code === 0) {
							uni.hideLoading({});
							uni.navigateBack({
								delta: 1
							})
						}
					}else {
						setTimeout(() => {
							uni.hideLoading({});
							uni.showModal({
								content: "请至少上传一张图片"
							})
						},700)
					}
				}
			},
			
			reGetLocation() {
				uni.showToast({
					title: "正在重新获取定位请稍后..",
					icon: "none"
				})
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude)
						that.longitude = res.longitude;
						console.log('当前位置的纬度：' + res.latitude);
						that.latitude = res.latitude;
						uni.hideToast({});
					}
				})
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
		
		onLoad(options) {
			this.id = options.id
			this.getLocation()
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
			  font-size:16px;
			  font-weight:500;
			  color:rgba(51,51,51,1);
			  margin-bottom: 12px;
		  }
		  .tips {
			  font-size:12px;
			  font-weight:400;
			  color:rgba(153,153,153,1);
		  }
	  }
  
		.btn {
			margin-top: 140px;
		}
  }
	
</style>
