<template>
	<view>
		<view class="outer">
			<info-box>
				<view class="itembox" @tap="toChooseCar">
					<text class="one">选择车辆</text>
					<view class="two">
						<text class="content">{{carList[current]}}</text>
						<image src="../../../static/img/right.png" mode=""></image>
					</view>
				</view>
				<view class="itembox" @tap="toChoosePlan">
					<text class="one">计划承运方向</text>
					<view class="two">
						<text class="content">{{planList[current1]}}</text>
						<image src="../../../static/img/right.png" mode=""></image>
					</view>
				</view>
				
				<hTimePicker sTime="0" cTime="23" interval="1" dayNum="100"  @changeTime="changeTime">
				  <view slot="pCon" class="changeTime">
				    <view class="itembox" @tap="toChooseTime">
				    	<text class="one">预计到厂时间</text>
				    	<view class="two">
				    		<text class="content">{{arriveTime}}</text>
				    		<image src="../../../static/img/right.png" mode=""></image>
				    	</view>
				    </view>
				  </view>
				</hTimePicker>
				
				
			</info-box>
		</view>


		<!-- pick组件部分 -->
		<uni-popup ref="popup" type="bottom">
			<picker-region :dataList="carList" title="选择车辆" @listenChild="showIndex" @showStatus="showStatus"></picker-region>
		</uni-popup>

		<!-- pick2 -->
		<uni-popup ref="popup2" type="bottom">
			<picker-region :dataList="planList" title="计划承运方向" @listenChild="showIndex1" @showStatus="showStatus1"></picker-region>
		</uni-popup>

		<!-- pick3 -->
		<!-- <uni-popup ref="popup3" type="bottom">
			<time-picker :timeList="timeList" @showSeletedTime="timeSelect" @showStatus="showStatus2"></time-picker>
		</uni-popup> -->

		<view class="btn">
			<btn @tap="submitApply">提交</btn>
		</view>
	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import pickerRegion from "../../components/pickerregion.vue"
	import timePicker from "../../components/timePicker.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";

	import "../../../common/itemcontent.css"

	export default {
		data() {
			return {
				// 选车内容
				infoList: [],
				carList: [],
				carIdList: [],
				// 承运方向 
				gotPlanList: [],
				planList: [],
				planListId: [],
				current: 0,
				current1: 0,
				current2: 0,
				// 判断是哪个页面
				// popupList: ["popup","popup2","popup3"],
				popName: '',
				// 当前时间列表
				timeList: [
					[],
					[],
					[],
					[],
					[]
				],
				// 选中的预计到厂时间
				arriveTime: "",
				// 判断时间是否在这之后 false 正确
				isTure: ""
			}
		},

		methods: {
			// 接收子组件的传值
			showIndex(data) {
				console.log(data)
				if (data.length === 0) {
					this.current = 0
				} else {
					this.current = data[1];
				}
			},

			showStatus(data) {
				if (data) {
					this.$refs.popup.close();
				}
			},

			showIndex1(data) {
				console.log(data)
				if (data.length === 0) {
					console.log(1)
					this.current1 = 0
				} else {
					this.current1 = data[1];
				}
			},

			showStatus1(data) {
				if (data) {
					this.$refs.popup2.close();
				}
			},
			
			changeTime(e) {
				console.log(e)
				this.arriveTime = e
				console.log(e)
			},
			
			// 比较时间大小
			compareDate(date1, date2) {
				var oDate1 = new Date(date1);
				var oDate2 = new Date(date2);
				if (oDate1.getTime() > oDate2.getTime()) {
					return true; //第一个大
				} else {
					return false; //第二个大
				}
			},

			toChooseCar() {
				this.$refs.popup.open()
			},

			toChoosePlan() {
				this.getPlanInfo();
				this.$refs.popup2.open()
			},

			// toChooseTime() {
			// 	this.$refs.popup3.open()
			// },

			// 获取推送
			shouquan() {
				const tmplIds = 'P0yJj1sqB8oNODpPd5TpUA9I-qMCM-tih783bIpLZLQ'
				wx.requestSubscribeMessage({
					tmplIds: ["P0yJj1sqB8oNODpPd5TpUA9I-qMCM-tih783bIpLZLQ"],
					subscription_type: 'permanent',
					success(res) {
						console.log("成功", res)
					},
					fail(res) {
						console.log("失败", res)
					}
				})
			},

			// 获取页面内信息
			async getCarInfo() {
				const opts = {
					url: "/sc/carMng/getCanUseCars",
					method: "post"
				}

				const res = await this.$http.httpTokenRequest(opts);
				this.infoList = res.data.result;
				this.infoList.map((item, index) => {
					this.carList.push(item.carNo);
				})
				this.infoList.map((item, index) => {
					this.carIdList.push(item.carId);
				})
			},

			async getPlanInfo() {
				const opts = {
					url: "/personal/driver/getTaskAppRouteList",
					method: "post"
				}
				const res = await this.$http.httpTokenRequest(opts);
				this.gotPlanList = res.data.result;
				this.planList = [];
				this.planListId = [];
				this.gotPlanList.map((item, index) => {
					this.planList.push(item.routeName);
				})
				this.gotPlanList.map((item, index) => {
					this.planListId.push(item.id);
				})
			},

			// 提交并判断是否跳转
			async submitApply() {
				// 提交信息
				uni.showLoading({});
				if (this.isTure) {
					uni.showModal({
						content: "请输入大于当前时间的预计时间"
					})
				} else {
					if(this.planList[this.current]!== undefined && this.carList[this.current]!== undefined) {
						const params = {
							carId: this.carIdList[this.current],
							carNo: this.carList[this.current],
							destination: this.planList[this.current1],
							estimatedTime: this.arriveTime,
							routeId: this.planListId[this.current1]
						}
						
						const opts = {
							url: "/personal/driver/modTaskAppRoute",
							method: "post"
						}
						
						console.log(this.arriveTime);
						const res = await this.$http.httpTokenRequest(opts, params);
						
						console.log(res);
						if (res.data.code === 0) {
							uni.hideLoading({});
							this.shouquan();
							uni.navigateBack({
								delta: 1
							});
						}
						if(res.data.code === 1) {
							uni.showModal({
								title: res.data.desc,
								icon: "none"
							})
						}
					} else {
						setTimeout(()=>{
							uni.hideLoading({});
							uni.showModal({
								content: "请填写内容"
							})
						},700)
					}
				}

			},
		},

		onLoad() {
			this.getCarInfo();
			console.log(this.timeList)
		},

		components: {
			infoBox,
			uniPopup,
			pickerRegion,
			btn,
			timePicker,
			hTimePicker
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

	.container {
		box-sizing: border-box;
		background-color: #fff;
	}

	.btn {
		margin-top: 200px;
	}

	.flexbox {
		display: flex;
		padding: 20px 16px;
		border-bottom: 1px solid #F2F2F2;
		text-align: center;

		.cancel {
			flex: 1;
			font-size: 16px;
			font-weight: 500;
			color: rgba(147, 150, 153, 1);
		}

		.content {
			flex: 2;
			font-size: 16px;
			font-weight: 500;
			color: rgba(75, 76, 77, 1);
		}

		.sure {
			flex: 1;
			font-size: 16px;
			font-weight: 500;
			color: rgba(255, 203, 41, 1);
		}
	}
</style>
