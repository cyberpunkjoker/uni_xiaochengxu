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
					
					<view class="outsidebox" 
					v-for="(item, index) in goodsDetailList" 
					@tap="chooseItem(index)" 
					:key="index"
					@click="open"
					>
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
						<view class="clos left">
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
					<input type="text" v-model="newWeight" placeholder="请输入物料重量" />
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
				// 填写框内的内容
				name: '',
				num: '',
				size: '',
				weight: '',
				// 父组件上的值
				valueArr: [],
				// popupList:['popup1', 'popup2']
			}
		},

		methods: {
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
				this.$set(this.valueArr, this.current, this.newWeight)
				// this.valueArr[this.current] = this.newWeight;
				this.$refs.popup.close()
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
				// let copyList = new Array(this.goodsDetailList.length).fill({});
				let copyList = this.goodsDetailList.concat();

				copyList.map((i, idx) => {
					// copyList[idx].materielName = this.goodsDetailList[idx].materialName
					// copyList[idx].materielNumber = this.goodsDetailList[idx].materialNum
					// copyList[idx].materielSpecifications = this.goodsDetailList[idx].materialType
					copyList[idx].materialWeight = this.valueArr[idx];
				})
				
				console.log(copyList)
				
				const opts = {
					url: '/personal/driver/modTaskAppRecord',
					method: 'post',
				}
				const params = {
					id: this.id,
					materielDetails: copyList
				}
					
				console.log(params)
				const res = await this.$http.httpTokenRequest(opts, params);
				console.log(res)
				res.data.code === 0 &&
					uni.navigateBack({
						delta: 1
					})
			}
		},
		
		onShow() {
			this.getGoodsInfo()
		},

		onLoad(options) {
		    this.id = options.id
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
</style>
