<template>
	<view class="">
		<button type="default" @tap="shouquan">hsdhsjd</button>
	</view>
</template>

<script>
	export default {
		// 每次打开放入
		methods:{
			shouquan() {
				const tmplIds = 'P0yJj1sqB8oNODpPd5TpUA9I-qMCM-tih783bIpLZLQ'
				wx.requestSubscribeMessage({
					tmplIds: ["P0yJj1sqB8oNODpPd5TpUA9I-qMCM-tih783bIpLZLQ"],
					subscription_type: 'permanent',
					success(res) {
						console.log("成功", res)
					},
					fail(res) {
						console.log("失败", res)
					}
				})
			}
		}
	}
	
</script>

<style lang="less" scoped>
	
</style>