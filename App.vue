<script>
export default {
	data(){
		return {
			// 获取经纬度
			longitude: '',
			latitude: ""
		}
	},
	methods: {
		getLocation() {
			var that = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude)
					that.longitude = res.longitude;
					console.log('当前位置的纬度：' + res.latitude);
					that.latitude = res.latitude;
				}
			})
		},
		
		async subUserInfo() {
			const info = this.longitude + "," + this.latitude;
			console.log(info);
			const opts = {
				url: "/personal/driver/addPoints",
				method: "post"
			}
			const params = {
				location: info
			}
			console.log(params)
			const res = await this.$http.httpTokenRequest(opts, params);
			console.log(res);
		
		},
	},
	onLaunch: function() {
		
	},
	onShow: function() {
		this.getLocation();
		setTimeout(()=>{
			this.getLocation
		},1000)
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
