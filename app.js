function checkUTF8(text) {
  var utf8Text = text;
  try {
      utf8Text = decodeURIComponent(encodeURIComponent(text));
  }catch(e) {
      // console.log(e.message); // URI malformed
      return false
      // This exception means text is utf-8
  }   
  return true; // returned text is always utf-8
}

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 0o00;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  // console.log(this.txt)

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if(checkUTF8(this.txt)) {
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  } else {
    console.log(this.txt)
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// window.onload = function() {
//   var i = 0;
//   var txt = 'Lorem ipsum typing effect!'; /* The text */
//   var speed = 50; /* The speed/duration of the effect in milliseconds */

//   function typeWriter() {
//     if (i < txt.length) {
//       document.getElementById("demo").innerHTML += txt.charAt(i);
//       i++;
//       setTimeout(typeWriter, speed);
//     }
//   }
// }



//NAV BAR

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "10px 10px";
    document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("navbar").style.padding = "60px 10px";
    document.getElementById("logo").style.fontSize = "35px";
  }
}


// LOAD BAR
window.addEventListener("beforeunload",function(e){
  document.body.className = "page-loading";
},false);





// Darkroom gallery
const gall = () => {
  var selectedClass = "";
  var $ = document.getElementById;
  $(".filter").click(function(){
  selectedClass = $(this).attr("data-rel");
  $("#gallery").fadeTo(100, 0.1);
  $("#gallery div").not("."+selectedClass).fadeOut().removeClass('animation');
  setTimeout(function() {
  $("."+selectedClass).fadeIn().addClass('animation');
  $("#gallery").fadeTo(300, 1);
  }, 300);
  });
  }
