<template>
	<view class="">
		<hTimePicker sTime="1" cTime="12" interval="1" dayNum="100"  @changeTime="changeTime">
		  <view slot="pCon" class="changeTime">
		    点击选择时间
		  </view>
		</hTimePicker>
	</view>
</template>

<script>
import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
export default {
	
	data() {
		return {
			
		}
	},
	
	methods: {
		changeTime(e) {
			console.log(e)
		}
	},
	
	components: { hTimePicker }
};
</script>

<style>
</style>
