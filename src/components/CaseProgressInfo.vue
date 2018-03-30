<template>
  <Table width="100%" size="small" border :columns="progressColumns" v-bind='$attrs'></Table>
</template>

<script>
  /*
   * 可以传入任何Table支持的属性，columns除外
   * 为了防止意外覆盖，拦截了columns
   */
  export default {
    props: {
      columns: {}
    },
    data() {
      return {
        progressColumns: [{
            title: "案件阶段",
            key: "stageName",
            align: "center",
          },
          {
            title: "受理法院/仲裁机构",
            key: "admittanceAgencies",
            align: "center",
          },
          {
            title: "受案单位所在地",
            key: "admittanceAgenciesAddress",
            align: "center",
          },
          {
            title: "承办法官/仲裁员",
            key: "admittanceAgenciesManager",
            align: "center",
          },
          {
            title: "已支付金额（人民币/元）",
            key: "paidAmount",
            align: "center",
            render: (h, params) => {
							return this.moneyFormat(params.row.paidAmount)
						}
          },
          {
            title: "对方外聘律师",
            key: "oppositeLawyerName",
            align: "center",
          },
          {
            title: "对方外聘律所",
            key: "oppositeLawyerOfficeName",
            align: "center",
          },
          {
            title: "预测结果",
            key: "predictionResult",
            align: "center",
          },
          {
            title: "调处时间计划表（说明一审、二审的调处时间计划）",
            key: "mediationPlanList",
            align: "center",
            width:120,
          },
          {
            title: "预计结果",
            key: "expectedResults",
            align: "center",
          },
          {
            title: "是否问责",
            key: "accountableFlag",
            align: "center",
            render: ( h, params ) => {
                if ( params.row.accountableFlag == 1 ) {
                    return "是";
                } else {
                    return '否';
                }
            }
          },
          {
            title: "是否进行/完成成因分析",
            key: "causesAnalysisFlag",
            align: "center",
            render: ( h, params ) => {
                if ( params.row.causesAnalysisFlag == 1 ) {
                    return "是";
                } else {
                    return '否';
                }
            }
            
          }
        ],
      }
    },
    methods:{
    	moneyFormat(data){
				let money = data;
				let moneyStr = String(money)
				let FirstMoney = moneyStr.split('.')[0]
				let LastMoney = moneyStr.split('.')[1]
				let count = Math.floor((FirstMoney.length-1)/3)
				let cun = FirstMoney.substring(FirstMoney.length-3,FirstMoney.length)
				for(let i = 0; i < count; i++){
					cun = FirstMoney.substring(FirstMoney.length-3*(i+2),FirstMoney.length-3*(i+1)) + ',' +cun
				}
				if(LastMoney != undefined){
					cun = cun + '.' +LastMoney
				}
				return cun;
			}
    }
  }
</script>

<style>

</style>