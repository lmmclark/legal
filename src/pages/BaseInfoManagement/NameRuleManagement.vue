<template>
	<div id="name-rule-management"  >
        <IconTitle title='名称规则管理' left='-80' top='-30'></IconTitle>
		<div class="flex content">
			<Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
					<div class="flex rule-box">
						<span class="plus-icon flex">关于</span>
				        <FormItem prop="companyName">
				            <Input type="text" v-model="formInline.companyName" placeholder="公司名称">
				            </Input>
				        </FormItem>
				        <span class="plus-icon flex">的</span>
				        <FormItem prop="detail">
				            <Input type="text" v-model="formInline.detail" placeholder="******">
				            </Input>
				        </FormItem>
				        <span class="plus-icon flex">案件</span>
				        
			        </div>
			    </Form>
		</div>
		<div class="flex">
			<Button type="primary" class="btn" @click="handleSubmit('formInline')">确定</Button>
			
		</div>

		
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
    import IconTitle from '../../components/IconTitle'
	
	export default {
		name: 'namerulemanagement',
		components: {
			IconTitle
		},
		computed: {
		},
		data () {
            return {
                formInline: {
                    companyName: '',
                    detail: '',
                },
                ruleInline: {
                    companyName: [
                        { required: true, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    detail: [
                        { required: true, message: '案件名称不能为空', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
	}
</script>

<style lang="less">
	#name-rule-management{
		padding: 20px;
		background: #FFF;
		.content{
			flex-direction: column;
			margin-bottom: 16px;
			.rule-box{
				.ivu-input{
					text-align: center;
					width: 360px;
				}
			}
			
			.plus-icon{
				height: 20px;
				width: 40px;
				font-size: 14px;
				color: #1A1A1A;
				margin-bottom: 25px;
				font-weight: bold;
				margin-right:10px;
			}
		}
		.btn{
			width: 100px;
		}
	}
	
</style>

