<template>
		<button form-type="submit" class="submitbtn" @tap="toPages">
			<slot></slot>
		</button>
</template>

<script>
	export default {
			data() {
				return {
					
				}
			},
			
			props:["toPages"],
			methods: {
				
			},
		}
</script>

<style>
	.submitbtn {
		font-size: 16px;
		width: 295px;
		height: 48px;
		background: rgba(255, 203, 41, 1);
		box-shadow: 0px 4px 20px 4px rgba(255, 203, 41, 0.2);
		border-radius: 7px;
		line-height: 48px;
	}
</style>
