/**
 * @author : topcder
 * @versin : 1.1
 * @description : contains script for the app
 */
$(document).ready(function () {

    // App initialization
    Office.initialize = function (reason) {

        // use romaing settings for saving data
        var settings = Office.context.roamingSettings;

        // function is called whenever router loads a page
        // on any action in document.ready should be put in this function
        var initialize = function () {

            
            // Bonus point: Remember which image the user clicks on Screen 1 for the first time and proceed
            // directly to screen 2 for that image.
            if ($(".home-contents").length) {

                var data = settings.get(Constants.OUTLOOK_ROAMING_KEY);
                if (data && data.length) {
                    data = JSON.parse(data);
                    signature.company = data.company;

                    // for test purpose: forcefully show company selection
                    //data.company = '';

                    switch (data.company) {
                        case Constants.JOHN_HANCOCK_ADD_INS:
                            route(router.john_hancock_division_and_language);
                            break;
                        case Constants.MANULIFE_ADD_INS:
                            route(router.manulife_division_and_language);
                            break;
                        case Constants.SIGNATOR_ADD_INS:
                            route(router.signator_division_and_language);
                            break;
                    }
                }
            }

            //style the form elements
            if ($(".form-container").length > 0) {
                $('.form-container').jqTransform({ imgPath: 'i/' });
            }

            //click on page body
            $("body").click(function () {
                $(".chosen-menus").addClass("hide");
            });

            // Populate division dropdown
            $.each(dropdownOptions,function (i) {
                 $(".chosen-division .chosen-menus").append('<li><a class="link" href="javascript:;">' + i + '</a></li>');
            });

            // clicking on division link 
            $(".chosen-division .chosen-menus").on('click', 'a', function () {
                // clear chosen value and revert to default text
                $(".chosen-businessunit .chosen span").html('Choose Business Unit');

                // populate business unit dropdown 
                var menu = $(".chosen-businessunit .chosen-menus").empty();
                $.each(dropdownOptions[$(this).text()].businessUnits, function (i) {
                    menu.append('<li><a href="javascript:;">' + i + '</a></li>');
                });
            });

            // clicking on businessunit link 
            $(".chosen-businessunit .chosen-menus").on('click', 'a', function () {
                // clear chosen value and revert to default text
                $(".chosen-language .chosen span").html(Constants.SELECT_LANGUAGE_PLACEHOLDER);

                var divisionValue = dropdownOptions[$(".chosen-division .chosen span").html()].businessUnits;

                if (divisionValue) {
                    // populate business unit dropdown 
                    var menu = $(".chosen-language .chosen-menus").empty();
                    $.each(divisionValue[$(this).text()], function (i, value) {
                        menu.append('<li><a href="javascript:;">' + value + '</a></li>');
                    });
                }
            });

            // bind social media connection country
            $.each(socialMediaLinks, function (i) {
                var menus = $('.module-social .chosen-menus.' + i);
                if (menus.length > 0) {
                    $.each(socialMediaLinks[i], function (j) {
                        menus.append('<li><a href="javascript:;">' + j + '</a></li>');
                    });
                }
            });

            // bind logo
            var logoContainer = $('.module-logo .module-info');
            if (logoContainer.length > 0) {
                var divisionLogos = dropdownOptions[signature.division].logos;
                $.each(divisionLogos, function (i, imgUrl) {
                    logoContainer.append(
                      '<div class="row">' +
                        '<span class="form-container">' +
                          '<input type="radio" class="logo-radio-button" name="logo">' +
                          '<label>' +
                            '<img src="' + imgUrl + '" alt="logo">' +
                          '</label>' +
                        '</span>' +
                      '</div>');
                });

                // select first logo by default
                var logoRb = logoContainer.find('.logo-radio-button').eq(0)
                logoRb.prev().addClass("jqTransformChecked");
                logoRb.prop("checked", true);
            }
            
            // click dropdown arrow
            $(".chosen-content").on("click", ".chosen", function (event) {
                if ($(this).hasClass("disable")) {
                    return;
                }

                if ($(this).next().hasClass("hide")) {
                    //show dropdown
                    $("body").click();
                    $(this).next().removeClass("hide");
                }
                else {
                    //hide dropdown
                    $("body").click();
                }

                event.stopPropagation();
            });

            //select option in dropdown list
            $(".chosen-menus").on("click","li a", function () {
                $(this).parents(".chosen-content").find(".chosen span").html($(this).html());
            });

            //expand/collapse modules in Form screen
            $(".setting-section .module .btn-toggle").click(function () {
                if (!$(this).parents(".module").hasClass("active")) {
                    //expand the module
                    $(this).parents(".setting-section").find(".module.active").removeClass("active").addClass("over");
                    $(this).parents(".module").removeClass("over").addClass("active");
                }
                else {
                    //collapse the module
                    $(this).parents(".module").removeClass("active").addClass("over");
                }
            });

            //click Clear All link in Form screen
            $(".setting-section .module .btn-clear").click(function () {
                $(this).parents(".setting-section .module").find("input").val("");
                $(this).parents(".setting-section .module").find(".chosen span").html("Select Country");

                $(this).parents(".setting-section .module").find("a.jqTransformCheckbox").removeClass("jqTransformChecked");
                $(this).parents(".setting-section .module").find("a.jqTransformCheckbox").next().prop("checked", false);
                $(this).parents(".setting-section .module").find(".chosen-content .chosen").addClass("disable");

                $(".check-area .jqTransformCheckbox").removeClass("jqTransformChecked");
                $(".check-area .jqTransformCheckbox").next().prop("checked", false);
            });

            //expand/collapse modules in Copy to Clipboard screen
            $(".client-section .module .btn-toggle").click(function () {
                if (!$(this).parents(".module").hasClass("active")) {
                    //expand the module
                    $(this).parents(".client-section").find(".module.active").next().addClass("hide");
                    $(this).parents(".client-section").find(".module.active").removeClass("active");
                    $(this).parents(".module").addClass("active");

                    $(this).parents(".module").next().removeClass("hide");
                }
                else {
                    //collapse the module
                    $(this).parents(".module").removeClass("active");
                    $(this).parents(".module").next().addClass("hide");
                }
            });

            //check/uncheck in Social Connections section in Form screen
            $(".module-social .jqTransformCheckbox").click(function () {
                if ($(this).hasClass("jqTransformChecked")) {
                    //enable dropdown
                    $(this).parents(".module-social .row").find(".rights .chosen").removeClass("disable");
                }
                else {
                    //disable dropdown
                    $(this).parents(".module-social .row").find(".rights .chosen").addClass("disable");
                }
            });

            //check/uncheck "Use previous saved data" checkbox
            $(".check-area .jqTransformCheckbox").click(function () {
                var form_area = $(this).parents(".setting-section").find(".main-area");

                if ($(this).hasClass("jqTransformChecked")) {
                    //empty form
                    form_area.find("input").val("");
                    form_area.find(".chosen span").html("Select Country");

                    form_area.find("a.jqTransformCheckbox").removeClass("jqTransformChecked");
                    form_area.find("a.jqTransformCheckbox").next().prop("checked", false);
                    form_area.find(".chosen-content .chosen").addClass("disable");

                    form_area.find("a.jqTransformRadio").removeClass("jqTransformChecked");
                    form_area.find("a.jqTransformRadio").next().prop("checked", false);


                    //fill form
                    var data = settings.get(Constants.OUTLOOK_ROAMING_KEY);
                    if (data.length != 0) {
                        data = JSON.parse(data);
                        fillPersonalInformationPage(data);
                    }
                }
                else {
                    //empty form
                    form_area.find("input").val("");
                    form_area.find(".chosen span").html("Select Country");

                    form_area.find("a.jqTransformCheckbox").removeClass("jqTransformChecked");
                    form_area.find("a.jqTransformCheckbox").next().prop("checked", false);
                    form_area.find(".chosen-content .chosen").addClass("disable");

                    form_area.find("a.jqTransformRadio").removeClass("jqTransformChecked");
                    form_area.find("a.jqTransformRadio").next().prop("checked", false);
                    // clear signature
                    signature.firstName = "";
                    signature.lastName = "";
                    signature.jobTitle = "";
                    signature.department = "";
                    signature.officePhone = "";
					signature.officeAddress = "";
					signature.officeCityPostalCode = "";
                    signature.fax = "";
                    signature.mobile = "";
                    signature.email = "";
                    signature.isFacebookActive = false;
                    signature.isTwitterActive = false;
                    signature.isLinkedInActive = false;
                    signature.isYoutubeActive = false;
                    signature.facebookCountry = "";
                    signature.twitterCountry = "";
                    signature.youtubeCountry = "";
                    signature.linkedInCountry = "";
                    signature.executiveName = "";
                    signature.execEmail = "";
                    signature.logo = "";
                  

                }
            });

            //change on input boxes in Form screen
            $(".setting-section .main-area input[type='text'],\
     .setting-section .main-area input[type='tel'],\
     .setting-section .main-area input[type='email']").keyup(function () {
         $(".check-area .jqTransformCheckbox").removeClass("jqTransformChecked");
         $(".check-area .jqTransformCheckbox").next().prop("checked", false);
     });

            //change on radio/check boxes in Form screen
            $(".setting-section .main-area input[type='checkbox'],\
     .setting-section .main-area input[type='radio']").click(function () {
         $(".check-area .jqTransformCheckbox").removeClass("jqTransformChecked");
         $(".check-area .jqTransformCheckbox").next().prop("checked", false);
     });

            //change on dropdown options in Form screen
            $(".setting-section .main-area .chosen-menus li a").click(function () {
                $(".check-area .jqTransformCheckbox").removeClass("jqTransformChecked");
                $(".check-area .jqTransformCheckbox").next().prop("checked", false);
            });

            // clicking on logo on home page, link on division and language page

            // clicking on john hancock logo 
            $(".home-contents .section-john-hancock").click(function () {
                signature.company = Constants.JOHN_HANCOCK_ADD_INS;
                route(router.john_hancock_division_and_language);
            });

            // clicking on manulife logo, link manulife
            $(".home-contents .section-manulife").click(function () {
                signature.company = Constants.MANULIFE_ADD_INS;
                route(router.manulife_division_and_language);
            });

            // clicking on signature logo, link signator
            $(".home-contents .section-signator").click(function () {
                signature.company = Constants.SIGNATOR_ADD_INS;
                route(router.signator_division_and_language);
            });

            // click on next button
            $(".btn-area .btn-rights .btn-next").click(function () {
                
                signature.division = $(".chosen-division .chosen-content .chosen span").html();
                signature.businessUnit = $(".chosen-businessunit .chosen-content .chosen span").html();
                signature.language = $(".chosen-language .chosen-content .chosen span").html();

                if (signature.language == Constants.SELECT_LANGUAGE_PLACEHOLDER) {
                    return;
                }

                switch (signature.company) {
                    case Constants.JOHN_HANCOCK_ADD_INS:
                        route(router.john_hancock_personal_information);
                        break;
                    case Constants.MANULIFE_ADD_INS:
                        route(router.manulife_personal_information);
                        break;
                    case Constants.SIGNATOR_ADD_INS:
                        route(router.signator_personal_information);
                        break;
                }
            });




            // back button for personal information screen 
            $(".contents .preview-area .left-link, .save-section .btn-area .btn-cancel").click(function () {
                switch (signature.company) {
                    case Constants.JOHN_HANCOCK_ADD_INS:
                        route(router.john_hancock_personal_information);
                        break;
                    case Constants.MANULIFE_ADD_INS:
                        route(router.manulife_personal_information);
                        break;
                    case Constants.SIGNATOR_ADD_INS:
                        route(router.signator_personal_information);
                        break;
                }
            });

            // save stores the data in office roaming 
            // On click on save button 
            $(".btn-area .btn-rights .btn-save").click(function () {
                getPersonalInformation();
                
                // validation: country must choose for selected social connection 
                if ((signature.facebookCountry == Constants.SELECT_COUNTRY_PLACEHOLDER && signature.isFacebookActive) ||
                    (signature.twitterCountry == Constants.SELECT_COUNTRY_PLACEHOLDER && signature.isTwitterActive) ||
                    (signature.youtubeCountry == Constants.SELECT_COUNTRY_PLACEHOLDER && signature.isYoutubeActive) ||
                    (signature.linkedInCountry == Constants.SELECT_COUNTRY_PLACEHOLDER && signature.isLinkedInActive) ) {

                    $(".msg-area .error-msg").html("Please select country for selected social connection");
                    $(".msg-area").removeClass("hide");
                    return;
                }
                $(".msg-area").addClass("hide");

                // save signature
                var signatueString = JSON.stringify(signature);
                settings.set(Constants.OUTLOOK_ROAMING_KEY, signatueString);
                settings.saveAsync(
                    function (asyncResult) {
                        if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
                        }
                        else {
                            app.showNotification(Constants.ERROR_ADD_IN + asyncResult.error.message);
                        }
                    });

                switch (signature.company) {
                    case Constants.JOHN_HANCOCK_ADD_INS:
                        route(router.john_hancock_save_message);
                        break;
                    case Constants.MANULIFE_ADD_INS:
                        route(router.manulife_save_message);
                        break;
                    case Constants.SIGNATOR_ADD_INS:
                        route(router.signator_save_message);
                        break;
                }

            });

            // settings screen 
            $(".contents .btn-setting").click(
                function () {
                    switch (signature.company) {
                        case Constants.JOHN_HANCOCK_ADD_INS:
                            route(router.john_hancock_division_and_language);
                            break;
                        case Constants.MANULIFE_ADD_INS:
                            route(router.manulife_division_and_language);
                            break;
                        case Constants.SIGNATOR_ADD_INS:
                            route(router.signator_division_and_language);
                            break;
                    }
                });
				
			// instructions screen 
            $(".contents .btn-instructions").click(
                function () {
                    switch (signature.company) {
                        case Constants.JOHN_HANCOCK_ADD_INS:
                            route(router.john_hancock_instructions);
                            break;
                        case Constants.MANULIFE_ADD_INS:
                            route(router.manulife_instructions);
                            break;
                        case Constants.SIGNATOR_ADD_INS:
                            route(router.signator_instructions);
                            break;
                    }
                });
				
			// back button for personal information screen 
            $(".contents .btn-area .btn.instructions-back").click(function () {
                switch (signature.company) {
                    case Constants.JOHN_HANCOCK_ADD_INS:
                        route(router.john_hancock_personal_information);
                        break;
                    case Constants.MANULIFE_ADD_INS:
                        route(router.manulife_personal_information);
                        break;
                    case Constants.SIGNATOR_ADD_INS:
                        route(router.signator_personal_information);
                        break;
                }
            });

            // open preview screen 
            $(".btn-area  .btn-preview").click(function () {
                switch (signature.company) {
                    case Constants.JOHN_HANCOCK_ADD_INS:
                        route(router.john_hancock_preview_signature);
                        break;
                    case Constants.MANULIFE_ADD_INS:
                        route(router.manulife_preview_signature);
                        break;
                    case Constants.SIGNATOR_ADD_INS:
                        route(router.signator_preview_signature);
                        break;
                }
            });

            // copy to clipboard
            $(".btn-copy-to-clipboard").click(function () {
                getPersonalInformation();
                showSignature();
                var html = $(".hidden-preview-area").html();
                $(".dummy-button").unbind();
                clipboard = new Clipboard(".dummy-button", {
                    text: function (trigger) {
                        var html = $(".hidden-preview-area").html();
                        html = "<body>" + html + "</body>";
                        html = "<html>" + html + "</html>";
                        return html;
                    }
                });


                $(".dummy-button").click();
            });

            if ($(".hidden-preview-area").length > 0) {
                $(".hidden-preview-area").load(router.template);
            }

            // fill personal information on load
            if ($(".first-name-input").length > 0) {
                fillPersonalInformationPage(signature);
            }

            // show signature
            showSignature();
        };

        // get information and store in signature object
        var getPersonalInformation = function () {
            if ($(".module-personal").length > 0) {
                signature.firstName = $(".module-personal .module-info .first-name-input").val();
                signature.lastName = $(".module-personal .module-info .last-name-input").val();
                signature.jobTitle = $(".module-personal .module-info .job-title-input").val();
                signature.department = $(".module-personal .module-info .department-input").val();
                signature.officePhone = $(".module-personal .module-info .office-phone-input").val();
				signature.officeAddress = $(".module-office-address .module-info .info-office-address-input").val();
				signature.officeCityPostalCode = $(".module-office-address .module-info .info-city-state-province-postalcode-input").val();
                signature.fax = $(".module-personal .module-info .fax-number-input").val();
                signature.mobile = $(".module-personal .module-info .mobile-phone-input").val();
                signature.email = $(".module-personal .module-info .email-input").val();
                signature.isFacebookActive = $(".module-social .facebook-checkbox").is(':checked');
                signature.isTwitterActive = $(".module-social .twitter-checkbox").is(':checked');
                signature.isYoutubeActive = $(".module-social .youtube-checkbox").is(':checked');
                signature.isLinkedInActive = $(".module-social .linked-in-checkbox").is(':checked');
                signature.facebookCountry = $(".module-social .facebook-dropdown-option").html();
                signature.twitterCountry = $(".module-social .twitter-dropdown-option").html();
                signature.youtubeCountry = $(".module-social .youtube-dropdown-option").html();
                signature.linkedInCountry = $(".module-social .linked-in-dropdown-option").html();
                signature.executiveName = $(".module-exec .info-fullname-input").val();
                signature.execPhone = $(".module-exec .info-phone-input").val();
                signature.execEmail = $(".module-exec .info-email-input").val();
                var logo = $('.module-logo input[name=logo]:checked').next().find('img').attr('src');
                if (logo !== undefined) {
                    signature.logo = logo;
                }
                else {
                    signature.logo = signature.company;
                }
            }
        };

        // show signature
        var showSignature = function () {
            if ($(".preview-area").length > 0) {
                // show name
                var name = signature.firstName + " " + signature.lastName;
                if (name.trim().length !== 0) {
                    $(".info-area .name").show();
                    $(".info-area .name").html(name);
                }
                else {
                    $(".info-area .name").hide();
                }
                // show designation
                var designation = signature.jobTitle + ", " + signature.department;
                // trim it
                designation = designation.trim();
                if (designation.substring(designation.length - 1, designation.length) === ',') {
                    designation = designation.substring(0, designation.length - 1);
                }
                if (designation.length !== 0) {
                    $(".info-area .designation").html(designation);
                    $(".info-area .designation").show();
                }
                else {
                    $(".info-area .designation").hide();
                }
                // show contact
                var contact = contactForSignature();
                if (contact.length !== 0) {
                    $(".info-area .contact").html(contact);
                    $(".info-area .contact").show();
                } else {
                    $(".info-area .contact").hide();
                }
				if(signature.officeAddress && signature.officeAddress.length !== 0) {
					$(".info-area .address").html(signature.officeAddress);
                    $(".info-area .address").show();
				} else {
					$(".info-area .address").hide();
				}
				if(signature.officeCityPostalCode && signature.officeCityPostalCode.length !== 0) {
					$(".info-area .addressCityPostal").html(signature.officeCityPostalCode);
                    $(".info-area .addressCityPostal").show();
				} else {
					$(".info-area .addressCityPostal").hide();
				}

                // show executive info
                showExecutiveInformation();

                // show connections
                showSocialConnections();
                showLogo();
            }

        };

        // get contact information for the signaure
        var contactForSignature = function () {
            var contact = "";
            // add office phone
            if (signature.officePhone.trim().length !== 0) {
                contact = "P: " + signature.officePhone.trim();
            }
            // add mobile
            if (signature.mobile.trim().length !== 0) {
                if (contact.length !== 0) {
                    contact = contact + " | M: " + signature.mobile.trim();
                }
                else {
                    contact = "M: " + signature.mobile.trim();
                }
            }

            // add fax
            if (signature.fax.trim().length !== 0) {
                if (contact.length !== 0) {
                    contact = contact + " | F: " + signature.fax.trim();
                }
                else {
                    contact = "F: " + signature.fax.trim();
                }
            }

            var email = signature.email.trim();
            if (email.length !== 0) {
                if (contact.length !== 0) {
                    contact = contact + " | E: " + email;
                }
                else {
                    contact = "E: " + email;
                }
            }


            return contact;
        };

        // show social connections
        var showSocialConnections = function () {
            var country = "";
            var value = "";
            var company = signature.company.substring(0, signature.company.length - 8);
            // facebook
            if (signature.isFacebookActive) {
                country = signature.facebookCountry;
                if (country == Constants.SELECT_COUNTRY_PLACEHOLDER) {
                    country = "";
                }
                value = company + " " + country;
                var url = socialMediaLinks['facebook'][country];

                $(".connection-facebook .country").html(value);
                $(".connection-facebook").attr("href", url).show();
            }
            else {
                $(".connection-facebook").hide();
            }

            // youtube connection
            if (signature.isYoutubeActive) {
                country = signature.youtubeCountry;
                if (country == Constants.SELECT_COUNTRY_PLACEHOLDER) {
                    country = "";
                }
                value = company + " " + country;
                var url = socialMediaLinks['youtube'][country] ;

                $(".connection-youtube .country").html(value);
                $(".connection-youtube").attr("href", url ).show();
            }
            else {
                $(".connection-youtube").hide();
            }

            // linked in 

            if (signature.isLinkedInActive) {
                country = signature.linkedInCountry;
                if (country == Constants.SELECT_COUNTRY_PLACEHOLDER) {
                    country = "";
                }
                value = company + " " + country;
                var url = socialMediaLinks['linkedin'][country];

                $(".connection-linkedin .country").html(value);
                $(".connection-linkedin").attr("href", url ).show();
            }
            else {
                $(".connection-linkedin").hide();
            }

            // twitter
            if (signature.isTwitterActive) {
                country = signature.twitterCountry;
                if (country == Constants.SELECT_COUNTRY_PLACEHOLDER) {
                    country = "";
                }
                value = company + " " + country;
                var url = socialMediaLinks['twitter'][country];

                $(".connection-twitter .country").html(value);
                $(".connection-twitter").attr("href", url).show();
            }
            else {
                $(".connection-twitter").hide();
            }
        };

        // It shows the executive information
        var showExecutiveInformation = function () {
            var executiveName = signature.executiveName.trim();
            if (executiveName.length !== 0) {
                $(".exec .exec-name").html(executiveName);
                $(".exec").show();
            }
            else {
                // hide all executive div

                $(".exec").hide();
            }
            var contact = "";
            if (signature.execPhone.trim().length !== 0) {
                contact = "P: " + signature.execPhone.trim();
            }
            // add mobile
            if (signature.execEmail.trim().length !== 0) {
                if (contact.length !== 0) {
                    contact = contact + " | E: " + signature.execEmail.trim();
                }
                else {
                    contact = "E: " + signature.execEmail.trim();
                }
            }

            if (contact.length !== 0) {
                $(".exec .exec-contact").html(contact);
                $(".exec .exec-contact").show();
            }
            else {
                $(".exec .exec-contact").hide();
            }
        };

        // show logo in the signature
        var showLogo = function () {
            $('.logo-image').attr("src", Constants.IMAGE_PATH + '/' + signature.logo);
        };

        // fills personal information page from data
        var fillPersonalInformationPage = function (data) {
            var form_area = $(".check-area .jqTransformCheckbox").parents(".setting-section").find(".main-area");

            form_area.find(".first-name-input").val(data.firstName);
            form_area.find(".last-name-input").val(data.lastName);
            form_area.find(".job-title-input").val(data.jobTitle);
            form_area.find(".department-input").val(data.department);
            form_area.find(".office-phone-input").val(data.officePhone);
            form_area.find(".mobile-phone-input").val(data.mobile);
            form_area.find(".fax-number-input").val(data.fax);
            form_area.find(".email-input").val(data.email);
			form_area.find(".info-office-address-input").val(data.officeAddress);
			form_area.find(".info-city-state-province-postalcode-input").val(data.officeCityPostalCode);
            // social connections

            // facebook
            if (data.isFacebookActive) {
                form_area.find(".facebook-checkbox").prev().addClass("jqTransformChecked");
                form_area.find(".facebook-checkbox").prop("checked", true);
                form_area.find(".facebook-dropdown-option").parent().removeClass("disable");
                form_area.find(".facebook-dropdown-option").html(data.facebookCountry);
            }
            else {
                form_area.find(".facebook-checkbox").prev().removeClass("jqTransformChecked");
                form_area.find(".facebook-checkbox").prop("checked", false);
                form_area.find(".facebook-dropdown-option").parent().addClass("disable");
                form_area.find(".facebook-dropdown-option").html(Constants.SELECT_COUNTRY_PLACEHOLDER);
            }

            // twitter
            if (data.isTwitterActive) {
                form_area.find(".twitter-checkbox").prev().addClass("jqTransformChecked");
                form_area.find(".twitter-checkbox").prop("checked", true);
                form_area.find(".twitter-dropdown-option").parent().removeClass("disable");
                form_area.find(".twitter-dropdown-option").html(data.twitterCountry);
            }
            else {
                form_area.find(".twitter-checkbox").prev().removeClass("jqTransformChecked");
                form_area.find(".twitter-checkbox").prop("checked", false);
                form_area.find(".twitter-dropdown-option").parent().addClass("disable");
                form_area.find(".twitter-dropdown-option").html(Constants.SELECT_COUNTRY_PLACEHOLDER);
            }

            // google plus
            if (data.isYoutubeActive) {
                form_area.find(".youtube-checkbox").prev().addClass("jqTransformChecked");
                form_area.find(".youtube-checkbox").prop("checked", true);
                form_area.find(".youtube-dropdown-option").parent().removeClass("disable");
                form_area.find(".youtube-dropdown-option").html(data.youtubeCountry);
            }
            else {
                form_area.find(".youtube-checkbox").prev().removeClass("jqTransformChecked");
                form_area.find(".youtube-checkbox").prop("checked", false);
                form_area.find(".youtube-dropdown-option").parent().addClass("disable");
                form_area.find(".youtube-dropdown-option").html(Constants.SELECT_COUNTRY_PLACEHOLDER);
            }

            // linked in
            if (data.isLinkedInActive) {
                form_area.find(".linked-in-checkbox").prev().addClass("jqTransformChecked");
                form_area.find(".linked-in-checkbox").prop("checked", true);
                form_area.find(".linked-in-dropdown-option").parent().removeClass("disable");
                form_area.find(".linked-in-dropdown-option").html(data.linkedInCountry);
            }
            else {
                form_area.find(".linked-in-checkbox").prev().removeClass("jqTransformChecked");
                form_area.find(".linked-in-checkbox").prop("checked", false);
                form_area.find(".linked-in-dropdown-option").parent().addClass("disable");
                form_area.find(".linked-in1-dropdown-option").html(Constants.SELECT_COUNTRY_PLACEHOLDER);
            }
            form_area.find(".info-fullname-input").val(data.executiveName);
            form_area.find(".info-phone-input").val(data.execPhone);
            form_area.find(".info-email-input").val(data.execEmail);
            var index = 0;
            // logo
            switch (data.logo) {
                case Constants.JOHN_HANCOCK_ADD_INS:
                    index = 0;
                    break;
                case Constants.SIGNATOR_ADD_INS:
                    index = 1;
                    break;
                case Constants.MANULIFE_ADD_INS:
                    index = 2;
                    break;

            }

            var logoRb = form_area.find(".form-container").has('img[src="' + data.logo + '"]').find('.logo-radio-button');
            logoRb.prev().addClass("jqTransformChecked");
            logoRb.prop("checked", true);
           
        }

        // routing function
        var route = function (page) {
            // load the page
            $("body").load(page, function () { initialize(); });
        };

        // signature data
        // contains metadata for the signature
        var signature = {
            "company": "",
            "language": "",
            "firstName": "",
            "lastName": "",
            "jobTitle": "",
            "department": "",
            "officePhone": "",
			"fax": "",
            "mobile": "",
            "email": "",
            "officeAddress": "",
			"officeCityPostalCode": "",
			"isFacebookActive": false,
            "isTwitterActive": false,
            "isYoutubeActive": false,
            "isLinkedInActive": false,
            "facebookCountry": "",
            "twitterCountry": "",
            "youtubeCountry": "",
            "linkedInCountry": "",
            "executiveName": "",
            "execPhone": "",
            "execEmail": "",
            "logo": ""
        };


        // load home page
        route(router.home);
    }
});