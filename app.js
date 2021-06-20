   function openFullscreen() {
    if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
    } else if (document.body.webkitRequestFullscreen) { /* Safari */
        document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) { /* IE11 */
        document.body.msRequestFullscreen();
    }
  }


  $(document).ready(function(){
    $(this).scrollTop(0);
    $('body').css({overflow:"hidden"});
});




gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    // markers:true
})


const words = [" Nikhil", " a Designer", " a Developer", " Nikhil M Jeby"]
let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
let masterTl = gsap.timeline()
let boxTl = gsap.timeline()
let TimeLines = [];
for(let i =0; i< 6;++i)
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
    tl.to(".Name", {duration:1, y:"-20vh", onComplete:loadComplete},"-=1")
  }
  
  masterTl.add(tl)
})

const screens={
    // 0 : "#home",
    0 : "#panel1",
    1 : "#panel2",
    2 : "#panel3",
    3 : "#panel4",
    4 : "#panel5",
    5 : "#contact"
}
function loadComplete(){
    $('body').css({'overflow-y':'scroll'});
    Page1();
}

function createTimeLines(screenID){
    TimeLines[screenID] =  gsap.timeline();
}

function Page1(){
    gsap.to(".jobType",{opacity:1,  y:"-20vh"});
    gsap.to(".icon-scroll",{opacity:1});
}

function BeginScreen(id){
    switch(id){
        case 0: project1(id); break;
        case 1: project2(id); break;
        case 2: project3(id); break;
        case 3: project4(id); break;
        case 4: project5(id); break;
        case 5: contact(id); break;

    }
}

function project1(id){
    TimeLines[id].to(".rocket",{y:200, scrollTrigger :{
        trigger:".rocket",
        start:"top center",
        scrub:2
    }});
}

function project2(){
    
}


function project3(){
    
}


function project4(){
    
}


function project5(){
    
}

function contact(){
    
}


