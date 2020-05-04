<template>
	<view>
		<view class="tabtop">
			<tab-bar :tablist="tabList" @listenChild='getCurrent'></tab-bar>
		</view>
		<view class="content">

			<!-- tab栏为0的时候的页面 -->
			<view v-if="current === 0">
				<view v-if="!showDetail">
					<view class="timebox">
						1010032i192038239138
					</view>
					<info-box>
						<view class="itembox" @tap="firstClick">
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
					</info-box>
				</view>

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<info-box>
						<view class="itembox" @tap="firstClick">
							<text class="one">车牌号：{{carnum}}</text>
						</view>

						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">1111211415415</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机姓名</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机联系方式</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">承运单位</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>

						<view class="itembox">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">四川省达州市熊猫区望江镇</text>
							</view>
						</view>
					</info-box>

					<!-- 物料内容部分 -->
					<view class="outer">
						<info-box>
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>

								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>

							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>

								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>

								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
						</info-box>

					</view>


				</view>

			</view>


			<!-- tab栏为1的时候的页面 -->
			<view class="" v-if="current === 1">
				<view v-if="!showDetail">
					<view class="timebox">
						1010032i192038239138
					</view>
					<info-box>
						<view class="itembox" @tap="firstClick">
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

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<info-box>
						<view class="itembox" @tap="firstClick">
							<text class="one">车牌号：{{carnum}}</text>
						</view>

						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">1111211415415</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机姓名</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机联系方式</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">承运单位</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>

						<view class="itembox">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">四川省达州市熊猫区望江镇</text>
							</view>
						</view>
					</info-box>

					<!-- 物料内容部分 -->
					<view class="outer">
						<info-box>
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>

								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>

							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>

								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>

								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
						</info-box>

					</view>


				</view>






			</view>


			<!-- tab栏为2的时候的页面 -->
			<view class="" v-if="current === 2">
				<view v-if="!showDetail">
					<view class="timebox">
						1010032i192038239138
					</view>
					<info-box>
						<view class="itembox" @tap="firstClick">
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

				
				<view v-if="showDetail">
					<info-box>
						<view class="itembox" @tap="firstClick">
							<text class="one">车牌号：{{carnum}}</text>
						</view>
				
						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">1111211415415</text>
							</view>
						</view>
				
						<view class="itembox">
							<text class="one">司机姓名</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>
				
						<view class="itembox">
							<text class="one">司机联系方式</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>
				
						<view class="itembox">
							<text class="one">承运单位</text>
							<view class="two">
								<text class="content">四川成导师导师多所多</text>
							</view>
						</view>
				
						<view class="itembox">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">四川省达州市熊猫区望江镇</text>
							</view>
						</view>
					</info-box>
				
					<!-- 物料内容部分 -->
					<view class="outer">
						<info-box>
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>
				
								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
				
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>
				
								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
							<view class="twolinebox">
								<view class="twolineflex">
									<view class="left">名称：三级螺纹钢定尺9米</view>
									<view class="right">数量：233131</view>
								</view>
				
								<view class="twolineflex">
									<view>规格：</view>
								</view>
							</view>
						</info-box>
				
					</view>
				
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import tabBar from "../../components/tabbar.vue"
	import "../../../common/itemcontent.css"
	import "../../../common/twolinelayout.css"

	export default {
		data() {
			return {
				tabList: ["待出厂", "运输中", "已完成"],
				// 选中状态
				current: 0,
				carnum: "dasdads",
				// 控制页面显示detail 不。
				showDetail: false,
				// 保存一份选中详情页面的当前current
				lastStatus: 0
			}
		},

		methods: {
			getCurrent(data) {
				this.current = data;
				// 点击 tab 栏，只要和保存的current发生变化就返回列表页面。
				if (this.lastStatus !== data) {
					this.showDetail = false;
				}
			},
			// 待出场点击部分
			firstClick() {
				this.showDetail = true;
				// 保存状态
				this.lastStatus = this.current;

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

	.outer {
		padding: 12px 0;
	}
</style>
