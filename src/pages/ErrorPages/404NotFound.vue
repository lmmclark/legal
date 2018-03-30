u<template>
	<div id="NotFound">
		<div class="notfound404 flex">
			<LgHeader></LgHeader>
			<div class="content-box">
				<div class="content">
					<div class="notfound">
						<Button class="btn_prev" @click="prev"></Button>
						<Button class="btn_refresh" @click="go_index"></Button>
					</div>	
				</div>
			</div>
			<LgFooter></LgFooter>
		</div>	
	</div>
</template>

<script>
	import LgHeader from '../../components/LgHeader';
	import LgFooter from '../../components/LgFooter';
	export default {
		name: 'NotFound',
		components: {
			LgHeader,LgFooter
		},
		computed: {
		},
		data(){
			return{
				
			}
		},
		methods:{
			prev(){
				this.$router.go(-1);
			},
			go_index(){
				this.$router.replace({
					name:'main'
				});
			}
		}
	}
</script>

<style lang="less">
	.notfound404{
		height:100%;
		min-height: 500px;
		flex-direction: column;
		width: 100%;
		.content-box{
			width: 100%;
			min-width: 1920px;
			background: #070828;
		}
		.content{
			width: 1920px;
			height: 530px;
			margin: 0 auto;
			background: url(../../assets/404bg.png) no-repeat center center #080d38;
			background-size:100% 100%;
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			.notfound{
				height: 420px;
				width: 360px;
				padding: 25px;
				box-sizing: border-box;
				background: url(../../assets/popup_404.png) no-repeat center center;
				padding-top:315px;
				padding-left:50px;
				.btn_prev{
					width: 122px;
					height: 44px;
					background:url(../../assets/icons.png) no-repeat -1px -313px;
					margin-right: 20px;
				}
				.btn_refresh{
					width: 122px;
					height: 44px;
					background:url(../../assets/icons.png) no-repeat -161px -313px;
				}
			}
		}
	}
	
</style>