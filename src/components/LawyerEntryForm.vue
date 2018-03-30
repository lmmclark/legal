<template>
  <div class="wrap_item" style="min-height: 200px;">
    <div class="form_item">
      <Form ref="baseInfo" :model="baseInfo" :rules="ruleBaseInfo" label-position="right" :label-width="100">
        <div class='form'>
          <FormItem class='formItem' label="姓名:" prop="lawyerName">
            <Input v-model="baseInfo.lawyerName" placeholder="请输入律师姓名"></Input>
          </FormItem>
          <FormItem class='formItem' label="电话:" prop="phone">
            <Input v-model="baseInfo.phone" placeholder="请输入电话号码"></Input>
          </FormItem>
          <FormItem class='formItem' label="执业证号:" prop="occupationCertificateNo">
            <Input v-model="baseInfo.occupationCertificateNo" placeholder="清收执业证号"></Input>
          </FormItem>
          <FormItem class='formItem' label="手机:" prop="lawyerMobile">
            <Input v-model="baseInfo.lawyerMobile" placeholder="请输入手机号码" :maxlength='11'></Input>
          </FormItem>
          <div class='formItem spec'>
            <FormItem style='width: 60%;' label="擅长业务范围:" prop="areasExpertiseId">
              <Select v-model="baseInfo.areasExpertiseId" placeholder="请选择">
                <Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
              </Select>
            </FormItem>
            <FormItem style='width: 36%;' :label-width='30' label="" prop="areasExpertiseSecondId">
              <Select v-model="baseInfo.areasExpertiseSecondId" placeholder="请选择">
                <Option v-for="item in scajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
              </Select>
            </FormItem>
          </div>
          <FormItem class='formItem' label="性别:" prop="lawyerSex">
            <RadioGroup v-model="baseInfo.lawyerSex">
              <Radio label="1">男</Radio>
              <Radio label="2">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class='formItem' label="电子邮箱:" prop="email">
            <Input v-model="baseInfo.email" placeholder="请输入电子邮箱"></Input>
          </FormItem>
          <FormItem class='formItem' label="是否常年法律顾问:" prop="commonlyUseFlag">
            <RadioGroup v-model="baseInfo.commonlyUseFlag">
              <Radio label="1">是</Radio>
              <Radio label="2">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class='formItem' label="毕业院校:" prop="school">
            <Input v-model="baseInfo.school" placeholder="请输入毕业院校"></Input>
          </FormItem>
          <FormItem class='formItem' label="社会职务:" prop="socialPosition">
            <Input v-model="baseInfo.socialPosition" placeholder="请输入个人社会职务"></Input>
          </FormItem>
          <FormItem class='formItem' label="所属律所:" prop="lawOfficeDTO.id" :rules="{required: true, message: '不能为空',type:'number', trigger: 'change'}">
            <Select v-model="baseInfo.lawOfficeDTO.id" placeholder="请选择所属律所">
              <Option v-for="item in allLawOffice" :value="item.id" :key="item.id">{{item.lawOfficeName}}</Option>
            </Select>
            <!--<Input v-model="baseInfo.lawOfficeDTO.lawOfficeName" placeholder="请输入所属律所"></Input>-->
          </FormItem>
          <FormItem class='formItem' label="学历:"  prop="educationId">
            <Select v-model="baseInfo.educationId" placeholder="请选择学历">
              <Option v-for="item in lsxl" :value="item.id" :key="item.dictName">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          <FormItem class='formItem' label="职务:" prop="duty">
            <Input v-model="baseInfo.duty" placeholder="请输入个人公司职务"></Input>
          </FormItem>
        </div>
        <FormItem label="专长:" prop="specialty">
          <Input v-model="baseInfo.specialty" @input="descInputSpeciality" type="textarea" :rows="4"
            :maxlength="500" style="width: 95%;" placeholder="请输入个人专长"></Input>
          <p>剩余字数: <span style="color: red;">{{surplus}}</span></p>
        </FormItem>
        <FormItem label="律师简介:" prop="introduction">
          <Input v-model="baseInfo.introduction" @input="descInputDescription" type="textarea" :rows="4"
            :maxlength="500" style="width: 95%;" placeholder="请输入律师简介"></Input>
          <p>剩余字数: <span style="color: red;">{{remnant}}</span></p>
        </FormItem>
        <FormItem label="和集团合作历史:">
          <Button type="primary" class="blue btn-100" icon="plus" @click="modalAdd = true">添加</Button>
        </FormItem>
        <FormItem label="">
          <Table border ref="cooperateHistory" :columns="historys" :data="cooperationRecord" style="width: 95%;"></Table>
        </FormItem>
        <FormItem label="相关附件:" prop="attachmentInfoDTOs">
          <Upload  
          	name="attachmentFile" 
          	:before-upload="beforeUpload" 
          	:on-progress="upLoadProgress"
            :on-success="upLoadSuccess" 
            :on-remove="removeUpload" 
            action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
            <Button type="primary" class="blue btn-100" icon="plus">添加</Button>
          </Upload>
        </FormItem>
      </Form>
      <Modal v-model="modalAdd" width="900" :transfer='false'>
        <p slot="header" style="color:#396dd6;">
          <Icon type="navicon-round"></Icon>
          <span>&nbsp;添加合作历史</span>
        </p>
        <div>
          <CooperateHistory ref="addHistory" @submit="addHistoryCoop('formValidate')"></CooperateHistory>
        </div>
        <div slot="footer">
          <div class="flex">
            <Button type="primary" class="green" style="width: 100px;" @click="addHistoryCoop('formValidate')">确认</Button>
            <Button class="white" style="width: 100px;" @click="modalAdd = false">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import router from '../router'
  import lgBreadcrumb from './LgBreadcrumb.vue'
  import CooperateHistory from './CooperateHistory.vue'
  export default {
    name: 'blackmanage',
    components: {
      lgBreadcrumb,
      CooperateHistory
    },
    computed: {
      ...mapGetters([
        'custormerToken'
      ]),
      ...mapState([
        "scajlx",
        "lsxl"
      ])
    },
    data() {
    	const mobileVal = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('手机号不能为空'));
        } else {
        	let reg = /^1[34578]\d{9}$/;
            if (reg.test(value)) {
                // 对第二个密码框单独验证
                callback();
            }else{
            	callback(new Error('请输入正确的手机号'));
            }
            
        }
    };
      return {
        totalSize: 10,
        currentPage: 1,
        remnant: 500,
        surplus: 500,
        modalAdd: false,
        baseInfo: {
          lawyerName: '',
          phone: '',
          occupationCertificateNo: '',
          lawyerMobile: '',
          areasExpertiseId: '',
          areasExpertiseSecondId: '',
          lawyerSex: '1',
          email: '',
          commonlyUseFlag: '1',
          school: '',
          socialPosition: '',
          lawOfficeDTO: {
            id: ''
          },
          educationId: '',
          duty: '',
          specialty: '',
          introduction: '',
          attachmentInfoDTOs: [],
          cooperationRecord: '',
          storageFlag: 0,
          overseasFlag: 0
        },
        cooperationRecord: [],
        ruleBaseInfo: {
          lawyerName: [{ required: true, message: "不能为空", trigger: "blur" }],
          phone: [{ required: true, message: "不能为空", trigger: "blur" }],
          occupationCertificateNo: [{ required: true, message: "不能为空", trigger: "blur" }],
          lawyerMobile: [{ required: true, validator : mobileVal, trigger: "blur" }],
          areasExpertiseId: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          areasExpertiseSecondId: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          lawyerSex: [{ required: true, message: "不能为空", trigger: "change" }],
          email: [{ required: true,type:'email', message: "请填写正确的邮箱地址", trigger: "blur" }],
          commonlyUseFlag: [{ required: true, message: "不能为空", trigger: "change" }],
          school: [{ required: true, message: "不能为空", trigger: "blur" }],
          educationId: [{ required: true, type: "number", message: "不能为空", trigger: "change" }],
          //duty:[{ required: true, message: "不能为空", trigger: "blur" }],
          specialty: [{ required: true, message: "不能为空", trigger: "blur" }],
          introduction: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
        historys: [{
            title: '序号',
            key: 'index',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('p', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#1a1a1a',
                    cursor: 'pointer'
                  }
                }, params.index + 1)
              ]);
            }
          },
          {
            title: '案件号',
            key: 'caseNum',
            align: 'center',
          },
          {
            title: '合作单位',
            key: 'cooperator',
            align: 'center',
          },
          {
            title: '合作时间',
            key: 'time',
            align: 'center',
            render: (h, params) => {
              return h('span', [
                h('span', {
                  props: {
                    size: 'small'
                  }
                }, this.transferTime(params.row.time))
              ]);
            }
          },
          {
            title: '案件处理结果',
            key: 'caseResult',
            align: 'center',
          },
          {
            title: '律师费用（元）',
            key: 'counselFee',
            align: 'center',
          },
        ],
        historydata: [],
        allLawOffice: [
        	
        ]
      }
    },
    mounted() {
      this.getAllLawOffice()
    },
    created() {
      this.getScajlx()
      this.getLSXL()
    },
    methods: {
      ...mapActions([
        "getScajlx",
        "getLSXL"
      ]),
      handleSubmit(name) {
        var that = this
        let educationId = that.baseInfo.educationId
        let areasExpertiseId = that.baseInfo.areasExpertiseId
        let areasExpertiseSecondId = that.baseInfo.areasExpertiseSecondId
        let educationNames;
        let areasExpertiseName;
        let areasExpertiseSecondName;
        switch(educationId) {
          case 86:
            educationNames = '大专'
            break;
          case 87:
            educationNames = '本科'
            break;
          case 88:
            educationNames = '硕士'
            break;
          case 89:
            educationNames = '博士'
            break;
          default:
            break;
        }
        switch(areasExpertiseId) {
          case 98:
            areasExpertiseName = '刑事'
            break;
          case 99:
            areasExpertiseName = '仲裁'
            break;
          case 100:
            areasExpertiseName = '民事'
            break;
          case 101:
            areasExpertiseName = '咨询'
            break;
          default:
            break;
        }
        switch(areasExpertiseSecondId) {
          case 98:
            areasExpertiseSecondName = '刑事'
            break;
          case 99:
            areasExpertiseSecondName = '仲裁'
            break;
          case 100:
            areasExpertiseSecondName = '民事'
            break;
          case 101:
            areasExpertiseSecondName = '咨询'
            break;
          default:
            break;
        }
        that.baseInfo['educationName'] = educationNames
        that.baseInfo['areasExpertiseName'] = areasExpertiseName
        that.baseInfo['areasExpertiseSecondName'] = areasExpertiseSecondName
        that.$refs['baseInfo'].validate((valid) => {
          if(valid) {
            that.$emit('ok',that.baseInfo)
          } 
        })
      },
      getAllLawOffice() {
        let that = this
        that.$http.request({
            method: 'get',
            url: '/lawOffice/allName',
//          headers: {
//            'Authorization': 'Bearer ' + this.custormerToken
//          },
          })
          .then(function(res) {
            if(res.data.code == 1) {
              that.allLawOffice = res.data.content
            }
          })
          .catch(function(err) {

          })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      changePage() {
        console.log('change')
      },
      upLoadSuccess(response, file, fileList) {
        //this.baseInfo.attachmentInfoDTOs = fileList;
        console.log(response)
        if(response.code == 1) {
          let obj = {
          	attPath:response.content
          }
//        obj['attPath'] = response.content
          this.baseInfo.attachmentInfoDTOs.push(obj)
        }
        console.log(this.baseInfo.attachmentInfoDTOs)
      },
      // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
      upLoadProgress(event, file, fileList) {
        //this.baseInfo.attachmentInfoDTOs = fileList;
      },
      // 上传之前
      beforeUpload(file) {
        console.log(file);
        // return false;阻止提交
      },
      // 删除
      removeUpload(file, fileList) {
        this.baseInfo.attachmentInfoDTOs = fileList;
      },
      descInputDescription() {
        var txtVal = this.baseInfo.introduction.length;
        this.remnant = 500 - txtVal;
      },
      descInputSpeciality() {
        var txtVal = this.baseInfo.specialty.length;
        this.surplus = 500 - txtVal;
      },
      addHistoryCoop(name) {
        var that = this
        let data = that.$refs.addHistory.formValidate; //表单参数
        let obj = {};
        for(const key in data) {
          obj[key] = data[key];
        }
        console.log(data)
        this.$refs.addHistory.$refs.formValidate.validate((valid) => {
          if(valid) {
            that.cooperationRecord.push(obj)
            this.$refs.addHistory.$refs.formValidate.resetFields();
            that.modalAdd = false
          } else {
            that.$Message.error('Fail!');
          }
        })
      },
      transferTime(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      }
    }
  }
</script>


<style lang="less">
  @baseColor: #000;
  .wrap_item {
    background: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .form_item {
      padding: 0px 30px 20px;
    }
    .info_title {
      height: 60px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      line-height: 30px;
      padding: 15px 40px;
      p {
        font-size: 16px;
        color: #1a1a1a;
        font-weight: 600;
      }
      .title {
        align-items: center;
        justify-content: flex-start;
        .icon {
          height: 20px;
          width: 20px;
          background-image: url("../assets/icons.png");
          margin-right: 10px;
          background-position: -40px -30px;
        }
        p {
          font-size: 18px;
          color: #1a1a1a;
          font-weight: 600;
        }
      }
    }
    .form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 95%;
    }
    .formItem {
    	width: 300px;
      max-width: 50%;
      min-width: 35%;
    }
    .formItem.spec{
    	display: flex;
    	justify-content: space-between;
    }
    .ivu-select-dropdown{
    	top: 32px !important;
    }
  }
</style>