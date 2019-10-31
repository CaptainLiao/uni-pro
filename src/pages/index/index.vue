<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view>
			<text class="title">appid {{appid}}</text>
		</view>
		<button @click="toHello">toHello</button>
	</view>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			title: 'Hello',
			appid: process.env.WX_APPID
		}
	},
	onLoad() {

	},
	methods: {
		toHello() {
			this.$Router.push({
				path: '/pages/hello',
				query: {
					text: 'Fuck you'
				}
			})
		}

	}
});
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}

.title {
	font-size: 36upx;
	color: #8f8f94;
}
</style>
