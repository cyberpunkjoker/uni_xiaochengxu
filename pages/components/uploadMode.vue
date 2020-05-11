<template>
	<view>
		<view class="upload">
			<view v-for="(item,index) in imgList" :key="index" @click="chooseImg(index)" class="outerbox">
				<view v-if="!imagePathList[index]" class="add">
					<view class="spacer1"></view>
					<view class="spacer2"></view>
				</view>

				<view v-if="imagePathList[index]" class="addimg">
					<image :src="imagePathList[index][0]"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				reminNum: 200,
				// 图片存放地址
				imagePathList: [],
				// 每个图片的路径（解决了数据监控不到的问题）
				// 提交的数据
				imagePath: [],
				realPathList:[],
				// 控制盒子数量
				imgList: ['']
			}
		},

		methods: {
			chooseImg(i) {
				uni.chooseImage({
					count: 3,
					sizeType: "original",
					success: (res) => {
						this.imagePathList[i] = res.tempFilePaths;
											
						this.$set(this.imagePath, i, res.tempFilePaths[0])
											
						this.imgList.length !== 3 && this.imgList.push('');
						console.log(this.imagePath)
						
						//因为有一张图片， 输出下标[0]， 直接输出地址
						var imgFiles = res.tempFilePaths[0]
						// 上传图片
						// 做成一个上传对象
						let token = uni.getStorageSync('USER_TOKEN');
						let that = this;
						var uper = uni.uploadFile({
							// 需要上传的地址
							// url: 'https://scwl.huicsy.com/upload/picture',
							url:"http://192.168.0.104:8001/upload/picture",
							header: {
								'Token': token,
								'Content-Type': 'multipart/form-data',
								'Accept': 'application/json'
							},
							// filePath  需要上传的文件
							filePath: imgFiles,
							name: 'file',
							success(res1) {
								// 显示上传信息
								const realPath = JSON.parse(res1.data).result
								that.realPathList[i] = realPath
								console.log(res1)
								console.log(that.realPathList[i])
							}
						});

					}
				})
			this.$emit("showPath", this.realPathList)
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.upload {
		padding-bottom: 10px;
		height: 75px;

		.outerbox {
			float: left;
			margin-right: 20px;
		}

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




	.addimg {
		width: 69px;
		height: 69px;

		image {
			width: 69px;
			height: 69px;
		}
	}
</style>
