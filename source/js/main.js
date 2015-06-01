var cardNumInput = el('.card'),
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

/* get value from selected input */
var getFieldValue = function( input ){

    var _val = input.value;
    return _val;

}

function messageToCLient( parent, parentClass, message, childClass ) {

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

    var _fieldValue = getFieldValue( field ),
        _notANumber = isNaN( _fieldValue );

    if ( _notANumber ) {

        _fieldValue = _fieldValue.substring( 0, _fieldValue.length - 1 );

    }

    field.value = _fieldValue;

}

var cardType = function( input ) {

    console.log( input.value );

    var _val = getFieldValue( input ),
        _firstnumber = _val.charAt( 0 ),
        _secondNumber = _val.charAt( 1 ),
        _cardType;

    if ( _firstnumber == 4 && _val.length == 16 ) {

        _cardType = 'Visa';
        cvvValue = 0;

    } else if ( _firstnumber == 5 && _val.length == 16) {

        _cardType = 'Mastercard';
        cvvValue = 0;

    } else if ( _firstnumber == 3 && ( _secondNumber == 4 || _secondNumber == 7 ) && _val.length == 15) {

        _cardType = 'American Express'
        cvvValue = 1;

    } else {

        _cardType = '';

    }

    return _cardType;

}

var printCardType = function( resultCardType ) {

    var _buttonName = el('.input-group-addon');

    if ( resultCardType ) {

        _buttonName.classList.add('valid');
        _buttonName.innerHTML = resultCardType;

    } else {

        _buttonName.classList.remove('valid');
        _buttonName.innerHTML = '';

    }

    return cvvValue;

}

var isCardNumberValid = function ( cardNu ){

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

    return validateCC( cardNu );

};

var isValidDate = function(){

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

var cvvValue = function( input ) {

    switch ( input.value ) {
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

var isEmpty = function( fields ) {

    for (var i = 0; i < fields.length; i++) {

        if ( fields[i].classList.contains('redBorder') ) {
            fields[i].classList.remove('redBorder');
        }

        if ( fields[i].value == '' || null ) {

            fields[i].classList.add('redBorder');

        }

    }

}

var checkingOnSubmit = function(e) {

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
    var _cardType = cardType( this );
    printCardType( _cardType );


}, false);

cvvInput.addEventListener('keyup', function() {

    deleteNaN( cvvInput );
    cvvValue( this );

}, false);

el('.btn').addEventListener('click', checkingOnSubmit, false);


