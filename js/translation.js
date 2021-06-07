async function getTranslationJSON() {
    const response = await fetch("../json/pages-text.json");
    return response.json();
}

// Function that actually does the translation
function translationStart(translation) {
    translationJSON = getTranslationJSON().then(result => {
        generateDynamicValues(result);
        translate(result, translation);
    });
}


function generateDynamicValues(result) {
    let age = getGeneratedAge();
    let expTime = getGeneratedExperienceTime();
    let cups = getGeneratedCupsOfCoffe();
    
    //fixing age
    result.headerGreeting.eng.text = result.headerGreeting.eng.text.replace('{replace_age}', age);
    result.headerGreeting.ptb.text = result.headerGreeting.ptb.text.replace('{replace_age}', age);
    
    result.profileCard.eng.age = result.profileCard.eng.age.replace('{replace_age}', age);
    result.profileCard.ptb.age = result.profileCard.ptb.age.replace('{replace_age}', age);
    result.profileCard.eng.ageShort = result.profileCard.eng.ageShort.replace('{replace_age}', age);
    result.profileCard.ptb.ageShort = result.profileCard.ptb.ageShort.replace('{replace_age}', age);

    result.profileCard.eng.yearsExperience = result.profileCard.eng.yearsExperience.replace('{replace_year}', expTime);
    result.profileCard.ptb.yearsExperience = result.profileCard.ptb.yearsExperience.replace('{replace_year}', expTime);
    result.profileCard.eng.yearsExperienceShort = result.profileCard.eng.yearsExperienceShort.replace('{replace_year}', expTime);
    result.profileCard.ptb.yearsExperienceShort = result.profileCard.ptb.yearsExperienceShort.replace('{replace_year}', expTime);

    result.profileCard.eng.coffee = result.profileCard.eng.coffee.replace('{replace_cups}', cups);
    result.profileCard.ptb.coffee = result.profileCard.ptb.coffee.replace('{replace_cups}', cups);
    result.profileCard.eng.coffeeShort = result.profileCard.eng.coffeeShort.replace('{replace_cups}', cups);
    result.profileCard.ptb.coffeeShort = result.profileCard.ptb.coffeeShort.replace('{replace_cups}', cups);
};

//Returns age automatically
function getGeneratedAge() {
    let birthday = +new Date(1997, 04, 02);
    return ~~((Date.now() - birthday) / (31557600000));
}

//Returns experience time
function getGeneratedExperienceTime() {
    let firstExp = +new Date(2017, 09, 01);
    return ~~((Date.now() - firstExp) / (31557600000));
}

//Returns amount of leapyears given a range of years
function getAmountOfLeapYears(startYear, endYear) {
    let leapYears = 0;
    
    for (let index = startYear; index <= endYear; index++) {
        
        if((index % 4 === 0 && index % 100 != 0) || index % 400 === 0)
            leapYears += 1;
    }
    
    return leapYears;
}

//Returns all time cups of time
function getGeneratedCupsOfCoffe() {
    let age = getGeneratedAge();
    let cupsOfCoffePerDay = 2;
    let leapYears = getAmountOfLeapYears(1997, new Date().getFullYear());
    let amountsOfDaysTotal = (365 * age) + leapYears;

    return amountsOfDaysTotal * cupsOfCoffePerDay;
}

//Yes, probably not the best way to do this :/ 
//Kinda lame to translate views without using variables or html interpolation like you would do with angular for example...
function translate(json, language) {
    let elementsToTranslate = document.querySelectorAll('[translate]');
    
    if(language === "eng") {
        for(let i = 0; i < elementsToTranslate.length; i++) {
            //Profile card section
            if(elementsToTranslate[i].classList.contains("profileCard-position")) {
                elementsToTranslate[i].textContent = json.profileCard.eng.position;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-location")) {
                elementsToTranslate[i].textContent = json.profileCard.eng.location;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-age")) {
                elementsToTranslate[i].textContent = "Level " + json.profileCard.eng.ageShort;
                elementsToTranslate[i].setAttribute("before-text", "Level " + json.profileCard.eng.ageShort);
                elementsToTranslate[i].setAttribute("after-text", json.profileCard.eng.age);
            }
            if(elementsToTranslate[i].classList.contains("profileCard-yearsExperience")) {
                elementsToTranslate[i].textContent = "Level " + json.profileCard.eng.yearsExperienceShort;
                elementsToTranslate[i].setAttribute("before-text", "Level " + json.profileCard.eng.yearsExperienceShort);
                elementsToTranslate[i].setAttribute("after-text", json.profileCard.eng.yearsExperience);
            }
            if(elementsToTranslate[i].classList.contains("profileCard-coffee")) {
                elementsToTranslate[i].textContent = "Level " + json.profileCard.eng.coffeeShort;
                elementsToTranslate[i].setAttribute("before-text", "Level " + json.profileCard.eng.coffeeShort);
                elementsToTranslate[i].setAttribute("after-text", json.profileCard.eng.coffee);
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
            if(elementsToTranslate[i].classList.contains("showcase-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-description")) {
                elementsToTranslate[i].textContent = json.showcase.eng.description;
            }
            //Sonic Card
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.eng.sonicCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.eng.sonicCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.eng.sonicCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.sonicCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.eng.sonicCard.rightPanelInfo.text;
            }
            //Tinman Card
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.eng.tinmanCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.eng.tinmanCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.eng.tinmanCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.tinmanCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.eng.tinmanCard.rightPanelInfo.text;
            }

            //Guess the color Card
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.eng.guessTheColorCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.eng.guessTheColorCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.eng.guessTheColorCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.guessTheColorCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.eng.guessTheColorCard.rightPanelInfo.text;
            }

            //Calculator Card
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.eng.calculatorCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.eng.calculatorCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.eng.calculatorCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.eng.calculatorCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.eng.calculatorCard.rightPanelInfo.text;
            }
        }
    }
    
    if(language === "ptb") {
        for(let i = 0; i < elementsToTranslate.length; i++) {
            //Profile card section
            if(elementsToTranslate[i].classList.contains("profileCard-position")) {
                elementsToTranslate[i].textContent = json.profileCard.ptb.position;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-location")) {
                elementsToTranslate[i].textContent = json.profileCard.ptb.location;
            }
            if(elementsToTranslate[i].classList.contains("profileCard-age")) {
                elementsToTranslate[i].textContent = "Nível " + json.profileCard.ptb.ageShort;
                elementsToTranslate[i].setAttribute("before-text", "Nível " + json.profileCard.ptb.ageShort);
                elementsToTranslate[i].setAttribute("after-text", json.profileCard.ptb.age);
            }
            if(elementsToTranslate[i].classList.contains("profileCard-yearsExperience")) {
                elementsToTranslate[i].textContent = "Nível " + json.profileCard.ptb.yearsExperienceShort;
                elementsToTranslate[i].setAttribute("before-text", "Nível " + json.profileCard.ptb.yearsExperienceShort);
                elementsToTranslate[i].setAttribute("after-text", json.profileCard.ptb.yearsExperience);
            }
            if(elementsToTranslate[i].classList.contains("profileCard-coffee")) {
                elementsToTranslate[i].textContent = "Nível " + json.profileCard.ptb.coffeeShort;
                elementsToTranslate[i].setAttribute("before-text", "Nível " + json.profileCard.ptb.coffeeShort);
                elementsToTranslate[i].setAttribute("after-text", json.profileCard.ptb.coffee);
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
            if(elementsToTranslate[i].classList.contains("showcase-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-description")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.description;
            }

            //Sonic Card
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.sonicCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.sonicCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.sonicCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.sonicCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-sonicCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.sonicCard.rightPanelInfo.text;
            }

            //Tinman Card
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.tinmanCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.tinmanCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.tinmanCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.tinmanCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-tinmanCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.tinmanCard.rightPanelInfo.text;
            }

            //Guess the color Card
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.guessTheColorCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.guessTheColorCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.guessTheColorCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.guessTheColorCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-guessTheColorCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.guessTheColorCard.rightPanelInfo.text;
            }

             //Calculator Card
             if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-leftPanelInfo-date")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.calculatorCard.leftPanelInfo.date;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-leftPanelInfo-type")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.calculatorCard.leftPanelInfo.type;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-leftPanelInfo-category")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.calculatorCard.leftPanelInfo.category;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-rightPanelInfo-title")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.calculatorCard.rightPanelInfo.title;
            }
            if(elementsToTranslate[i].classList.contains("showcase-calculatorCard-rightPanelInfo-text")) {
                elementsToTranslate[i].textContent = json.showcase.ptb.calculatorCard.rightPanelInfo.text;
            }
        }
    }
    
}