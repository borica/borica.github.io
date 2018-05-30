$('document').ready(function() {
    animate();
});

function animate() {
    //Selecting The Landing Jumbo
    let jumbo = document.getElementById("top");
    
    //Container for the SVG
    let div = document.createElement("div");
    
    //Creating SVG ELement
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    //Creating the USE Element
    /* let use = document.createElementNS("http://www.w3.org/2000/svg", "use"); */
    
    //Setting the USE Attr
    svg.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "assets/web-programming-icons/" + generateRandom(1, 30) + ".svg#Capa1");
    
    /* svg.appendChild(use); */
    
    //Adding Class 
    div.classList.add('animationContainer');
    div.appendChild(svg);
    jumbo.appendChild(div);
    /* $('.animationContainer').animate({marginTop : "-500px", marginLeft : '500px'}, 3700); */
}

function generateRandom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
