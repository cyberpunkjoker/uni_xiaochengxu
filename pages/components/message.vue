<template>
	<view class="warp">
		<textarea 
		v-model="message"
		maxlength="200"
		:placeholder="tipMess"
		@input="onTextChange"
		@blur="getMessage"
		/>
		<view class="right" @tap="clearText">
			<text>清空</text>
		</view>
		<view class="left">
			<text>余{{reminNum}}个字</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				reminNum: 200
			}
		},
		props:['tipMess'],
		methods: {
			clearText() {
				this.message= ""
			},
			
			onTextChange() {
				this.reminNum = 200 - this.message.length
			},
			
			getMessage() {
				this.$emit("getMess", this.message)
			}
		},
	}
</script>

<style lang="less" scoped>
	.warp {
		position: relative;
		font-size: 12px;
		font-weight: 400;
		margin: 12px 0 28px 0;
		color: rgba(153, 153, 153, 1);

		textarea {
			box-sizing: border-box;
			height: 135px;
			width: 100%;
			padding: 8px 16px;
			font-size: 14px;
			border: 1px solid rgba(242, 242, 242, 1);
		}

		.left {
			position: absolute;
			bottom: 12px;
			left: 16px;
			z-index: 3;
		}

		.right {
			position: absolute;
			bottom: 12px;
			right: 16px;
			z-index: 3;
		}
	}
</style>
