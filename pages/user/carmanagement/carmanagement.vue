<template>
	<view>
		<view class="outer">
			<info-box>
				<view class="itembox">
					<text class="one">车牌号：{{carNum}}</text>
				</view>

				<view class="itembox">
					<text class="one">车辆所属挂靠公司</text>
					<view class="two">
						<text class="content">成都德格隆贸易有限公司</text>
					</view>
				</view>

				<view class="itembox">
					<text class="one">车型</text>
					<view class="two">
						<text class="content">sddsd</text>
					</view>
				</view>
				
				<view class="itembox">
					<text class="one">货箱长度</text>
					<view class="two">
						<text class="content">sddsd</text>
					</view>
				</view>

			</info-box>
		</view>

	</view>
</template>

<script>
	import infoBox from "../../components/boxstyle/infobox.vue"

	export default {
		data() {
			return {
				carNum: "dshdjsd"
			}
		},

		methods: {

		},

		components: {
			infoBox
		}


	}
</script>

<style lang="less" scoped>
	text {
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 14px;
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
