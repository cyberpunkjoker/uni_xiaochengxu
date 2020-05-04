<template>
	<view>
		<view class="outer" v-for="(item,index) in carList" :key="index">
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
					<view v-if="item.examineStatusEnum == 1" @tap="toBindCar">
						<text class="one">绑定司机</text>
						<view class="two">
							<text class="content red fontsize12">前往绑定司机</text>
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
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import "../../../common/itemcontent.css"
	import {parseQueryString} from "../../../utils/query.js"

	export default {
		data() {
			return {
				carList: [],
				// 审核状态列表
				statusList: ["审核中", "已审核通过", "未通过审核"],
				// 样式列表
				colorList: ["content blue fontsize12", "content green fontsize12", "content red fontsize12"],
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
				
				
				console.log(res);
			},
			// 页面跳转部分
			toEditCar(i) {
				const info = parseQueryString(i)	
				uni.navigateTo({
					url: '/pages/user/carower/editcar'+ info
					
				})
				
			},
			toBindCar() {
				uni.navigateTo({
					url: '/pages/user/carower/binddriver'
				})
			},
			messageToSee(i) {
				uni.showModal({
					content:this.carList[i].remark
				})
			}
			
		},

		onLoad() {
			this.getUserInfo();
		},

		components: {
			infoBox
		}


	}
</script>

<style lang="less" scoped>
	text {
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 14px;
	}

	.outer {
		margin: 12px 0;

	}
</style>
