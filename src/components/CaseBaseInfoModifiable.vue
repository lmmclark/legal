<template>
  <div>
    <Form :model="baseForm" :rules="ruleBaseForm" class="baseForm" ref="baseInfo">
      <div class="baseInfo">
        <div class="title">
          <IconTitle title='案件基本信息' left='-80' top='-30'></IconTitle>
        </div>
        <Row>
          <Col span="12">
          <FormItem prop="casesTitle" label="案件标题：" :label-width="190">
            <Input v-model="baseForm.casesTitle" placeholder="请输入案件标题" style="width:250px;">
            <span slot="prepend">关于</span>
            <span slot="append">的案件</span>
            </Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem prop="casesCode" label="案件编号：" :label-width="190">
            <Input v-model="baseForm.casesCode" readonly placeholder="案件编号"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="casesUnitName" label="案发单位：" :label-width="190">
            <Input v-model="baseForm.casesUnitName" class="unite" @on-focus="showOrgTree('casesUnitId','1')"
              placeholder="请选择案发单位" readonly></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="casesStartDate" label="案发时间：" :label-width="190">
            <DatePicker type="date" :value="baseForm.casesStartDate" placeholder="请选择案发时间" style="width:100%;"
              @on-change="baseForm.casesStartDate=$event" :options="disableTime"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="defendant" label="被告/被申请人/被控告人：" :label-width="190">
            <Input v-model="baseForm.defendant" placeholder="请输入被告/被申请人/被控告人"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="plaintiff" label="原告/申请人/控告人：" :label-width="190">
            <Input v-model="baseForm.plaintiff" placeholder="请输入原告/申请人/控告人"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <FormItem prop="litigantId" label="诉讼地位：" :label-width="190">
            <RadioGroup v-model="baseForm.litigantId">
              <Radio v-for="item in ssdw" :key="item.id" :label="item.id">{{item.dictName}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="thirdPartyFlag" label="是否第三方：" :label-width="190">
            <RadioGroup v-model="baseForm.thirdPartyFlag">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset='3' v-if="baseForm.thirdPartyFlag==1">
          <FormItem prop="thirdParty" label="第三方：" :label-width="190">
            <Input v-model="baseForm.thirdParty" placeholder="请输入第三方"></Input>
          </FormItem>
          </Col>
        </Row>
        <div v-if="baseForm.isExternal==1&&baseForm.externalFinshFlag==1">
        <Row >
        	<Col span="12">
        		<FormItem prop="isExternal" label="是否外聘律师：" :label-width="190">
        			<div style="font-size:14px;">是</div>
        		</FormItem>
        	</Col>
          <Col span="12">
          	<FormItem prop="thirdPartyFlag" label="外聘律师姓名：" :label-width="240">
        			<div style="font-size:14px;">{{baseForm.lawyerName}}</div>
        		</FormItem>
        	</Col>
        </Row>
        <Row >
        	<Col span="12">
        		<FormItem prop="isExternal" label="外聘律师律所：" :label-width="190">
        			<div style="font-size:14px;">{{baseForm.lawOfficeName}}</div>
        		</FormItem>
        	</Col>
        	<Col span="12">
        		<FormItem prop="isExternal" label="外聘律师费用：" :label-width="240">
        			<div style="font-size:14px;">10000元</div>
        		</FormItem>
        	</Col>
          
        </Row>
        </div>
        
        
        
        <Row>
          <Col span="10">
          <FormItem prop="amount" label="涉案金额：" :label-width="190">
            <Input v-model="baseForm.amount" placeholder="请输入涉案金额" @on-blur="formatMoney($event.target.value,'amount')">
            <Select slot="append" v-model="baseForm.currencyId" placeholder="请选择币种" style="width:100px;">
              <Option v-for="item in bz" :value="item.id" :key="item.id">{{item.dictName}}</Option>
            </Select>
            </Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="isMajor" label="是否为重大案件：" :label-width="190">
            <RadioGroup v-model="baseForm.isMajor">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="casesType" label="案件类型：" :label-width="190">
            <Select v-model="baseForm.casesType" placeholder="请选择案件类型">
              <Option v-for="item in ajlx" :value="String(item.id)" :key="item.id">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="isForeign" label="是否涉外：" :label-width="190">
            <RadioGroup v-model="baseForm.isForeign">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="casesReason" label="案由：" :label-width="190">
          	<Input v-model="baseForm.casesReason" class="ay" @on-focus="showCauseTree" @on-click="showCauseTree"
              placeholder="请选择案由" v-bind='$attrs' :readonly="true"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="casesStage" label="案件进展阶段：" :label-width="190">
            <Select v-model="baseForm.casesStage" placeholder="请选择案件进展阶段">
              <Option v-for="item in ajjzjd" :value="String(item.id)" :key="item.id">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="admittanceAgenciesManager" label="受理机构承办人员：" :label-width="190">
            <Input v-model="baseForm.admittanceAgenciesManager" placeholder="请输入受理机构承办人员"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="admittanceAgencies" label="受理机构：" :label-width="190">
            <Input v-model="baseForm.admittanceAgencies" placeholder="请输入受理机构"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="casesCostUnitName" label="案件费用承担单位：" :label-width="190">
            <Input v-model="baseForm.casesCostUnitName" class="unite" @on-focus="showOrgTree('casesCostUnitName','1')"
              placeholder="请输入案件费用承担单位" readonly></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="casesAcceptedNO" label="受理案号：" :label-width="190">
            <Input v-model="baseForm.casesAcceptedNO" placeholder="请输入受理案号"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem prop="casesAcceptedCost" label="案件受理费用：" :label-width="190">
            <Input v-model="baseForm.casesAcceptedCost" @on-blur="formatMoney($event.target.value,'casesAcceptedCost')"
              placeholder="请输入案件受理费用">
            <Select v-model="baseForm.casesAcceptedCurrencyId" slot="append" placeholder="请选择币种" style="width:100px;">
              <Option v-for="item in bz" :value="item.id" :key="item.id">{{item.dictName}}</Option>
            </Select>
            </Input>
          </FormItem>
          </Col>
        </Row>
        <FormItem prop="baseInfo" label="案件基本情况：" :label-width="190">
          <Input type="textarea" class="textarea" v-model="baseForm.baseInfo" placeholder="请输入案件基本情况"
            style="width:827px;"></Input>
        </FormItem>
        <FormItem prop="guide" label="处理思路：" :label-width="190">
          <Input type="textarea" class="textarea" v-model="baseForm.guide" placeholder="请输入处理思路"
            style="width:827px;"></Input>
        </FormItem>
        <Row>
          <Col span="10">
          <FormItem prop="reportedName" label="呈报人：" :label-width="190">
            <Input v-model="baseForm.reportedName" readonly placeholder="呈报人"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem prop="reportedMobile" label="联系电话：" :label-width="190">
            <Input v-model="baseForm.reportedMobile" readonly placeholder="呈报人联系电话"></Input>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="法律文书：" prop="legalInstrument" :label-width="190">
          <!-- action，服务端地址 -->
          <!-- 存疑，是点击即上传还是存储一下在上传 -->
          <AttchList :data='getAttachmentList(1)' @delete='deleteAttachment'></AttchList>
          <Upload :max-size='10240' ref='legalUpload' name="attachmentFile" :on-progress="uploadPrgLegal"
            :on-success="uploadSucLegal" :on-remove="rmLegal" action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
            <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="isUpload">添加文件</Button>
          </Upload>
        </FormItem>
        <FormItem label="主要证据材料：" prop="evidenceMaterial" :label-width="190">
          <AttchList :data='getAttachmentList(2)' @delete='deleteAttachment'></AttchList>
          <Upload :max-size='10240' ref='eviUpload' name="attachmentFile" :on-progress="uploadPrgEvd" :on-success="uploadSucEvd"
            :on-remove="rmEvd" action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload" >
            <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="isUpload">添加文件</Button>
          </Upload>
        </FormItem>
        <FormItem label="附加公文：" prop="additionalDocuments" :label-width="190">
          <AttchList :data='getAttachmentList(3)' @delete='deleteAttachment'></AttchList>
          <Upload :max-size='10240' ref='addDocUpload' name="attachmentFile" :on-progress="uploadPrgAddDoc"
            :on-success="uploadSucAddDoc" :on-remove="rmAddDoc" action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
            <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="isUpload">添加文件</Button>
          </Upload>
        </FormItem>
      </div>
      <div class="documentReport" style="display:none;">
        <div class="title">
          <IconTitle title='公文呈报信息' left='-240' top='-30'></IconTitle>
        </div>
        <Row>
          <Col span="8">
          <FormItem prop="instructions" label="公文请示：" :label-width="190">
            <Input v-model="baseForm.instructions" placeholder="请输入公文请示"></Input>
          </FormItem>
          </Col>
          <Col span="8" offset="7">
          <FormItem prop="workNo" label="办公编号：" :label-width="190">
            <Input v-model="baseForm.workNo" readonly placeholder="办公编号"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <FormItem prop="suggestedPath" label="建议路径：" :label-width="190">
            <Input v-model="baseForm.suggestedPath" placeholder="请选择建议路径"></Input>
          </FormItem>
          </Col>
          <Col span="8" offset="7">
          <FormItem prop="nextSettlePerson" label="下一级处理人：" :label-width="190">
            <Input v-model="baseForm.nextSettlePerson" placeholder="请输入下一级处理人"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <FormItem prop="docClassification" label="公文密级：" :label-width="190">
            <Select v-model="baseForm.docClassification" placeholder="请选择公文密级">
              <Option v-for="item in gwmj" :value="item.id" :key="item.id">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8" offset="7">
          <FormItem prop="urgencyClassification" label="公文缓急：" :label-width="190">
            <Select v-model="baseForm.urgencyClassification" placeholder="请选择公文缓急">
              <Option v-for="item in gwhj" :value="item.id" :key="item.id">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="附加公文：" prop="docFileList" :label-width="190">
          <Upload :max-size='10240' name="attachmentFile" :on-progress="_uploadPrgAddDoc" :on-success="_uploadSucAddDoc"
            :on-remove="_rmAddDoc" action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
            <Button type="ghost" icon="ios-cloud-upload-outline">添加文件</Button>
          </Upload>
        </FormItem>
      </div>
      <div class="undertake">
        <div class="title">
          <IconTitle title='承办信息' left='-220' top='-30'></IconTitle>
        </div>
        <FormItem label="是否法务承办：" prop="isLegalTransact" :label-width="190">
          <RadioGroup v-model="baseForm.isLegalTransact">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <template v-if="baseForm.isLegalTransact==1">
          <Row v-for='(item,index) in getUndertakeList(1)' :key='index+100'>
            <Col span="10">
            <FormItem :prop="'transactInfoDTO['+item.index+'].transactPersonName'" label="总协调人：" :label-width="190"
              :rules="{required: true, message: '不能为空', trigger: 'change'}">
              <InputPeopleChoose :value="item.value" placeholder='请选择总协调人' :showDelete='false' @input='chooseUndertakePeople($event,item.value)'
                @remove='removeUndertakePeople' readonly></InputPeopleChoose>
            </FormItem>
            </Col>
            <Col span="10" offset="3">
            <FormItem :prop="'transactInfoDTO['+item.index+'].transactPersonMobile'" label="联系电话："
              :label-width="190" :rules="{required: true,message:'不能为空',trigger:'change'}">
              <Input :value="item.value.transactPersonMobile" readonly placeholder="总协调人电话"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row v-for='(item,index) in getUndertakeList(2)' :key='index+200'>
            <Col span="10">
            <FormItem label="协办人：" :prop="'transactInfoDTO['+item.index+'].transactPersonName'" :label-width="190"
              :rules="{required: true, message: '不能为空', trigger: 'change'}">
              <InputPeopleChoose :value="item.value" placeholder='请选择协办人' @input='chooseUndertakePeople($event,item.value)'
                @remove='removeUndertakePeople' readonly />
            </FormItem>
            </Col>
            <Col span="10" offset="3">
            <FormItem label="联系电话：" :prop="'transactInfoDTO['+item.index+'].transactPersonMobile'"
              :label-width="190" :rules="{required: true, message: '不能为空', trigger: 'change'}">
              <Input :value="item.value.transactPersonMobile" readonly placeholder="协办人电话"></Input>
            </FormItem>
            </Col>
          </Row>
          <FormItem label="" :label-width="190">
            <Button type="primary" icon="ios-plus-empty" size="small" @click="addPerson(2)">添加协办人</Button>
          </FormItem>
          <Row v-for='(item,index) in getUndertakeList(3)' :key='index+300'>
            <Col span="10">
            <FormItem label="承办人：" :prop="'transactInfoDTO['+item.index+'].transactPersonName'" :label-width="190"
              :rules="{required: true, message: '不能为空', trigger: 'change'}">
              <InputPeopleChoose :value="item.value" placeholder='请选择承办人' @input='chooseUndertakePeople($event,item.value)'
                @remove='removeUndertakePeople' readonly />
            </FormItem>
            </Col>
            <Col span="10" offset="3">
            <FormItem label="联系电话：" :prop="'transactInfoDTO['+item.index+'].transactPersonMobile'"
              :rules="{required: true, message: '不能为空', trigger: 'change'}" :label-width="190">
              <Input :value="item.value.transactPersonMobile" readonly placeholder="承办人电话"></Input>
            </FormItem>
            </Col>
          </Row>
          <FormItem label="" :label-width="190">
            <Button type="primary" size="small" icon="ios-plus-empty" @click="addPerson(3)">添加承办人</Button>
          </FormItem>
        </template>
      </div>
    </Form>
    <Modal v-model="orgTreeModal" width="822" class-name='allot vertical-center-modal orgtreemodel'>
      <p slot="header" style="color:#396dd6;">
        <span>选择组织结构</span>
      </p>
      <div class="inline">
        <Input v-model="searchOrg" placeholder="搜索" style="width: 260px" @on-enter='searchOrgIpt'>
        <Button slot="append" icon="search" @click='searchOrgIpt'></Button>
        </Input>
        <div style="height:242px;overflow: scroll;overflow-x: hidden;margin-top:10px;">
          <Tree :data="orgTree" ref="orgtree" :render="renderContent" class="orgtree"></Tree>
        </div>
      </div>
      <div class="inline" style="float:right;">
        <p>选择结果</p>
        <Table :columns="columnstree" ref="currentTreeTable" width="510" :data="orgtreeData"></Table>
      </div>
      <div slot="footer">
        <Button type="primary" class="green" @click="okorgtree">确定</Button>
        <Button type="ghost" @click="cancel">取消</Button>
      </div>
    </Modal>
    
    <CauseTree v-model="causetreemodel" :only="true" @ok="causeok"></CauseTree>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import IconTitle from "@/components/IconTitle";
  import LgTreeIcon from '@/components/LgTreeIcon'
  import { generateTree } from "../utils/tree";
  import { permissionBaseUrl } from "../utils";
  import AttchList from '@/components/AttachmentList'
  import InputPeopleChoose from '@/components/InputPeopleChoose'
  import CauseTree from '@/components/CauseTree'
  export default {
    name: 'caseBaseInfoModifiable',
    components: {
      IconTitle,
      LgTreeIcon,
      AttchList,
      InputPeopleChoose,
      CauseTree
    },
    props: {
      data: {
        type: Object,
        default: null
      },
      
    },
    watch: {
      data() {
        this.initBaseForm();
      },
    },
    created() {
      this.baseForm.reportedName = this.userInfo.org.orgName;
      this.baseForm.reportedMobile = this.userInfo.userExtend.userMoblie;
      this.getBz();
      this.getSSDW();
      this.getAJJZJD();
      this.getAJLX();
      this.getGWMJ();
      this.getGWHJ();
    },
    mounted() {
      this.initBaseForm();
    },
    methods: {
      ...mapActions([
        "getBz",
        "getSSDW",
        "getAJJZJD",
        "getAJLX",
        "getGWMJ",
        "getGWHJ"
      ]),
      causeok(e){
      	this.baseForm.casesReason = e.dictName;
      },
      showCauseTree(){
      	this.causetreemodel = true;
      },
      /*案件基本信息-法律文书上传*/
      // 上传ok
      uploadSucLegal(response, file, fileList) {
        this.baseForm.legalInstrument.push({
          attPath: file.response.content,
          attName: file.name,
          busType: 1
        })
      },
      // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
      uploadPrgLegal(event, file, fileList) {
        // this.baseForm.legalInstrument = fileList;
      },
      // 删除
      rmLegal(file, fileList) {
        let docs = this.baseForm.legalInstrument,
          index = docs.find(item => item.attPath ===
            file.response.content);
        docs.splice(index, 1);
      },

      /*案件基本信息-主要证据材料上传*/
      uploadSucEvd(response, file, fileList) {
        // this.baseForm.evidenceMaterial = fileList;
        this.baseForm.evidenceMaterial.push({
          attPath: file.response.content,
          attName: file.name,
          busType: 2
        })
      },
      // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
      uploadPrgEvd(event, file, fileList) {
        // this.baseForm.evidenceMaterial = fileList;
      },
      // 删除
      rmEvd(file, fileList) {
        let docs = this.baseForm.evidenceMaterial,
          index = docs.find(item => item.attPath ===
            file.response.content);
        docs.splice(index, 1);
      },
      /*案件基本信息-附加公文上传 */
      uploadSucAddDoc(response, file, fileList) {
        this.baseForm.additionalDocuments.push({
          attPath: file.response.content,
          attName: file.name,
          busType: 3
        })
      },
      // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
      uploadPrgAddDoc(event, file, fileList) {
        // this.baseForm.additionalDocuments = fileList;
      },
      // 删除
      rmAddDoc(file, fileList) {
        let docs = this.baseForm.additionalDocuments,
          index = docs.find(item => item.attPath ===
            file.response.content);
        docs.splice(index, 1);

      },

      /**公文呈报-附件文件上传 */
      _uploadSucAddDoc(response, file, fileList) {
        this.baseForm.docFileList.push({
          attPath: file.response.content,
          attName: file.name
        })
      },
      // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
      _uploadPrgAddDoc(event, file, fileList) {
        // this.baseForm.docFileList = fileList;
      },
      // 删除
      _rmAddDoc(file, fileList) {},
      // 显示树形控件
      showOrgTree(org, optype, index) {
        this.orgTreeModal = !this.orgTreeModal;
        this.orgree(optype);
        this.currentOrg = org;
        let nodeList = document.getElementsByClassName('activeNode');
        nodeList = Array.prototype.slice.apply(nodeList);
        nodeList.forEach((item) => {
          item.classList.remove('highLight');
        })

        if(arguments.length == 3) {
          if(org == "coordinator") {
            this.coordinatorIndex = index;
          } else {
            this.undertakePersonIndex = index;
          }
        }
      },
      // 添加协办人、承办人
      addPerson(personType) {
        //type 1:总协调人 2:协办人 3:承办人
        this.baseForm.transactInfoDTO.push({
          transactPersonName: "",
          transactPersonId: 0,
          transactPersonMobile: "",
          transactType: personType,
        });
      },
      // 格式化金额，保留两位小数
      formatMoney(val, type) {
        if(val == "") {
          return;
        }
        val = Number(val);
        if(type === 'amount') {
          if(val >= 10000000) {
            this.baseForm.isMajor = 1;
          } else {
            this.baseForm.isMajor = 0;
          }
        }
        if(isNaN(val)) {
          return;
        } else {
          // 保留两位小数
          var val_string = val.toString();
          if(val_string.indexOf(".") < 0) {
            val_string = val_string + '.00';
            this.baseForm[type] = parseFloat(val_string);
          } else {
            var arr = val_string.split(".");
            var newValue_string = arr[0] + "." + arr[1].slice(0, 2);
            this.baseForm[type] = parseFloat(newValue_string);
          }
        }

      },
      /*树形控件功能区*/

      // 生成结构树
      orgree(optype) {
        let that = this;
        that.orgTreeModal = true;
        that.orgtreeData = [];
        let url = optype === '1' ? permissionBaseUrl + '/shareOrgTree/isOrg/1' :
          permissionBaseUrl + '/shareOrgTree/1'
        this.optype = optype;
        this.$http
          .request({
            method: "get",
            url: url
          })
          .then(function(res) {
            let data;
            if(that.optype == "2") {
              data = res.data.content.shareOrgTree;
            } else {
              data = res.data.content;
            }

            let treedata = [];
            for(let i = 0; i < data.length; i++) {
              if(data[i].disFlag == 0) {
                treedata.push(data[i]);
              }
            }
            that.orgTempData = treedata;
            let orgpid = treedata[0].orgParentId;
            let info = generateTree(treedata, orgpid);
            that.orgTree = info;
          })
          .catch(function(err) {
            console.log(err);
          });
      },
      // 添加到右侧
      rightinsert() {
        var answer = this.answer;
        var orgTypeText;
        if(this.answer != "") {
          this.orgtreeData = [];
          switch(answer.orgType) {
            case 'root':
              orgTypeText = '集团';
              break;
            case '.plate':
              orgTypeText = '公司';
              break;
            case '.dpt':
              orgTypeText = '部门';
              break;
            case '.org"':
              orgTypeText = '组织';
              break;
            case '.psm':
              orgTypeText = '人员';
              break;
            default:
              orgTypeText = '机构';
              break;
          }
          this.orgtreeData.push({
            name: answer.orgName,
            type: orgTypeText
          });
        } else {
          this.$Message.destroy();
          this.$Message.error('您未选择！')
        }
      },
      // ok
      okorgtree() {
        if(this.orgtreeData != "") {
          let answer = this.answer;
          let userId = this.answer.id;
          let coordinatorIndex = this.coordinatorIndex;
          let undertakePersonIndex = this.undertakePersonIndex;
          this.$http
            .request({
              url: permissionBaseUrl + `/find/UserInfo/${userId}`,
              method: "get"
            })
            .then(res => {
              switch(this.currentOrg) {
                // 案发单位
                case "casesUnitId":
                  this.baseForm.casesUnitId = answer.id;
                  this.baseForm.casesUnitName = answer.orgName;
                  break;
                  // 案件费用承担单位
                case "casesCostUnitName":
                  this.baseForm.casesCostUnitName =
                    answer.orgName;
                  this.baseForm.casesCostUnitCode = answer.id;
                  break;
                  // 总协办人
                case "headCoordinator":
                  this.baseForm.cbxx.transactPersonName =
                    answer.orgName;
                  this.baseForm.cbxx.transactPersonId =
                    answer.id;
                  this.baseForm.cbxx.transactPersonMobile = res
                    .data.code ?
                    res.data.content.content[0].userMoblie :
                    "";
                  break;
                  // 协办人
                case "coordinator":
                  this.baseForm.cbxx.xbr[
                      coordinatorIndex
                    ].transactPersonName =
                    answer.orgName;

                  this.baseForm.cbxx.xbr[
                      coordinatorIndex
                    ].transactPersonId =
                    answer.id;
                  this.baseForm.cbxx.xbr[
                      coordinatorIndex
                    ].transactPersonMobile = res.data.code ?
                    res.data.content.content[0].userMoblie :
                    "";
                  break;
                  // 承办人
                case "undertakePerson":
                  this.baseForm.cbxx.cbr[
                      undertakePersonIndex
                    ].transactPersonName =
                    answer.orgName;

                  this.baseForm.cbxx.cbr[
                      undertakePersonIndex
                    ].transactPersonId =
                    answer.id;
                  this.baseForm.cbxx.cbr[
                      undertakePersonIndex
                    ].transactPersonMobile = res.data.code ?
                    res.data.content.content[0].userMoblie :
                    "";
                  break;
                default:
                  break;
              }
              this.orgTreeModal = false;
            });
        } else {
          this.$Message.destroy();
          this.$Message.error('您未选择！')
        }
      },
      // cancel
      cancel() {
        this.orgTreeModal = false;
      },
      // 选中节点
      getSelectedDatas(data) {
        this.answer = data;
        this.rightinsert();
      },
      vinish() {
        if(this.orgtreeData != "") {
          this.orgtreeData = [];
        }
      },
      searchOrgIpt() {


        let that = this;
        let CompyOrgName = this.searchOrg;
        let data;
        data = that.orgTempData;
        let info = [];
        for(let i = 0; i < data.length; i++) {
          if(data[i].orgName == CompyOrgName) {
            info.push(data[i]);
          }
        }
        if(info != "") {
          let treeid = info[0].id;
          let optype;
          optype = this.optype;
          let url = optype === '1' ? permissionBaseUrl + '/shareOrgTree/isOrg/' +
            treeid :
            permissionBaseUrl + '/shareOrgTree/' + treeid
          that.$http
            .request({
              method: "get",
              url: url,
            })
            .then(function(res) {
              let treedata;
              treedata = res.data.content;
              let level = treedata[0].orgLevel;
              for(let k = 0; k < level; k++) {
                for(let m = 0; m < that.orgTempData.length; m++) {
                  if(treedata[0].orgParentId == that.orgTempData[m].id) {
                    treedata.unshift(that.orgTempData[m])
                  }
                }
              }
              let isOpen = true;
              let orgpid = treedata[0].orgParentId;
              let info = generateTree(treedata, orgpid, isOpen);
              that.orgTree = info;
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          this.$Message.destroy();
          this.$Message.error('未查找到数据！')
        }

      },
      renderContent(h, { root, node, data }) {
        let str = '';
        if(data.orgType == '.plate') {
          str = 'department'
        } else if(data.orgType == '.psm') {
          str = 'person'
        } else if(data.type == 'root') {
          str = 'root';
        } else {
          str = 'company'
        }

        return h('span', {
          style: {
            display: 'inline-block',
          }
        }, [
          h('span', {
            style: {

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }, [
            h(LgTreeIcon, {
              props: {
                type: str
              }
            }),
            h('div', {
              style: { marginTop: '6px', cursor: 'pointer' },
              class: ['activeNode'],
              on: {
                click: (e) => {
                  let optype;
                  optype = this.optype;
                  if(optype == 1) {
                    this.getSelectedDatas(data);
                    let nodeList = document.getElementsByClassName(
                      'activeNode');
                    nodeList = Array.prototype.slice.apply(nodeList);
                    nodeList.forEach((item) => {
                      item.classList.remove('highLight');
                    })
                    e.target.classList.toggle('highLight');
                  } else if(optype == 2) {
                    if(data.orgType == ".psm") {
                      this.getSelectedDatas(data);
                      let nodeList = document.getElementsByClassName(
                        'activeNode');
                      nodeList = Array.prototype.slice.apply(nodeList);
                      nodeList.forEach((item) => {
                        item.classList.remove('highLight');
                      })
                      e.target.classList.toggle('highLight');
                    } else {
                      this.$Message.destroy();
                      this.$Message.error('不能选择!');
                    }

                  } else {
                    this.$Message.destroy();
                    this.$Message.error('不能选择!');
                  }

                }
              },
            }, data.title)
          ]),
        ]);
      },
      initBaseForm() {
      	//已办不能上传附件
      	this.completeFlag = this.$route.query.completeFlag;
      	if(this.completeFlag==2){
      		this.isUpload = true;	
      	}else{
      		this.isUpload = false;		
      	}
      	
        //重置整个表单
        this.$refs.baseInfo.resetFields();
        //iview不会重置数组类型，所以手动重置
        let baseForm = this.baseForm;
        baseForm.attachmentInfos = [];
        baseForm.transactInfoDTO = [];
        baseForm.legalInstrument = [];
        baseForm.evidenceMaterial = [];
        baseForm.additionalDocuments = [];
        this.$refs.legalUpload.clearFiles();
        this.$refs.addDocUpload.clearFiles();
        this.$refs.eviUpload.clearFiles();
        //如果没有传入data，显示默认值
        let data = this.data;
        
          
        //如果有传入data，显示存在的传入值
        if(JSON.stringify(this.data) !== "{}") {
          for(let item in this.data) {
            if(this.data[item] !== undefined && this.data[item] !== null) {
              baseForm[item] = this.data[item];
            }
          }
          let { casesTitle } = baseForm;
          if(casesTitle.startsWith('关于')) {
            casesTitle = casesTitle.slice(2);
          }
          if(casesTitle.endsWith('的案件')) {
            casesTitle = casesTitle.slice(0, -3);
          }
//        baseForm.casesStage = Number(baseForm.casesStage);
//        baseForm.casesType = Number(baseForm.casesType);
//        baseForm.casesReason = Number(baseForm.casesReason);

					
          baseForm.casesTitle = casesTitle;
          baseForm.externalFinshFlag = data.externalFinshFlag;
          baseForm.isExternal = data.isExternal;
          if(data.myLawyer!=null){
          	baseForm.lawyerName = data.myLawyer.lawyerName;
          	baseForm.lawOfficeName = data.myLawyer.lawOfficeDTO.lawOfficeName;	
          }
          this.baseForm.currencyId = Number(data.currencyId);
          this.baseForm.casesAcceptedCurrencyId = Number(data.casesAcceptedCurrencyId);
          
        }
        //承办信息如果没有，添加空信息
        let arr = baseForm.transactInfoDTO;
        for(let type of [1, 2, 3]) {
          if(!arr.find(res => type == res.transactType)) {
            arr.push({
              transactPersonName: "",
              transactPersonId: '',
              transactPersonMobile: "",
              transactType: type
            })
          }
        }
      },
      getAttachmentList(type) {
        let list = this.baseForm.attachmentInfos || [];
        return list.filter(val => val.busType == type);
      },
      deleteAttachment(item) {
        let attachList = this.baseForm.attachmentInfos || [],
          index = attachList.indexOf(item);
        attachList.splice(index, 1);
      },
      chooseUndertakePeople(e, item) {
        let people = e[0];
        this.$http
          .request({
            url: permissionBaseUrl + `/find/UserInfo/${e[0].id}`,
            method: "get"
          })
          .then(res => {
            item.transactPersonName = people.orgName;
            item.transactPersonId = people.id;
            item.transactPersonMobile = res.data.code ? res.data.content.content[0]
              .userMoblie : "";
          })
          .catch(err => {
            console.log(err);
          })
      },
      removeUndertakePeople(item) {
        let list = this.baseForm.transactInfoDTO,
          index = list.indexOf(item);
        let typeList = list.filter(val => {
          return val.transactType === item.transactType;
        })
        if(typeList.length <= 1) {
          if(item.transactType == 2) {
            this.$Message.destroy();
            this.$Message.error('至少需要一位协办人');
          } else {
            this.$Message.destroy();
            this.$Message.error('至少需要一位承办人');
          }
          return
        }
        if(item.id) {
          this.$http.request({
              url: `/transact-infos/${item.id}`,
              method: 'delete'
            })
            .then(res => {
              let data = res.data;
              if(data.code === 1) {
                this.$Message.success(data.message);
                list.splice(index, 1);
              } else {
                this.$Message.destroy();
                this.$Message.error(data.message);
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          list.splice(index, 1);
        }

      },
      getUndertakeList(type) {
        let list = this.baseForm.transactInfoDTO,
          result = [];
        list.forEach((val, index) => {
          if(val.transactType == type) {
            result.push({
              value: val,
              index
            });
          }
        })
        return result;

      }
    },
    computed: {
      ...mapState(["ssdw", "bz", "ajjzjd", "ajlx", "gwhj", "gwmj"]),
      ...mapGetters(['userInfo']),
    },
    data() {
      const validateMoney = (rule, value, callback) => {
        let val = Number(value);
        if(value === "") {
          callback(new Error("金额不能为空"));
        } else if(isNaN(val)) {
          callback(new Error("请输入正确的数字格式"));
        } else if(val < 0) {
          callback(new Error("请输入正确的数字格式"));
        } else {
          callback();
        }
      };
      const validateSpace = (rule, value, callback) => {
        value = value.replace(/\s+/g,"");
        if(value === "") {
          callback(new Error("不能为空！"));
        }else {
          callback();
        }
      };
      return {
        // 机构单位树
        orgTree: [{}],
        orgTreeModal: false,
        answer: "",
        orgtreeData: [],
        searchOrg: "",
        columnstree: [{
            title: "名称",
            key: "name"
          },
          {
            title: "类型",
            key: "type"
          }
        ],
        disableTime: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        //已办不能上传附件
        isUpload:false,
        //案由对话框
        causetreemodel:false,
        baseForm: {
        	
          attachmentInfos: [],
          /*案件基本信息*/
          creator: '',
          // 案件标题 -已改
          casesTitle: "",
          // 案件编号 -已改
          casesCode: "系统自动生成",
          // 案发单位id -已改，存疑，到底传递什么参数未定，id？code？name？
          casesUnitId: "",
          // 案发时间 -已改，格式问题
          casesStartDate: "",
          // 诉讼地位 -已改，文字需要遍历，传id
          litigantId: 22,
          // 诉讼地位名称
          litigantName: "",
          // 原告/申请人/控告人 -已改，暂定手动输入
          plaintiff: "",
          // 被告/被申请人/被控告人 -已改，暂定手动输入
          thirdPartyFlag: 0,
          //是否第三方
          defendant: "",
          // 第三方 -已改
          thirdParty: "",
          // 涉案金额 -已改
          amount: "",
          // 币种 -已改，存疑
          currencyId: 1,
          // 是否为重大案件 -已改
          isMajor: 0,
          // 是否涉外 -已改
          isForeign: 0,
          // 案件类型 -已改 数据字典是caseTypeId，存疑
          casesType: '',
          // 案件进展阶段 -已改
          casesStage: '',
          // 案由 -已改
          casesReason: '',
          // 受理机构 -已改
          admittanceAgencies: "",
          // 受理机构承办人员 -已改
          admittanceAgenciesManager: "",
          // 案件费用承担单位 -已改
          casesCostUnitName: "",
          // 案件费用承担单位code -已改
          casesCostUnitCode: "",
          // 受理案号 -已改
          casesAcceptedNO: "",
          // 案件受理费用 -已改
          casesAcceptedCost: "",
          // 币种 -已改
          casesAcceptedCurrencyId: 1,
          // 案件基本情况 -已改
          baseInfo: "",
          // 处理思路 -已改
          guide: "",
          // 呈报人id -已改，需要展示名字
          reporterId: 123456,
          // 呈报人名称
          reportedName: "",
          // 联系电话 -已改
          reportedMobile: "",
          // 是否第三方律师 -已改
          //isExternal: 0,
          // 计费方式 -已改
          externalBillingWayId: "",
          // 聘用律师费用 -已改
          externalCost: "",
          // 币种 -已改
          externalCostCurrencyId: "",
          // 律师姓名
          lawyerName: "",
          // 所属律所
          lawyerOffice: "",
          // 法律文书文件列表
          legalInstrument: [],
          // 主要证据材料文件列表
          evidenceMaterial: [],
          // 附加公文文件列表
          additionalDocuments: [],
          /*公文呈报信息*/
          // 公文请示
          instructions: "",
          // 办公编号
          workNo: "123456789",
          // 建议路径
          suggestedPath: "",
          // 下一级处理人
          nextSettlePerson: "",
          // 公文密级
          docClassification: "",
          // 公文缓急
          urgencyClassification: "",
          // 附加公文文件列表
          docFileList: [],
          /*承办信息*/
          // 是否法务承办
          isLegalTransact: 1,
          // 承办表
          transactInfoDTO: [],
          cbxx: {
            // 总协办人名字
            transactPersonName: "",
            // 总协办人id
            transactPersonId: 0,
            // 联系电话
            transactPersonMobile: "",
            // 协办人数组
            xbr: [{
              // 协办人
              transactPersonName: "",
              // 协办人id
              transactPersonId: 0,
              // 协办人电话
              transactPersonMobile: ""
            }],
            // 承办人数组
            // cbr
            cbr: [{
              // 承办人
              transactPersonName: "",
              // 承办人id
              transactPersonId: 0,
              // 承办人电话
              transactPersonMobile: ""
            }]
          },
          /*关联其他*/
          // 关联办文编号
          relevanceFileNo: "",
          // 登录id
          userId: '',
          // 登录人机构id
          orgFullId: '',
          // 表示案件呈报
          casesStyle: 1,
        },
        //   验证规则
        ruleBaseForm: {
          casesTitle: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          casesCode: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          casesUnitName: [{
            required: true,
            message: "不能为空",
            trigger: "change"
          }],
          casesStartDate: [{
            required: true,
            message: "不能为空",
            trigger: "change"
          }],
//        litigantId: [{
//          required: true,
//          type: "number",
//          message: "不能为空",
//          trigger: "change"
//        }],
          plaintiff: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          defendant: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          amount: [{
            validator: validateMoney,
            required: true,
            trigger: "blur"
          }],
          currencyId: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          isMajor: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          isForeign: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          casesType: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          casesStage: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          casesReason: [{
            required: true,
            message: '不能为空',
            trigger: 'change'
          }],
          admittanceAgencies: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          admittanceAgenciesManager: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          casesCostUnitName: [{
            required: true,
            message: "不能为空",
            trigger: "change"
          }],
          casesAcceptedNO: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          casesAcceptedCost: [{
            validator: validateMoney,
            required: true,
            trigger: "blur"
          }],
          casesAcceptedCurrencyId: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          baseInfo: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          guide: [{
            validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }],
          reportedName: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          reportedMobile: [{
            required: true,
            message: "不能为空",
            trigger: "blur"
          }],
//        isExternal: [{
//          required: true,
//          type: "number",
//          message: "不能为空",
//          trigger: "change"
//        }],
        },

      }
    }
  }
</script>

<style lang="less">
  .orgModalCaseReport {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
      top: 0;
    }
  }
  
  // 机构树
  .orgtreemodel {
    .ivu-modal {
      .ivu-modal-body {
        height: 300px;
        width: 822px;
        .inline {
          float: left;
          display: inline;
          .arrow:nth-of-type(1) {
            margin-top: 100px;
          }
          .arrow {
            display: block;
            margin-left: 10px;
            margin-bottom: 10px;
            margin-right: 10px;
          }
          p {
            text-align: center;
            margin-bottom: 10px;
          }
          .arrow-l {
            background: url(../assets/icons.png) no-repeat;
            background-position: -48px -250px;
            width: 40px;
            height: 32px;
          }
          .arrow-r {
            background: url(../assets/icons.png) no-repeat;
            background-position: -2px -250px;
            width: 40px;
            height: 32px;
          }
        }
      }
    }
    .highLight {
      color: blue;
    }
  }
  
  .baseForm {
    .ivu-form-item {
      .ivu-form-item-label {
        font-size: 14px;
        color: #1a1a1a;
      }
      .ivu-input-group-append {
        background: #f5f5f5;
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
          color: #1a1a1a;
        }
      }
      .textarea {
        height: 120px;
        .ivu-input {
          height: 100%;
        }
      }
      .unite {
        .ivu-input {
          background: url('../assets/company.png') no-repeat 98% center;
        }
      }
      .ay {
        .ivu-input {
          background: url('../assets/ay.png') no-repeat 98% center;
        }
      }
      .person {
        .ivu-input {
          background: url('../assets/person.png') no-repeat 98% center;
        }
      }
    }
    .baseInfo {
      background: #fff;
      padding: 20px;
    }
    .documentReport {
      background: #fff;
      padding: 20px;
      margin-top: 20px;
    }
    .undertake {
      background: #fff;
      padding: 20px;
      margin-top: 20px;
    }
  }
  .ivu-input-group-append{
	    background: #F5F5F5 !important;
	    border: none;
	}
</style>
<style lang="less" scoped="scoped">
  .attchItem {}
  
  .closeIcon {
    &:hover {
      cursor: pointer;
    }
    margin-left: 5px;
  }
</style>