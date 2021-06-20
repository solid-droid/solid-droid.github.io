  
   const body =document.getElementsByTagName("BODY")[0]
   function openFullscreen() {
    // if (body.requestFullscreen) {
    //     body.requestFullscreen();
    // } else if (body.webkitRequestFullscreen) { /* Safari */
    //     body.webkitRequestFullscreen();
    // } else if (body.msRequestFullscreen) { /* IE11 */
    //     body.msRequestFullscreen();
    // }
  }

  $(document).ready(function(){
    $('body').css({overflow:"hidden"});
    $(this).scrollTop(0);
});

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
    // markers:true
})


const words = [" Nikhil", " a Designer", " a Developer", " Nikhil M Jeby"]
let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
let masterTl = gsap.timeline()
let boxTl = gsap.timeline()
masterTl.pause()


let _start = gsap.timeline()
let _project1 = gsap.timeline()
let _project2 = gsap.timeline()
let _project3 = gsap.timeline()
let _project4 = gsap.timeline()
let _contact = gsap.timeline()


boxTl.to('.box', {duration:0.5, width:"25vw", delay: 0.1, ease: "power4.inOut"})
  .from('.hi', {duration:0.5, y:"11vw", ease: "power3.out"})
  .to('.box', {duration:1, height:"9.5vw", ease: "elastic.out", onComplete: () => masterTl.play() })
  .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})


words.forEach((word,i) => {
  let tl = gsap.timeline({repeat:  i<words.length-1?1:0, yoyo: i<words.length-1?true:false, repeatDelay:1})
  tl.to('.text', {duration: 1, text: word})
  if(i==words.length-1){
    tl.to(".Name", {duration:1, y:"-20vh", onComplete:loadComplete},"-=1")
  }
  
  masterTl.add(tl)
})

let currentScreen = 0;
const screens={
    0 : "#home",
    1 : "#panel1",
    2 : "#panel2",
    3 : "#panel3",
    4 : "#panel4",
    5 : "#panel5",
    6 : "#contact"
}
function loadComplete(){
    Page1();
    $('body').css({'overflow-y':'scroll'});
    for(let i = 0; i<7 ;++i)
        createScrollTriggers(i);
     
}

function createScrollTriggers(screen){
    ScrollTrigger.create({
        trigger: screens[screen],
        start: "+=50 top", 
        end: "-=50 bottom", 
        onEnter: () => {
            gsap.to(body, {duration: 1, scrollTo: screens[screen>=6?6:screen+1]})
        },

      });

    ScrollTrigger.create({
        trigger: screens[screen],
        start: "-=50 bottom", 
        end: "+=50 top", 
        onEnterBack:() =>{
            gsap.to(body, {duration: 1, scrollTo: screens[screen<=0?0:screen-1]})
        }

      });
}

function Page1(){
    _project1.to(".jobType",{opacity:1,  y:"-20vh"});
    _project1.to(".icon-scroll",{opacity:1});
}

