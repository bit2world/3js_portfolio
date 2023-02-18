
import Sketch from "./sketch.js";
// import gsap from "gsap";

let sketch = new Sketch({
  dom: document.getElementById("container"),
});

var element_body = document.querySelector('body');
var element_leftpart = document.querySelector('#id-left-part');


let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 0;
let rounded = 0;
document.querySelector("#block");
document.querySelector("#wrap");
let elems = [...document.querySelectorAll(".n")];

window.addEventListener("wheel", (e) => {
  speed += e.deltaY * 0.0003;
  // console.log('attract to', attractTo);
  console.log('position', position);
  if(position > 0.0) attractTo = 0;
  if(position > 1.0) attractTo = 1;
  if(position > 2.0) attractTo = 2;
  if(position > 3.0) attractTo = 3;
  if(position > 3.8) attractTo = 4;
  
  let nav_element = document.querySelectorAll('[data-nav="' + attractTo + '"]')[0];
  sessionStorage.setItem('image_path', nav_element.getAttribute('src'));

});

let objs = Array(5).fill({ dist: 0 });

function raf() {

  position += speed;
  speed *= 0.8;
  
  if(position < 0) position = 0;
  if(position > 4.0) position = 4.0;////////////////////////////////////////////////////

  objs.forEach((o, i) => {
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist ** 2;
    elems[i].style.transform = `scale(${1 + 0.4 * o.dist})`;

    let scale = 1 + 0.0001 * o.dist;
    sketch.meshes[i].position.y = i * 1.2 - position * 1.2;
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

let navs = [...document.querySelectorAll("li")];
let nav = document.querySelector(".nav");
let rots = sketch.groups.map((e) => e.rotation);
console.log('trans', sketch.groups.map((e) => e.position));
let trans = sketch.groups.map((e) => e.position);
// mesh.position.y = i * 1.2;

console.log(rots);
nav.addEventListener("mouseenter", () => {
  attractMode = true;
  gsap.to(rots, {
    duration: 0.3,
    x: -0.5,
    y: 0,
    z: 0,
  });

  element_body.style.background = 'gray';
  element_leftpart.style.display = 'none';

});
nav.addEventListener("mouseleave", () => {
  attractMode = false;
  gsap.to(rots, {
    duration: 0.3,
    x: -0.5,
    y: -0.0,
    z: -0.0,
  });

  element_body.style.background = '#7AB9E0';
  element_leftpart.style.display = 'block';
});
navs.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    attractTo = Number(e.target.getAttribute("data-nav"));
    console.log(attractTo);
    sessionStorage.setItem('image_path', e.currentTarget.getAttribute('src'));
  });
});


var loadingAnimation = (function(){
  let pages = [];
  let links = [];
  let timer = null;


  document.addEventListener("DOMContentLoaded", function(){
    pages = document.querySelectorAll('[data-page]');
    links = document.querySelectorAll('[data-role="link"]');
    
    console.log('landing page');
    // landing();
    // var tl_loading = gsap.timeline({});
    let tl_loading = gsap.timeline({repeat: 0, repeatDelay: 0});//repeat: 1, repeatDelay: 0
    
    tl_loading.pause();

    gsap.to(rots, {
      duration: 0.1,
      x: -0.5,
      y: 0,
      z: 0,
    });

   
    position = 3.5;

    const element = document.querySelector('body');
    element.style.background = "black";

    tl_loading.to("#id-left-part", {display: 'none', duration: 0.0});

    tl_loading.to("#first_back", {y: 1000, duration: 0.0});
    tl_loading.to("#first_back", {y: 0, duration: 0.3});

    let tween = gsap.fromTo("#first_back", {x: 0}, {x: 800, duration: 10, ease: "elastic"});
    //now we can control it!
    tween.pause();
    tween.seek(2);
    tween.progress(0.5);
    tween.play();


    tl_loading.to(trans, {y: 100, duration: 0.1});  
    tl_loading.to(trans, {y: 0, duration: 3.0});
    tl_loading.to(rots, {duration: 0.3, x: 0.1, y: -0.2,z: -0.1,});

    tl_loading.to("body", {background: 'rgb(194, 55, 90)', duration: 0.0});

    tl_loading.to("#list_nav", {x: 100, duration: 0.1});
    
    tl_loading.to("#id-left-part", {display: 'block', duration: 0.0});
    tl_loading.to("#id-left-part", {y: 1000, duration: 0.1});
    tl_loading.to("#id-left-part", {y: 0, duration: 0.5});

    tl_loading.to("#first_back", {y: -1000, duration: 0.1});
    // tl_loading.to("#video-link", {x: -500, duration: 0.1});
    // tl_loading.to("#video-link", {x: 0, duration: 0.5});

    tl_loading.to("#video-link", {x: -100, duration: 0.0});
    tl_loading.to("#video-link", {x: 0, duration: 0.5});

    tl_loading.to("#list_nav", {x: 0, duration: 0.3});
    // tl_loading.to("#first_back", {opacity: 0, duration: 1.0});
    tl_loading.to("#first_back", {display: 'none', duration: 0.0});
    // tl_loading.to(trans, {opacity: 0, duration: 1.0});
    // tl_loading.to(trans, {display: 'none', duration: 1.0});

    tl_loading.play(0);
    
    
    setTimeout(() => {
      // element.style.display = 'none';
      // element.style.background = "rgb(194, 55, 90)";
     
    }, 3500);

  });

  return {
      result : null,
  }
})();
// raf();
export { raf };
