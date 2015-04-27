function el(element) {
    return document.querySelector(element);
}

var cardInput = el('.card');

function pasteString(e) {

    console.log('yesMotherF*');
    e.preventDefault();

}

function enterKey() {

    var _inputcontent = cardInput.value,
        _firstnumber = _inputcontent.charAt( 0 ),
        _secondNumber = _inputcontent.charAt( 1 ),
        _notANumber = isNaN( _inputcontent );

    if ( _notANumber ) {

        cardInput.value = _inputcontent.substring( 0, _inputcontent.length - 1 );

    } else if ( _firstnumber != 3 && _firstnumber != 4 && _firstnumber != 5) {

        console.log('not a valid start');

    } else {

        var _buttonName = el('.input-group-addon'),
            _visa = 'visa',
            _mastercard = 'Master Card',
            _americanExp = 'American Express';

        if ( _inputcontent.charAt( 0 ) == 4 && _inputcontent.length == 13 ) {

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

function isEmpty(e) {

    e.preventDefault();

    var inputs = document.querySelectorAll('.form-control');

    for (var i = 0; i < inputs.length; i++) {

        if ( inputs[i].value == '' || null ) {
            console.log('un champ est vide');
        }
        inputs[i];
        
    }


}

cardInput.addEventListener('paste', pasteString, false);
cardInput.addEventListener('keyup', enterKey, false);

el('.btn').addEventListener('click', isEmpty, false);