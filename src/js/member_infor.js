require('extend/template7');
require('components/toast');
require('components/calendar');
require('components/city-picker');
var common = require('extend/common');
var path = require('extend/path');
var app = {
  init: function(){
    this.getMemberInfor();
    this.saveMemberInfor();
  	this.bindEvent();
  },
  getMemberInfor: function(){
    var format = function(data) {
      var result = [];
      for(var i=0;i<data.length;i++) {
        var d = data[i];
        if(d.id === 0) continue;
        result.push({name:d.name, id:d.id});
      }
      if(result.length) return result;
      return [""];
    };

    var sub = function(data) {
      if(!data.sub) return [""];
      return format(data.sub);
    };
    var getProvince = function(d){
      for(var i = 0; i< raw.length;i++){
        if(raw[i].id === d) return raw[i].name;
      }
      return [""];
    }
    var getCitie = function(p, c) {
      for(var i=0;i< raw.length;i++) {
        if(raw[i].id === p) {
          for(var j=0;j< raw[i].sub.length;j++) {
            if(raw[i].sub[j].id === c) {
              return raw[i].sub[j].name;
            }
          }
        }
      }
      return [""];
    };
    var getCities = function(d) {
      for(var i=0;i< raw.length;i++) {
        if(raw[i].id === d) return sub(raw[i]);
      }
      return [""];
    };

    var getDistricts = function(p, c) {
      for(var i=0;i< raw.length;i++) {
        if(raw[i].name === p) {
          for(var j=0;j< raw[i].sub.length;j++) {
            if(raw[i].sub[j].name === c) {
              return sub(raw[i].sub[j]);
            }
          }
        }
      }
      return [""];
    };
    var getDistrict = function(ts, id){
        for(var i=0;i< ts.length;i++) {
          if(ts[i].id === id) {
              return ts[i].name;
          }
        }
        return [""];
      }
    var raw = $.rawCitiesData;
    common.getData(path.get_personal_infor_url, null, 'get', function(msg){
        if(msg.code != 0 || msg.code == undefined){
          $.toast('获取个人信息失败');
          return false;
        }
        if(!msg.value.birthday || msg.value.birthday == 'null'){
          msg.value.birthday = new Date().getTime();
        }
        msg.value.birthday = dateStr(new Date(msg.value.birthday),'yyyy-MM-dd');
        var provinceWord = getProvince(msg.value.provinceId);
        var city = getCitie(msg.value.provinceId, msg.value.cityId);
        var districts = getDistricts(provinceWord, city);
        var district = getDistrict(districts, msg.value.districtId);
        msg.value.addressWord = city? (provinceWord+' '+city+' '+district) : '';
        msg.value.addressId = msg.value.provinceId+' '+msg.value.cityId+' '+msg.value.districtId;
        var memberHtml = common.renderTemplate7('#memberInforTemplate', msg);
        $('#memberInforForm').html(memberHtml);
        $('#birthday').calendar({
            value: [msg.value.birthday]
          });
        $('#addreess').cityPicker({
          title: '请选择地址'
        });
    })
    //日期格式化
    function dateStr(x, y) {
       var z = {
           M : x.getMonth() + 1,
           d : x.getDate(),
           h : x.getHours(),
           m : x.getMinutes(),
           s : x.getSeconds()
       };
       y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
                   return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
               });
       return y.replace(/(y+)/g, function(v) {
                   return x.getFullYear().toString().slice(-v.length)
               });
   }
  },
  saveMemberInfor: function(){
    //保存
    $('#updatePersonInfo').on('click',function(event){
      
      var formdata = {
        id:$('#memberId').val(),
        name:$('#memberName').val(),
        gender:$('input[name=gender]:checked').val(),
        birthday:$('#birthday').val(),
        provinceId:'',
        cityId:'',
        districtId:''
      }   
      var addressValue = $("#addreess").attr('data-picker-id');
      if(!addressValue||addressValue=='')
      {
         $.toast('请填写地址');
        return;
      }
      var addressArr = addressValue.split(' ');
      
      formdata.provinceId= addressArr[0];
      
      if(addressArr[1]=='0')
      {
        $.toast('请选择城市');
        return;
      }
      formdata.cityId= addressArr[1];
      if(addressArr[2]=='0')
      {
        formdata.districtId = null;
      }else{
        formdata.districtId= addressArr[2];
      }
      common.getData(path.update_personal_infor_url, formdata, 'post', function(msg){
        $.toast(msg.message)
          setTimeout(function(){
             $(".icon-back").click();
           }, 1000);
        })
    });
    $("#cancelUpdatePersion").on('click',function(){
      window.location.href = '/html/customer/memberIndex.html';
    });
  },
  bindEvent: function(){
    
  }
};

$(function(){
  app.init();
});
