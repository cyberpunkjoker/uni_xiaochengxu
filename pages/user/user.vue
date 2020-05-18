<template>
	<view>
		<image src="../../static/img/bgcar.png"></image>
		<view class="outbox">
			<info-box>
				<!-- <view 
				class="itembox" 
				v-for="(item,index) in contentList" 
				:key="index" 
				@tap="toOtherPage(index)"
				v-if="master"
				>
					<view v-show="master && index===0">
						<image :src="imgUrl[index]" mode=""></image>
						<text>{{item}}</text>
						<image class="tologo" src="../../static/img/right.png" mode=""></image>
					</view>
					
					<view v-show="driver && index===1">
						<image :src="imgUrl[index]" mode=""></image>
						<text>{{item}}</text>
						<image class="tologo" src="../../static/img/right.png" mode=""></image>
					</view>
					
					<view v-show="consignee && index===2">
						<image :src="imgUrl[index]" mode=""></image>
						<text>{{item}}</text>
						<image class="tologo" src="../../static/img/right.png" mode=""></image>
					</view>
					<view v-show="index === 3">
						<image :src="imgUrl[index]" mode=""></image>
						<text>{{item}}</text>
						<image class="tologo" src="../../static/img/right.png" mode=""></image>
					</view>
				</view>
				 -->

				<view class="itembox" @tap="toOtherPage(0)" v-if="consignee">
					<image src="../../static/img/shouhuocha.png" mode=""></image>
					<text>收货人运单查询</text>
					<image class="tologo" src="../../static/img/right.png"></image>
				</view>
				
				<view class="itembox" @tap="toOtherPage(1)" v-if="master">
					<image src="../../static/img/guanlicar.png" mode=""></image>
					<text>车主车辆管理</text>
					<image class="tologo" src="../../static/img/right.png"></image>
				</view>
				
				<view class="itembox" @tap="toOtherPage(2)" v-if="driver">
					<image src="../../static/img/guanli.png" mode=""></image>
					<text>司机车辆管理</text>
					<image class="tologo" src="../../static/img/right.png"></image>
				</view>
				
				<view class="itembox" @tap="toOtherPage(3)">
					<image src="../../static/img/zhuxiao.png" mode=""></image>
					<text>注销登录</text>
					<image class="tologo" src="../../static/img/right.png"></image>
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
				// imgUrl: ["../../static/img/shouhuocha.png",
				// 	"../../static/img/guanlicar.png",
				// 	"../../static/img/guanli.png",
				// 	"../../static/img/zhuxiao.png"
				// ],
				// contentList: [
				// 	"收货人运单查询",
				// 	"车主车辆管理",
				// 	"司机车辆管理",
				// 	"注销登录"
				// ],
				pageList: [1, 2, 3, 4],
				userStatus: '',
				master: false,
				driver: false,
				consignee: false
			}
		},

		methods: {
			status() {
				const status = uni.getStorageSync("USER_STATUS");
				if (status === 'MASTER') {
					this.master = true
				}
				if (status === 'DRIVER') {
					this.driver = true
				}
				if (status === 'CONSIGNEE') {
					this.consignee = true
				}
			},

			toOtherPage(i) {
				if (i === 0) {
					if (this.userStatus === "CONSIGNEE") {
						uni.navigateTo({
							url: '/pages/user/waybill/waybill'
						});
					} else {
						uni.showToast({
							title: "请注销切换至收货人身份",
							icon: "none"
						})
					}
				}
				// i === 0 && this.userStatus === "CONSIGNEE" &&
				// // i === 0 &&
				// 	uni.navigateTo({
				// 		url: '/pages/user/waybill/waybill'
				// 	});

				if (i === 1) {
					if (this.userStatus === "MASTER") {
						uni.navigateTo({
							url: '/pages/user/carower/managementcar'
						});
					} else {
						uni.showToast({
							title: "请注销切换至车主身份",
							icon: "none"
						})
					}
				}

				// i === 1 && this.userStatus === "MASTER" &&
				// // i === 1 && 
				// 	uni.navigateTo({
				// 		url: '/pages/user/carower/managementcar'
				// 	});

				if (i === 2) {
					if (this.userStatus === "DRIVER") {
						uni.navigateTo({
							url: '/pages/user/carmanagement/carmanagement'
						});
					} else {
						uni.showToast({
							title: "请注销切换至司机身份",
							icon: "none"
						})
					}
				}

				// // i === 2 && this.userStatus ===  "DRIVER" &&
				// // i === 2 &&
				// 	uni.navigateTo({
				// 		url: '/pages/user/carmanagement/carmanagement'
				// 	});

				i === 3 &&
					uni.setStorage({
						key: 'USER_TOKEN',
						data: ""
					}) &&
					uni.reLaunch({
						url: "/pages/login/status"
					}) && this.toExit();
			},

			async toExit() {
				const opts = {
					url: "/personal/waybill/exit",
					method: 'post'
				}
				const res = await this.$http.httpTokenRequest(opts);
				console.log(res)
			},

			getStatus() {
				const status = uni.getStorageSync("USER_STATUS");
				this.userStatus = status;
				console.log(status);
			}

		},

		onLoad() {
			this.getStatus(),
				this.status()
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
