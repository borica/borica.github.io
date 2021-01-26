$(() => {
    $('.start-hidden').hide();

    $('.card-header').click((eventHandle)=>{
        let cardBody = "";
        let children = eventHandle.currentTarget.parentElement.children;
        
        for(let i = 0; i < children.length; i++) {
            if(eventHandle.currentTarget.parentElement.children[i].className.indexOf("card-body") >= 0) {
                cardBody = eventHandle.currentTarget.parentElement.children[i];
            }   
        }
        if(cardBody !== "") {
            $(cardBody).slideToggle();
        }
    });
    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
},);

//Lvl up progress bars
$('.progress').hover((eventHandle) => {
    let progressBar = eventHandle.currentTarget.parentElement.firstElementChild.firstElementChild;
    let text = progressBar.childNodes[0];
    progressBar.innerHTML = progressBar.getAttribute('after-text');
    progressBar.style.width = '100%';

}, (eventHandle) => {
    let progressBar = eventHandle.currentTarget.parentElement.firstElementChild.firstElementChild;
    progressBar.innerHTML = progressBar.getAttribute('before-text');
    progressBar.style.width = progressBar.getAttribute('original-pos');
});