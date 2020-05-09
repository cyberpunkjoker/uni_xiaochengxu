<template>
	<view class="outer">
		<info-box>
			<view class="inner">
				<view class="title">
					<text>车辆信息填写</text>
				</view>

				<form @submit="formSubmit" @reset="formReset">
					<text class="textcon">车牌号</text>
					<view class="uni-form-item uni-column fatherbox">
						<input class="uni-input" name="carnum" v-model="carNum" placeholder="请输入车牌号" />
						<image src="../../../static/img/clear.png" mode=""
						@tap="toClearCarNo"
						></image>
					</view>

					<text class="textcon">车辆所属挂靠公司全称</text>
					<view class="uni-form-item uni-column fatherbox">
						<input class="uni-input" name="company" v-model="companyName" placeholder="请输入车辆所属挂靠公司全称" />
						<image src="../../../static/img/clear.png" mode=""
						@tap="toClearCarName"
						></image>
					</view>

				</form>

				<view class="carmode">
					<text class="textcon">点击选择车型</text>
					<view class="modeitem">
						<view v-for="(item,index) in carModeList" :key="index" @tap="chooseCar(index)" :class="index===carCurrent ? 'itemcurrent' : '' ">
							{{item}}
							<image v-if="index===carCurrent" src="../../../static/img/selected.png" mode=""></image>
						</view>
					</view>
				</view>

				<view class="carmode">
					<text class="textcon">货箱长度</text>
					<view class="modeitem">
						<view v-for="(item, idx) in carList" :key="item" :class="idx===longCurrent ? 'itemcurrent item' : 'item' " @tap="chooseLong(idx)">
							{{item}}
							<image v-if="idx===longCurrent" src="../../../static/img/selected.png" mode=""></image>
						</view>
					</view>

				</view>

				<view v-if="longCurrent===4" style="overflow: hidden; margin-bottom: 10px;">
					<input type="text" name="long" v-model="length" placeholder="请输入其他货箱长度" class="long" /><text class="mi">米</text>
				</view>

			</view>
		</info-box>

		<button form-type="submit" class="submitbtn" @click="addCarInfo">提交</button>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	export default {
		data() {
			return {
				carModeList: ['自翻卸车', '四轴车', '六轴车'],
				carList: ['9米以内', '9.6米', '11米', '13米', '其他'],
				// 上传长度
				upLength: [9, 9.6, 11, 12],
				// 当前选中状态
				carCurrent: 0,
				longCurrent: 0,
				// 表当绑定值
				carNum: '',
				companyName: '',
				length: null
			}
		},

		methods: {
			formSubmit(e) {
				const carNo = e.detail.value.carnum;
				const company = e.detail.value.company;
				const long = e.detail.value.long;

				console.log(carNo, company, long)
				if (phone.length !== 11 || code.length === 0) {
					uni.showModal({
						content: '请确认手机号和验证码是否输入正确',
						showCancel: false
					});
				}
			},

			toClearCarNo() {
				this.carNum = ''
			},
			
			toClearCarName() {
				this.companyName = ''
			},

			// 页面跳转表单验证部分
			toStatusPage() {
				// this.$router.push('/')
			},

			chooseCar(i) {
				this.carCurrent = i;
			},

			chooseLong(i) {
				this.longCurrent = i;
			},
			isLicensePlate(str) {
				return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(str);
			},
			// 添加车辆信息
			async addCarInfo() {
				// 正则验证车牌,验证通过返回true,不通过返回false
				const isTrue =  this.isLicensePlate(this.carNum)
				if(!isTrue) {
					uni.showModal({
						content: "请输入正确车牌号"
					})
				}
				
				//判断length的值
				let length = (this.longCurrent === 4 && Number(this.length)) || this.upLength[this.longCurrent]
				
				const opts = {
					url: '/sc/carMng/addCar',
					method: 'post'
				}

				const param = {
					carNo: this.carNum,
					carType: this.carCurrent + 1,
					companyName: this.companyName,
					containerLength: length
				}

				// console.log(param)

				// console.log(res)
				// console.log(res.data.code)
				
				res.data.code === 1 &&
					uni.showModal({
						content: res.data.desc
					})
				
				res.data.code === 0 &&
					uni.reLaunch({
						url: "/pages/home/home"
					})
			}
		},

		components: {
			infoBox
		}


	}
</script>

<style lang="less" scoped>
	.item {
		box-sizing: border-box;
		height: 34px;
		margin-bottom: 20px;
	}

	.itemcurrent {
		border-radius: 4px;
		border: 1px solid rgba(255, 191, 37, 1);

		image {
			position: absolute;
			bottom: 0;
			right: 0;
			display: block;
			width: 16px;
			height: 16px;
		}
	}

	.mi {
		line-height: 40px;
		padding: 0 10px;
	}

	.long {
		float: left;
		width: calc(100% - 40px);
	}

	.outer {
		padding-top: 10px;

		.inner {
			padding: 12px 16px;

			.title {
				font-size: 16px;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

		}

		.textcon {
			display: block;
			padding: 20px 0 12px 0;
			font-size: 14px;
			font-weight: 400;
		}

		.fatherbox {
			position: relative;

			image {
				position: absolute;
				right: 18px;
				top: 10px;
				width: 20px;
				height: 20px;
				z-index: 3;
			}
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

		.carmode {
			overflow: hidden;

			.modeitem {
				view {
					position: relative;
					float: left;
					padding: 8px 16px;
					margin-right: 20px;
					font-size: 12px;
					font-weight: 400;
					background-color: #F6F6F4;
					border-radius: 4px;
				}
			}
		}
	}



	.submitbtn {
		margin-top: 100px;
		margin-bottom: 20px;
		font-size: 16px;
		width: 295px;
		height: 48px;
		background: rgba(255, 203, 41, 1);
		box-shadow: 0px 4px 20px 4px rgba(255, 203, 41, 0.2);
		border-radius: 7px;
		line-height: 48px;
	}
</style>
