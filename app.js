   function openFullscreen() {
    // if (document.body.requestFullscreen) {
    //     document.body.requestFullscreen();
    // } else if (document.body.webkitRequestFullscreen) { /* Safari */
    //     document.body.webkitRequestFullscreen();
    // } else if (document.body.msRequestFullscreen) { /* IE11 */
    //     document.body.msRequestFullscreen();
    // }
  }

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{
            data: [120, 137, 106, 112, 105, 108],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            yAxes: [{
                title: {
                    display: false
                }
            }]
        }
   }
});

  function updateClock(hours, minutes, seconds) {

    var hourDegrees = hours * 30;
    var minuteDegrees = minutes * 6;
    var secondDegrees = seconds * 6;
  
    $('.hour-hand').css({
      'transform': `rotate(${hourDegrees}deg)`
    });
  
    $('.minute-hand').css({
      'transform': `rotate(${minuteDegrees}deg)`
    });
  
    $('.second-hand').css({
      'transform': `rotate(${secondDegrees}deg)`
    });
  
  }
  
  setClockWithCurrentTime();
  
  function setClockWithCurrentTime() {
      var date = new Date();
  
    var hours = ((date.getHours() + 11) % 12 + 1);
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    updateClock(hours, minutes, seconds);
  }
  
  
  
  setInterval(setClockWithCurrentTime, 1000);
  


  $(document).ready(function(){
    $(this).scrollTop(0);
    $('body').css({overflow:"hidden"});
});

const links = {
    watch: [
        "https://codepen.io/solid-droid/pen/oNZOJbg",
        "https://github.com/solid-droid/BubbleOS"
    ], 
};


function openLink(page = 'watch', type = 0)
{
    window.open(links[page][type], '_blank').focus();
}

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    // markers:true
})


const screens={
    // 0 : "#home",
    0 : "#panel1",
    1 : "#panel2",
    2 : "#panel3",
    3 : "#contact"
}

const words = [" Nikhil", " a Designer", " a Developer", " Nikhil M Jeby"]


let TimeLines = [];
let cursor
let masterTl = gsap.timeline()
let boxTl = gsap.timeline()

init();
async function init(){
await new Promise(r => setTimeout(r, 500));
$('#home').css({opacity:1});
cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
for(let i =0; i< 4;++i)
{
    createTimeLines(i);
    BeginScreen(i);
}

masterTl.pause()



boxTl.to('.box', {duration:0.5, width:"25vw", delay: 0.1, ease: "power4.inOut"})
  .from('.hi', {duration:0.5, y:"11vw", ease: "power3.out"})
  .to('.box', {duration:1, height:"9.5vw", ease: "elastic.out", onComplete: () => masterTl.play() })
  .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})


words.forEach((word,i) => {
  let tl = gsap.timeline({repeat:  i<words.length-1?1:0, yoyo: i<words.length-1?true:false, repeatDelay:0.7})
  tl.to('.text', {duration: 1, text: word})
  if(i==words.length-1){
    tl.to(".Name", {duration:1, y:"-20vh", onComplete:()=>$("#panel1").css({opacity:1})},"-=1")
    tl.to(".jobType",{duration:1,  opacity:1,  y:"-15vh"},"k");
    tl.to(".icon-scroll",{duration:0.7,  opacity:1, onComplete:loadComplete});
  }
  
  masterTl.add(tl)
})
}

let autoScroll = false;
async function loadComplete(){
    // $('.jobType').css({opacity:1});
    $('body').css({'overflow-y':'scroll'});
    await new Promise(r=>setTimeout(r, 1000));
    // beginAutoScroll();
    // $(window).scroll(function() {
    //     clearTimeout($.data(this, 'scrollTimer'));
    //     $.data(this, 'scrollTimer', setTimeout(function() {
    //         beginAutoScroll();
    //     }, 3000));
    // });
}
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function beginAutoScroll()
{
    autoScroll = true;   
    gsap.to(document.body, {duration: 
        scale(document.body.scrollTop, 
        0, 1+ Math.max( document.body.scrollHeight, document.body.offsetHeight,document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
        , 100, 0), scrollTo:{y:"max", autoKill: true, ease:'none',onAutoKill:()=>{autoScroll=false}}});
}

function createTimeLines(screenID){
    TimeLines[screenID] =  gsap.timeline({
        scrollTrigger :{
            trigger:screens[screenID],
            start:"top-=50% top",
            scrub:1.5,
            end: "bottom-=70%",
            onEnter:()=>{
            if(screenID==0)$(".Name").fadeOut();
            if(screenID==0)$(".jobType").fadeOut();
            },
            onLeaveBack:async ()=>{
            if(screenID==0)$(".Name").fadeIn(1000);
            await new Promise(r=>setTimeout(r,100));
            if(screenID==0) $(".jobType").fadeIn(1000);
            },
        }});
        ScrollTrigger.create({
            trigger: "#id",
            trigger:screens[screenID],
            start:"top top",
            pin:true,
            end: "bottom-=50%"
        });
}

function BeginScreen(id){
    switch(id){
        case 0: project1(id); break;
        case 1: project2(id); break;
        case 2: project3(id); break;
        case 3: contact(id); break;

    }
}

function project1(id){
    let tl =gsap.timeline();
    tl.from(".watchStrap1",{y:-245 , duration:1},0);
    tl.from(".watchStrap2",{y:200 , duration:1}, 0);
    tl.from(".watchFace",{opacity:0,x:-20, duration:0.5},0);
    tl.from(".watchDisplay",{opacity:0, duration:1.5},"+=0.2");
    tl.from(".watchHeader",{opacity:0, y:-50, duration:1},0);
    tl.from(".watchContent",{opacity:0, y:-50, duration:1},0);
    // tl.to(".jobType",{opacity:0, y:-70, duration:.5},0);
    // tl.to(".Name",{opacity:0, y:-70, duration:.5},0);
    TimeLines[id].add(tl);
}

function project2(id){
    let tl =gsap.timeline();
    tl.from(".phoneBody",{x:30 , y: 10, opacity:0, duration:0.5, onStart: phoneAnimation, delay:0.1},0);
    tl.to(".watchContent",{opacity:0, y:-30, duration:0.5 },0);
    tl.from(".panel2Header",{opacity:0, y:70, duration:0.5},0);
    tl.from(".panel2Content",{opacity:0, y:70, duration:0.5},0);
    TimeLines[id].add(tl);
}

async function phoneAnimation(){
    await new Promise(r => setTimeout(r,2000));
    $(".graph").css({opacity:1});
    gsap.to(".Card1",{x:"-=70%", duration:0.5});
    gsap.to(".Card1",{x:0, duration:0.5, delay:2});
}

function project3(){
    
}


function project4(){
    
}


function project5(){
    
}

function contact(){
    
}


