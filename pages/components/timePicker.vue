<template>
	<view class="pickerBox">
		<view class="flexbox">
			<view class="cancel" @tap="justClose">取消</view>
			<view class="content">预计到厂时间</view>
			<view class="sure" @tap="reSelected">确定</view>
		</view>

		<view class="tabbar">
			<view v-for="(item, index) in tablist" :key="item" @tap="clickTab(index)" :class="index === current ? 'timepickerbox current' : 'timepickerbox'">
				{{item}}
			</view>
		</view>

		<view v-for="(item, index) in timeList" :key="index" v-if="index === current">
			<picker-view 
			style="height: 300px;" 
			indicator-style="height: 36px; line-height:36px" 
			@change="bindChange"
			selected = 0
			 :value="value">
				<picker-view-column class="flex-col">
					<view class="item flex-center" v-for="item in timeList[current]" :key="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>

</template>

<script>
	export default {
		data: function() {
			return {
				// 记录当前索引
				recordList: [],
				status: false,
				current: 0,
				tablist: ["年", "月", "日", "时", "分"],
				pickList: [{
						doSome: "doSomg1"
					},
					{
						doSome: "doSomg2"
					},
					{
						doSome: "doSomg3"
					},
					{
						doSome: "doSomg4"
					},
					{
						doSome: "doSomg5"
					},
				],
				// 日期数组
				year: '',
				mouth: '',
				day: '',
				hour: '',
				minutes: '',
				timeArr: [],
				value: [0]
			}
		},
		props: ['timeList'],
		methods: {
			isEmpty(obj) {
			    for(var key in obj) {
			       if(obj.hasOwnProperty(key))
			           return false;
			       }
			    return true;
			},
			bindChange(e) {
				const doSomes = this.pickList[this.current].doSome;
				this[doSomes](e);
				console.log(e)
				console.log(this.timeArr)
			},

			doSomg1(e) {
				console.log(e)
				const year = e.detail.value;
				this.timeArr[0] =year
			},
			doSomg2(e) {
				const mouth = e.detail.value;
				this.timeArr[1] =mouth
			},
			doSomg3(e) {
				const day = e.detail.value;
				this.timeArr[2] =day
			},
			doSomg4(e) {
				const hour = e.detail.value;
				this.timeArr[3] =hour
			},
			doSomg5(e) {
				const minutes = e.detail.value;
				this.timeArr[4] =minutes
			},

			justClose() {
				this.status = true;
				this.$emit('showStatus', this.status)
			},

			reSelected() {
				this.status = true
				this.$emit('showStatus', this.status)
				
				let isture = false;
				
				console.log(this.timeArr)
				
				// this.timeArr.map((item,index)=>{
					if (this.timeArr.length !==5) {
						isture = true;
						console.log(isture);
					} 
				// })
				
				if(isture) {
					uni.showToast({
						title: "请重新选择时间",
						icon: "none"
					})
				}else{
					this.$emit("showSeletedTime", this.timeArr)
				}
				
			},

			clickTab(index) {
				this.current = index;
				console.log(this.current)
			},
		}
	}
</script>

<style lang="less" scoped>
	.input-flex-select {
		width: 100%;
	}

	.pickerBox {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		padding: 20px 20px;
		background-color: #fff;
		text-align: center;
	}

	.flexbox {
		display: flex;
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #F2F2F2;
	}

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

	.tabbar {
		height: 40px;
		display: flex;
		border-bottom: 1px solid #F2F2F2;

		.timepickerbox {
			flex: 1;
		}

		.current {
			border-bottom: 4px solid #FFCB29;
		}
	}
</style>
