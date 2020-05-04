<template>
	<view>
		<view class="timebox">
			<text>2020年11月10日12:00</text>
		</view>
		<info-box>
			<view class="itembox" @tap="firstClick">
				<text class="one">车牌号：{{carnum}}</text>
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
					<text class="content">四川省达州市熊猫区望江镇备份 2</text>
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
					v-for="(item, index) in formList"
					@tap="chooseItem(index)"
					:key="index"
					@click="open"
					>
						<view class="clos left">
							<view>名称：<text>三级螺纹钢定尺9米</text></view>
							<view>规格：<text>dsdad</text></view>
						</view>
						<view class="clos middle">
							<view>数量：<text>dsdad</text></view>
							<view>重量：<text>dsdad</text></view>
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
		<uni-popup ref="popup" type="bottom">
			<view class="tips">
				<view class="poptop">
					<view class="title">
						<text>填写物料重量</text>
						<image src="../../../static/img/cha.png" mode=""
						 @tap="close"
						></image>
					</view>
				</view>
				<view class="outer">
					<view class="outsidebox none">
						<view class="clos left">
							<view>名称:<text>dsdad</text></view>
							<view>规格:<text>dsdad</text></view>
						</view>
						<view class="clos middle">
							<view>数量:<text>dsdad</text></view>
							<view>重量:<text>dsdad</text></view>
						</view>
					</view>
				</view>
			
				<view class="container">
					<input type="text" value="" placeholder="请输入物料重量"/>
				</view>
				<view class="btnouter">
					<btn @tap="close">确认</btn>
				</view>
			
			</view>
		</uni-popup>
	
		<!-- 按钮提交 -->
		<view style="margin-top: 20px;">
			<btn>提交</btn>
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
				formList: [1,2,3,4],
				// 控制按钮是否选中
				selectedList: [],
				// 当前选中状态
				current: ''
			}
		},

		methods: {
			chooseItem(i) {
				// 置空选中状态
				this.selectedList = new Array(this.formList.length).fill(false)
				this.$set(this.selectedList, i , !this.selectedList[i])
			},

			// 打开下边栏
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		},
		onLoad() {
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
