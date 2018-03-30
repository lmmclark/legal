/**
 * 存储localStorage
 */
export const setStore = ( name, content ) => {
    if ( !name ) return;
    if ( typeof content !== 'string' ) {
        content = JSON.stringify( content );
    }
    window.sessionStorage.setItem( name, content );
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if ( !name ) return;
    return window.sessionStorage.getItem( name );
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if ( !name ) return;
    window.sessionStorage.removeItem( name );
}
export const SetTitle = title => {
    title = title || '法务系统';
    window.document.title = title;
};
export const ObjArrayDistinct = ( arr, attr ) => {
    //	debugger
    let temp = arr.filter( ( item, index, arr ) => {
        for ( let i = 0; i < index; i++ ) {
            if ( item[ attr ] == arr[ i ][ attr ] ) {
                return false;
            }
        }
        return true;
    } )
    return temp

};
//新开查看律师详情
export const gotoLawyerDetail = (id) => {
    let urlStr = window.location.href;
    let end = urlStr.indexOf( '#' ) + 2;
    urlStr = urlStr.slice( 0, end )
    let newUrl = urlStr + 'main/lawyerManage/lawyerDetail?id=' + id;
    window.open( newUrl )

};
//新开流程图页面
export const gotoFlowChart = (id,type) => {
    let urlStr = window.location.href;
    let end = urlStr.indexOf( '#' ) + 2;
    urlStr = urlStr.slice( 0, end )
    let newUrl = urlStr + 'main/flowManagement/flowChart?' ;
    if(id){
    	newUrl +='flowChart=' + id
    }else{
    	newUrl+='processImgType='+type
    }
    window.open( newUrl )

};
/**
 * 日期格式化
 */
export const dateFormat = (date) => {
	let newDate = new Date(date),
	    year = newDate.getFullYear(),
	    month = newDate.getMonth() + 1,
	    day = newDate.getDate(),
	    Hours = newDate.getHours(),
	    minutes = newDate.getMinutes(),
	    seconds = newDate.getSeconds();
	let Arr = [month,day,Hours,minutes,seconds];
	for (let i = 0; i < Arr.length; i++) {
		if(Arr[i] < 10){
			Arr[i] = "0" + Arr[i]
		}
	}
	month = Arr[0];
	day = Arr[1];
	Hours = Arr[2];
	minutes = Arr[3];
	seconds = Arr[4];
	return (year+"-"+month+"-"+day+" "+Hours+":"+minutes+":"+seconds);
}

/**
 * 金额添加分隔符
 */
export const moneyFormat = (data) =>{
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


export const permissionBaseUrl = 'http://10.71.202.132:8651'
/*
上传文件格式限制 
* */
export const fileFormat = ['jpg','jpeg','png','gif','bmp','txt','doc','docx','htm','html','jsp','pdf','ppt','rar','zip']
//协办人 承办人数组（协办人，承办人不能重复）
export const xbrArray = [];
export const cbrArray = [];