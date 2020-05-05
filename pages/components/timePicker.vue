<template>
	<view class="pickerBox">
		<view class="flexbox">
			<view class="cancel" @tap="justClose">取消</view>
			<view class="content">预计到厂时间</view>
			<view class="sure" @tap="reSelected">确定</view>
		</view>

		<view class="tabbar">
			<view v-for="(item, index) in tablist" 
			:key="item" @tap="clickTab(index)" 
			:class="index === current ? 'timepickerbox current' : 'timepickerbox'"
			>
				{{item}}
			</view>
		</view>
		
		<!-- <view 
		class="" v-for="(item, index) in tablist"
		:key="index"
		> -->
			<picker-view 
			style="height: 300px;" 
			indicator-style="height: 36px; line-height:36px" 
			:value="value" 
			@change='"bindChange"'
			>
				<picker-view-column class="flex-col">
					<view class="item flex-center" v-for="item in timeList[current]" :key="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		data: function() {
			return {
				// 记录当前索引
				recordList: [],
				status: false,
				current: 0,
				tablist: ["年","月","日","时","分"],
				// 日期数组
				year: '',
				mouth: '',
				day: '',
				hour: '',
				minutes: '',
			}
		},
		props:['timeList'],
		methods: {
			bindChange(e) {
				if(this.current === 0) {
					this.year = e.detail.value;
				}
				console.log(this.recordList)
			},
			
			justClose() {
				this.status = true;
				this.$emit('showStatus', this.status)
			},
			
			reSelected() {
				this.status = true
				this.$emit('showStatus', this.status)
				this.$emit('listenChild', this.recordList)
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

