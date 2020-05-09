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
								<image class="addr" src="../../../static/img/shouhuo.png" @tap="showWay(applyList.destination)"></image>
							</view>
							<view class="two">
								<text class="content">{{applyList.destination}}</text>
							</view>
						</view>
					</info-box>
				</view>
			</view>

			<!-- tab栏为1的时候的页面 -->
			<view v-if="current === 1">
				<!-- 没有数据时显示 -->
				<tip-img v-if="showTipsList[current]"></tip-img>

				<view v-if="!showDetail&&!showTipsList[current]">
					<view v-for="(item,index) in goOutList" :key="index">
						<view class="timebox">
							{{item.createTime}}
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

							<view class="itembox" @tap="showWay(item.destination)">
								<view class="one">
									<text>收货地址：</text>
									<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{item.destination}}</text>
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
								<text class="content">{{userInfo.driverName}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机联系方式</text>
							<view class="two">
								<text class="content">{{userInfo.driverPhone}}</text>
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
								<text class="content">{{userInfo.destination}}</text>
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
									<view class="right">
										<view>数量：{{item.materialNum}}</view>
 									</view>
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
							<!-- {{userInfo.timeOfAppearance}} -->
						</view>
						<info-box>
							<view class="itembox" @tap="firstClick">
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
									<text> 当前物流地址：</text>
									<image class="addr" src="../../../static/img/position.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{item.logisticsLocation}}</text>
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
							<text class="one">物流发出时间</text>
							<view class="two">
								<text class="content">{{userInfo.startUnloadTime }}</text>
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

						<view class="itembox">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">{{userInfo.destination}}</text>
							</view>
						</view>

						<view class="itembox">
							<view class="one">
								<text>当前物流地址：</text>
								<image class="addr" src="../../../static/img/position.png" mode=""></image>
							</view>
							<view class="two">
								<text class="content">{{userInfo.logisticsLocation}}</text>
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
										<view>重量：{{item.materialWeight===null ? "" : item.materialWeight}}</view>
									</view>
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
					<view v-for="(item,index) in doneList" :key="index">
						<view class="timebox">
							<!-- {{userInfo.timeOfAppearance}} -->
						</view>
						<info-box>
							<view class="itembox" @tap="doneClick">
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
									<!--  -->
								</view>
							</view>

							<view class="itembox">
								<view class="one">
									<text> 当前物流地址：</text>
									<image class="addr" src="../../../static/img/position.png" mode=""></image>
								</view>
								<view class="two">
									<text class="content">{{item.logisticsLocation}}</text>
								</view>
							</view>
						</info-box>
					</view>
				</view>

				<!-- 详情页面的显示 -->
				<view v-if="showDetail">
					<!-- 外层循环列表 -->
					<view 
					v-for="(item, index) in doneListDetail"
					:key="index"
					>
					<info-box>
						<view class="itembox">
							<text class="one">车牌号：{{item.carNo}}</text>
						</view>

						<view class="itembox">
							<text class="one">订单号</text>
							<view class="two">
								<text class="content">{{item.orderNo}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">物流出发时间</text>
							<view class="two">
								<text class="content">{{item.orderStartTime}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">客户姓名</text>
							<view class="two">
								<text class="content">{{item.consigneeName}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">客户联系方式</text>
							<view class="two">
								<text class="content">{{item.consigneePhone}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">发货单位</text>
							<view class="two">
								<text class="content">{{item.carrierName}}</text>
							</view>
						</view>

						<view class="itembox">
							<view class="one">
								<text>收货地址：</text>
								<image class="addr" src="../../../static/img/shouhuo.png" @tap="showWay(item.destination)"></image>
							</view>
							<view class="two">
								<text class="content">{{item.destination}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">司机到达时间</text>
							<view class="two">
								<text class="content">{{item.arriveTime}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">卸货等待时间</text>
							<view class="two">
								<text class="content">{{item.unloadWaitTime}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">开始卸货时间</text>
							<view class="two">
								<text class="content">{{item.startUnloadTime}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">卸货完成时间</text>
							<view class="two">
								<text class="content">{{item.orderFinishTime}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">任务周期</text>
							<view class="two">
								<text class="content">{{item.orderCycle}}</text>
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
							
							<view class="twolinebox" 
							v-for="(i, idx) in modifyArr" 
							:key="idx"
							@tap="hhhhh(i)"
							>
								<view class="twolineflex">
									<view class="left">
										<view>名称：{{i[0].materialName}}</view>
										<view>规格：{{i[0].materialType}}</view>
									</view>
									<view class="right">
										<view>数量：{{i[0].materialNum}}</view>
										<view>重量：{{i[0].materialWeight===null ? "" : i[0].materialWeight}}吨</view>
									</view>
								</view>
							</view>
						</info-box>
					</view>
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
				doneList: [],
				userInfo: null,
				// 获取货物详情列表
				goodsList: [],
				// 当前货单的id
				id: 0,
				// 已完成列表的详情
				doneListDetail: [],
				modifyArr:[]
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
			async firstClick() {

				const opts = {
					url: '/personal/driver/getDetails?orderId=' + this.id,
					method: 'post'
				};

				const res = await this.$http.httpTokenRequest(opts);
				this.userInfo = res.data.result;
				this.goodsList = res.data.result.materielDetails;
				console.log(res);
				this.showDetail = true;
				// 保存状态
				this.lastStatus = this.current;
			},

			// 获取完成订单
			async doneClick() {
				const opts = {
					url: '/personal/driver/getOrderRecords',
					method: 'post'
				};
				const res = await this.$http.httpTokenRequest(opts);
				
				this.doneListDetail = res.data.result;
				
				console.log(this.doneListDetail);
				
				this.doneListDetail.map((i, idx)=>{
					this.modifyArr.push(JSON.parse(i.materiel))
				})
				
				console.log(this.modifyArr);
				// this.modifyArr = JSON.parse(this.doneListDetail[0].materiel)
				
				this.showDetail = true;
				// 保存状态
				this.lastStatus = this.current;
			},
			
			// 获取表单id值
			async getOrderId() {
				const opts = {
					url: '/personal/driver/getOrderRecord',
					method: 'post'
				};

				const res = await this.$http.httpTokenRequest(opts);

				this.id = res.data.result.id
				// console.log(res)
			},

			async getOrderList() {
				const opts = {
					url: '/personal/driver/getTaskAppRecordList',
					method: 'post'
				};

				const currentStatus = this.current === 3 ? 5 : this.current;
				console.log("currentStatus:"+ currentStatus)

				const params = {
					current: 0,
					data: {
						orderStatus: currentStatus
					}
				}
				const res = await this.$http.httpTokenRequest(opts, params);
				// 分别判断
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
				if (res.data.result.carNo == null) {
					this.showTipsList[this.current] = true
				}
			},
			
			// 获取当前的身份状态
			statusOfMan() {
				const status = uni.getStorageSync("USER_STATUS");
				console.log(status);
				if(status === "CONSIGNEE") {
					uni.reLaunch({
						url: "/pages/user/user"
					})
					uni.showToast({
						title: "请切换至其它身份",
						icon: "none"
					})
				}
			},
			
			showWay(i) {
				uni.showModal({
					content: i
				})
			}
		},

		onShow() {
			this.getApplyList();
			this.getOrderId();
		},

		onLoad() {
			this.statusOfMan();
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
