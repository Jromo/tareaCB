let curr = {};

curr['PEN'] = {
  usdvalue : 0.28,
  spread : 0.015,
  margin : 0.03
}

curr['COP'] = {
  usdvalue : 0.00027,
  spread : 0.018,
  margin : 0.035
}

curr['BRL'] = {
  usdvalue : 0.19,
  spread : 0.012,
  margin : 0.029
}


$(function(){

  $('.inputsend').keyup(function(){
    t = $('.currency').val()
    q = calcreceive($(this).val(), t)
    $('.inputreceive').val(Math.round(q)+" "+t)
  })

  $('.inputreceive').keyup(function(){
    t = $('.currency').val()
    q = calcsend($(this).val(), t)
    $('.inputsend').val(Math.round(q))
  })

  $('.radiosend').on('click', function(){
    $('.inputreceive').prop('readonly', true);
    $('.inputsend').prop('readonly', false);
  })

  $('.radioreceive').on('click', function(){
    $('.inputsend').prop('readonly', true);
    $('.inputreceive').prop('readonly', false);
  })

  $('.currency').on("change", function(){
    t = $(this).val()
    q = calcreceive($('.inputsend').val(), t)
    $('.inputreceive').val(Math.round(q)+" "+t)
  })

});

function calcreceive(q,t){
  //resto el margen
  q = q/(1+curr[t].margin)
  //resto spread
  q = q/1.004
  //convierto a usd
  q = q/757
  //resto spread
  q = q/(1+curr[t].spread)
  //convierto a moneda
  q = q/curr[t].usdvalue

  return q
}

function calcsend(q,t){
  //convierto a usd
  q = q*curr[t].usdvalue
  //sumo spread
  q = q + q*curr[t].spread
  console.log(q)
  //convierto a clp
  q = q*757
  //sumo spread
  q = q + q*0.004
  //sumo el margen
  q = q + q*curr[t].margin

  return q
}