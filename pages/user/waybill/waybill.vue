<template>
	<view>
		<view class="tabtop">
			<tab-bar :tablist="tabList" @listenChild='getCurrent'></tab-bar>
		</view>
		<view class="content">

			<!-- tab栏为1的时候的页面 -->
			<view v-if="current === 0">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view v-for="(item,index) in goOutList" :key="index">
						<view class="timebox">
							1010032i192038239138
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick(item.id)">
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

							<view class="itembox" @tap="showWay(item.destination)">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{strTwo}}</text>
									<image src="../../../static/img/right.png"></image>
								</view>
							</view>
						</info-box>
					</view>
				</view>

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<info-box>
						<view class="itembox" @tap="firstClick">
							<text class="one">车牌号：{{userInfo.carNo}}</text>
						</view>

						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">{{userInfo.orderNo}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机姓名</text>
							<view class="two">
								<text class="content">{{userInfo.consigneeName}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机联系方式</text>
							<view class="two">
								<text class="content">{{userInfo.consigneePhone}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">承运单位</text>
							<view class="two">
								<text class="content">{{userInfo.carrierName}}</text>
							</view>
						</view>

						<view class="itembox" @tap="showWay(userInfo.destination)">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">{{strTwo}}...</text>
								<image src="../../../static/img/right.png"></image>
							</view>
						</view>
					</info-box>

					<!-- 物料内容部分 -->
					<view class="outer">
						<info-box>
							<!-- title部分 -->
							<view class="tlotitle">
								<text>物料内容</text>
							</view>

							<view class="twolinebox" v-for="(item, index) in goodsList" :key="index">
								<view class="twolineflex">

									<view class="left">
										<view>名称：{{item.materialName}}</view>
										<view>规格：{{item.materialType}}</view>
									</view>
									<view class="right">数量：{{item.materialNum}}</view>
								</view>
							</view>
						</info-box>
					</view>
				</view>

			</view>

			<!-- tab栏为2的时候的页面 -->
			<view v-if="current === 1">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view v-for="(item,index) in transitList" :key="index">
						<view class="timebox">
							<!-- {{userInfo.timeOfAppearance}} -->
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick(item.id)">
								<text class="one">车牌号：{{item.carNo}}</text>
								<view class="two">
									<text class="content red">查看详情</text>
									<image src="../../../static/img/right.png" class="red"></image>
								</view>
							</view>

							<view class="itembox">
								<text class="one">订单号</text>
								<view class="two">
									<text class="content">{{item.orderNo}}</text>
								</view>
							</view>

							<view class="itembox" @tap="showWay(item.destination)">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{strThree}}</text>
									<image src="../../../static/img/right.png" class="red"></image>
								</view>
							</view>

							<!-- <view class="itembox" @tap="showWay(item.destination)">
								<view class="one">
									<text> 当前物流地址：</text>
									<image class="addr" src="../../../static/img/position.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{}}</text>
									<image src="../../../static/img/right.png" class="red"></image>
								</view>
							</view> -->
						</info-box>


					</view>

				</view>

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<info-box>
						<view class="itembox">
							<text class="one">车牌号：{{userInfo.carNo}}</text>
						</view>

						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">{{userInfo.orderNo}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">物流发出时间</text>
							<view class="two">
								<text class="content">{{userInfo.timeOfAppearance }}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">客户姓名</text>
							<view class="two">
								<text class="content">{{userInfo.consigneeName}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">客户联系方式</text>
							<view class="two">
								<text class="content">{{userInfo.consigneePhone}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">发货单位</text>
							<view class="two">
								<text class="content">{{userInfo.carrierName}}</text>
							</view>
						</view>

						<view class="itembox" @tap="showWay(userInfo.destination)">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">{{strThree}}...</text>
								<image src="../../../static/img/right.png" class="red"></image>
							</view>
						</view>

						<view class="itembox" @tap="showWay(userInfo.logisticsLocation)">
							<view class="one">
								<text>当前物流地址：</text>
								<image class="addr" src="../../../static/img/position.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">{{strThreeCurrent}}...</text>
								<image src="../../../static/img/right.png" class="red"></image>
							</view>
						</view>

					</info-box>

					<!-- 物料内容部分 -->
					<view class="outer">
						<info-box>
							<!-- title部分 -->
							<view class="tlotitle">
								<text>物料内容</text>
							</view>

							<view class="twolinebox" v-for="(item, index) in goodsList" :key="index">
								<view class="twolineflex">

									<view class="left">
										<view>名称：{{item.materialName}}</view>
										<view>规格：{{item.materialType}}</view>
									</view>
									<view class="right">
										<view>数量：{{item.materialNum}}</view>
										<view>重量：{{item.materialWeight}}吨</view>
									</view>
								</view>
							</view>
						</info-box>
					</view>
				</view>

			</view>

			<!-- tab栏为3的时候的页面 -->
			<view v-if="current === 2">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view v-for="(item,index) in doneList" :key="index">
						<view class="timebox">
							{{item.createTime}}
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick(item.id)">
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

							<view class="itembox" @tap="showWay(item.destination)">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{strFour[index]}}...</text>
									<image src="../../../static/img/right.png" mode=""></image>
								</view>
							</view>

							<view class="itembox" @tap="showWay(item.destination)">
								<view class="one">
									<text> 当前物流地址：</text>
									<image class="addr" src="../../../static/img/position.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{strFour[index]}}...</text>
									<image src="../../../static/img/right.png" mode=""></image>
								</view>
							</view>
						</info-box>
					</view>
				</view>

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
						<info-box>
							<view class="itembox" @tap="firstClick">
								<text class="one">车牌号：{{userInfo.carNo}}</text>
							</view>

							<view class="itembox">
								<text class="one">订单号</text>
								<view class="two">
									<text class="content">{{userInfo.orderNo}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">物流出发时间</text>
								<view class="two">
									<text class="content">{{userInfo.orderStartTime}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">客户姓名</text>
								<view class="two">
									<text class="content">{{userInfo.consigneeName}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">客户联系方式</text>
								<view class="two">
									<text class="content">{{userInfo.consigneePhone}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">发货单位</text>
								<view class="two">
									<text class="content">{{userInfo.carrierName}}</text>
								</view>
							</view>

							<view class="itembox" @tap="showWay(userInfo.destination)">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{userInfo.destination}}</text>
									<image src="../../../static/img/right.png" mode=""></image>
								</view>
							</view>

							<view class="itembox">
								<text class="one">司机到达时间</text>
								<view class="two">
									<text class="content">{{userInfo.arriveTime}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">卸货等待时间</text>
								<view class="two">
									<text class="content">{{userInfo.unloadWaitTime}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">开始卸货时间</text>
								<view class="two">
									<text class="content">{{userInfo.startUnloadTime}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">卸货完成时间</text>
								<view class="two">
									<text class="content">{{userInfo.orderFinishTime}}</text>
								</view>
							</view>

							<view class="itembox">
								<text class="one">任务周期</text>
								<view class="two">
									<text class="content">{{userInfo.orderCycle}}</text>
								</view>
							</view>

						</info-box>
					<!-- 物料内容部分 -->
					<view class="outer">
						<info-box>
							<!-- title部分 -->
							<view class="tlotitle">
								<text>物料内容</text>
							</view>

							<view class="twolinebox" v-for="(item, index) in goodsList" :key="index">
								<view class="twolineflex">

									<view class="left">
										<view>名称：{{item.materialName}}</view>
										<view>规格：{{item.materialType}}</view>
									</view>
									<view class="right">
										<view>数量：{{item.materialNum}}</view>
										<view>重量：{{item.materialWeight}}吨</view>
									</view>
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
	import tipImg from "../../order/carwarn.vue"

	export default {
		data() {
			return {
				tabList: ["待出厂", "运输中", "已完成"],
				// 选中状态
				current: 0,
				// 控制页面显示detail 
				showDetail: false,
				// 保存一份选中详情页面的当前current
				lastStatus: 0,
				// 控制提示消息页面
				showTipsList: [false, false, false],
				// 1-4页面的数据
				applyList: null,
				goOutList: [],
				transitList: [],
				doneList: [],
				userInfo: null,
				// 获取货物详情列表
				goodsList: [],
				// 当前货单的id
				// id: '',
				strTwo: '',
				strThree: '',
				strFour: [],
				strThreeCurrent: ''
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
			async firstClick(i) {
				this.showDetail = true;
				// 保存状态
				this.lastStatus = this.current;
				// 请求详细列表内容

				const opts = {
					url: '/personal/waybill/getDetails?orderId=' + i,
					method: 'post'
				};

				const res = await this.$http.httpTokenRequest(opts);
				this.userInfo = res.data.result;
				this.goodsList = res.data.result.materielDetails;
				
				this.strThreeCurrent = this.userInfo.logisticsLocation.slice(0, 6)
				console.log(this.strThreeCurrent)
				
				console.log(res);
			},

			async getOrderList() {
				const opts = {
					url: '/personal/waybill/getConsigneeWaybillList',
					method: 'post'
				};
				const num = this.current + 1 === 3 ? 5 : this.current + 1

				const params = {
					current: 0,
					data: {
						orderStatus: num
					}
				}

				const res = await this.$http.httpTokenRequest(opts, params);
				console.log(res)
				// 分别判断
				if (this.current === 0) this.goOutList = res.data.result.records;
				if (this.current === 1) this.transitList = res.data.result.records;
				if (this.current === 2) this.doneList = res.data.result.records;

				if (res.data.result.records.length === 0) {
					this.showTipsList[this.current] = true
				}

				// 获取当前地址截取字符
				if (this.current === 0) {
					console.log(this.goOutList)
					this.strTwo = this.goOutList[0].destination.slice(0, 6)
					console.log(strTwo)
				}
				if (this.current === 1) {
					this.strThree = this.transitList[0].destination.slice(0, 6)
				}
				if (this.current === 2) {
					this.doneList.map((item, idx) => {
						this.strFour.push(item.destination.slice(0, 6))
					})
					console.log(this.strFour)
				}


				console.log(this.showTipsList)
			},

			showWay(i) {
				uni.showModal({
					content: i
				})
			}
		},

		onLoad() {
			this.getOrderList();
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
