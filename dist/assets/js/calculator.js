let calculator={ini:function(t){this.storage=t.storage;let e=this.storage;t.max=t.max||15,t.max=Math.min(Math.round($("#input-container").width()/18-1),t.max),void 0!==typeof t.selector&&($.each(t.selector,function(t,e){calculator.selector[t]=$(e)}),$.each(t.options,function(t,e){calculator.options[t]=e}),this.options.maxLength=t.max,"0"!=e.m&&$("#m-status").text("m"),$(t.selector.radDeg).text(localStorage.radDeg),""===e.op||""===e.second?this.screen.set(e.first):this.screen.set(e.second))},value:function(){return parseFloat(this.screen.get())},selector:{},options:{},numberClicked:function(t){let e=this.storage;1==e.clear&&this.screen.clear(),""==e.op?e.first.replace(/-/g,"").replace(/\./g,"").length<this.options.maxLength&&(e.first+=t,this.screen.set(e.first,!1)):e.second.replace(/(-|\.)/g,"").length<this.options.maxLength&&(e.second+=t,this.screen.set(e.second,!1))},screen:{set:function(t){if(""==(t=String(t))&&(t="0"),-1!=t.indexOf(".")&&"-0"!==t){let e=t.split(".");t=`${parseInt(e[0])}.${e[1]}`}else"-0"!=t&&(t=String(parseInt(t)));var e=""!=t&&void 0!=t&&"undefined"!=t;if("NaN"==t||t.split(".")[0].replace(/-/,"").length>calculator.options.maxLength||!e)return calculator.screen.clear(),calculator.selector.screen.text("ERROR"),!1;if(t.replace(/-/,"").length<=calculator.options.maxLength&&e)calculator.selector.screen.text(calculator.parse.commas(t));else if(t.split(".")[0].replace(/-/,"").length<calculator.options.maxLength&&e){let e=calculator.options.maxLength-t.split(".")[0].length,a=calculator.parse.commas(math.round(parseFloat(t),e));calculator.selector.screen.text(a)}return calculator.selector.screen.text().replace(/,/g,"")},get:function(){return calculator.selector.screen.text().replace(/,/g,"")},length:function(){return this.get().replace(/\./g,"").replace(/-/g,"").length},clear:function(){let t=calculator.storage;""!==t.second&&(t.lastSecond=t.second),t.clear=!1,t.first="0",t.second="",calculator.selector.screen.text(""),calculator.animate.op(),t.op="",calculator.screen.set(0)}},operator:function(t=""){let e=this.storage;""!==e.op?(this.calculate(!1,!0),e.clear=!1,e.op=t,this.animate.op(t)):(e.clear=!1,e.op=t,this.animate.op(t))},calculate:function(t,e){let a,c,r,o=this.storage;if(""!==o.op&&(""!==o.second||!e)){switch(["0",""].includes(this.second)||(this.lastSecond=this.second),a=parseFloat(o.first),c=""!==o.second?parseFloat(o.second):parseFloat(o.lastSecond),o.op){case"plus":r=a+c;break;case"subtract":r=a-c;break;case"multiply":r=a*c;break;case"divide":r=a/c;break;case"mod":r=a%c;break;case"pow-of-y":r=Math.pow(a,c);break;case"square-root-y":r=math.nthRoot(a,c)}this.animate.op(),o.first=String(r),o.second="",$(calculator.selector.screen).text(""),setTimeout(()=>{calculator.screen.set(r)},50),!0===t&&(this.clear=!0)}},mathFunctions:{pi:()=>String(Math.PI),e:()=>Math.E,pow:(t,e)=>math.pow(t,e),nthroot:(t,e)=>{try{let a=e%2==1&&t<0;a&&(t=-t);let c=Math.pow(t,1/e);if(e=Math.pow(c,e),Math.abs(t-e)<1&&t>0==e>0)return a?-c:c}catch(t){}},in:t=>Math.log(t),log:(t,e)=>math.log(t,e),sin:t=>math.sin(math.unit(t,calculator.storage.radDeg)),cos:t=>math.cos(math.unit(t,calculator.storage.radDeg)),tan:t=>math.tan(math.unit(t,calculator.storage.radDeg)),sinh:t=>math.sinh(math.unit(t,calculator.storage.radDeg)),cosh:t=>math.cosh(math.unit(t,calculator.storage.radDeg)),tanh:t=>math.tanh(math.unit(t,calculator.storage.radDeg)),asin:t=>"rad"==calculator.storage.radDeg?math.asin(t):math.asin(t)*(180/Math.PI),acos:t=>"rad"==calculator.storage.radDeg?math.acos(t):math.acos(t)*(180/Math.PI),atan:t=>"rad"==calculator.storage.radDeg?math.atan(t):math.atan(t)*(180/Math.PI),asinh:function(t){return Math.asinh(t)},acosh:function(t){return Math.acosh(t)},atanh:function(t){return Math.atanh(t)}},math:function(t,e,a){let c=calculator.mathFunctions[t](parseFloat(e),parseFloat(a));if(!1!==c)return""==calculator.op?calculator.first=calculator.screen.set(c):calculator.second=calculator.screen.set(c);calculator.screen.get()},event:{addDecimal:function(){let t=calculator.storage;1==t.clear&&calculator.screen.clear(),-1==calculator.screen.get().indexOf(".")&&(""===t.op?(t.first=t.first+".",calculator.screen.set(t.first)):("."!==t.second&&""!==t.second||(t.second="0."),t.second=t.second+".",calculator.screen.set(t.second)))},posNeg:function(){let t=calculator.storage;""===t.op&&(0==t.first.length?t.first="-0":-1==t.first.indexOf("-")?t.first="-"+t.first:t.first=t.first.replace(/-/g,""),calculator.screen.set(t.first)),""!==t.op&&(0==t.second.length?t.second="-0":-1==t.second.indexOf("-")?t.second="-"+t.second:t.second=t.second.replace(/-/g,""),calculator.screen.set(t.second))},radDeg:function(){let t=calculator.storage;"rad"===calculator.selector.radDeg.text()?($(calculator.selector.radDeg).text("deg"),t.radDeg="deg"):"deg"===calculator.selector.radDeg.text()&&($(calculator.selector.radDeg).text("rad"),t.radDeg="rad")},percentage:function(){let t=calculator.storage;return""===t.op?(t.first=String(.01*t.first*1),t.clear=!0,calculator.screen.set(t.first)):(t.second=String(t.first*(.01*t.second)),t.clear=!0,calculator.screen.set(t.second))},sq:()=>{let t=calculator.storage;""===t.op?(t.first=String(t.first*t.first),t.clear=!0,calculator.screen.set(t.first)):(t.second=String(t.second*t.second),t.clear=!0,calculator.screen.set(t.second))},sqrt:()=>{let t=calculator.storage;""==t.op?(t.first=String(Math.sqrt(t.first)),t.clear=!0,calculator.screen.set(t.first)):(t.second=String(Math.sqrt(t.second)),t.clear=!0,calculator.screen.set(t.second))}},m:{recall:()=>{""==calculator.op?calculator.first=calculator.storage.m:calculator.second=calculator.storage.m,calculator.screen.set(calculator.storage.m)},clear:()=>{calculator.storage.m=0,$("#m-status").text("")},minus:function(){calculator.storage.m-=calculator.value(),"0"!=calculator.storage.m&&$("#m-status").text("m")},plus:function(){calculator.storage.m=parseFloat(calculator.storage.m)+calculator.value(),"0"!=calculator.storage.m&&$("#m-status").text("m")}},parse:{commas:function(t){let e=t.toString().split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}},animate:{op:t=>{let e=$("#"+t);$(".opp").css({"-webkit-transform":"scale(1)"}),void 0!=calculator.storage.op?(e.css({"-webkit-transform":"scale(0.90)"}),setTimeout(()=>{e.css({"-webkit-transform":"scale(0.95)"})},100)):e.css({"-webkit-transform":"scale(1)"})}},clipboard:{copy:t=>{let e=$("<input/>");e.val(t),$("body").append(e),e.select(),document.execCommand("copy"),e.remove()},paste:function(){let t=$("<input/>");$("body").append(t),t.select(),document.execCommand("paste");let e=parseFloat(t.val());isNaN(parseFloat(e))?(calculator.selector.screen.text("ERROR"),calculator.screen.clear()):(calculator.screen.set(e),""==calculator.op?calculator.first=e:calculator.second=e),t.remove()}}};
//# sourceMappingURL=calculator.js.map