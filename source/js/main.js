var cardInput = el('.card'),
    dateCard = el('.dateClientCard');

/***********************************/
/************* Helpers *************/
/***********************************/

function el(element) {
    return document.querySelector(element);
}

function messageToCLient( parent, parentClass, message, childClass ) {

	document.querySelector('.tempDialog') ? document.querySelector('.tempDialog').remove() : console.log('nope');
    
    var element = document.createElement('div');
    element.className += childClass;
    element.className += ' tempDialog';
    parent.appendChild(element);
    parent.classList.add(parentClass);
    element.innerHTML = message;

}

/***********************************/
/********* Luhn Algorithm **********/
/***********************************/

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



function pasteString(e) {

    e.preventDefault();
    /*modal */
}


function enterKey(e) {

    var _inputcontent = cardInput.value,
        _firstnumber = _inputcontent.charAt( 0 ),
        _secondNumber = _inputcontent.charAt( 1 ),
        _notANumber = isNaN( _inputcontent );

    if ( _notANumber ) {

       cardInput.value = _inputcontent.substring( 0, _inputcontent.length - 1 );
        e.stopPropagation();

    } else if ( _firstnumber != 3 && _firstnumber != 4 && _firstnumber != 5) {

        console.log('not a valid start');

    } else {

        var _buttonName = el('.input-group-addon'),
            _visa = 'visa',
            _mastercard = 'Master Card',
            _americanExp = 'American Express';

        if ( _inputcontent.charAt( 0 ) == 4 && _inputcontent.length == 16 ) {

            _buttonName.classList.add('valid');
            _buttonName.innerHTML = _visa;

        } else if ( _inputcontent.charAt( 0 ) == 5 && _inputcontent.length == 16) {

            _buttonName.classList.add('valid');
            _buttonName.innerHTML = _mastercard;

        } else if ( _inputcontent.charAt( 0 ) == 3 && ( _secondNumber == 4 || _secondNumber == 7 ) && _inputcontent.length == 15) {

            _buttonName.classList.add('valid');
            _buttonName.innerHTML = _americanExp;

        } else {

            _buttonName.classList.remove('valid');
            _buttonName.innerHTML = '';

        }

    }

}

function cardValidity(e) {

    e.preventDefault();

    var _inputcontent = cardInput.value;
    var result = validateCC(_inputcontent);
    console.log(result);

}

function isEmpty(e) {

    e.preventDefault();

    var inputs = document.querySelectorAll('.form-control');
    inputs.classList.remove('redBorder greenBorder');

    for (var i = 0; i < inputs.length; i++) {

        if ( inputs[i].value == '' || null ) {
            inputs[i].classList.add('redBorder');
        } else {
            inputs[i].classList.add('greenBorder');
        }

    }

}

function isValidDate(e){

    e.preventDefault();

    var now = new Date();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    month = month.toString();
    year = year.toString().substring(2, 4);

    var _dateValue = dateCard.value.replace(/ /g,''),
        _cardValidity = _dateValue.split(/\D/),
        _cardMonth = parseInt( _cardValidity[0] ),
        _cardYear = _cardValidity[1];

    if ( _cardValidity.length != 2 || _cardMonth > 12 || _cardYear < year || ( _cardMonth < month &&  _cardYear == year ) ) {

        var parent = dateCard.parentElement,
            message = 'Write the date as on your card please',
            parentClass = 'addtext',
            childClass = 'errorMessage';

        messageToCLient(parent, parentClass, message, childClass);

    } else {

        var parent = dateCard.parentElement,
            message = 'GOOD DATE BITCH',
            parentClass = 'addtext',
            childClass = 'wellDoneMessage';

        messageToCLient(parent, parentClass, message, childClass);

    }

}

var allInputs = document.querySelectorAll('input');
for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('paste', pasteString, false);
};
cardInput.addEventListener('keyup', enterKey, false);
el('.btn').addEventListener('click', isValidDate, false);