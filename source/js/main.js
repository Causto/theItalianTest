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
    _notANumber = isNaN( _inputcontent );

    if ( _notANumber ){

        cardInput.value = _inputcontent.substring( 0, _inputcontent.length - 1 );

    } else {

        var _visa,
            _mastercard,
            _americanExp;

        if ( _inputcontent.charAt( 0 ) == 4 && _inputcontent.length == 13 ) {
            
            /* check Bigger */
            if ( _inputcontent.length > 13){
                console.log('tooBigMotherFucker');
            }

            console.log('visa');

        } else if ( _inputcontent.charAt( 0 ) == 5 && _inputcontent.length == 16) {

            console.log('masterCard');

        } else {

            return;

        }

    }

}

cardInput.addEventListener('paste', pasteString, false);
cardInput.addEventListener('keyup', enterKey, false);
