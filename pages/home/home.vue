<template>
	<view>
		<view class="imgbgc">
			<image src="../../static/img/gzh.png" mode=""></image>
		</view>

		<view class="title">
			<text>便携功能</text>
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
					
					<view class="half" @tap="toSignUpload">
						<image src="../../static/img/xiehuo.png" mode=""></image>
						<view class="content">
							<text class="big">开始卸货打卡</text>
							<text>上传开始卸货照片</text>
						</view>
					</view>
				</view>
				
				<view class="item">
					<view class="half" @tap="toSignUpload">
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

			}
		},

		methods: {
			// 页面跳转部分
			toApply() {
				uni.navigateTo({
					url: "/pages/home/weight/apply"
				})
			},
			toWeight() {
				uni.navigateTo({
					url: "/pages/home/weight/weight"
				})
			},
			toSignUpload() {
				uni.navigateTo({
					url: "/pages/home/image/signupload"
				})
			},
			toUpload() {
				uni.navigateTo({
					url: "/pages/home/image/upload"
				})
			},
			toDone() {
				uni.navigateTo({
					url: "/pages/home/image/doneimg"
				})
			}
		},

		components: {
			infoBox
		}


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
				padding-top:16px;
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
						font-size:12px;
						padding-top: 4px;
						margin-left: 4px;
						font-weight:400;
						color:rgba(199,199,199,1);
					}
					// 上面大的样式
					.big {
						font-size:14px;
						font-weight:400;
						color:rgba(51,51,51,1);
					}
				}
			}
		}
	}
</style>
