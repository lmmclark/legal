<template>
  <Table width="100%" size="small" border :columns="executeColumns" v-bind='$attrs'></Table>
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
        executeColumns: [{
            title: "案件阶段",
            key: "stageName",
            width: 120,
            align: 'center',
          },
          {
            title: "判决/调解金额（人民币/元）",
            key: "mediationAmount",
            align: 'center',
            render: (h, params) => {
							return this.moneyFormat(params.row.mediationAmount)
						}
          },
          {
            title: "已执行款项（人民币/元）",
            key: "executionAmount",
            align: 'center',
            render: (h, params) => {
							return this.moneyFormat(params.row.executionAmount)
						}
          },
          {
            title: "避免/挽回经济损失（人民币/元）",
            key: "recoverAmount",
            align: 'center',
            render: (h, params) => {
							return this.moneyFormat(params.row.recoverAmount)
						}
          },
          {
            title: "律师费总额（人民币/元）",
            key: "totalLegalAmount",
            align: 'center',
            render: (h, params) => {
							return this.moneyFormat(params.row.totalLegalAmount)
						}
          },
          {
            title: "已支付金额（人民币/元）",
            key: "paidAmount",
            align: 'center',
            render: (h, params) => {
							return this.moneyFormat(params.row.paidAmount)
						}
          },
//        {
//          title: "对方外聘律师",
//          key: "lawyerName",
//          align: 'center',
//        },
//        {
//          title: "对方外聘律所",
//          key: "lawOfficeName",
//          align: 'center',
//        },
          {
            title: "是否问责",
            key: "accountableFlag",
            align: 'center',
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
            align: 'center',
            render: ( h, params ) => {
                if ( params.row.causesAnalysisFlag == 1 ) {
                    return "是";
                } else {
                    return '否';
                }
            }
          },
          {
            title: "判决结果",
            key: "judgmentResult",
            align: 'center',
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