/**
 * @author : topcder
 * @versin : 1.0
 * @description : contains script for the app
 */
// constants used in the application
var Constants = {
    'JOHN_HANCOCK_ADD_INS': "John Hancock Add-ins",
    'MANULIFE_ADD_INS': "Manulife Add-ins",
    'SIGNATOR_ADD_INS': "Signator Add-ins",
    "LOGO_JOHN_HANCOCK_ADD_INS": "i/logo1-103x33.png",
    "LOGO_MANULIFE_ADD_INS": "i/logo3-118x44.png",
    "LOGO_SIGNATOR_ADD_INS": "i/logo2-79x22.png",
    "SELECT_COUNTRY_PLACEHOLDER": "Select Country",
     
    "SELECT_LANGUAGE_PLACEHOLDER": "Default Languange",

    "IMAGE_PATH": "https://o365addin.herokuapp.com/appcompose/home",
    "OUTLOOK_ROAMING_KEY": "signature_data",
    "ERROR_ADD_IN": "There has been some error while processing request:"
};

// define a router
// contain page mappings
var router = {
    'home': 'home.html',
    // john hancock
    'john_hancock_instructions': 'john-hancock-instructions.html',
    'john_hancock_division_and_language': 'john-hancock-division-and-language.html',
    'john_hancock_personal_information': 'john-hancock-personal-information.html',
    'john_hancock_preview_signature': 'john-hancock-preview-signature.html',
    'john_hancock_save_message': 'john-hancock-save-message.html',
    // manulife
    'manulife_instructions': 'manulife-instructions.html',
    'manulife_division_and_language': 'manulife-division-and-language.html',
    'manulife_personal_information': 'manulife-personal-information.html',
    'manulife_preview_signature': 'manulife-preview-signature.html',
    'manulife_save_message': 'manulife-save-message.html',
    // signator
    'signator_instructions': 'signator-instructions.html',
    'signator_division_and_language': 'signator-division-and-language.html',
    'signator_personal_information': 'signator-personal-information.html',
    'signator_preview_signature': 'signator-preview-signature.html',
    'signator_save_message': 'signator-save-message.html',
    'template': "template.html"

};

// define dropdown options
var dropdownOptions = {
    'US /John Hancock': {
        logos: [
            'i/logos/Logo_US%20Div/Corporate_English.gif',
            'i/logos/Logo_US%20Div/Investment_Division_RealEstate_US_e_420x113.gif'
        ],
        businessUnits: {
            'Corporate': ['English'],
            'JH Real Estate': ['English'],
            'JH Asset Management': ['English'],
            'JH Timber': ['English']
        }
    },
    'Canadian': {
        logos: [
            'i/logos/Logo_Canadian%20Div_Appirio/CaDivision_Bank_e_nocontact_attr_420x130.gif',
            'i/logos/Logo_Canadian%20Div_Appirio/CaDivision_Bank_f_nocontact_attr_420x130.gif',
            'i/logos/Logo_Canadian%20Div_Appirio/CaDivision_e_nocontact_attr_420x130.gif',
            'i/logos/Logo_Canadian%20Div_Appirio/CaDivision_f_nocontact_attr_420x130.gif'
        ],
        businessUnits: {
            'Corporate': ['English', 'French'],
            'Bank': ['English', 'French'],
            'Securities': ['English', 'French'],
            'Private wealth': ['English', 'French']
        }
    },
    'Asia': {
        logos: [
            'i/logos/Logo_Asia_Appirio/Asia_Division_e_nocontact_attr_descrip_420x153.gif',
            'i/logos/Logo_Asia_Appirio/Asia_Division_e_nocontact_Sinochem_attr_descrip_420x183.gif',
            'i/logos/Logo_Asia_Appirio/AsiaDivision_HK_nocontact_attr_420x136.gif',
            'i/logos/Logo_Asia_Appirio/AsiaDivision_Invstmnts_Japan_e_nocontact_attr_420x136.gif',
            'i/logos/Logo_Asia_Appirio/AsiaDivision_Thailand_nocontact_attr_420x136.gif'               
        ],
        businessUnits: {
            'Corporate Divisional Logo': ['English'],
            'Asia Division Sinochem': ['Dual'],
            'Asia Division Hong Kong': ['Dual'],
            'Asia Division Investments Japan': ['English'],
            'Asia Division Thailand': ['Dual'],
            'Asia Division Asset Management Taiwan': ['Dual']
        }
    },
    'Investment': {
        logos: [
            'i/logos/Logo_Investments_Appirio/AsstMngmnt_PrivateMarkets_e_nocontact_759x108.gif',
            'i/logos/Logo_Investments_Appirio/Manulife%20Asset%20Management%20_French.gif',
            'i/logos/Logo_Investments_Appirio/Manulife%20Asset%20Management.gif'
        ],
        businessUnits: {
            'Asset Management Private Market': ['English'],
            'Manulife Asset Management': ['English', 'French'],
            'Manulife Reinsurance': ['English']
        }
    }
};

var socialMediaLinks = {
    'facebook': {
        'Asia': 'https://www.facebook.com/ManulifeFinancial',
        'Canadian': 'https://www.facebook.com/ManulifeFinancial',
        'Corporate': 'https://www.facebook.com/ManulifeFinancial',
        'Hongkong': 'https://www.facebook.com/manulifehongkong',
        'Indonesia': 'https://www.facebook.com/mylifemanulife',
        'Indonesia HR': 'https://www.facebook.com/karirdimanulife',
        'Investment': 'https://www.facebook.com/ManulifeFinancial',
        'Japan': 'https://www.facebook.com/ManulifeJapan',
        'John Hancock': 'https://www.facebook.com/ManulifeFinancial',
        'Phillipines': 'https://www.facebook.com/mymanulife',
        'Singapore': 'https://www.facebook.com/manulife.singapore',
        'Vietnam': 'https://www.facebook.com/manulifevietnam'
    },
    'linkedin': {
        'Asia': 'https://www.linkedin.com/company/manulifefinancial',
        'Canadian': 'https://www.linkedin.com/company/manulifefinancial',
        'Corporate': 'https://www.linkedin.com/company/manulifefinancial',
        'Investment': 'https://www.linkedin.com/company/manulifefinancial',
        'John Hancock': 'https://www.linkedin.com/company/manulifefinancial'
    },
    'twitter':{
        'Asia': 'https://twitter.com/Manulife',
        'Canadian': 'https://twitter.com/Manulife',
        'Corporate': 'https://twitter.com/Manulife',
        'Indonesia': 'https://twitter.com/manulife_ID',
        'Investment': 'https://twitter.com/Manulife',
        'John Hancock': 'https://twitter.com/Manulife',
        'Phillipines': 'https://twitter.com/manulifeph'
    },
    'youtube':{
        'Asia': 'https://www.youtube.com/user/manulifefinancial',
        'Canadian': 'https://www.youtube.com/user/manulifefinancial',
        'Corporate': 'https://www.youtube.com/user/manulifefinancial',
        'Indonesia': 'https://www.youtube.com/user/mlividindonesia',
        'Investment': 'https://www.youtube.com/user/manulifefinancial',
        'John Hancock': 'https://www.youtube.com/user/manulifefinancial',
        'Phillipines': 'https://www.youtube.com/user/myManulifeph',
        'Singapore': 'https://www.youtube.com/user/ManulifeSG1980',
        'Vietnam': 'https://www.youtube.com/user/ManulifeVietnam'
    }
};