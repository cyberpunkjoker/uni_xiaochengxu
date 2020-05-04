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
						<image src="../../../static/img/clear.png" mode="" @tap="clearCarNo"></image>
					</view>

					<text class="textcon">车辆所属挂靠公司全称</text>
					<view class="uni-form-item uni-column fatherbox">
						<input class="uni-input" name="company" v-model="companyName" placeholder="请输入车辆所属挂靠公司全称" />
						<image src="../../../static/img/clear.png" mode="" @tap="clearCompanyName"></image>
					</view>

				</form>

				<view class="carmode">
					<text class="textcon">点击选择车型</text>
					<view class="modeitem">
						<view v-for="(item,index) in carModeList" :key="index" @tap="chooseCar(index)" :class="index===carCurrent ? 'itemcurrent' : '' ">
							{{item}}
							<image v-if="carCurrent===index" src="../../../static/img/selected.png" mode=""></image>
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

		<button class="submitbtn" @click="modifyInfo">提交</button>

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
				length: null,
				// 上个页面的数据
				info: null
			}
		},

		methods: {
			// 表单清空
			clearCarNo() {
				this.carNum = ''
			},

			clearCompanyName() {
				this.companyName = ''
			},

			chooseCar(i) {
				this.carCurrent = i;
			},

			chooseLong(i) {
				this.longCurrent = i;
			},

			// 初始化页面数据
			initPage() {
				this.carNum = this.info.carNo;
				this.companyName = this.info.companyName;
				this.carCurrent = Number(this.info.carType);
				this.longCurrent = 4;
				this.length = this.info.containerLength;
				this.upLength.some((i, index) => {
					if (i === Number(this.info.containerLength)) {
						this.longCurrent = index;
						this.length = '';
					}
				})
			},

			// 提交修改信息
			async modifyInfo() {
				const opts = {
					url: '/sc/carMng/modCar',
					method: 'post'
				};

				let length = (this.longCurrent === 4 && Number(this.length)) || this.upLength[this.longCurrent]

				const params = {
					carId: Number(this.info.carId),
					carNo: this.carNum,
					carType: this.carCurrent + 1,
					companyName: this.companyName,
					containerLength: length
				};

				if (this.longCurrent === 4 && Number(this.length) < 9) {
					uni.showModal({
						content: '请输入长度大于9的车辆信息',
						showCancel: false
					});
				} else {
					const res = await this.$http.httpTokenRequest(opts, params);
					console.log(res)
					if (res.data.desc !== "操作成功") {
						uni.showModal({
							content: res.data.desc,
							showCancel: false
						})
					}
					// 保证长度大于9
					else {
						uni.navigateTo({
							url: "/pages/user/carower/managementcar"
						})
						uni.showToast({
							content: this.data.desc
						})
					}
				}





			}
		},

		onLoad(options) {
			this.info = options;
			this.initPage();
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
				z-index: 2;
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
