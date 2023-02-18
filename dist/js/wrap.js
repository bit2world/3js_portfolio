
import Sketch from "./sketch.js";
// import gsap from "gsap";

var sketch = new Sketch({
  dom: document.getElementById("container"),
});

var element_body = document.querySelector('body');
var element_leftpart = document.querySelector('#id-left-part');

let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 5.5;//
let rounded = 0;
document.querySelector("#block");
document.querySelector("#wrap");
let elems = [...document.querySelectorAll(".n")];



window.addEventListener("wheel", (e) => {
  speed += e.deltaY * 0.0003;
  // console.log('attract to', attractTo);
  console.log('position', position);
  if(position > 0.0) attractTo = 0;
  if(position > 0.5) attractTo = 1;
  if(position > 1.5) attractTo = 2;
  if(position > 2.5) attractTo = 3;
  if(position > 3.5) attractTo = 4;
  if(position > 4.5) attractTo = 5;
  if(position > 5.5) attractTo = 6;

  
  let nav_element = document.querySelectorAll('[data-nav="' + attractTo + '"]')[0];
  sessionStorage.setItem('image_path', nav_element.getAttribute('src'));
  sessionStorage.setItem('back_color', nav_element.getAttribute('data-clr'));

});

let objs = Array(7).fill({ dist: 0 });

function raf() {

  position += speed;
  speed *= 0.8;
  
  if(position < 0) position = 0;
  if(position > 6.0) position = 6.0;////////////////////////////////////////////////////

  objs.forEach((o, i) => {
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist ** 2;
    elems[i].style.transform = `scale(${1 + 0.2 * o.dist})`;

    let scale = 1 + 0.0001 * o.dist;
    sketch.meshes[i].position.y = i * 1.0 - position * 1.0;
    sketch.meshes[i].scale.set(scale, scale, scale);
    sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
    
  });

  rounded = Math.round(position);
  //   console.log(position);

  let diff = rounded - position;

  if (attractMode) {
    position += -(position - attractTo) * 0.05;
  } else {
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;

    //   block.style.transform = `translate(0, ${-position * 100 + 50}px)`;
    wrap.style.transform = `translate(0, ${-position * 100 + 50}px)`;
    
  }

  window.requestAnimationFrame(raf);
}



window.sketch = sketch;

let navs = [...document.querySelectorAll("li")];
let nav = document.querySelector(".nav");
let rots = sketch.groups.map((e) => e.rotation);
console.log('trans', sketch.groups.map((e) => e.position));
let trans = sketch.groups.map((e) => e.position);
// mesh.position.y = i * 1.2;
// sketch.groups.map((e) => {
//   // e.rotation
//   console.log('element', e);

//   e.addEventListener('mousedown', function(){
//       alert('hi, I am mesh');
//   });
// });

console.log(rots);

// console.log('nav', nav);

nav.addEventListener("mouseenter", () => {
  
  attractMode = true;
  gsap.to(rots, {duration: 0.3, x: 0, y: 0,  z: 0, });
  gsap.to(trans, {duration: 0.3,x: -0.5, y: 0, z: 0,});

  element_body.style.background = 'black';
  element_leftpart.style.display = 'none';


  var tl = gsap.timeline({});
  tl.pause();
  
  navs.forEach((el) => {
    tl.set(el, {
        transformOrigin: 'center right',
    }).to(el, 0.0, {
        scaleX: 0,
        ease: 'expo.inOut',
        stagger: 0.1,
    });
     
  });
  navs.forEach((el) => {
    tl.set(el, {
        transformOrigin: 'center right',
        background : '#d1d1d1',
    }).to(el, 0.0, {
        scaleX: 0,
        ease: 'expo.inOut',
        stagger: 0.1,
    }).set(el, {
      transformOrigin: 'center right',
    }).to(el, 0.1, {
        scaleX: 1,
        ease: 'expo.inOut',
        stagger: 0.1,
    }).set(el, {
      transformOrigin: 'center right',
      background : 'transparent',
    });
     
  });

  tl.play(0);
});
nav.addEventListener("mouseleave", () => {
  
  // nav.style.width = '200px';
  // navs.style.width = '200px';
  // gsap.to(navs, 0.1, { scaleX : 10, ease : 'expo.inOut', stagger : 0.1});
  // gsap.to(nav, 0.1, { scaleX : 10, ease : 'expo.inOut', stagger : 0.1});

  var tl = gsap.timeline({});
  tl.pause();

  navs.forEach((el) => {
    // gsap.to(el, {duration: 0.2, scaleX: 5, opacity: 1.0});//////////////////////////
    // tl.set(el, {
    //     transformOrigin: 'center right',
    // }).to(el, 0.0, {
    //     scaleX: 5,
    //     ease: 'expo.inOut',
    //     stagger: 0.0,
    // });
      var txt = el.textContent.trim();
      var len = txt.length * 0.9;
      // var randomNumber = Math.floor(Math.random() * 6) + 5;
      tl.set(el, {
          transformOrigin: 'center right',
      }).to(el, 0.0, {
          scaleX: len,//10
          ease: 'expo.inOut',
          stagger: 0.0,
      })
     
  });

  navs.forEach((el) => {
  //   .set(el, {
  //     transformOrigin: 'center right',
  // }).to(el, 0.0, {
  //     scaleX: 10,
  //     ease: 'expo.inOut',
  //     stagger: 0.0,
  // })
    tl.set(el, {
      transformOrigin: 'center right',
      //  background : '#d1d1d1',
    }).to(el, 0.05, {
        scaleX: 1,
        ease: 'bounce.in',//elastic
        stagger: 0.0,
    });

     
  });

  tl.play(0);

  setTimeout(function(){
    attractMode = false;
    gsap.to(rots, {duration: 0.5, x: -0.5, y: -0.3, z: -0.2,});
  
    gsap.to(trans, {
      duration: 0.3,
      x: 0,
      y: 0,
      z: 0,
    });
  
    element_body.style.background = '#7AB9E0';
    element_leftpart.style.display = 'block';
  }, 400);
 
});
navs.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    attractTo = Number(e.target.getAttribute("data-nav"));
    console.log(attractTo);
    sessionStorage.setItem('image_path', e.currentTarget.getAttribute('src'));
    sessionStorage.setItem('back_color', e.currentTarget.getAttribute('data-clr'));

  });
});


// raf();
export { raf };
