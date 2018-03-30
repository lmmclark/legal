<template>
    <div class="caseManage">
        <div class="contents">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "caseManage",
    data() {
        return {
            route: {}
        };
    },
    created() {
        this.route = this.$route;
    },
    watch: {
        $route: function(newValue, oldValue) {
            this.route = newValue;
        }
    },
    methods: {}
};
</script>

<style lang="less">
@import url("../../less/common.less");
.caseManage {
    height: 100%;
    min-height: 500px;
    width: 100%;
    header {
        min-height: 50px;
    }
    .contents {
        width: 1100px;
        margin: 0 auto;
        .btnGroup {
            margin: 5px 0;
            float: right;
            .ivu-btn{
            	margin-left: 10px;
            }
        }
        .toolBar {
            padding: 25px 0;
            .ivu-breadcrumb {
                font-size: 14px;
                display: flex;
				display: -webkit-flex;
				justify-content: flex-start;
				align-items: center;
				color: #1a1a1a;
				.ivu-breadcrumb-item-link{
					color: #1a1a1a;
				}
				.ivu-breadcrumb-item-separator{
					color: #1a1a1a;
				}
            }
        }
        .location-icon{
			display: inline-block;
			height: 20px;
			width: 20px;
			background: url(../../assets/icons.png) 0 0;
		}
    }
}
</style>

