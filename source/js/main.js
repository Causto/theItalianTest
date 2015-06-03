var cardNumInput = el('.card'),
    inputs = document.querySelectorAll('.form-control'),
    cvvInput = el('.cvv'),
    dateCard = el('.dateClientCard'),
    response = response || {};

/***********************************/
/************* Helpers *************/
/***********************************/

function el(element) {

    return document.querySelector(element);

}

/* get value from selected input */
var getValue = function( input ){

    var _val = input.value;
    return _val;

}

var messageToCLient = function( parent, parentClass, message, childClass ) {

    el('.tempDialog') ? el('.tempDialog').parentNode.removeChild( el('.tempDialog') ) : element = document.createElement('div');

    element.className = ' tempDialog ';
    element.className += childClass;

    parent.appendChild(element);
    parent.classList.add(parentClass);

    element.innerHTML = message;

}

var pasteString = function(e) {

    e.preventDefault();
    /*modal */

}

var deleteNaN = function( field ) {

    var _fieldValue = getValue( field ),
        _notANumber = isNaN( _fieldValue );

    if ( _notANumber ) {

        _fieldValue = _fieldValue.substring( 0, _fieldValue.length - 1 );

    }

    field.value = _fieldValue;

}

var cardType = function( input ) {

    var _cardVal = getValue( input ),
        _firstnumber = _cardVal.charAt( 0 ),
        _secondNumber = _cardVal.charAt( 1 ),
        _cardType,
        _cvvType;

    if ( _firstnumber == 4 && _cardVal.length == 16 ) {

        _cardType = 'Visa';
        _cvvType = 0;

    } else if ( _firstnumber == 5 && _cardVal.length == 16) {

        _cardType = 'Mastercard';
        _cvvType = 0;

    } else if ( _firstnumber == 3 && ( _secondNumber == 4 || _secondNumber == 7 ) && _cardVal.length == 15) {

        _cardType = 'American Express'
        _cvvType = 1;

    } else {

        _cardType = '';
        _cvvType = '';

    }

    response.card = _cardType;
    response.cvvType = _cvvType;

    response.card.length > 0 ? response.cardNumber = _cardVal : response.cardNumber = '';

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

}

var isCardNumberValid = function ( cardNu ){

    var validateCC = ( function (arr) {

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

var isValidDate = function( dateInput ){

    var now         = new Date();
    var month       = now.getMonth() + 1;
    var year        = now.getFullYear();
    var limitYear   = now.getFullYear() + 4;

    month       = month.toString();
    year        = year.toString().substring(2, 4);
    limitYear   = limitYear.toString().substring(2, 4);

    var _dateValue      = getValue( dateInput ).replace(/\s/gi, ''),
        _cardValidity   = _dateValue.split(/\D/),
        _cardMonth      = parseInt( _cardValidity[0] ),
        _cardYear       = _cardValidity[1];

    if ( _cardValidity.length != 2 || _cardMonth > 12 || _cardYear < year || ( _cardMonth < month &&  _cardYear == year || _cardYear > limitYear ) ) {

        /* not valid date */
        response.date = '';

    } else {

        /* valid date */
        response.date = _dateValue;

    }

}

var isValidCvv = function( input ) {

    _fieldValue = getValue( input );

    switch ( cvvValue ) {

        case 0:

            _fieldValue.length == 3 ? response.cvvValue = _fieldValue : response.cvvValue = '';

            break;

        case 1:

            _fieldValue.length == 4 ? response.cvvValue = _fieldValue : response.cvvValue = '';

            break;

        default:

            return false;

            break;

    }

}

var isPossibleName = function( input ) {

    var _regex = /D/gi,
        _val = getValue( input );

        console.log(_val);

    if ( _regex.test( input ) ) {

        return true;

    } else {

        return false;
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

    // isCardNumberValid( cardNumInput.value );
    // console.log(isCardNumberValid( response.cardNumber ));
    console.log( isPossibleName( el('.name') ) );
    // isEmpty( inputs );

}

var allInputs = document.querySelectorAll('input');

for (var i = 0; i < allInputs.length; i++) {

    allInputs[i].addEventListener('paste', pasteString, false);

};

cardNumInput.addEventListener('keyup', function(){

    deleteNaN( this );
    var _cardType = cardType( this );
    printCardType( response.card );


}, false);

cvvInput.addEventListener('keyup', function() {

    deleteNaN( cvvInput );
    isValidCvv( this );

}, false);

el('.btn').addEventListener('click', checkingOnSubmit, false);


