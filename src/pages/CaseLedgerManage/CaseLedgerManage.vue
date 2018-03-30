<template>
		<div id="CaseLedgerManage" class="lg-wrapper">
				<LgBreadcrumb :path='path'></LgBreadcrumb>
			  <router-view></router-view>
	 	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import LgBreadcrumb from '../../components/LgBreadcrumb'
  export default {
    name: 'CaseLedgerManage',
    components: {
    	LgBreadcrumb
    },
    computed: {
    },
    data() {
      return{
				path: [
                    { 'name': '案件台账管理', 'path': '/main/caseLedgerManage' },
                    { 'name': '台账模板管理', 'path': '/main/caseLedgerManage/ledgerTempManage' },
                ],
			}
    },
    mounted() {},
    watch: {
    	$route: function(newValue, oldValue) {
            this.path[1].name = newValue.meta.title;
            this.path[1].path = newValue.path;
        }
    },
    methods: {}
  }
</script>

<style lang="less">
</style>