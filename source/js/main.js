var cardInput = el('.card'),
    inputs = document.querySelectorAll('.form-control'),
    cvvInput = el('.cvv'),
    dateCard = el('.dateClientCard'),
    cvvValue,
    element;

/***********************************/
/************* Helpers *************/
/***********************************/

function el(element) {
    return document.querySelector(element);
}

function messageToCLient( parent, parentClass, message, childClass ) {

    console.log(el('.tempDialog'));

    el('.tempDialog') ? el('.tempDialog').parentNode.removeChild( el('.tempDialog') ) : element = document.createElement('div');

    element.className = ' tempDialog ';
    element.className += childClass;

    parent.appendChild(element);
    parent.classList.add(parentClass);

    element.innerHTML = message;

}

function pasteString(e) {

    e.preventDefault();
    /*modal */

}

var deleteNaN = function( field ) {

    var fieldValue = field.value,
        _notANumber = isNaN( fieldValue );
    
    if ( _notANumber ) { 

        fieldValue = fieldValue.substring( 0, fieldValue.length - 1 );
    }

    field.value = fieldValue;
}

function checkingCardNumber( field ) {

    var val = field.value,
        _firstnumber = val.charAt( 0 ),
        _secondNumber = val.charAt( 1 );
        _buttonName = el('.input-group-addon'),
        _visa = 'visa',
        _mastercard = 'Master Card',
        _americanExp = 'American Express';

    if ( _firstnumber == 4 && val.length == 16 ) {

        _buttonName.classList.add('valid');
        _buttonName.innerHTML = _visa;
        cvvValue = 0;

    } else if ( _firstnumber == 5 && val.length == 16) {

        _buttonName.classList.add('valid');
        _buttonName.innerHTML = _mastercard;
        cvvValue = 0;

    } else if ( _firstnumber == 3 && ( _secondNumber == 4 || _secondNumber == 7 ) && val.length == 15) {

        _buttonName.classList.add('valid');
        _buttonName.innerHTML = _americanExp;
        cvvValue = 1;

    } else {

        _buttonName.classList.remove('valid');
        _buttonName.innerHTML = 'what a card ?';

    }

}

var isCardNumberValid = function (cardNo){

    var validateCC = (function (arr) {
        
        return function (ccNum) {
            var
                len = ccNum.length,
                bit = 1,
                sum = 0,
                val;
            while (len) {
                val = parseInt(ccNum.charAt(--len), 10);
                sum += (bit ^= 1) ? arr[val] : val;
            }
            return sum && sum % 10 === 0;
        };
    }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

    return validateCC(cardNo);

};

function isValidDate(){

    var now = new Date();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var limitYear = now.getFullYear() + 4;

    month = month.toString();
    year = year.toString().substring(2, 4);
    limitYear = limitYear.toString().substring(2, 4);

    var _dateValue = dateCard.value.replace(/\s/g,''),
        _cardValidity = _dateValue.split(/\D/),
        _cardMonth = parseInt( _cardValidity[0] ),
        _cardYear = _cardValidity[1],
        parent = dateCard.parentElement,
        parentClass = 'addtext';

    dateCard.value = _dateValue;

    if ( _cardValidity[0] == '' ){

        console.log('mmh');

    } else if ( _cardValidity.length != 2 || _cardMonth > 12 || _cardYear < year || ( _cardMonth < month &&  _cardYear == year || _cardYear > limitYear ) ) {

        var message = 'Write the date as on your card please',
            childClass = 'errorMessage';

        dateCard.classList.add('redBorder');
        messageToCLient(parent, parentClass, message, childClass);


    } else {

        var message = 'Seems Good dawg',
            childClass = 'wellDoneMessage';

        dateCard.classList.add('greenBorder');
        messageToCLient(parent, parentClass, message, childClass);


    }

}

var checkingCVV = function() {

    deleteNaN( cvvInput );

    switch (cvvValue) {
        case 0:
            _fieldValue.length == 3 ? console.log('good') : console.log('wrong');
            breaks;
        case 1:
            _fieldValue.length == 4 ? console.log('good') : console.log('wrong');
            breaks;
        default:
            console.log('this isn\'t correct');
    }

}

function isEmpty( fields ) {

    for (var i = 0; i < fields.length; i++) {

        if ( fields[i].classList.contains('redBorder') ) {
            fields[i].classList.remove('redBorder');
        }

        if ( fields[i].value == '' || null ) {

            fields[i].classList.add('redBorder');

        }

    }

}

function checkingOnSubmit(e) {

    e.preventDefault();

    isCardNumberValid();
    isValidDate();
    isEmpty( inputs );

}

var allInputs = document.querySelectorAll('input');
for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('paste', pasteString, false);
};

cardInput.addEventListener('keyup', function(){
    deleteNaN( this );
    checkingCardNumber( this );
}, false);

cvvInput.addEventListener('keyup', checkingCVV, false);

el('.btn').addEventListener('click', checkingOnSubmit, false);


