//Fill in text in the coresponding edit box while listening from extension messages (context menu selected)
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({ answer: request.msgValue });
        console.log('msgType: ' + request.msgType);
        document.getElementById(request.msgType).value = request.msgValue;
});

//Adin DOM elements and actions to content page
chrome.storage.local.get(['activeURL'], function (data) {
    if (data.activeURL !== "") {
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.marginTop = '30px';
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';

        var div = document.createElement('div');
        var contactForm = document.createElement('form');
        var btn = document.createElement('input');
        var personName = document.createElement('input');
        var personPosition = document.createElement('input');
        var personEmail = document.createElement('input');
        var personPhone = document.createElement('input');
        var country = document.createElement('input');
        var companyName = document.createElement('input');
        var companyUrl = document.createElement('input');
        var companyEmail = document.createElement('input');
        var companyPhone = document.createElement('input');

        //append all elements
        document.body.appendChild(div);
        div.appendChild(contactForm);
        contactForm.appendChild(personName);
        contactForm.appendChild(personPosition);
        contactForm.appendChild(personEmail);
        contactForm.appendChild(personPhone);
        contactForm.appendChild(country);
        contactForm.appendChild(companyName);
        contactForm.appendChild(companyUrl);
        contactForm.appendChild(companyEmail);
        contactForm.appendChild(companyPhone);
        contactForm.appendChild(btn);

        //set attributes for div
        div.id = 'myDivId';
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100%';
        div.style.height = '30px';
        div.style.backgroundColor = '#efefef';
        div.style.zIndex = '100000';

        //set attributes for btnForm
        contactForm.action = '';

        personName.type = 'input';
        personName.placeholder = 'Contact name';
        personName.style.width = '100px';
        personName.id = 'personName';
        personPosition.type = 'input';
        personPosition.placeholder = 'Contact position';
        personPosition.style.width = '100px';
        personPosition.id = 'personPosition';
        personEmail.type = 'input';
        personEmail.placeholder = 'Contact email';
        personEmail.style.width = '100px';
        personEmail.id = 'personEmail';
        personPhone.type = 'input';
        personPhone.placeholder = 'Contact Phone';
        personPhone.style.width = '100px';
        personPhone.id = 'personPhone';
        country.type = 'input';
        country.placeholder = 'Country';
        country.style.width = '100px';
        country.id = 'country';
        country.onclick = function(){
            this.value="";
        }
        companyName.type = 'input';
        companyName.placeholder = 'Company';
        companyName.style.width = '100px';
        companyName.id = 'companyName';
        companyName.onclick = function(){
            this.value="";
        }
        companyUrl.type = 'input';
        companyUrl.placeholder = 'Website';
        companyUrl.style.width = '100px';
        companyUrl.id = 'companyUrl';
        companyUrl.onclick = function(){
            this.value="";
        }
        companyEmail.type = 'input';
        companyEmail.placeholder = 'Company email';
        companyEmail.style.width = '100px';
        companyEmail.id = 'companyEmail';
        companyEmail.onclick = function(){
            this.value="";
        }
        companyPhone.type = 'input';
        companyPhone.placeholder = 'Company phone';
        companyPhone.style.width = '100px';
        companyPhone.id = 'companyPhone';
        companyPhone.onclick = function(){
            this.value="";
        }


        //set attributes for save contact btn
        btn.type = 'button';
        btn.value = 'Save contact';
        btn.id = 'saveContact';
        btn.onclick = function () {
            $.ajax({
                type: 'POST',
                url: 'http://localhost/write.php',
                data: {
                    actionType: "saveContact",
                    personName: $('#personName').val(),
                    personPosition: $('#personPosition').val(),
                    personEmail: $('#personEmail').val(),
                    personPhone: $('#personPhone').val(),
                    country: $('#country').val(),
                    companyName: $('#companyName').val(),
                    companyUrl: $('#companyUrl').val(),
                    companyEmail: $('#companyEmail').val(),
                    companyPhone: $('#companyPhone').val(),
                    pageUrl: data.activeURL
                },
                success: function (response) {
                    console.log("Response: " + response);
                    if (response === "success") {
                        $('#personName').val("");
                        $('#personPosition').val("");
                        $('#personEmail').val("");
                        $('#personPhone').val("");
                    }
                }
            });
            return false;
        };
    }
    chrome.storage.local.set({ "activeURL": "" }, function () { });
});
