<template>
	<view>
		<view class="tabtop">
			<tab-bar :tablist="tabList" @listenChild='getCurrent'></tab-bar>
		</view>
		<view class="content">
		
		
			<view class="" v-if="current === 0">
				<view class="timebox">
					1010032i192038239138
				</view>
				<info-box>
					<view class="itembox">
						<text class="one">车牌号：{{carnum}}</text>
						<view class="two">
							<text class="content red">查看详情</text>
						</view>
					</view>
			
					<view class="itembox">
						<text class="one">订单号</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>
			
					<view class="itembox">
						<view class="one">
							<text>收货地址：</text>
						</view>
						<view class="two">
							<text class="content">dsdsdsadsasds</text>
						</view>
					</view>
				</info-box>
			
			
			</view>
			
			<view class="" v-if="current === 1">
				<view class="timebox">
					1010032i192038239138
				</view>
				<info-box>
					<view class="itembox">
						<text class="one">车牌号：{{carnum}}</text>
						<view class="two">
							<text class="content red">填写物料重量</text>
							<image src="../../../static/img/right.png" mode=""></image>
						</view>
					</view>

					<view class="itembox">
						<text class="one">订单号</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>
					<view class="itembox">
						<text class="one">客户姓名</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>
					<view class="itembox">
						<text class="one">客户联系方式</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>
					<view class="itembox">
						<text class="one">发货单位</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>

					<view class="itembox">
						<view class="one">
							<text>收货地址：</text>
							<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
						</view>
						<view class="two">
							<text class="content">dsdsdsadsasds</text>
						</view>
					</view>
				</info-box>


			</view>
			<view class="" v-if="current === 2">
				<view class="timebox">
					1010032i192038239138
				</view>
				<info-box>
					<view class="itembox">
						<text class="one">车牌号：{{carnum}}</text>
						<view class="two">
							<text class="content red">解除绑定</text>
							<image src="../../../static/img/right.png" mode=""></image>
						</view>
					</view>

					<view class="itembox">
						<text class="one">订单号</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>

					<view class="itembox">
						<view class="one">
							<text>收货地址：</text>
							<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
						</view>
						<view class="two">
							<text class="content">dsdsdsadsasds</text>
						</view>
					</view>

					<view class="itembox">
						<view class="one">
							<text>收货地址：</text>
							<image class="addr" src="../../../static/img/position.png" mode=""></image>
						</view>
						<view class="two">
							<text class="content">dsdsdsadsasds</text>
						</view>
					</view>
				</info-box>


			</view>
			<view class="" v-if="current === 3">
				<view class="timebox">
					1010032i192038239138
				</view>
				<info-box>
					<view class="itembox">
						<text class="one">车牌号：{{carnum}}</text>
						<view class="two">
							<text class="content red">解除绑定</text>
							<image src="../../../static/img/right.png" mode=""></image>
						</view>
					</view>

					<view class="itembox">
						<text class="one">订单号</text>
						<view class="two">
							<text class="content">1111211415415</text>
						</view>
					</view>

					<view class="itembox">
						<view class="one">
							<text>收货地址：</text>
							<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
						</view>
						<view class="two">
							<text class="content">dsdsdsadsasds</text>
						</view>
					</view>

					<view class="itembox">
						<view class="one">
							<text>收货地址：</text>
							<image class="addr" src="../../../static/img/position.png" mode=""></image>
						</view>
						<view class="two">
							<text class="content">dsdsdsadsasds</text>
						</view>
					</view>
				</info-box>


			</view>

		</view>



	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import tabBar from "../../components/tabbar2.vue"

	export default {
		data() {
			return {
				tabList: ["已申请", "待出厂", "运输中", "已完成"],
				// 选中状态
				current: 0,
				carnum: "dasdads",
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
	.red {
		font-size: 12px;
		color: #FE5000;
	}

	.tabtop {
		margin-top: 12px;
	}

	.content {
		padding-top: 12px;
	}

	.timebox {
		width: 120px;
		font-size: 12px;
		font-weight: normal;
		color: rgba(153, 153, 153, 1);
		margin: 12px auto 5px;
	}

	.itembox {
		height: 52px;
		border-bottom: 1px solid #F2F2F2;

		.one {
			float: left;
			margin-left: 16px;
			line-height: 52px;

			image {
				float: left;
				display: block;
				margin: 12px 5px 0 0;
				width: 30px;
				height: 30px;
			}
		}

		.two {
			float: right;

			image {
				display: block;
				float: right;
				margin: 20px 16px 0 0;
				width: 8px;
				height: 14px;
			}

			text {
				line-height: 52px;
				margin: 0 16px;
			}
		}
	}
</style>
