
<template>
	<div id="base-info-management" class="lg-wrapper">
        <LgBreadcrumb :path='path'></LgBreadcrumb>
        <router-view></router-view>
	</div>
</template>

<script>
    import LgBreadcrumb from '../../components/LgBreadcrumb'
	export default {
		name: 'baseinfomanagement',
		components: {
			LgBreadcrumb
		},
		computed: {
		},
		data(){
			return{
				path: [
                    { 'name': '基础信息管理', 'path': '/main/baseInfoManagement' },
                    { 'name': '编号规则管理', 'path': '/main/baseInfoManagement/numberRuleManagement' },
                ],
			}
		},
		mounted(){
		},
		watch: {
        	$route: function(newValue, oldValue) {
	            this.path[1].name = newValue.meta.title;
	            this.path[1].path = newValue.path;
	        }
	    },
		methods:{
		}
	}
</script>

<style lang="less">
</style>

