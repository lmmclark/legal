公共方法：
1：以下这11个方法：在页面使用是 先进性判断 看vuex有没有对应的state，如果有就获取vuex中的状态用，如果没有就使用下面对应的方法，从后台获取
'getBz'
'getSSDW',
'getAJJZJD',
'getAJLX',
'getJFFS',
'getGWMJ',
'getGWHJ',
'getLSPJ',
'getTZBT',
'getLSXL',
'getTXTQSJ'
例如：
computed: {
    ...mapState([
    	'bz'//这里写你要获取的数据
    ]),
},
methods: {
	...mapActions([///这里写你要获取的方法
		'getBz',
		'getSSDW',
		'getAJJZJD',
		'getAJLX',
		'getJFFS',
		'getGWMJ',
		'getGWHJ',
		'getLSPJ',
		'getTZBT',
		'getLSXL',
		'getTXTQSJ'
	]),
}
mounted() {
	if(this.bz.length==0){
		this.getBz();
	}
},
这样的话就会将数据存到vuex中，在其他页面中就可以使用到对应的数据；
如果页面刷新会重新请求后台数据，不必担心刷新了，数据就没了



