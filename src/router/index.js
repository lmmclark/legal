import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import { SetTitle, getStore } from '../utils'
const Login = resolve => require( [ '@/pages/Login' ], resolve ); //登录页
const Main = resolve => require( [ '@/pages/Main' ], resolve ); //主页
const Index = resolve => require( [ '@/pages/Index' ], resolve ); //首页
//角色管理  及 子页面 
const Authormanage = resolve => require( [ '@/pages/AuthorManage/AuthorManage' ], resolve );
const PersonManage = resolve => require( [ '@/pages/AuthorManage/PersonManage' ], resolve );
const RoleManage = resolve => require( [ '@/pages/AuthorManage/RoleManage' ], resolve );
//案件管理 及子页面
const CaseManage = resolve => require( [ '@/pages/LegalCaseManage/CaseManage' ], resolve );
const CaseReport = resolve => require( [ '@/pages/LegalCaseManage/CaseReport' ], resolve );
const CaseAdditionalReport = resolve => require( [ '@/pages/LegalCaseManage/CaseAdditionalReport' ], resolve );
const CaseExecute = resolve => require( [ '@/pages/LegalCaseManage/CaseExecute' ], resolve );
const CaseFinish = resolve => require( [ '@/pages/LegalCaseManage/CaseFinish' ], resolve );
const CaseProgress = resolve => require( [ '@/pages/LegalCaseManage/CaseProgress' ], resolve );
const CaseResult = resolve => require( [ '@/pages/LegalCaseManage/CaseResult' ], resolve );
const CaseResultCheck = resolve => require( [ '@/pages/LegalCaseManage/CaseResultCheck' ], resolve );
const CaseCheck = resolve => require( [ '@/pages/LegalCaseManage/CaseCheck' ], resolve );
//律师管理 及子页面
const LawyerManage = resolve => require( [ '@/pages/LawyerManage/LawyerManage' ], resolve );
const BlackListManage = resolve => require( [ '@/pages/LawyerManage/BlackListManage' ], resolve );
const LawyerDetail = resolve => require( [ '@/pages/LawyerManage/LawyerDetail' ], resolve );
const EvaluationManage = resolve => require( [ '@/pages/LawyerManage/EvaluationManage' ], resolve );
const AddLawyer = resolve => require( [ '@/pages/LawyerManage/AddLawyer' ], resolve );
const DeleteLawyer = resolve => require( [ '@/pages/LawyerManage/DeleteLawyer' ], resolve );
const LawOfficeDetail = resolve => require( [ '@/pages/LawyerManage/LawOfficeDetail' ], resolve );
const LawOfficeEntry = resolve => require( [ '@/pages/LawyerManage/LawOfficeEntry' ], resolve );
const ExternalLawyer = resolve => require( [ '@/pages/LawyerManage/ExternalLawyer' ], resolve );
const ExternalLawyerInfo = resolve => require( [ '@/pages/LawyerManage/ExternalLawyerInfo' ], resolve );
const LawyerEntry = resolve => require( [ '@/pages/LawyerManage/LawyerEntry' ], resolve );
const FirstTrialLawyer = resolve => require( [ '@/pages/LawyerManage/FirstTrialLawyer' ], resolve );
const FinalTrialLawyer = resolve => require( [ '@/pages/LawyerManage/FinalTrialLawyer' ], resolve );
const EmployLawyer = resolve => require( [ '@/pages/LawyerManage/EmployLawyer' ], resolve );
const LawyerQuery = resolve => require( [ '@/pages/LawyerManage/LawyerQuery' ], resolve );
const LawOfficeQuery = resolve => require( [ '@/pages/LawyerManage/LawOfficeQuery' ], resolve );
const ExternalLawyerEntry = resolve => require( [ '@/pages/LawyerManage/ExternalLawyerEntry' ], resolve );
const AddEvaluationRemind = resolve => require( [ '@/pages/LawyerManage/AddEvaluationRemind' ], resolve );
const LawyerFirstApproval = resolve => require( [ '@/pages/LawyerManage/LawyerFirstApproval' ], resolve );
const LawyerEndApproval = resolve => require( [ '@/pages/LawyerManage/LawyerEndApproval' ], resolve );
// 基础信息管理及子页面
const BaseInfoManagement = resolve => require( [ '@/pages/BaseInfoManagement/BaseInfoManagement' ], resolve );
const NumberRuleManagement = resolve => require( [ '@/pages/BaseInfoManagement/NumberRuleManagement' ], resolve );
const NameRuleManagement = resolve => require( [ '@/pages/BaseInfoManagement/NameRuleManagement' ], resolve );
const CaseTypeManagement = resolve => require( [ '@/pages/BaseInfoManagement/CaseTypeManagement' ], resolve );
const CaseRemindManagement = resolve => require( [ '@/pages/BaseInfoManagement/CaseRemindManagement' ], resolve );
const FlowAssistanceManagement = resolve => require( [ '@/pages/BaseInfoManagement/FlowAssistanceManagement' ], resolve );
const CurrencyManagement = resolve => require( [ '@/pages/BaseInfoManagement/CurrencyManagement' ], resolve );
const ExchangeRateManagement = resolve => require( [ '@/pages/BaseInfoManagement/ExchangeRateManagement' ], resolve );
//工作流管理
//const TaskDetail = resolve => require(['@/pages/FlowManagement/TaskDetail'], resolve);
const PersonalTaskCenter = resolve => require( [ '@/pages/FlowManagement/PersonalTaskCenter' ], resolve );
const FlowManagement = resolve => require( [ '@/pages/FlowManagement/FlowManagement' ], resolve );
const FlowChart = resolve => require( [ '@/pages/FlowManagement/FlowChart' ], resolve );
//工作交接页面
const Handover = resolve => require( [ '@/pages/Handover/Handover' ], resolve );
const HandoverApply = resolve => require( [ '@/pages/Handover/HandoverApply' ], resolve );
const HandoverDetails = resolve => require( [ '@/pages/Handover/HandoverDetails' ], resolve );
const HandoverQuery = resolve => require( [ '@/pages/Handover/HandoverQuery' ], resolve );

//案件台账管理及子页面
const CaseLedgerManage = resolve => require( [ '@/pages/CaseLedgerManage/CaseLedgerManage' ], resolve );
const CommonCaseLedger = resolve => require( [ '@/pages/CaseLedgerManage/CommonCaseLedger' ], resolve );
const CriminalCaseLedger = resolve => require( [ '@/pages/CaseLedgerManage/CriminalCaseLedger' ], resolve );
const ForeignCaseLedger = resolve => require( [ '@/pages/CaseLedgerManage/ForeignCaseLedger' ], resolve );
const LedgerTempManage = resolve => require( [ '@/pages/CaseLedgerManage/LedgerTempManage' ], resolve );
const MajorCaseLedger = resolve => require( [ '@/pages/CaseLedgerManage/MajorCaseLedger' ], resolve );
//错误页面：403:无权限；404：未找到；500：服务器错误
const NoPermission = resolve => require( [ '@/pages/ErrorPages/403NoPermission' ], resolve );
const NotFound = resolve => require( [ '@/pages/ErrorPages/404NotFound' ], resolve );
const ServerError = resolve => require( [ '@/pages/ErrorPages/500ServerError' ], resolve );
Vue.use( Router )
export const routes = {
    path: '/main',
    name: 'main',
    redirect: '/main/index',
    meta: {
        title: '首页',
        id: 1
    },
    component: Main,
    children: [ {
            path: 'index',
            name: 'main_index',
            component: Index,
            meta: {
                id: 1,
                title: '首页'
            },
        },
        {
            path: 'caseManage',
            name: 'caseManage',
            redirect: '/main/caseManage/caseReport',
            meta: {
                id: 2,
                title: '案件管理'
            },
            show: true,
            component: CaseManage,
            children: [ {
                    path: 'caseReport',
                    name: 'caseReport',
                    component: CaseReport,
                    show: true,
                    meta: {
                        id: 3,
                        title: '案件呈报'
                    }
                },
                {
                    path: 'caseAdditionalReport',
                    name: 'caseAdditionalReport',
                    component: CaseAdditionalReport,
                    show: false,
                    meta: {
                        id: 4,
                        title: '案件补录'
                    }
                },
                {
                    path: 'caseProgress',
                    name: 'caseProgress',
                    component: CaseProgress,
                    show: false,
                    meta: {
                        id: 5,
                        title: '案件进展'
                    }
                },
                {
                    path: 'caseExecute',
                    name: 'caseExecute',
                    component: CaseExecute,
                    show: false,
                    meta: {
                        id: 6,
                        title: '案件执行'
                    }
                },
                {
                    path: 'caseFinish',
                    name: 'caseFinish',
                    component: CaseFinish,
                    show: false,
                    meta: {
                        id: 7,
                        title: '案件结案'
                    }
                },
                {
                    path: 'caseResult',
                    name: 'caseResult',
                    component: CaseResult,
                    show: false,
                    meta: {
                        id: 8,
                        title: '案件报告结果'
                    }
                },
                {
                    path: 'caseResultCheck',
                    name: 'caseResultCheck',
                    component: CaseResultCheck,
                    show: true,
                    meta: {
                        id: 56,
                        title: '案件报告查询'
                    }
                },
                {
                    path: 'caseCheck',
                    name: 'caseCheck',
                    component: CaseCheck,
                    show: true,
                    meta: {
                        id: 55,
                        title: '案件查询'
                    }
                }
            ]
        },
        {
            path: 'lawyerManage',
            name: 'lawyerManage',
            redirect: 'lawyerManage/lawyerEntry',
            meta: {
                id: 16,
                title: '律师库管理'
            },
            show: true,
            component: LawyerManage,
            children: [
                {
                    path: 'lawOfficeEntry',
                    name: 'lawOfficeEntry',
                    meta: {
                        id: 20,
                        title: '律所录入'
                    },
                    show: true,
                    component: LawOfficeEntry
                },
                {
                    path: 'lawyerEntry',
                    name: 'lawyerEntry',
                    meta: {
                        id: 19,
                        title: '律师录入'
                    },
                    show: true,
                    component: LawyerEntry
                },
                {
                    path: 'externalLawyerEntry',
                    name: 'externalLawyerEntry',
                    meta: {
                        id: 21,
                        title: '律师录入(境外)'
                    },
                    show: true,
                    component: ExternalLawyerEntry
                },
                {
                    path: 'lawyerDetail',
                    name: 'lawyerDetail',
                    meta: {
                        id: 26,
                        title: '律师详情'
                    },
                    show: false,
                    component: LawyerDetail,
                },
                
                {
                    path: 'addLawyer',
                    name: 'addLawyer',
                    meta: {
                        id: 17,
                        title: '律师入库'
                    },
                    show: false,
                    component: AddLawyer
                },
                {
                    path: 'deleteLawyer',
                    name: 'deleteLawyer',
                    meta: {
                        id: 18,
                        title: '律师出库'
                    },
                    show: false,
                    component: DeleteLawyer
                },
                {
                    path: 'lawOfficeDetail',
                    name: 'lawOfficeDetail',
                    meta: {
                        id: 27,
                        title: '律所详情'
                    },
                    show: false,
                    component: LawOfficeDetail
                },
                {
                    path: 'lawOfficeQuery',
                    name: 'lawOfficeQuery',
                    meta: {
                        id: 23,
                        title: '律所查询'
                    },
                    show: true,
                    component: LawOfficeQuery
                },
                {
                    path: 'lawyerQuery',
                    name: 'lawyerQuery',
                    meta: {
                        id: 22,
                        title: '律师查询'
                    },
                    show: true,
                    component: LawyerQuery
                },
                {
                    path: 'firstTrialLawyer',
                    name: 'firstTrialLawyer',
                    meta: {
                        id: 32,
                        title: '外聘律师初审'
                    },
                    show: false,
                    component: FirstTrialLawyer
                },
                {
                    path: 'finalTrialLawyer',
                    name: 'finalTrialLawyer',
                    meta: {
                        id: 33,
                        title: '外聘律师终审'
                    },
                    show: false,
                    component: FinalTrialLawyer
                },
                {
                    path: 'employLawyer',
                    name: 'employLawyer',
                    meta: {
                        id: 34,
                        title: '聘用律师'
                    },
                    show: false,
                    component: EmployLawyer
                },

                {
                    path: 'externalLawyer',
                    name: 'externalLawyer',
                    meta: {
                        id: 28,
                        title: '外聘律师申请'
                    },
                    show: true,
                    component: ExternalLawyer
                },
                {
                	path: 'externalLawyerInfo',
                    name: 'externalLawyerInfo',
                    meta: {
                        id: 56,
                        title: '外聘流程信息'
                    },
                    show: false,
                    component: ExternalLawyerInfo
                },
                {
                    path: 'evaluationManage',
                    name: 'evaluationManage',
                    meta: {
                        id: 24,
                        title: '评价管理'
                    },
                    show: false,
                    component: EvaluationManage,
                },
                 {
                    path: 'blackListManage',
                    name: 'blackListManage',
                    meta: {
                        id: 25,
                        title: '黑名单管理'
                    },
                    show: false,
                    component: BlackListManage,
                },
                {
                    path: 'addEvaluationRemind',
                    name: 'addEvaluationRemind',
                    meta: {
                        id: 42,
                        title: '添加评价提醒'
                    },
                    show: false,
                    component: AddEvaluationRemind
                },
                {
                    path: 'lawyerFirstApproval',
                    name: 'lawyerFirstApproval',
                    meta: {
                        id: 42,
                        title: '律师入库审批'
                    },
                    show: false,
                    component: LawyerFirstApproval
                },
                {
                    path: 'lawyerEndApproval',
                    name: 'lawyerEndApproval',
                    meta: {
                        id: 42,
                        title: '律师出库审批'
                    },
                    show: false,
                    component: LawyerEndApproval
                },
            ]
        },
        {
            path: 'baseInfoManagement',
            name: 'baseInfoManagement',
            redirect: 'baseInfoManagement/numberRuleManagement',
            show: true,
            meta: {
                id: 44,
                title: '基础信息管理'
            },
            component: BaseInfoManagement,
            children: [ {
                    path: 'numberRuleManagement',
                    name: 'numberRuleManagement',
                    show: true,
                    meta: {
                        id: 45,
                        title: '编号规则管理'
                    },
                    component: NumberRuleManagement
                },
                {
                    path: 'nameRuleManagement',
                    name: 'nameRuleManagement',
                    show: true,
                    meta: {
                        id: 46,
                        title: '名称规则管理'
                    },
                    component: NameRuleManagement
                },
                {
                    path: 'caseTypeManagement',
                    name: 'caseTypeManagement',
                    show: true,
                    meta: {
                        id: 47,
                        title: '案件类型管理'
                    },
                    component: CaseTypeManagement
                },
                {
                    path: 'caseRemindManagement',
                    name: 'caseRemindManagement',
                    show: true,
                    meta: {
                        id: 48,
                        title: '预警提醒管理'
                    },
                    component: CaseRemindManagement
                },
                {
                    path: 'flowAssistanceManagement',
                    name: 'flowAssistanceManagement',
                    show: true,
                    meta: {
                        id: 49,
                        title: '流程帮助管理'
                    },
                    component: FlowAssistanceManagement
                },
                {
                    path: 'currencyManagement',
                    name: 'currencyManagement',
                    show: true,
                    meta: {
                        id: 50,
                        title: '币种管理'
                    },
                    component: CurrencyManagement
                },
                {
                    path: 'exchangeRateManagement',
                    name: 'exchangeRateManagement',
                    show: true,
                    meta: {
                        id: 51,
                        title: '汇率管理'
                    },
                    component: ExchangeRateManagement
                },
            ]
        },
        {
            path: 'flowManagement',
            name: 'flowManagement',
            show: false,
            redirect: 'flowManagement/personalfinal',
            meta: {
                id: 52,
                title: '工作流管理'
            },
            component: FlowManagement,
            children: [ {
                path: 'personalTaskCenter',
                name: 'personalTaskCenter',
                show: false,
                meta: {
                    id: 53,
                    title: '个人任务中心'
                },
                component: PersonalTaskCenter
            }, {
                path: 'flowChart',
                name: 'flowChart',
                show: false,
                meta: {
                    id: 55,
                    title: '流程图'
                },
                component: FlowChart
            } ]
        },
        {
            path: 'handover',
            name: 'handover',
            show: false,
            redirect: 'handover/handoverApply',
            meta: {
                id: 50,
                title: '工作交接'
            },
            component: Handover,
            children: [ {
                path: 'handoverApply',
                name: 'handoverApply',
                show: false,
                meta: {
                    id: 51,
                    title: '工作交接申请'
                },
                component: HandoverApply
            },
            {
                path: 'handoverQuery',
                name: 'handoverQuery',
                show: false,
                meta: {
                    id: 52,
                    title: '工作交接查询'
                },
                component: HandoverQuery
            },
            {
                path: 'handoverDetails',
                name: 'handoverDetails',
                show: false,
                meta: {
                    id: 53,
                    title: '工作交接详情'
                },
                component: HandoverDetails
            } ]
        },
        {
            path: 'caseLedgerManage',
            name: 'caseLedgerManage',
            show: true,
            redirect: 'caseLedgerManage/caseLedgerManage',
            meta: {
                id: 9,
                title: '案件台账管理'
            },
            component: CaseLedgerManage,
            children: [ {
                path: 'commonCaseLedger',
                name: 'commonCaseLedger',
                show: true,
                meta: {
                    id: 11,
                    title: '一般民事案件台账'
                },
                component: CommonCaseLedger
            }, {
                path: 'criminalCaseLedger',
                name: 'criminalCaseLedger',
                show: true,
                meta: {
                    id: 12,
                    title: '刑事案件台账'
                },
                component: CriminalCaseLedger
            }, {
                path: 'foreignCaseLedger',
                name: 'foreignCaseLedger',
                show: true,
                meta: {
                    id: 13,
                    title: '涉外民事案件台账'
                },
                component: ForeignCaseLedger
            }, {
                path: 'majorCaseLedger',
                name: 'majorCaseLedger',
                show: true,
                meta: {
                    id: 10,
                    title: '重大民事案件台账'
                },
                component: MajorCaseLedger
            }, {
                path: 'ledgerTempManage',
                name: 'ledgerTempManage',
                show: true,
                meta: {
                    id: 14,
                    title: '台账模板管理'
                },
                component: LedgerTempManage
            } ]
        },
        {
            path: 'authormanage',
            name: 'authormanage',
            component: Authormanage,
            show: true,
            meta: {
                id: 35,
                title: '后台管理'
            },
            children: [ {
                    path: 'personmanage',
                    name: 'personmanage',
                    component: PersonManage,
                    show: true,
                    meta: {
                        id: 37,
                        title: '机构人员管理'
                    },
                },
                {
                    path: 'rolemanage',
                    name: 'rolemanage',
                    show: true,
                    component: RoleManage,
                    meta: {
                        id: 38,
                        title: '角色管理'
                    },
                }
            ]

        }

    ]
}
export const router = new Router( {
    routes: [

        {
            path: '/',
            name: 'Login',
            meta: {
                title: '登录页'
            },
            component: Login
        },
        routes,
        {
            path: '/notFound',
            name: 'notFound',
            meta: {
                title: '404-Not-Found'
            },
            component: NotFound
        },
        {
            path: '/noPermission',
            name: 'noPermission',
            meta: {
                title: '403-No-Permission'
            },
            component: NoPermission
        },
        {
            path: '/serverError',
            name: 'serverError',
            meta: {
                title: '500-Server-Error'
            },
            component: ServerError
        }

    ]
} )
router.beforeEach( ( to, from, next ) => {
    iView.LoadingBar.start();
    if ( to.name == "Login" || to.name == "noPermission" || to.name == "notFound" || to.name == 'flowChart' || to.name == 'externalLawyerInfo' ) {
        next( true );
        return
    }
    if ( !getStore( 'userInfo' ) ) {
        next( {
            name: 'Login'
        } )
        return

    }
    if ( to.name == null ) {
        next( {
            name: 'notFound'
        } )
        return
    }
    let idArr = JSON.parse( getStore( 'idArr' ) );
    //console.log(idArr)
    if ( !idArr.includes( to.meta.id ) ) {
        next( {
            name: 'noPermission'
        } )
        return
    }
    next( true );
} );
router.afterEach( ( to ) => {
    iView.LoadingBar.finish();

//  SetTitle( to.meta.title );
    window.scrollTo( 0, 0 );
} );