u
<template>
    <div class="lg-container flex">
        <LgHeader></LgHeader>
        <div class="content-box">
            <div class="content">
                <div class="login">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
                        <div class="flex form-item-content">
                            <div class="flex form-item-content-txt">
                                <span>用户名</span>
                                <span>UserName</span>
                            </div>
                            <FormItem prop="name">
                                <Input type="text" v-model="formInline.name">
                                </Input>
                            </FormItem>
                        </div>
                        <div class="flex form-item-content">
                            <div class="flex form-item-content-txt">
                                <span>密码</span>
                                <span>PassWord</span>
                            </div>
                            <FormItem prop="pwd">
                                <Input type="password" v-model="formInline.pwd" @on-keydown='handleSubmit'>
                                </Input>
                            </FormItem>
                        </div>
                        <div class="flex rememberMe">
                            <div class="checkBox flex" @click="remeberMe">
                                <img v-if="remeber" src="../assets/checked.png" />
                            </div>
                            <p>记住用户名/Remeber</p>
                        </div>

                        <div class="loginBtn" @click="handleSubmit">

                        </div>

                    </Form>
                </div>
            </div>
        </div>
        {{testArr}}
        <LgFooter></LgFooter>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { setStore } from '../utils'
    import qs from 'qs';
    import LgHeader from '../components/LgHeader';
    import LgFooter from '../components/LgFooter';
    export default {
        name: 'login',
        components: {
            LgHeader,
            LgFooter
        },
        computed: {},
        data() {
            return {
                Logintext: '登录',
                btnDisabled: false,
                remeber: true,
                formInline: {
                    'name': '',
                    'pwd': ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 1, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                },
                testArr:[11,22,33]
            }
        },
        created(){
        	let Info = window.localStorage.getItem('Info');
        	
//      	console.log(this.$http.defaults.headers.common['Authorization']='Bearer ' + this.custormerToken )
        	if(Info){
        		this.formInline= JSON.parse(Info)
        	}
        },
        methods: {
            ...mapActions( [
                'setUserInfo'
            ] ),
            remeberMe() {
                this.remeber = !this.remeber
            },
            test(){
            	console.log(1)
          		this.testArr[0]='test';
            },
            handleSubmit( e ) {
            	this.test()
                if ( e.type !== 'click' ) {
                    if ( e.keyCode != 13 ) {
                        return false
                    }
                }
                let _this = this;
                this.$refs[ 'formInline' ].validate( ( valid ) => {
                    if ( valid ) {
                        let params = {
                            "username": this.formInline.name,
                            "password": this.formInline.pwd,
                        };
                        this.$http.request( {
                                method: 'post',
                                url: 'http://10.71.202.126:8650/api/authenticate',
//                              url: 'http://10.71.203.67:8650/api/authenticate',
                                data: params
                            } )
                            .then( function ( res ) {
                                console.log( res.data.id_token )
                                let token = res.data.id_token
                                _this.getUserInfo( token );
                                if(_this.remeber){
				                	window.localStorage.setItem('Info', JSON.stringify(_this.formInline))
				                }else{
				                	window.localStorage.removeItem('Info')
				                }

                            } )
                            .catch( function ( err ) {
                                console.log( err )
                            } )
                            
                    } else {
                        this.$Message.error( 'Fail!' );
                    }
                } )
            },
            getUserInfo( token ) {
                let _this = this;
                
                this.$http.request( {
                        method: 'get',
                        url: 'http://10.71.202.126:8650/api/login',
//                      url: 'http://10.71.203.67:8650/api/login ',
						headers: {
	                        'Authorization': 'Bearer ' + token
	                    }
                    } )
                    .then( function ( res ) {
                        if ( res.data.code == 1 ) {
                        	let userInfo={
                        		org:res.data.content.org,
                            	userExtend:res.data.content.userExtend,
                            	userName:res.data.content.userName
                            }
                            _this.setUserInfo( userInfo );
                            let data = res.data.content.permissionsList;
                            let idArr = [];
                            data.forEach( ( item ) => {
                                idArr.push( item.id )
                            } )
                            setStore( 'idArr', idArr )
                            setStore( 'userInfo', userInfo )
                             _this.$router.push( {
                                path: '/main'
                            } )
                        } else {
                            _this.$Notice.error( {
                                title: res.data.message
                            } )
                        }
                    } )
                    .catch( function ( err ) {
                        console.log( err )
                    } )
            }

        }
    }
</script>

<style lang="less">
    .lg-container {
        height: 100%;
        min-height: 500px;
        flex-direction: column;
        width: 100%;
        .content-box {
            width: 100%;
            min-width: 1920px;
            background: #070828;
        }
        .content {
            width: 1920px;
            height: 530px;
            background: url(../assets/login-content-bg.png) no-repeat center center;
            background-size: 100% 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            align-items: center;
            .login {
                height: 380px;
                width: 400px;
                padding: 25px;
                box-sizing: border-box;
                background: url(../assets/login-bix-bg.png) no-repeat center center;
                margin-right: 460px;
                .login-form {
                    width: 270px;
                    height: 240px;
                    margin-top: 89px;
                    margin-left: 40px;
                    .form-item-content {
                        width: 100%;
                        .form-item-content-txt {
                            flex-direction: column;
                            margin-bottom: 24px;
                            align-items: flex-end;
                            margin-right: 10px;
                            color: #33b4ff;
                        }
                        .ivu-form-item {
                            flex: 1;
                        }
                    }
                    .rememberMe {
                        .checkBox {
                            height: 12px;
                            width: 12px;
                            background-color: '#14275b';
                            box-sizing: border-box;
                            border: 1px solid #2576b7;
                            cursor: pointer;
                            margin-right: 10px;
                        }
                        p {
                            color: #33b4ff;
                        }
                    }
                    .loginBtn {
                        height: 60px;
                        width: 60px;
                        background: url(../assets/login-btn-icon.png) no-repeat center center;
                        margin-top: 30px;
                        margin-left: 110px;
                        cursor: pointer;
                    }
                    .ivu-input {
                        background: #102566;
                        font-size: 14px;
                        color: #33B4FF;
                        border: 1px solid #2376b5;
                        padding-left: 10px;
                    }
                    .ivu-form-item-error .ivu-input {
                        border: 1px solid #ff3300;
                    }
                }
            }
        }
    }
</style>