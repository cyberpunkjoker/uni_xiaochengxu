<template>
	<view>
		<view class="timebox">
			<text>{{userInfo.createTime}}</text>
		</view>
		<info-box>
			<view class="itembox" @tap="firstClick">
				<text class="one">车牌号：{{userInfo.carNo}}</text>
				<view class="two">
					<text class="content red fontsize12">查看详情</text>
					<image src="../../../static/img/right.png"></image>
				</view>
			</view>

			<view class="itembox">
				<text class="one">订单号</text>
				<view class="two">
					<text class="content">1111211415415</text>
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
							<view>名称：<text>{{item.materielName}}</text></view>
							<view>规格：<text>{{item.materielSpecifications}}</text></view>
						</view>
						<view class="clos middle">
							<view>数量：<text>{{item.materielNumber}}</text></view>
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

		<!-- pick弹窗部分 -->
		
	<!-- 	<view 
		v-for="(item,index) in valueArr"
		:key="index"
		> -->
		
		<!-- 改动态绑定popup的问题，不行就自己封装一个 -->
		
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
						<input type="text" v-model="newWeight" @input="onChange" placeholder="请输入物料重量" />
					</view>
					<view class="btnouter" @tap="toPages" >
						<btn >确认</btn>
					</view>
			
				</view>
			</uni-popup>
		<!-- </view> -->
		
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
				id: 4,
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
			chooseItem(i) {
				// 置空选中状态
				this.selectedList = new Array(this.formList.length).fill(false)
				this.$set(this.selectedList, i, !this.selectedList[i])
				this.current = i;
				this.name = this.goodsDetailList[this.current].materielName
				this.num = this.goodsDetailList[this.current].materielSpecifications
				this.size = this.goodsDetailList[this.current].materielNumber
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
			
			onChange() {
				
				console.log(this.fatherValue, this.newWeight)
			},

			async getOrderInfo() {
				const opts = {
					url: '/personal/driver/getTaskAppRecord',
					method: 'post'
				};

				const res = await this.$http.httpTokenRequest(opts);
				console.log(res);
				this.userInfo = res.data.result;
			},

			// 获取货物详情
			async getGoodsInfo() {
				const opts = {
					url: '/personal/driver/getDetails?orderId='+this.id,
					method: 'post'
				};
				
				const res = await this.$http.httpTokenRequest(opts);
				console.log(res);
				this.goodsDetailList = res.data.result.materielDetails;
				
				this.valueArr = new Array(this.goodsDetailList.length).fill('');
				// this.userInfo = res.data.result;
			},
			
			async submitBtn() {
				console.log(this.goodsDetailList)
				console.log(this.valueArr)
				let copyList = this.goodsDetailList.concat();
				
				console.log(copyList);
				console.log(copyList === this.goodsDetailList);
				
				copyList.map((i, idx)=>{
					copyList.materielWeight = this.valueArr[idx];
				})
				const opts = {
					url: '/personal/driver/modTaskAppRecord',
					method: 'post',
				}
				const params = {
					id: this.id,
					materielDetails: copyList
				}
				console.log(params)
				const res = await this.$http.httpTokenRequest(opts,params);
				console.log(res);
				
				
				res.data.code === 0 && 
				uni.navigateTo({
					url: '/pages/home/home'
				})
			}
		},


	onLoad() {
			this.getOrderInfo();
			this.getGoodsInfo();
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
