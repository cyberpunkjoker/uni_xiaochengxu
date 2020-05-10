<!-- <template>
	<view>
		<view class="dynamic">
			<button 
			v-for="(item,index) in list" 
			:key="index" 
			v-on:tap="handleClick(item.doSome,index)"
			>
			我的是动态元素--{{item.doSome}}
			</button>
		</view>
		<button @click="allClick">双点所有按钮失效</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
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
					{
						doSome: "doSomg6"
					}
				],
				// eventName: "click",
				newArrys: new Array(5),
			};
		},
		mounted() {
			var s = new Array(5);
			console.log(this.newArrys);
		},
		methods: {
			handleClick(i, inedx) {
				let doSomes = i;
				console.log(this);
				console.log(i)
				// this[doSomes] === this.doSomg1 ....中的每一项。
				// 这里就是映射，点击每一项的时候调用下面对应的函数。
				this[doSomes](inedx);
			},
			doSomg1(inedx) {
				this.newArrys[inedx] = !this.newArrys[inedx];
				if (this.newArrys[inedx]) {
					console.log("doSomg1", this.newArrys[inedx]);
				}
			},
			doSomg2(inedx) {
				console.log("doSomg2");
			},
			doSomg3(inedx) {
				console.log("doSomg3");
			},
			doSomg4(inedx) {
				console.log("doSomg4");
			},
			doSomg5(inedx) {
				console.log("doSomg5");
			},
			doSomg6(inedx) {
				console.log("doSomg6");
			},
			allClick() {
				this.eventName == 'click' ? this.eventName = null : this.eventName = 'click'
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
 -->