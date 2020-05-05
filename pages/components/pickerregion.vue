<template>
	<view class="pickerBox">
		<view class="flexbox">
			<view class="cancel" @tap="justClose">取消</view>
			<view class="content">{{title}}</view>
			<view class="sure" @tap="reSelected">确定</view>
		</view>

		<picker-view style="height: 300px;" indicator-style="height: 36px; line-height:36px" :value="value" @change="bindChange">
			<picker-view-column class="flex-col">
				<view class="item flex-center" v-for="item in []" :key="item">{{item}}</view>
			</picker-view-column>
			<picker-view-column class="flex-col">
				<view class="item flex-center" v-for="item in dataList" :key="item">{{item}}</view>
			</picker-view-column>
			<picker-view-column class="flex-col">
				<view class="item flex-center" v-for="item in []" :key="item">{{item}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		name: "picker-region",
		props: ['dataList','title'],
		data: function() {
			return {
				// 记录当前索引
				recordList: [],
				status: false,
			}
		},

		methods: {
			bindChange(e) {
				this.recordList = e.detail.value;
			},
			
			justClose() {
				this.status = true;
				this.$emit('showStatus', this.status)
			},
			
			reSelected() {
				this.status = true
				this.$emit('showStatus', this.status)
				this.$emit('listenChild', this.recordList)
			}
		}
	}
</script>

<style>
	.input-flex-select {
		width: 100%;
	}

	.pickerBox {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		padding: 10px 20px;
		background-color: #fff;
		text-align: center;
	}

	.flexbox {
		display: flex;
		margin-bottom: 20px;
		padding-bottom: 24px;
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
</style>
