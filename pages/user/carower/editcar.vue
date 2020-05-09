<template>
	<view>
		<view class="outer">
			<info-box>
				<view class="itembox" @tap="toModify">
					<text class="one">车牌号：{{info.carNo}}</text>
					<view class="two">
						<text class="content red">编辑车辆信息</text>
						<image src="../../../static/img/right.png" mode=""></image>
					</view>
				</view>
				
				<view class="itembox">
					<text class="one">车辆所属挂靠公司</text>
					<view class="two">
						<text class="content">{{info.companyName}}</text>
					</view>
				</view>
				
				<view class="itembox">
					<text class="one">车型</text>
					<view class="two">
						<text class="content">{{carModeList[info.carType-1]}}</text>
					</view>
				</view>
						
				<view class="itembox">
					<text class="one">货箱长度</text>
					<view class="two">
						<text class="content">{{info.containerLength}}米</text>
					</view>
				</view>
						
			</info-box>
		</view>
		
	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"
	import "../../../common/itemcontent.css"
	import {parseQueryString} from "../../../utils/query.js"
	
	
	export default {
		data() {
			return {
				info: null,
				carModeList: ['自翻卸车', '四轴车', '六轴车']
				
			}
		},

		methods: {
			toModify() {
				const info = parseQueryString(this.info)	
				uni.navigateTo({
					url: "/pages/user/carower/modifycar" + info
				})
			}
		},
		
		onLoad(options) {
			//options可以接到index 传过来的值
			this.info = options;
			console.log(this.info)
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
	}

	.btntop {
		margin-top: 100px;
	}
</style>

