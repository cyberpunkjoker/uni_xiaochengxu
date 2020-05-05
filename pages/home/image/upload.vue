<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>上传开始卸货图片</text>
				</view>
				<!-- 上传图片模块 -->
				<upload-mode></upload-mode>

				<text class="tips">最多可上传三张</text>

				<messBox tipMess="备注(选填)" @getMess="getMessage"></messBox>

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
import messBox from '../../components/message.vue'
import uploadMode from '../../components/uploadMode.vue'

	export default {
		data() {
			return {
				message: '',
				reminNum: 200
			}
		},
		
		methods: {
			clearText() {
				this.message= ""
			},
			
			onTextChange() {
				this.reminNum = 200 - this.message.length
			},
			
			getMessage(data) {
				console.log(data)
			}
		},
		
		onLoad() {
			
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
