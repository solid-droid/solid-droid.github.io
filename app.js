  
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


boxTl.to('.box', {duration:0.5, width:"23vw", delay: 0.1, ease: "power4.inOut"})
  .from('.hi', {duration:0.5, y:"10vw", ease: "power3.out"})
  .to('.box', {duration:1, height:"8.5vw", ease: "elastic.out", onComplete: () => masterTl.play() })
  .to('.box', {duration:2, autoAlpha:0.7, yoyo: true, repeat: -1, ease:"rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})"})


words.forEach((word,i) => {
  let tl = gsap.timeline({repeat:  i<words.length-1?1:0, yoyo: i<words.length-1?true:false, repeatDelay:1})
  tl.to('.text', {duration: 1, text: word})
  if(i==words.length-1){
    tl.to(".Name", {duration:1, y:"-20vh", onComplete:Page1},"-=1")
  }
  
  masterTl.add(tl)
})

function Page1(){
    _project1.to(".jobType",{opacity:1,  y:"-20vh"});
    _project1.to(".icon-scroll",{opacity:1});
}

