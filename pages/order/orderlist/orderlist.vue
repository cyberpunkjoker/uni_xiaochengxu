<template>
	<view>
		<view class="tabtop">
			<tab-bar :tablist="tabList" @listenChild='getCurrent'></tab-bar>
		</view>
		<view class="content">

			<!-- tab选中0的时候的内容 -->
			<view v-if="current === 0">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]" showBtn="show"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<info-box>
						<view class="itembox" @tap="firstClick">
							<text class="one">车牌号：{{applyList.carNo}}</text>
						</view>

						<view class="itembox">
							<text class="one">申请时间</text>
							<view class="two">
								<text class="content">{{applyList.createTime}}</text>
							</view>
						</view>

						<view class="itembox">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">{{item.destination}}</text>
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
			<view v-if="current === 1">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view v-for="(item,index) in goOutList" :key="index">
						<view class="timebox">
							1010032i192038239138
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick">
								<text class="one">车牌号：{{item.carNo}}</text>
								<view class="two">
									<text class="content red">查看详情</text>
									<image src="../../../static/img/right.png" mode=""></image>
								</view>
							</view>

							<view class="itembox">
								<text class="one">订单号</text>
								<view class="two">
									<text class="content">{{item.orderNo}}</text>
								</view>
							</view>

							<view class="itembox">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{item.destination}}</text>
								</view>
							</view>
						</info-box>
					</view>
				</view>

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<info-box>
						<view class="itembox" @tap="firstClick">
							<text class="one">车牌号：{{item.carNo}}</text>
						</view>

						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">{{item.orderNo}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机姓名</text>
							<view class="two">
								<text class="content">{{item.destination}}</text>
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
			<view v-if="current === 2">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view v-for="(item,index) in transitList" :key="index">
						<view class="timebox">
							1010032i192038239138
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick">
								<text class="one">车牌号：{{item.carNo}}</text>
								<view class="two">
									<text class="content red">查看详情</text>
									<image src="../../../static/img/right.png" mode=""></image>
								</view>
							</view>

							<view class="itembox">
								<text class="one">订单号</text>
								<view class="two">
									<text class="content">{{item.orderNo}}</text>
								</view>
							</view>

							<view class="itembox">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{item.destination}}</text>
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

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<view>
						<info-box>
							<view class="itembox" @tap="firstClick">
								<text class="one">车牌号：123131</text>
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


					</view>
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

			<!-- tab栏为3的时候的页面 -->
			<view v-if="current === 3">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view 
					v-for="(item, index) in doneList"
					:key="index"
					>
						<view class="timebox">
							1010032i192038239138
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick">
								<text class="one">车牌号：{{item.carNo}}</text>
								<view class="two">
									<text class="content red">查看详情</text>
									<image src="../../../static/img/right.png" mode=""></image>
								</view>
							</view>

							<view class="itembox">
								<text class="one">订单号</text>
								<view class="two">
									<text class="content">{{item.orderNo}}</text>
								</view>
							</view>

							<view class="itembox">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{item.destination}}</text>
								</view>
							</view>

							<view class="itembox">
								<view class="one">
									<text>当前物流地址：</text>
									<image class="addr" src="../../../static/img/position.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">dsdsdsadsasds</text>
								</view>
							</view>
						</info-box>

					</view>
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
	import tabBar from "../../components/tabbar2.vue"
	import "../../../common/itemcontent.css"
	import "../../../common/twolinelayout.css"
	import tipImg from "../carwarn.vue"

	export default {
		data() {
			return {
				tabList: ["已申请", "待出厂", "运输中", "已完成"],
				// 选中状态
				current: 0,
				// 控制页面显示detail 
				showDetail: false,
				// 保存一份选中详情页面的当前current
				lastStatus: 0,
				// 控制提示消息页面
				showTipsList: [false, false, false, false],
				// 1-4页面的数据
				applyList: null,
				goOutList: [],
				transitList: [],
				doneList: []
			}
		},

		methods: {
			getCurrent(data) {
				this.current = data;
				// 点击 tab 栏，只要和保存的current发生变化就返回列表页面。
				if (this.lastStatus !== data) {
					this.showDetail = false;
				}
				this.getOrderList();
			},
			// 待出场点击部分
			firstClick() {
				this.showDetail = true;
				// 保存状态
				this.lastStatus = this.current;
			},

			async getOrderList() {
				const opts = {
					url: '/personal/driver/getTaskAppRecordList',
					method: 'post'
				};

				const params = {
					current: 0,
					data: {
						orderStatus: this.current
					}
				}

				const res = await this.$http.httpTokenRequest(opts, params);
				// 分别判断
				// if (this.current === 0) this.applyList = res.data.result.records;
				if (this.current === 1) this.goOutList = res.data.result.records;
				if (this.current === 2) this.transitList = res.data.result.records;
				if (this.current === 3) this.doneList = res.data.result.records;

				console.log(res);
				if (res.data.result.records.length === 0) {
					this.showTipsList[this.current] = true
				}
			},

			// 获得已申请页面的数据
			async getApplyList() {
				const opts = {
					url: '/personal/driver/getTaskAppRecord',
					method: 'post'
				};
				const res = await this.$http.httpTokenRequest(opts);
				console.log(res);
				this.applyList = res.data.result;
				if(Object.keys(res.data.result).length === 0) {
					this.showTipsList[this.current] = true
				}
			}


		},

		onLoad() {
			this.getApplyList();
		},

		components: {
			tabBar,
			infoBox,
			tipImg
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
