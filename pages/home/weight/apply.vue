<template>
	<view>
		<view class="outer">
			<info-box>
				<view class="itembox" @tap="toChooseCar">
					<text class="one">选择车辆</text>
					<view class="two">
						<text class="content">鲁hsdshahdj</text>
						<image src="../../../static/img/right.png" mode=""></image>
					</view>
				</view>
				<view class="itembox" @tap="toChoosePlan">
					<text class="one">计划承运方向</text>
					<view class="two">
						<text class="content">但是ds时代时代</text>
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
			<view class="container">
				<view class="flexbox">
					<view class="cancel" @click="cancel">取消</view>
					<view class="content">计划承运方向</view>
					<view class="sure" @click="choiceSelect">确定</view>
				</view>
				<picker-region></picker-region>
			</view>
		</uni-popup>

		<!-- pick2 -->
		<uni-popup ref="popup2" type="bottom">
			<view class="container">
				<view class="flexbox">
					<view class="cancel" @click="cancel">取消</view>
					<view class="content">计划承运方向</view>
					<view class="sure" @click="choiceSelect">确定</view>
				</view>
				<picker-region></picker-region>
			</view>
		</uni-popup>

		<!-- pick3 -->
		<uni-popup ref="popup3" type="bottom">
			<view class="container">
				<view class="flexbox">
					<view class="cancel" @click="cancel">取消</view>
					<view class="content">计划承运方向</view>
					<view class="sure" @click="choiceSelect">确定</view>
				</view>
				<picker-region></picker-region>
			</view>
		</uni-popup>


		<view class="btn" @tap="submitApply">
			<btn>提交</btn>
		</view>
	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import pickerRegion from "../../components/pickerregion.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"

	import "../../../common/itemcontent.css"

	export default {
		data() {
			return {
				carNum: "dshdjsd",
				carList: [1, 23, 4, 23, 12, 31, 23, 13, 1, 31, 832]
			}
		},

		methods: {
			toChooseCar() {
				this.$refs.popup.open()
			},

			toChoosePlan() {
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
				console.log(res)
			},



			// 提交并判断是否跳转
			submitApply() {



				uni.navigateBack({
					delta: 2
				});
			},
		},

		onLoad() {
			this.getCarInfo();
			// this.getPlanInfo();
			// this.getTimeInfo();
		},

		components: {
			infoBox,
			uniPopup,
			pickerRegion,
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
