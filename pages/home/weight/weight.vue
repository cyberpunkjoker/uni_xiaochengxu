<template>
	<view>
		<view class="timebox">
			<text>{{userInfo.createTime}}</text>
		</view>
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
				<view class="one">
					<text>收货地址：</text>
					<image class="addr" src="../../../static/img/shouhuo.png" mode=""></image>
				</view>
				<view class="two" @tap="showTip(userInfo.destination)">
					<text class="content">{{userInfo.destination.slice(0,10)}}...</text>
					<image src="../../../static/img/right.png" mode=""></image>
				</view>
			</view>
		</info-box>

		<!-- 重量填写部分 -->
		<view class="outer">
			<info-box>
				<view class="threecolsbox">
					<view class="thctitle">
						<text>选择物料规格型号进行重量填写</text>
					</view>

					<view class="outsidebox" v-for="(item, index) in goodsDetailList" @tap="chooseItem(index)" :key="index" @click="open">
						<view class="clos left">
							<view>名称：<text>{{item.materialName}}</text></view>
							<view>规格：<text>{{item.materialType}}</text></view>
						</view>
						<view class="clos middle">
							<view>数量：<text>{{item.materialNum}}</text></view>
							<view>重量：<text>{{valueArr[index]!=="" ? valueArr[index]+"吨": "未填写"}}</text></view>
						</view>
						<view class="clos right">
							<image :src="selectedList[index] ? image[1] : image[0]">
							</image>
						</view>
					</view>
				</view>

			</info-box>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="tips">
				<view class="poptop">
					<view class="title">
						<text>填写物料重量</text>
						<image src="../../../static/img/cha.png" mode="" @tap="close"></image>
					</view>
				</view>
				<view class="outer">
					<view class="outsidebox none">
						<view class="clos middle">
							<view>名称：<text>{{name}}</text></view>
							<view>规格：<text>{{size}}</text></view>
						</view>
						<view class="clos middle">
							<view>数量：<text>{{num}}</text></view>
							<view>重量：<text>{{newWeight}}</text></view>
						</view>
					</view>
				</view>

				<view class="container">
					<input class="inputcontent" v-model="newWeight" type="digit" @blur="changeNum" placeholder="请输入物料重量" />
					<input v-model="seconedWeight" type="digit" @blur="changeNum2" placeholder="请再次输入物料重量" />
				</view>
				<view class="btnouter" @tap="toPages">
					<btn>确认</btn>
				</view>

			</view>
		</uni-popup>

		<!-- 按钮提交 -->
		<view style="margin-top: 20px;">
			<btn @tap="submitBtn">提交</btn>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import infoBox from "../../components/boxstyle/infobox.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"
	import "../../../common/itemcontent.css"
	import "../../../common/threecols.css"

	export default {
		data() {
			return {
				// 控制选中状态
				image: ['../../../static/img/weixuan.png', '../../../static/img/xuanzhong.png'],
				formList: [1, 2, 3, 4],
				// 控制按钮是否选中
				selectedList: [],
				// 当前选中状态
				current: '',
				userInfo: '',
				// 订单id
				id: '',
				// 获取货物详情列表
				goodsDetailList: [],
				newWeight: '',
				seconedWeight: '',
				// 填写框内的内容
				name: '',
				num: '',
				size: '',
				weight: '',
				// 父组件上的值
				valueArr: [],
				longitude: null,
				latitude: null
			}
		},

		methods: {
			isTureNum(str) {
				return /^\d+(\.\d{1,2})?$/.test(str)
			},
			
			changeNum(e) {
				if(!this.isTureNum(this.newWeight)) {
					this.newWeight = Number(e.detail.value).toFixed(2);
					uni.showToast({
						title: "请输入两位以内的小数",
						icon: "none"
					})
				} 
				if (e.detail.value > 100) {
					this.newWeight = 99.99;
					// this.newWeight = Number(e.detail.value).toFixed(2);
					uni.showToast({
						title: "重量不能超过100吨",
						icon: "none"
					})
				}
			},
			
			changeNum2() {
				if(Number(this.seconedWeight) !== Number(this.newWeight)) {
					// this.seconedWeight = this.newWeight;
					uni.showToast({
						title: "请确保两次值相同",
						icon: "none"
					})
				}
			},
			
			showTip(i) {
				uni.showModal({
					content: i
				})
			},
			chooseItem(i) {
				// 置空选中状态
				this.selectedList = new Array(this.formList.length).fill(false)
				this.$set(this.selectedList, i, !this.selectedList[i])
				this.current = i;
				this.name = this.goodsDetailList[this.current].materialName
				this.num = this.goodsDetailList[this.current].materialType
				this.size = this.goodsDetailList[this.current].materialNum
			},

			// 打开下边栏
			open(index) {
				console.log(index)
				this.$refs.popup.open()
			},

			toPages(index) {
				if (Number(this.newWeight) === Number(this.seconedWeight)) {
					this.$set(this.valueArr, this.current, this.newWeight)
					// this.valueArr[this.current] = this.newWeight;
					this.$refs.popup.close()
				}else {
					uni.showToast({
						title: "请确保两次输入同样的值",
						icon: "none"
					})
				}
				
			},

			close() {
				this.$refs.popup.close()
			},

			// 获取货物详情
			async getGoodsInfo() {
				const opts = {
					url: '/personal/driver/getDetails?orderId=' + this.id,
					method: 'post'
				};
				const res = await this.$http.httpTokenRequest(opts);
				this.goodsDetailList = res.data.result.materielDetails;
				console.log(this.goodsDetailList)

				this.valueArr = new Array(this.goodsDetailList.length).fill('');
				this.userInfo = res.data.result;
			},

			async submitBtn() {
				uni.showLoading({});
				let copyList = this.goodsDetailList.concat();

				copyList.map((i, idx) => {
					// copyList[idx].materielName = this.goodsDetailList[idx].materialName
					// copyList[idx].materielNumber = this.goodsDetailList[idx].materialNum
					// copyList[idx].materielSpecifications = this.goodsDetailList[idx].materialType
					copyList[idx].materialWeight = this.valueArr[idx];
				})
				
				if(this.longitude === null) {
					uni.hideLoading()
					this.reGetLocation();
					uni.showModal({
						content: "请开启定位服务"
					})
				} else {
					const location = this.longitude+ "," + this.latitude;
					console.log(location);
					const opts = {
						url: '/personal/driver/modTaskAppRecord',
						method: 'post',
					}
					const params = {
						id: this.id,
						materielDetails: copyList,
						location: location
					}
					
					console.log(params)
					// 控制重量填写和是否超过的参数
					let istrue = false;
					let overWeight = false;
					
					this.valueArr.map((item, index) => {
						if (item === "") {
							istrue = true;
						}
						if (item > 100) {
							overWeight = true;
						}
					})
					
					if (overWeight) {
						setTimeout(() => {
							uni.hideLoading({})
							uni.showModal({
								content: "填写的物料重量请小于100吨"
							})
						}, 700)
					} else {
						if (istrue) {
							setTimeout(() => {
								uni.hideLoading({})
								uni.showModal({
									content: "请填写物料重量"
								})
							}, 700)
						} else {
							const res = await this.$http.httpTokenRequest(opts, params);
							if (res.data.code === 0) {
								uni.hideLoading({});
								uni.navigateBack({
									delta: 1
								})
							}
						}
					}
				}
			},
			
			reGetLocation() {
				uni.showToast({
					title: "正在重新获取定位请稍后..",
					icon: "none"
				})
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude)
						that.longitude = res.longitude;
						console.log('当前位置的纬度：' + res.latitude);
						that.latitude = res.latitude;
						uni.hideToast({});
					}
				})
			},
			
			getLocation() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude)
						that.longitude = res.longitude;
						console.log('当前位置的纬度：' + res.latitude);
						that.latitude = res.latitude;
					}
				})
			}
		},


		onLoad(options) {
			this.id = options.id
			this.getGoodsInfo();
			this.getLocation();
		},

		components: {
			infoBox,
			uniPopup,
			btn
		}
	}
</script>

<style lang="less" scoped>
	.tips {
		// height: 300px;
		background-color: #fff;

	}

	.title {
		position: relative;
		margin: 0 16px;
		font-size: 16px;
		height: 70px;
		line-height: 70px;
		text-align: center;
		border-bottom: 1px solid #F2F2F2;

		image {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translate(0, -50%);
			width: 20px;
			height: 21px;
		}
	}

	.none {
		border: none;
	}

	input {
		box-sizing: border-box;
		height: 40px;
		padding: 0 16px;
		font-size: 14px;
		font-weight: 400;
		background-color: #F6F6F4;
		color: #999999;
		border-radius: 4px;
	}

	.container {
		margin: 64px 16px 32px;
	}

	.outer {
		margin-top: 16px;
	}

	.btnouter {
		padding-bottom: 20px;
	}
	
	.inputcontent {
		margin-bottom: 20px;
	}
</style>
