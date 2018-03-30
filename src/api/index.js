import axios from 'axios'
import permissionBaseUrl from './utils' 

/**
 * 调用方式 import {getBZ} from '路径/api/index'
 * 返回值是一个Promise对象，用then来获取值
 */


 
 
// 获取币种
export const getBZ = function () {
    return axios.request({
        url:permissionBaseUrl + '/dictKind/findByDictKindCode/bz',
        method:'get'
    })
    .then(res => {
        return Promise.resolve(res);
    })
    .catch(err => {
        throw Error(err);
    })
}

// 获取诉讼地位
export const getSSDW = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/ssdw',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 案件进展阶段
export const getAJJZ = function () {
    return axios.request({
            url:permissionBaseUrl +  '/dictKind/findByDictKindCode/ajjzjd',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 案件类型
export const getAJLX = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/ajlx',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 计费方式
export const getJFFS = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/jffs',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 公文密级
export const getGWMJ = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/gwmj',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 公文缓急
export const getGWHJ = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/gwhj',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 律师、律所评价等级
export const getLSPJ = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/lslspj',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 台账表头
export const getTZBT = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/tzbt',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 律师学历
export const getLSXL = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/lsxl',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}

// 提醒提前时间
export const getTXTQSJ = function () {
    return axios.request({
            url:permissionBaseUrl + '/dictKind/findByDictKindCode/txtqsj',
            method:'get'
        })
        .then(res => {
            return Promise.resolve(res);
        })
        .catch(err => {
            throw Error(err);
        })
}