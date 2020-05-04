<template>
	<view>
		<image src="../../static/img/nowifi.png" mode=""></image>
		<view class="content">
			<text>暂无网络</text>
		</view>
		
		<btn :toPages="toPages">刷新重试</btn>
	</view>
</template>

<script>
import btn from "../components/boxstyle/buttonstyle.vue"

	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			toPages() {
				
			}
		},
		
		components: {
			btn
		}
		
	}
</script>

<style lang="less" scoped>
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



