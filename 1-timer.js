import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i}from"./assets/vendor-BbbuE1sJ.js";const n=document.querySelector("button[data-start]"),a=document.getElementById("datetime-picker");let s=null,u=null;function r(e){return String(e).padStart(2,"0")}function c({days:e,hours:t,minutes:o,seconds:d}){document.querySelector("[data-days]").textContent=r(e),document.querySelector("[data-hours]").textContent=r(t),document.querySelector("[data-minutes]").textContent=r(o),document.querySelector("[data-seconds]").textContent=r(d)}function p(e){const l=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:f,seconds:h}}y(a,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(i.error({title:"Error",message:"Please choose a date in the future"}),n.disabled=!0):(s=t,n.disabled=!1)}});n.addEventListener("click",()=>{s&&(n.disabled=!0,a.disabled=!0,u=setInterval(()=>{const t=s-new Date;if(t<=0){clearInterval(u),c({days:0,hours:0,minutes:0,seconds:0}),a.disabled=!1,n.disabled=!0,i.success({title:"Done",message:"Countdown finished!"});return}const o=p(t);c(o)},1e3))});
//# sourceMappingURL=1-timer.js.map
