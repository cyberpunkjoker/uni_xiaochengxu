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
				<view class="itembox" @tap="toChooseTime">
					<text class="one">预计到厂时间</text>
					<view class="two">
						<text class="content">tdgshdsjd</text>
						<image src="../../../static/img/right.png" mode=""></image>
					</view>
				</view>
			</info-box>
		</view>


		<!-- pick组件部分 -->
		<uni-popup ref="popup" type="bottom">
				<picker-region 
				:dataList="carList" 
				title="选择车辆"
				@listenChild="showIndex"
				@showStatus="showStatus"
				></picker-region>
		</uni-popup>

		<!-- pick2 -->
		<uni-popup ref="popup2" type="bottom">
			<picker-region
			:dataList="planList" 
			title="计划承运方向"
			@listenChild="showIndex1"
			@showStatus="showStatus1"
			></picker-region>
		</uni-popup>

		<!-- pick3 -->
		<uni-popup ref="popup3" type="bottom">
			<time-picker :timeList="timeList"></time-picker>
		</uni-popup>

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

	import "../../../common/itemcontent.css"

	export default {
		data() {
			return {
				// 选车内容
				infoList:[],
				carList: [],
				carIdList:[],
				// 承运方向 
				gotPlanList:[],
				planList:[],
				planListId:[],
				current: 0,
				current1: 0,
				current2: 0,
				// 判断是哪个页面
				popupList: ["popup","popup2","popup3"],
				popName: '',
				// 当前时间列表
				timeList:[[],[],[],[],[]],
				// 选中的预计到厂时间
				arriveTime: "2020-05-07 01:57:53"
			}
		},

		methods: {
			// 接收子组件的传值
			showIndex(data){
				this.current=data[1];
			},
			
			showStatus(data) {
				if(data) {
					this.$refs.popup.close();
				}
			},
			
			
			showIndex1(data){
				this.current1=data[1];
				console.log(this.current1)
			},
			
			showStatus1(data) {
				if(data) {
					this.$refs.popup2.close();
				}
			},

			
			
			toChooseCar() {
				this.$refs.popup.open()
			},

			toChoosePlan() {
				this.getPlanInfo();
				this.$refs.popup2.open()
			},

			toChooseTime() {
				this.$refs.popup3.open()
			},
			
			// 获取页面内信息
			async getCarInfo() {
				const opts = {
					url: "/sc/carMng/getCarsByPage",
					method: "post"
				}
				const param = {
					current: 0
				}
				const res = await this.$http.httpTokenRequest(opts, param);
				this.infoList = res.data.result.records;
				this.infoList.map((item,index)=>{
					this.carList.push(item.carNo);
				})
				this.infoList.map((item,index)=>{
					this.carIdList.push(item.carId);
				})
				
				console.log(this.carList)
			},
			
			async getPlanInfo() {
				const opts = {
					url: "/personal/driver/getTaskAppRouteList",
					method: "post"
				}
				const res = await this.$http.httpTokenRequest(opts);
				this.gotPlanList = res.data.result;
				this.gotPlanList.map((item,index)=>{
					this.planList.push(item.routeName);
				})
				this.gotPlanList.map((item,index)=>{
					this.planListId.push(item.id);
				})
				
				console.log(res)
				
			},
			
			initTime() {
				const myDate = new Date();
				// const year = myDate.getYear();        //获取当前年份(2位)
				const year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
				const month = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
				const date = myDate.getDate();        //获取当前日(1-31)
				// myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
				const hour = myDate.getHours();       //获取当前小时数(0-23)
				const minute = myDate.getMinutes();     //获取当前分钟数(0-59)
				
				// this.timeList = [year,month,date,hour,minute]
				// 添加年份列表
				// this.timeList[1] =
				new Array(10).fill(year).map((item, i)=>{
					this.timeList[0].push(item+i);
				})
				new Array(12).fill('').map((item, i)=>{
					this.timeList[1].push(i+1);
				})
				new Array(31).fill('').map((item, i)=>{
					this.timeList[2].push(i+1);
				})
				new Array(24).fill('').map((item, i)=>{
					this.timeList[3].push(i+1);
				})
				new Array(60).fill('').map((item, i)=>{
					this.timeList[4].push(i+1);
				})
				console.log(this.timeList);
			},
			
			// 提交并判断是否跳转
			async submitApply() {
				// 提交信息
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
				
				const res = await this.$http.httpTokenRequest(opts,params);
				if(res.data.desc === "操作成功") {
					uni.navigateBack({
						delta: 2
					});
				}
				
				console.log(res)
				
				
				
			},
		},

		onLoad() {
			this.getCarInfo();
			this.initTime()
			console.log(this.timeList)
		},

		components: {
			infoBox,
			uniPopup,
			pickerRegion,
			btn,
			timePicker
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
