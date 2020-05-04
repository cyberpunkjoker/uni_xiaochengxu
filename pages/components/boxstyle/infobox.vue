<template>
		<view class="infobox">
			<slot></slot>
		</view>
</template>

<script>
	export default {

	}
</script>

<style lang="less" scoped>
	.infobox {
		background-color: #FFFFFF;
		margin: 0 16px;
		box-shadow: 0px 4px 8px 2px rgba(173, 173, 173, 0.1);
		border-radius: 4px;
		border: 1px solid rgba(242, 242, 242, 1);
	}
</style>
