<template>
  <div>
    <Form id="cooper_container" ref="formValidate" :model="formValidate" :rules="cooperateFormRules"
      :label-width="100">
      <Row>
        <Col span="8">
        <FormItem label="合作案件号:" prop="caseNum">
          <Input v-model="formValidate.caseNum" placeholder="请输入合作案件号"></Input>
        </FormItem>
        </Col>
        <Col span="8" offset="7">
        <FormItem label="合作单位:" prop="cooperator">
          <Input v-model="formValidate.cooperator" placeholder="请输入合作单位" @on-focus="showtree" class="unite"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="律师费用（元）:" prop="counselFee">
          <Input v-model="formValidate.counselFee" placeholder="请输入律师费用"></Input>
        </FormItem>
        </Col>
        <Col span="8" offset="7">
        <FormItem label="合作时间:" prop="time">
          <DatePicker v-model="formValidate.time" type="date" placeholder="请选择合作时间"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="案件处理结果:" prop="caseResult">
          <Input v-model="formValidate.caseResult" type="textarea" :rows="4" placeholder="请输入案件处理结果"></Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <OrgTree v-model="openOrg" @ok='insertinput' type='org' title="合作单位" :transfer='false' :only='true'></OrgTree>
  </div>
</template>

<script>
  import OrgTree from './OrgTree.vue'
  export default {
    name: 'lawyerentryform',
    props: {},
    components: {
      OrgTree
    },
    data() {
      return {
        openOrg: false,
        formValidate: {
          caseNum: '',
          cooperator: '',
          counselFee: '',
          time: '',
          caseResult: ''
        },
        cooperateFormRules: {
          caseNum: [{ required: true, message: "不能为空", trigger: "blur" }],
          cooperator: [{ required: true, message: "不能为空", trigger: "blur" }],
          counselFee: [{ required: true, message: "不能为空", trigger: "blur" }],
          time: [{ required: true, type: 'date', message: '不能为空', trigger: 'change' }],
          caseResult: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
      }
    },
    mounted() {},
    methods: {
      showtree() {
        this.openOrg = true;
      },
      insertinput(data) {
        console.log(data);
        this.formValidate.cooperator = data[0].orgName;
      }

    }
  }
</script>

<style lang="less">
  #cooper_container {
    .ivu-form-item-label {
      color: #000000;
      font-weight: bold;
    }
    .unite {
      .ivu-input {
        background: url('../assets/company.png') no-repeat 98% center;
      }
    }
    .person {
      .ivu-input {
        background: url('../assets/person.png') no-repeat 98% center;
      }
    }
  }
</style>