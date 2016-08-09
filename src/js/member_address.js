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
      return "";
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
      }
    var raw = $.rawCitiesData;
    common.getData(path.get_personal_infor_url, null, 'get', function(msg){
        if(msg.code != 0 || msg.code == undefined){
          $.toast('获取个人信息失败');
          return false;
        }
        var provinceWord = getProvince(msg.value.provinceId);
        var city = getCitie(msg.value.provinceId, msg.value.cityId)
        var districts = getDistricts(provinceWord, city);
        var district = getDistrict(districts, msg.value.districtId)
        msg.value.addressWord = provinceWord+' '+city+' '+district;
        msg.value.addressId = msg.value.provinceId+' '+msg.value.cityId+' '+msg.value.districtId;
        var memberHtml = common.renderTemplate7('#memberInforTemplate', msg);
        $('#memberInforForm').html(memberHtml);
        $('#birthday').datetimePicker({
          value:[msg.value.birthday]
        });
        $('#addreess').cityPicker({
          title: '请选择地址'
        });
        //$("#picker-name").cityPicker("setValue", ["北京", "北京市", "西城区"]);
        $.toast(msg.message);
    })
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
        $.toast(msg.message);
      })
      /*
         $.ajax({
             url: '/micromall/microshopvip/updatePersonalBasic',
             data: formdata,
             dataType: 'json',
             type: 'post',
             success:function(data) {
                 showSuccess(data.message);
                 setTimeout(function(){
                   $('i.icon-back').click();
                 }, 1000);
             }
         }); 
      */
    });
  },
  bindEvent: function(){
    
  }
};

$(function(){
  app.init();
});
