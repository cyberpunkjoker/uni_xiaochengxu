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

				<messBox tipMess="输入本次任务到达延迟原因(选填)" @getMess="getMessage"></messBox>
				<messBox tipMess="输入本次任务卸货延迟原因(选填)" @getMess="getMessage2"></messBox>

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
				message2: '',
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
				this.message =data;
			},
			
			getMessage2(data) {
				this.message2 = data;
			},
			
			imgPath(data) {
				console.log(data)
				this.imgPathList = data;
			},
			
			async submitMessage() {
				const opts = {
					url: "/personal/driver/modReceiptImg",
					method: "post"
				}
				const param = {
					id: Number(this.id),
					imgs: this.imgPathList,
					arriveLateReason: this.message,
					disburdenLateReason: this.message2
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
		
		
		onLoad(options) {
			this.id = options.id
			this.getLocation();
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
			margin-top: 100px;
			padding-bottom: 50px;
		}
  }

	
</style>
