<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>上传开始卸货图片</text>
				</view>
				<!-- 上传图片模块 -->
				<view class="upload">

				</view>

				<text class="tips">最多可上传三张</text>

				<view class="warp">
					<textarea value="" placeholder="备注(选填)" />
					<view class="right">
						<text>余200个字</text>
					</view>
					<view class="left">
						<text>清空</text>
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
				
			}
		},
		
		methods: {
		},
		
		onLoad() {
			
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
			  }
		  }
	  }
  
		.btn {
			margin-top: 140px;
		}
  }
</style>
