<template>
  <div>
    <Modal :value='value' title='流转' ok-text='确定' cancel-text='取消'
    	@on-visible-change='visibleChange'>
      <Form ref="form" :model="form" :rules="rules" :label-width="80">
        <FormItem label="办理人" prop="people">
          <Input v-model="form.people" :readonly="true" @on-click="showChoosePeople" @on-focus='showChoosePeople'
            class="person" placeholder="请选择提交人">
          </Input>
        </FormItem>
      </Form>
      <div class="flex" slot='footer'>
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
    <OrgTree v-model='isChooseModalShow' title='选择提交人' type='psm'  :only="true" @ok='choosePeopleSubmit'></OrgTree>
  </div>
</template>

<script>
  import OrgTree from '@/components/OrgTree'
  export default {
    name: 'AuctionType',
    components: {
      OrgTree,
    },
    created() {},
    computed: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        isChooseModalShow: false,
        form: {
          people: '',
        },
        rules: {
          people: [{
            required: true,
            message: '办理人不能为空'
          }]
        },
        peopleData: [],
      }
    },
    methods: {
      ok() {
        this.$refs.form.validate((valid) => {
          if(valid) {
            this.$emit('ok', { people: this.peopleData});
            this.$emit('input', false);
          }
        })
      },
      cancel() {
        this.$emit('cancel')
        this.$emit('input', false)
      },
      visibleChange(e){
      	this.$emit('input', e)
      },
      showChoosePeople() {
        this.isChooseModalShow = true;
      },
      choosePeopleSubmit(e) {
        let peopleStr = '';
        this.peopleData = [];
        for(let item of e) {
          if(item.orgType === '.psm') {
            this.peopleData.push(item);
            peopleStr += item.orgName + '; ';
          }
        }
        this.form.people = peopleStr;
      }
    }
  }
</script>

<style lang="less">
  .searchBox {
    justify-content: flex-start;
    .searchInput {
      width: 180px;
      margin-right: 5px;
    }
  }
  .person {
    .ivu-input {
      background: url('../assets/person.png') no-repeat 98% center;
    }
  }
</style>