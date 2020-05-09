<template>
	<view>
		<view v-if="!showNone">
			<view class="bigbox">
			<view class="outer" v-for="(item,index) in carList" :key="index" >
				<info-box>
					<view class="itembox" @tap="toEditCar(item)">
						<text class="one">车牌号：{{item.carNo}}</text>
						<view class="two">
							<text class="content red fontsize12">编辑车辆信息</text>
							<image src="../../../static/img/right.png" mode=""></image>
						</view>
					</view>

					<view class="itembox">
						<text class="one">车辆所属挂靠公司</text>
						<view class="two">
							<text class="content">{{item.companyName}}</text>
						</view>
					</view>

					<view class="itembox">
						<text class="one">审核状态</text>
						<view class="two">
							<text :class="colorList[item.examineStatusEnum]">{{statusList[item.examineStatusEnum]}}</text>
						</view>
					</view>

					<view class="itembox" v-if="item.examineStatusEnum!==0">
						<view v-if="item.examineStatusEnum == 1" @tap="toBindCar(item)">
							<text class="one">绑定司机</text>
							<view class="two">
								<text class="content"></text>
								<image src="../../../static/img/right.png" mode=""></image>
							</view>
						</view>

						<view v-if="item.examineStatusEnum == 2" @tap="messageToSee(index)">
							<text class="one">驳回理由</text>
							<view class="two">
								<text class="content">{{item.remark.slice(0,8)}}...</text>
								<image src="../../../static/img/right.png" mode=""></image>
							</view>
						</view>
					</view>
				</info-box>
			</view>
			</view>
			<view class="bottobox">
				<btn @tap="toAddCar">添加车辆</btn>
			</view>
		</view>
		<!-- 无车页面 -->
		<no-car v-if="showNone"></no-car>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import "../../../common/itemcontent.css"
	import {parseQueryString} from "../../../utils/query.js"
	import noCar from "./carnone.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"

	export default {
		data() {
			return {
				carList: [],
				// 审核状态列表
				statusList: ["审核中", "已审核通过", "未通过审核"],
				// 样式列表
				colorList: ["content blue fontsize12", "content green fontsize12", "content red fontsize12"],
				showNone: false
			}
		},

		methods: {
			async getUserInfo() {
				const opts = {
					url: '/sc/carMng/getCarsByPage',
					method: 'post'
				}
				const param = {
					current: 0
				}
				const res = await this.$http.httpTokenRequest(opts, param)
				this.carList = res.data.result.records;

				if (this.carList.length === 0) {
					this.showNone = true;
				}


				console.log(res);
			},
			// 页面跳转部分
			toEditCar(i) {
				const info = parseQueryString(i)
				uni.navigateTo({
					url: '/pages/user/carower/editcar' + info

				})

			},
			toBindCar(i) {
				const id = parseQueryString({
					id: i.carId
				})
				console.log(i)
				uni.navigateTo({
					url: '/pages/user/carower/binddriver' + id
				})
			},
			messageToSee(i) {
				uni.showModal({
					content: this.carList[i].remark
				})
			},
			toAddCar() {
				uni.navigateTo({
					url: "/pages/user/carower/addcar"
				})
			}
		},

		onLoad() {
			this.getUserInfo();
		},

		components: {
			infoBox,
			noCar,
			btn
		}


	}
</script>

<style lang="less" scoped>
	.outer {
		margin: 12px 0;
	}
	
	.bottobox {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		height:83px;
		padding-top: 20px;
		background:rgba(250,250,250,1);
		
	}
	.bigbox {
		margin-bottom: 100px;
	}
</style>
