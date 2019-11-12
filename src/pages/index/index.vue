<template>
	<view class="content">
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view>
			<text class="title">appid {{appid}}</text>
		</view>
		<button @click="toHello">toHello</button>
		<button @click="toAuth">toAuth</button>

		<c-steps></c-steps>
	</view>
</template>

<script>
import auth from "@/libs/authentication/weixin"

import CSteps from '@/components/c-steps'

export default {
	data() {
		return {
			title: 'Hello',
			appid: process.env.WX_APPID
		}
	},

	components: {
		CSteps
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
