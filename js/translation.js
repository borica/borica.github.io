async function getTranslationJSON() {
    const response = await fetch("../json/pages-text.json");
    return response.json();
}

// Function that actually does the translation
function translationStart(translation) {
    translationJSON = getTranslationJSON().then(result => {
        let age = getGeneratedAge();

        //fixing age
        result.headerGreeting.eng.text = result.headerGreeting.eng.text.replace('{replace_age}', age);
        result.headerGreeting.ptb.text = result.headerGreeting.ptb.text.replace('{replace_age}', age);
        result.profileCard.eng.age = result.profileCard.eng.age.replace('{replace_age}', age);
        result.profileCard.ptb.age = result.profileCard.ptb.age.replace('{replace_age}', age);
        
        translate(result, translation);
    });
}

//Returns age automatically
function getGeneratedAge() {
    let birthday = +new Date(1997, 04, 02);
    return ~~((Date.now() - birthday) / (31557600000));
}

//Yes, probably not the best way to do this :/ 
//Kinda lame to translate views without using variables or html interpolation like you would do with angular for example...
function translate(json, language) {
    let elementsToTranslate = document.querySelectorAll('[translate]');
    
    if(language === "eng") {
        for(i = 0; i < elementsToTranslate.length; i++) {
            //Profile card section
            if(elementsToTranslate[i].classList.contains("profileCard-position")) {
                elementsToTranslate[i].textContent = json.profileCard.eng.position;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-location")) {
                elementsToTranslate[i].textContent = json.profileCard.eng.location;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-age")) {
                //change the attribute
                elementsToTranslate[i].textContent = json.profileCard.eng.age;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-yearsExperience")) {
                //change the attribute
                elementsToTranslate[i].textContent = json.profileCard.eng.yearsExperience;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-coffee")) {
                //change the attribute
                elementsToTranslate[i].textContent = json.profileCard.eng.coffee;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-hint")) {
                elementsToTranslate[i].textContent = json.profileCard.eng.hint;
            }
            
            //Header greeting section
            if(elementsToTranslate[i].classList.contains("headerGreeting-title")) {
                elementsToTranslate[i].textContent = json.headerGreeting.eng.title;
            }
            if(elementsToTranslate[i].classList.contains("headerGreeting-text")) {
                elementsToTranslate[i].textContent = json.headerGreeting.eng.text;
            }

            //Experiences section
            if(elementsToTranslate[i].classList.contains("experiences-title")) {
                elementsToTranslate[i].textContent = json.experiences.eng.title;
            }

            if(elementsToTranslate[i].classList.contains("experiences-everisCard-title")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.title;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-badge")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.badge;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-leftPanelInfo-time")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.leftPanelInfo.time;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-leftPanelInfo-area")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.leftPanelInfo.area;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-leftPanelInfo-field")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.leftPanelInfo.field;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-rightPaneInfo-experienceTitle")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.rightPaneInfo.experienceTitle;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-rightPaneInfo-experienceText")) {
                elementsToTranslate[i].textContent = json.experiences.eng.everisCard.rightPaneInfo.experienceText;
            }

            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-title")) {
                elementsToTranslate[i].textContent = json.experiences.eng.sigmaCard.title;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-leftPanelInfo-time")) {
                elementsToTranslate[i].textContent = json.experiences.eng.sigmaCard.leftPanelInfo.time;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-leftPanelInfo-area")) {
                elementsToTranslate[i].textContent = json.experiences.eng.sigmaCard.leftPanelInfo.area;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-leftPanelInfo-field")) {
                elementsToTranslate[i].textContent = json.experiences.eng.sigmaCard.leftPanelInfo.field;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-rightPaneInfo-experienceTitle")) {
                elementsToTranslate[i].textContent = json.experiences.eng.sigmaCard.rightPaneInfo.experienceTitle;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-rightPaneInfo-experienceText")) {
                elementsToTranslate[i].textContent = json.experiences.eng.sigmaCard.rightPaneInfo.experienceText;
            }
            
            // Academic history section
            if(elementsToTranslate[i].classList.contains("academicHistory-title")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.title;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-cardTitle")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.speiCard.cardTitle;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-course")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.speiCard.course;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-hoverCourse")) {
                //change attr
                elementsToTranslate[i].textContent = json.academicHistory.eng.speiCard.hoverCourse;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-attendance")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.speiCard.attendance;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-status")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.speiCard.status;
            }

            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-cardTitle")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.opetCard.cardTitle;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-course")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.opetCard.course;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-hoverCourse")) {
                //change attr
                elementsToTranslate[i].textContent = json.academicHistory.eng.opetCard.hoverCourse;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-attendance")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.opetCard.attendance;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-status")) {
                elementsToTranslate[i].textContent = json.academicHistory.eng.opetCard.status;
            }

            //Showcase section
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-description")) {
                elementsToTranslate[i].textContent = json.showcase.eng.description;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.eng.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.eng.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.eng.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.eng.rightPanelInfo.text;
            }
        }
    }
    
    if(language === "ptb") {
        for(i = 0; i < elementsToTranslate.length; i++) {
            //Profile card section
            if(elementsToTranslate[i].classList.contains("profileCard-position")) {
                elementsToTranslate[i].textContent = json.profileCard.ptb.position;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-location")) {
                elementsToTranslate[i].textContent = json.profileCard.ptb.location;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-age")) {
                //change the attribute
                elementsToTranslate[i].textContent = json.profileCard.ptb.age;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-yearsExperience")) {
                //change the attribute
                elementsToTranslate[i].textContent = json.profileCard.ptb.yearsExperience;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-coffee")) {
                //change the attribute
                elementsToTranslate[i].textContent = json.profileCard.ptb.coffee;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-hint")) {
                elementsToTranslate[i].textContent = json.profileCard.ptb.hint;
            }
            
            //Header greeting section
            if(elementsToTranslate[i].classList.contains("headerGreeting-title")) {
                elementsToTranslate[i].textContent = json.headerGreeting.ptb.title;
            }
            if(elementsToTranslate[i].classList.contains("headerGreeting-text")) {
                elementsToTranslate[i].textContent = json.headerGreeting.ptb.text;
            }

            //Experiences section
            if(elementsToTranslate[i].classList.contains("experiences-title")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.title;
            }

            if(elementsToTranslate[i].classList.contains("experiences-everisCard-title")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.title;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-badge")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.badge;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-leftPanelInfo-time")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.leftPanelInfo.time;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-leftPanelInfo-area")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.leftPanelInfo.area;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-leftPanelInfo-field")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.leftPanelInfo.field;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-rightPaneInfo-experienceTitle")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.rightPaneInfo.experienceTitle;
            }
            if(elementsToTranslate[i].classList.contains("experiences-everisCard-rightPaneInfo-experienceText")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.everisCard.rightPaneInfo.experienceText;
            }

            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-title")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.sigmaCard.title;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-leftPanelInfo-time")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.sigmaCard.leftPanelInfo.time;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-leftPanelInfo-area")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.sigmaCard.leftPanelInfo.area;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-leftPanelInfo-field")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.sigmaCard.leftPanelInfo.field;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-rightPaneInfo-experienceTitle")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.sigmaCard.rightPaneInfo.experienceTitle;
            }
            if(elementsToTranslate[i].classList.contains("experiences-sigmaCard-rightPaneInfo-experienceText")) {
                elementsToTranslate[i].textContent = json.experiences.ptb.sigmaCard.rightPaneInfo.experienceText;
            }
            
            // Academic history section
            if(elementsToTranslate[i].classList.contains("academicHistory-title")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.title;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-cardTitle")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.speiCard.cardTitle;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-course")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.speiCard.course;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-hoverCourse")) {
                //change attr
                elementsToTranslate[i].textContent = json.academicHistory.ptb.speiCard.hoverCourse;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-attendance")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.speiCard.attendance;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-speiCard-status")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.speiCard.status;
            }

            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-cardTitle")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.opetCard.cardTitle;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-course")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.opetCard.course;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-hoverCourse")) {
                //change attr
                elementsToTranslate[i].textContent = json.academicHistory.ptb.opetCard.hoverCourse;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-attendance")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.opetCard.attendance;
            }
            if(elementsToTranslate[i].classList.contains("academicHistory-opetCard-status")) {
                elementsToTranslate[i].textContent = json.academicHistory.ptb.opetCard.status;
            }

            //Showcase section
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-description")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.description;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.rightPanelInfo.text;
            }
        }
    }
    
}