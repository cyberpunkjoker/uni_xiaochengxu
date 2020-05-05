<template>
	<view>
		<view class="upload" @click="chooseImg">
			<view class="add">
				<view class="spacer1"></view>
				<view class="spacer2"></view>
			</view>
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
		
		methods: {
			chooseImg() {
				uni.chooseImage({
					count:1,
					sizeType: "original",
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.previewImage({
				        	urls: tempFilePaths,
				        })
						
						
						// uni.uploadFile({
				        //     url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
				        //     filePath: tempFilePaths[0],
				        //     name: 'file',
				        //     formData: {
				        //         'user': 'test'
				        //     },
				        //     success: (uploadFileRes) => {
				        //         console.log(uploadFileRes.data);
				        //     }
				        // });
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.upload {
		padding-bottom: 10px;

		.add {
			position: relative;
			width: 69px;
			height: 69px;
			border: 1px dashed #000;

			.spacer1 {
				width: 1px;
				height: 25px;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				background-color: #000;
			}

			.spacer2 {
				width: 25px;
				height: 1px;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				background-color: #000;
			}
		}
	}
</style>
