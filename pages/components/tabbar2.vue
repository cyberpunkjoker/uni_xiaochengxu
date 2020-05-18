<template>
	<view>
		<view class="tabbar">
			<view v-for="(item, index) in tablist" 
			:key="item" @tap="clickTab(index)" 
			:class="index === current ? 'item itemcurrent' : 'item'">
				<image :src="index===current ? unSelectedList[index] : selectedList[index]" mode=""></image>
				{{item}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				selectedList: [
					"../../static/img/apply-sel.png",
					"../../static/img/daichu-wei.png",
					"../../static/img/yunshuwei.png",
					"../../static/img/pagenone.png"
				],
				unSelectedList: [
					"../../static/img/apply.png",
					"../../static/img/daichu-yi.png",
					"../../static/img/yunshu.png",
					"../../static/img/page-sel.png"
				]
			}
		},
		props: ['tablist'],
		methods: {
			clickTab(i) {
				this.current = i
				this.$emit('listenChild', this.current)
			}
		},
	}
</script>

<style lang="less" scoped>
	.tabbar {
		margin: 0 16px;
		display: flex;
		text-align: center;
		padding: 4px 0;
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 8px 2px rgba(173,173,173,0.2);
		border-radius:29px;
		border:1px solid rgba(242,242,242,1);
		font-size: 14px;
		.item {
			flex: 1;
			padding: 8px 0px;
			image {
				width: 18px;
				height: 18px;
				vertical-align: bottom;
				margin-right: 4px;
			}
		}
		
		.itemcurrent {
			background:rgba(255,191,37,1);
			border-radius:29px;
		}
	
	}
</style>

