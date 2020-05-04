<template>
	<view>
		<view class="tabtop">
			<tab-bar :tablist="tabList" @listenChild='getCurrent'></tab-bar>
		</view>
		<view class="content">
			
			<view class="" v-if="current === 0">
				0
			</view>
			<view class="" v-if="current === 1">
				1
			</view>
			<view class="" v-if="current === 2">
				2
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
import infoBox from "../../components/boxstyle/infobox.vue"
import tabBar from "../../components/tabbar.vue"

	export default {
		data() {
			return {
				tabList: ["待出厂","运输中","已完成"],
				// 选中状态
				current: 0
			}
		},
		
		methods: {
			getCurrent(data) {
				this.current = data;
				console.log(data);
			}
		},
		
		components: {
			tabBar,
			infoBox
		}
		
		
	}
</script>

<style lang="less" scoped>
	.tabtop {
		margin-top: 12px;
	}
</style>

