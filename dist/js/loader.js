var loadingAnimation = (function(){
    let pages = [];
    let links = [];
    let timer = null;
  
    document.addEventListener("DOMContentLoaded", function(){

      console.log('landing page');

      pages = document.querySelectorAll('[data-page]');
      links = document.querySelectorAll('[data-role="link"]');

      let sketch = window.sketch;

      let rots = sketch.groups.map((e) => e.rotation);
      console.log('trans', sketch.groups.map((e) => e.position));
      let trans = sketch.groups.map((e) => e.position);
      // landing();
      // var tl_loading = gsap.timeline({});
      let tl_loading = gsap.timeline({repeat: 0, repeatDelay: 0});//repeat: 1, repeatDelay: 0
      
      tl_loading.set("#first_back", {display: 'none'});
      tl_loading.pause();
  
      gsap.to(rots, {
        duration: 0.1,
        x: -0.5,
        y: 0,
        z: 0,
      });
  
     
      position = 5.1;
  
      const element = document.querySelector('body');
      element.style.background = "black";
  
      tl_loading.to("#id-left-part", {display: 'none', duration: 0.0});
      tl_loading.set("#list_nav", {
          display : 'none',
          x: 100,
        });
      tl_loading.to("#first_back", {y: 1000, duration: 0.0});
      // tl_loading.to("#first_back", {y: 0, duration: 0.3});
  
      // let tween = gsap.fromTo("#first_back", {y: 0}, {y: 100, duration: 3, ease: "elastic"});
      // //now we can control it!
      // tween.pause();
      // tween.seek(2);
      // tween.progress(0.5);
      // tween.play();
  
      tl_loading.to(rots, {duration: 0.0, x: 0.0, y: -0.0,z: -0.0,});
      tl_loading.set(trans, {y: 10});  
      tl_loading.to(trans, {y: 0.3, duration: 3.0});
      tl_loading.to(rots, {duration: 0.5, x: -0.5, y: -0.3, z: -0.2,});
  


      tl_loading.to("body", {background: '#7e93ac', duration: 0.0});//rgb(194, 55, 90)
      
      tl_loading.to("#id-left-part", {display: 'block', duration: 0.0});
      tl_loading.to("#id-left-part", {y: 1000, duration: 0.1});
      tl_loading.to("#id-left-part", {y: 0, duration: 0.5});
  
      tl_loading.to("#first_back", {y: -1000, duration: 0.1});
      // tl_loading.to("#video-link", {x: -500, duration: 0.1});
      // tl_loading.to("#video-link", {x: 0, duration: 0.5});
  
      tl_loading.to("#video-link", {x: -100, duration: 0.0});
      tl_loading.to("#video-link", {x: 0, duration: 0.5});
  
      tl_loading.set("#list_nav", {
        display : 'block',
        x: 100,
      }).to("#list_nav", {
        x: 0,
        duration: 0.3
      });
      
      // tl_loading.to("#first_back", {opacity: 0, duration: 1.0});
      tl_loading.to("#first_back", {
        display: 'none',
        duration: 0.0,
        onComplete : ()=>{
          handlMediaSize();
        }
      });
      // tl_loading.to(trans, {opacity: 0, duration: 1.0});
      // tl_loading.to(trans, {display: 'none', duration: 1.0});
  
      tl_loading.play(0);
      
      // handlMediaSize();
      // setTimeout(() => {
      //   // element.style.display = 'none';
      //   // element.style.background = "rgb(194, 55, 90)";
       
      // }, 3500);
  
    });
    var handlMediaSize = function(){

      var viewportWidth = window.innerWidth;
      if (viewportWidth <= 768) {
        console.log("Viewport width is less than or equal to 768 pixels");
        
        window.device_mobile = true;

        // let rots = this.groups.map((e) => e.rotation);
        // let trans = this.groups.map((e) => e.position);
        
        sketch.groups.map((group, ix) => {
  
          group.rotation.y = 0;
          group.rotation.x = 0;
          group.rotation.z = Math.PI / 2.0;

          // group.position.x = 0;
          // group.position.y = 0;
          group.position.z = -0.2;

          group.children[0].rotation.z  = -Math.PI / 2;

          // group.visible = false;////////////////////////////////////////
          // gsap.to(group.mesh.position, {duration: 0.3, x: 0.0, y: 0.0, z: -0.3,});
          // gsap.to("#list_nav", {
          //   rotateZ : 90,
          // })

        });
  
      } else {
        console.log("Viewport width is greater than 768 pixels");
        window.device_mobile = false;
      }
    }
  
    return {
        result : null,
    }
  })();
  