<template>
	<view>
		<image src="../../../static/img/meiyou.png" mode=""></image>
		<view class="content">
			<text>暂无绑定司机</text>
		</view>
		
		<btn :toPages="toPages">绑定司机</btn>
	</view>
</template>

<script>
import btn from "../../components/boxstyle/buttonstyle.vue"

	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			toPages() {
				uni.navigateTo({
				    url: '/pages/user/carower/binddriver'
				});
			}
		},
		
		components: {
			btn
		}
		
	}
</script>

<style lang="less" scoped>
	text {
		font-family:PingFangSC-Regular,PingFang SC;
	}
	
	image {
		display: block;
		margin: 127px auto 0;
		width: 138px;
		height: 138px;
	}
	
	.content {
		font-size:16px;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:22px;
		margin-top: 24px;
		margin-bottom: 200px;
		text-align: center;
	}
	
</style>

