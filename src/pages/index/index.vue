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
		<button @click="toAuth">toAuth</button>
	</view>
</template>

<script>
import auth from "@/libs/authentication/weixin"

export default {
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
		},

		toAuth() {
			auth.login({target_url: location.href})
				.then(res => console.log(res))
				.catch(err => console.error(err))
		}

	}
}
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
