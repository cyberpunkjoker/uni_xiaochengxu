<template>
	<view>
		<view class="outer">
			<view class="bigbox">
				<info-box>
					<view v-for="(item, index) in bindDriverList" :key="index">
						<view class="itembox" @tap="deleteDriver(item)">
							<text class="one">司机信息</text>
							<view class="two">
								<text class="content red">解除绑定</text>
								<image src="../../../static/img/right.png" mode=""></image>
							</view>
						</view>

						<view class="itembox">
							<text class="one">姓名</text>
							<view class="two">
								<text class="content">{{item.name}}</text>
							</view>
						</view>

						<view class="itembox">
							<text class="one">手机号</text>
							<view class="two">
								<text class="content redbig">{{item.phone}}</text>
							</view>
						</view>
					</view>

				</info-box>

			</view>
			<view class="btntop">
				<btn @tap='addDriver'>添加司机</btn>
			</view>

		</view>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"
	import "../../../common/itemcontent.css"
	import {
		parseQueryString
	} from "../../../utils/query.js"

	export default {
		data() {
			return {
				carId: '',
				bindDriverList: []
			}
		},

		methods: {
			async getBindInfo() {
				const opts = {
					url: "/sc/driverMng/getDriverByPage",
					method: "post"
				}
				const param = {
					current: 0,
					data: {
						id: Number(this.carId)
					}
				}
				const res = await this.$http.httpTokenRequest(opts, param);
				console.log(res)

				if (res.data.result.records.length === 0) {
					uni.redirectTo({
						url: "/pages/user/carower/adddriver?id=" + this.carId
					})
				} else {
					this.bindDriverList = res.data.result.records;
				}
			},

			async deleteDriver(item) {
				console.log()
				const param = {
					carId: this.carId,
					driverId: item.dirverId
				}
				const info = parseQueryString(param)

				const opts = {
					url: "/sc/driverMng/unBindDriver" + info,
					method: "post"
				}

				const res = await this.$http.httpTokenRequest(opts);
				if (res.data.desc !== "操作成功") {
					uni.showModal({
						content: "解绑失败请重试"
					})
				}

				console.log(res)
			},

			addDriver() {
				uni.navigateTo({
					url: "/pages/user/carower/adddriver?id=" + this.carId
				})

			}
		},
		onLoad(optios) {
			this.carId = optios.id;
			this.getBindInfo();
		},
		components: {
			infoBox,
			btn
		}
	}
</script>

<style lang="less" scoped>
	.outer {
		margin-top: 12px;
	}

	.btntop {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 83px;
		padding-top: 20px;
		background: rgba(250, 250, 250, 1);
	}

	.bigbox {
		margin-bottom: 100px;
	}
</style>
