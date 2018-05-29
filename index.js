/* Animated Text */

 // array with texts to type in typewriter
 let dataText = ["Tiago Boriça", "TB"];

// helper for controlling animations
let lastActive;

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
    $("#animatedText").fadeIn("slow");
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
 

/* SweetScroll Settings */
let scroller = new SweetScroll({
    trigger: 'a[href^="#"]',
    offset: -56
});

window.sr = ScrollReveal();
sr.reveal('.h1-reveal');
sr.reveal('.p-reveal');
sr.reveal('.div-reveal');

function animationTrigger(event){
  /* Declaring Variables */
  let nav = document.getElementById("navbar");
  let navElements = nav.getElementsByTagName('li');
  let liElements = [];
  let validationHelper = [];

  /* Pushing elements to the array */
  $.each(navElements, function(index, value){
    liElements.push(value.getElementsByTagName('a'));
  })

	/* Iterating over elements */
	$.each(liElements, function(indexLi, valueLi){
		$.each(valueLi, function(indexA, valueA){
			$.each(valueA.classList, function(indexClass, valueClass){
				if(valueClass == "active"){
					lastActive = valueA.id;
					console.log('LastActive: ' + lastActive);
					if(valueA.id == "linkHome"){
						validationHelper.push('true');
					}else{
						validationHelper.push('false');
					}
				}
			});
		});
	});

	/* Validation Animation */
	if(validationHelper.includes('true')){
		//Make the animation for the 'TB' Appears
		$("#animatedText").fadeOut("slow", function(){
			StartTextAnimation(1);
			$("#animatedText").fadeIn("slow");
		});
	} else {
		//Validates if animates or not depending on section
		if(lastActive == "linkSection1"){
			$("#animatedText").fadeOut("slow", function(){
				StartTextAnimation(0);
				$("#animatedText").fadeIn("slow");
			});
		}
	}
}

/* Trigger for the animation control */
$(window).on('activate.bs.scrollspy', function (event) {
	animationTrigger(event);
})	