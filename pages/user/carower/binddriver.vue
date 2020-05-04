<template>
	<view>
		<view class="outer">
			<info-box>
				<view class="itembox">
					<text class="one">司机信息</text>
					<view class="two">
						<text class="content red">解除绑定</text>
						<image src="../../../static/img/right.png" mode=""></image>
					</view>
				</view>
				
				<view class="itembox">
					<text class="one">姓名</text>
					<view class="two">
						<text class="content">成都德格隆贸易有限公司</text>
					</view>
				</view>
				
				<view class="itembox">
					<text class="one">手机号</text>
					<view class="two">
						<text class="content redbig">sddsd</text>
					</view>
				</view>
								
			</info-box>
			
			
			<view class="btntop">
				<btn>添加司机</btn>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"
	import btn from "../../components/boxstyle/buttonstyle.vue"
	
	export default {
		data() {
			return {

			}
		},

		methods: {

		},

		components: {
			infoBox,
			btn
		}


	}
</script>

<style lang="less" scoped>
	text {
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 14px;
	}

	// 公共样式部分
	.redbig {
		color: #FE5000;
		font-size: 14px;
	}

	.blue {
		color: #29C9FF;
	}

	.red {
		font-size: 12px;
		color: #FE5000;
	}

	.green {
		color: #79D66D;
	}

	.outer {
		margin-top: 12px;
		.itembox {
			height: 52px;
			border-bottom: 1px solid #F2F2F2;
			.one {
				float: left;
				margin-left: 16px;
				line-height: 52px;
			}

			.two {
				float: right;
				image {
					display: block;
					float: right;
					margin: 20px 16px 0 0;
					width: 8px;
					height: 14px;
				}
				text {
					line-height: 52px;
					margin: 0 16px;
				}
			}


		}
	}

	.btntop {
		margin-top: 100px;
	}
</style>
