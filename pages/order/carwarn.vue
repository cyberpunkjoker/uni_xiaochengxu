<template>
	<view>
		<image src="../../static/img/nocar.png" mode=""></image>
		<view class="content">
			<text>暂无内容</text>
		</view>
		
		<btn v-if="showBtn" @tap="toApply">申请运单</btn>
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
			toApply() {
				console.log(1313123)
				uni.navigateTo({
					url: '/pages/home/weight/apply'
				})
			}
		},
		props:["showBtn"],
		
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
		margin-bottom: 100px;
		text-align: center;
	}
	
</style>



