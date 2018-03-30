<template>
    <i :class="classes" ></i>
</template>
<script>
    const prefixCls = 'lg-tree-icon';

    export default {
        name: 'lgtreeicon',
        props: {
            type: String,
        },
        computed: {
            classes () {
                return `${prefixCls} ${prefixCls}-${this.type}`;
            },
        }
    };
</script>
<style lang="less">
	.lg-tree-icon{
		display: block;
		height: 20px;
		width: 27px;
		background: url(../assets/tree.png) no-repeat;
	}
	.lg-tree-icon-person{
		background-position: -70px -98px;
	}
	.lg-tree-icon-company{
		background-position: -47px -98px;
	}
	.lg-tree-icon-department{
		background-position: -23px -98px;
	}
	.lg-tree-icon-root{
		background-position: 0px -98px;
	}
	.lg-tree-icon-person_disable{
		background-position: -70px -98px;
	}
	.lg-tree-icon-company_disable{
		background-position: -47px -98px;
	}
	.lg-tree-icon-department_disable{
		background-position: -23px -98px;
	}
	.lg-tree-icon-root_disable{
		background-position: 0px -98px;
	}
	.lg-tree-icon-person_search{
		background-position: -70px -98px;
	}
	.lg-tree-icon-company_search{
		background-position: -47px -98px;
	}
	.lg-tree-icon-department_search{
		background-position: -23px -98px;
	}
	.lg-tree-icon-root_search{
		background-position: 0px -98px;
	}
	
	.lg-tree-icon-person_disable +.activeNode{
		color:red;
	}
	.lg-tree-icon-company_disable +.activeNode{
		color:red;	
	}
	.lg-tree-icon-department_disable +.activeNode{
		color:red;	
	}
	.lg-tree-icon-root_disable +.activeNode{
		color:red;	
	}
	
	.lg-tree-icon-person_search +.activeNode{
		color:forestgreen;
	}
	.lg-tree-icon-company_search +.activeNode{
		color:forestgreen;
	}
	.lg-tree-icon-department_search +.activeNode{
		color:forestgreen;
	}
	.lg-tree-icon-root_search +.activeNode{
		color:forestgreen;
	}
</style>
