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
});