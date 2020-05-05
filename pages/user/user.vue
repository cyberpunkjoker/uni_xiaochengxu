<template>
	<view>
		<image src="../../static/img/bgcar.png"></image>
		<view class="outbox">
			<info-box>
				<view class="itembox" v-for="(item,index) in contentList" :key="index" @tap="toOtherPage(index)">
					<image :src="imgUrl[index]" mode=""></image>
					<text>{{item}}</text>
					<image class="tologo" src="../../static/img/right.png" mode=""></image>
				</view>
			</info-box>
		</view>
	</view>
</template>

<script>
	import infoBox from "../components/boxstyle/infobox.vue"
	export default {
		data() {
			return {
				imgUrl: ["../../static/img/shouhuocha.png",
					"../../static/img/guanlicar.png",
					"../../static/img/guanli.png",
					"../../static/img/zhuxiao.png"
				],
				contentList: [
					"收货人运单查询",
					"车主车辆管理",
					"司机车辆管理",
					"注销登录"
				],
				pageList: [1, 2, 3, 4]
			}
		},

		methods: {
			toOtherPage(i) {
				i === 0 &&
					uni.navigateTo({
						url: '/pages/user/waybill/waybill'
					});

				i === 1 &&
					uni.navigateTo({
						url: '/pages/user/carower/managementcar'
					});

				i === 2 &&
					uni.navigateTo({
						url: '/pages/user/carmanagement/carmanagement'
					});

				i === 3 && 
				uni.setStorage({
					key: 'USER_TOKEN',
					data: ""
				}) &&
				uni.reLaunch({
					url: "/pages/login/login"
				})

			}
		},

		components: {
			infoBox
		}


	}
</script>

<style lang="less" scoped>
	image {
		width: 100%;
	}

	text {
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.outbox {
		transform: translate(0, -46px);

		.itembox {
			height: 80px;
			border-bottom: 1px solid #F2F2F2;

			image {
				float: left;
				margin: 17px 0 0 14px;
				width: 46px;
				height: 46px;
			}

			text {
				float: left;
				line-height: 80px;
				margin: 0 10px;
				font-size: 14px;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.tologo {
				display: block;
				float: right;
				margin: 33px 16px;
				width: 8px;
				height: 14px;
			}
		}
	}
</style>
