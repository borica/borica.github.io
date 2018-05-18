/*
    $.getJSON( "navbar.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "body" );
    });
*/

/* Animated Text */
document.addEventListener('DOMContentLoaded',function(event){

  // array with texts to type in typewriter
  var dataText = [ "Tiago Boriça"];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.getElementById("animatedText").innerHTML = text.substring(0, i+1) +'<span class="animatedCaret" aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
       /*StartTextAnimation(i + 1);*/
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});

/* SweetScroll Settings */
var scroller = new SweetScroll({
    trigger: 'a[href^="#"]',
    offset: -56
});

window.sr = ScrollReveal();
sr.reveal('.h1-reveal');
sr.reveal('.p-reveal');