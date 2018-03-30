<template>
	<div class="getarea">
		<Cascader :data="CityArr" @on-change="handleChange" change-on-select :clearable='false' style="width:210px"></Cascader>
	</div>
</template>

<script>
import {getarea} from '../utils/area.js'
export default {
	name: 'getarea',
	data(){
		return{
			CityArr:[]
		}
	},
	mounted(){
		this.CityArr=getarea();
	},
	methods:{
		handleChange :function(value, selectedData) {
			let arr = selectedData.map(function(o){
				return o.label
			});
			this.$emit('input',arr);
        }
	}
}
</script>

<style>
</style>