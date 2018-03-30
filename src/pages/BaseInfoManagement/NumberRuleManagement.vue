<template>
	<div id="number-rule-management" >
        <IconTitle title='案件编号规则管理' left='-80' top='-30'></IconTitle>
		<div class="flex content">
				<Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
					<div class="flex rule-box">
				        <FormItem prop="title">
				            <Input type="text" v-model="formInline.title" placeholder="HNA">
				            </Input>
				        </FormItem>
				        <span class="plus-icon flex">+</span>
				        <FormItem prop="type">
				            <Input type="text" v-model="formInline.type" placeholder="案件类型">
				            </Input>
				        </FormItem>
				        <span class="plus-icon flex">+</span>
				        <FormItem prop="year">
				            <Input type="text" v-model="formInline.year" placeholder="年份">
				            </Input>
				        </FormItem>
				        <span class="plus-icon flex">+</span>
				        <FormItem prop="serialNumber">
				            <Input type="text" v-model="formInline.serialNumber" placeholder="流水号">
				            </Input>
				        </FormItem>
			        </div>
			    </Form>
			
			<div class="flex example">
				<span>例:</span>
				<div class="txt-box flex">
					HNA
				</div>
				<span class="plus-icon flex">+</span>
				<div class="txt-box flex">
					(民)
				</div>
				<span class="plus-icon flex">+</span>
				<div class="txt-box flex">
					2018
				</div>
				<span class="plus-icon flex">+</span>
				<div class="txt-box flex">
					0001
				</div>
				<span class="plus-icon flex">=</span>
				<div class="flex">
					HNA-(民)-2018-0001
				</div>
			</div>
			<Button type="primary" class="btn" @click="handleSubmit('formInline')">确定</Button>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
    import IconTitle from '../../components/IconTitle'
	export default {
		name: 'numberrulemanagement',
		components: {
			IconTitle
		},
		computed: {
		},
		mounted(){
		},
		data () {
            return {
                formInline: {
                    title: '',
                    type: '',
                    year:'',
                    serialNumber:''
                },
                ruleInline: {
                    title: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    year: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    serialNumber: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ]
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
	#number-rule-management{
		padding: 20px;
		background: #FFFFFF;
		.content{
			flex-direction: column;
			.rule-box{
				.ivu-input{
					text-align: center;
					width: 120px;
				}
			}
			
			.plus-icon{
				height: 20px;
				width: 20px;
				font-size: 16px;
				color: #1A1A1A;
				margin-bottom: 10px;
				font-weight: bold;
				margin-right:10px;
			}
			.example{
				font-size: 14px;
				color: #1A1A1A;
				font-weight: bold;
				height: 57px;
				margin-bottom: 30px;
				padding-left:140px ;
				.plus-icon{
					margin: 0 10px;
				}
				
			}
			.txt-box{
				height:32px;
				width: 120px;
			}
		}
		.btn{
			width: 100px;
		}
	}
</style>

