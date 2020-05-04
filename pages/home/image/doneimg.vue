<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>上传到达卸货地点图片</text>
				</view>
				<!-- 上传图片模块 -->
				<view class="upload" @tap="chooseImg">
					<view class="add">
						<view class="spacer1"></view>
						<view class="spacer2"></view>
					</view>
				</view>

				<text class="tips">最多可上传三张</text>

				<view class="warp">
					<textarea v-model="content" placeholder="备注(选填)" />
					<view class="right" @tap="clearText">
						<text>清空</text>
					</view>
					<view class="left" >
						<text>余200个字</text>
					</view>
				</view>
			</view>
	</info-box>
			
	<view class="btn">
		<btn>提交</btn>
	</view>
	
	</view>
</template>

<script>
import infoBox from "../../components/boxstyle/infobox.vue"
import btn from "../../components/boxstyle/buttonstyle.vue"
	export default {
		data() {
			return {
				content: ""
			}
		},
		
		methods: {
			clearText() {
				this.content = ""
			},
			chooseImg() {
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
				        // 预览图片
				        uni.previewImage({
				            urls: res.tempFilePaths,
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
				    }
				    });
			}
		},
		
		components: {
			infoBox,
			btn
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
		  .warp {
			  position: relative;
			  font-size:12px;
			  font-weight:400;
			  margin: 12px 0 28px 0;
			  color:rgba(153,153,153,1);
			  textarea {
				  box-sizing: border-box;
				  height:118px;
				  width: 100%;
				  padding: 8px 16px;
				  font-size: 14px;
				  border:1px solid rgba(242,242,242,1);
			  }
			  .left {
				  position: absolute;
				  bottom: 12px;
				  left: 16px;
			  }
			  .right {
				  position: absolute;
				  bottom: 12px;
				  right: 16px;
				  z-index: 3;
			  }
		  }
	  }
  
		.btn {
			margin-top: 140px;
		}
  }

	.upload {
		padding-bottom: 10px;
		.add {
			position: relative;
			width: 69px;
			height: 69px;
			border: 1px dashed #000;
			.spacer1 {
				width: 1px;
				height: 25px;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				background-color: #000;
			}
			.spacer2 {
				width: 25px;
				height: 1px;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				background-color: #000;
			}
		}
	}

</style>
