<template>
    <div class="container index">
        <div class="header" v-if="routeName!='personmanage'&&routeName!='rolemanage'">
            <div class="content-container">
                <div class="logo">
                    <img src="../assets/logo.png" />
                </div>
                <Menu mode="horizontal" :active-name="$route.name">
                    <template v-for="item in routes">
                        <MenuItem v-if='!item.children&&getPerssion(item.meta.id)'  :name="item.name" :key="'menuitem' + item.name">
                        <router-link class='link splink' :to="{'name':item.name}">{{item.meta.title }}</router-link>
                        </MenuItem>
                        <Submenu v-if='item.children&&item.show&&getPerssion(item.meta.id)' :name="item.name" :key='item.name'>
                            <template slot="title">
                                <span class='link'>{{item.meta.title }}</span>

                            </template>
                            <MenuItem v-for='subitem in item.children' :key='subitem.name' :name="subitem.name" v-if='subitem.show&&getPerssion(subitem.meta.id)'>
                            <router-link class='subLink' :to="{'name':subitem.name}">{{subitem.meta.title}}</router-link>
                            </MenuItem>
                        </Submenu>
                    </template>
                  
                    <MenuItem name="6">
                    <router-link class='link' to="">知识库</router-link>
                    </MenuItem>

                </Menu>
                <div class="user">
                    <Menu mode="horizontal" :active-name="$route.name">
                        <Submenu name="7">
                            <template slot="title">
                                <span class='link'>
								<Icon size='18' type="person" ></Icon>
								<span style="margin-right: 5px; ">
									{{userInfo?userInfo.org.orgName:''}}
								</span>
                                </span>
                            </template>
                            <MenuItem name="personalTaskCenter" v-if='getPerssion(53)' >
                            	
                            <router-link class='subLink' :to="{'name':'personalTaskCenter'}">个人任务中心</router-link>
                            </MenuItem>
                            <MenuItem name="222">
                            <span class='subLink' @click="loginOut">退出</span>
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </div>
            </div>
        </div>

        <router-view></router-view>
        <Modal v-model="logOut" @on-ok="ok" :closable="false" @on-cancel="cancel">
            <p style="font-size: 20px;">确认退出么</p>
        </Modal>

    </div>
</template>

<script>
    import { mapGetters, mapState, mapActions } from 'vuex'
    import { setStore, getStore, removeStore } from '../utils'
    import { routes } from '../router'
    export default {
        name: 'AuctionType',
        components: {},
        computed: {
            ...mapGetters( [
                'userInfo'
            ] ),
            routeName(){
            	return this.$route.name
            }
        },
        data() {
            return {
                routes: [],
                arr: [],
                logOut: false,
                roleRouter: [],
            }
        },
        mounted() {},
        created() {
            this.routes = routes.children;
            this.arr = JSON.parse( getStore( 'idArr' ) );
        },
        methods: {
            changeActive( name ) {
                console.log( name );
                setStore( "navIndex", name )
            },
            goMain() {
                this.$router.push( '/main' )
            },
            getPerssion( id ) {
                if ( this.arr.includes( id ) ) {
                    return true
                }
                return false
            },
            loginOut() {
                this.logOut = true
            },
            ok() {
				let _this= this;
				removeStore( 'idArr' );
                removeStore( 'userInfo' );
				_this.$router.push( {name:'Login'} );
            },
            cancel() {
                this.logOut = false
            }

        }
    }
</script>

<style lang="less">
    .index {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .header {
            background: url(../assets/header_bg.png) no-repeat;
            background-size: 100% 100%;
            width: 100%;
            .content-container {
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
                height: 70px;
            }
            .logo {
                margin-left: 20px;
                margin-top: 20px;
            }
            .ivu-menu-light {
                background: none;
                height: 50px;
            }
            .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active .link {
                color: #4576ef;
            }
            .link {
                display: inline-block;
                height: 100%;
                padding: 0 5px 0 15px;
                color: #ffffff;
                font-size: 16px;
            }
            .splink {
                padding: 0 20px;
            }
            .subLink {
                color: #000000;
                display: block;
                height: 100%;
                width: 100%;
                padding: 7px 16px 8px;
            }
            .ivu-menu-horizontal .ivu-menu-submenu {
                padding: 0;
            }
            .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
                text-align: center;
                padding: 0;
            }
            .ivu-menu-horizontal.ivu-menu-light:after {
                display: none;
            }
            .ivu-menu-submenu-title>i, .ivu-menu-submenu-title span>i {
                color: #ffffff;
            }
            .user {
                margin-right: 30px;
            }
        }
    }
</style>