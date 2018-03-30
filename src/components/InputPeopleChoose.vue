<template>
  <div>
    <div class="flex">
      <Input :value='value.transactPersonName' :readonly="true" class="person" @on-click="showModal"
        @on-focus='showModal' v-bind='$attrs' />
      <Button v-if='showDelete' type="primary" icon="ios-close-empty" @click="remove">删除</Button>
    </div>
    <OrgTree v-model='show' :title='title' type='psm' :only="true" @ok='orgTreeOk'></OrgTree>
  </div>
</template>

<script>
	/*
	 * Input接受所有额外属性
	 */
	import { xbrArray,cbrArray } from "../utils";
  import OrgTree from '@/components/OrgTree'
  export default {
    name: 'inputOrgPeopleChoose',
    components: {
      OrgTree
    },
    props: {
      value: {
        type: Object,
        default: () => { return {} },
      },
      title: {
        type: String,
        default: '请选择'
      },
      showDelete: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        show: false,
      }
    },
    methods: {
      orgTreeOk(e) {
      	//协办人 承办人 不能重复
      	if(this.value.transactType==1){
      		this.$emit('input', e);			
      	}else if(this.value.transactType==2){
      		let xbrid = e[0].id;
	      	if(xbrArray.indexOf(xbrid)==-1){
	      		xbrArray.push(e[0].id);
	      		this.$emit('input', e);	
	      	}else{
	      		this.$Message.destroy();
						this.$Message.error('协办人不能重复!');
	      	}	
      	}else{
      		let cbrid = e[0].id;
	      	if(cbrArray.indexOf(cbrid)==-1){
	      		cbrArray.push(e[0].id);
	      		this.$emit('input', e);	
	      	}else{
	      		this.$Message.destroy();
						this.$Message.error('承办人不能重复!');
	      	}		
      	}
      	
        
      },
      showModal() {
        this.show = true;
      },
      remove() {
        this.$emit('remove', this.value);
      }
    }
  }
</script>

<style lang="less" scoped="scoped">

</style>
<style lang="less">
  .person {
    margin-right: 5px;
    .ivu-input {
      background: url('../assets/person.png') no-repeat 98% center;
    }
  }
</style>