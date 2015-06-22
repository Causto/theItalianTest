( function ( form, allInputs ) {

    var response = response || {};

    /***********************************/
    /************* Helpers *************/
    /***********************************/

    var el = function( element ) {

        return document.querySelector( element );

    }

    /* get value from selected input */
    var getValue = function( input ){

        var _val = input.value;
        return _val;

    }

    /***********************************/
    /********** main Function **********/
    /***********************************/

    var pasteString = function(e) {

        e.preventDefault();

    }

    var deleteNaN = function( field ) {

        var _fieldValue = getValue( field ),
            _notANumber = isNaN( _fieldValue );

        if ( _notANumber ) {

            _fieldValue = _fieldValue.substring( 0, _fieldValue.length - 1 );

        }

        field.value = _fieldValue;

    }

    var whichCardType = function( input ) {

        var _cardVal = getValue( input ),
            _firstnumber = _cardVal.charAt( 0 ),
            _secondNumber = _cardVal.charAt( 1 ),
            _cardType,
            _cvvType;

            switch ( _firstnumber ) {

                case '4' :

                    _cardType = 'Visa';
                    _cvvType = '0';

                break;

                case '5' :

                    _cardType = 'Mastercard';
                    _cvvType = '0';

                break;

                case '3' :
                default :

                    if ( _secondNumber == 5 || _secondNumber == 7 ) {

                        _cardType = 'American Express'
                        _cvvType = '0';

                    } else {

                        _cardType = ''
                        _cvvType = '';

                    }

                break;
            }

        response.cardType = _cardType;
        response.cvvType = ( response.cardType ) ? _cvvType : '';

    }

    var isGoodLength = function( cardType, input ) {

        var _val = getValue( input ),
            _length = _val.length;

        switch( cardType ) {

            case 'Visa' :
                response.cardNumLen = ( _length == 16 ) ? true : false;
            break;

            case 'Mastercard' :
                response.cardNumLen = ( _length == 16 ) ? true : false;
            break;

            case 'American Express' :
                response.cardNumLen = ( _length == 15 ) ? true : false;
            break;

            default:
                response.cardNumLen = false;
            break;
        }

    }

    var printCardType = function( input ) {

        var _buttonName = input;

        _buttonName.innerHTML = ( response.cardType ) ? response.cardType : '?';

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

            response.date = '';

        } else {

            response.date = _dateValue;

        }

    }

    var isValidCvv = function( input ) {

        var _val = getValue( input );

        switch ( response.cvvType ) {

            case '0':

                response.cvv = ( _val.length == 3 ) ? _val : '';

                break;

            case '1':

                response.cvv = ( _val.length == 4 ) ? _val : '';

                break;

            default:

                response.cvv = '';

                return false;

                break;

        }

    }

    var isPossibleName = function( input ) {

        var _regex = /^[a-zA-ZÀ-ÿ\s]+$/,
            _val = getValue( input );

        if ( _regex.test( _val ) ) {

            _val = _val.toUpperCase();
            _val = _val.split(/\s/g);

            response.name = _val;

        } else {

            response.name = '';

        }

    }

    var isEmpty = function( field, val ) {

        if( !val ) {

            if ( !field.classList.contains('error') ) {

                field.classList.remove('true');
                field.classList.add('error');

            }

            field.value = '';
            field.setAttribute('placeholder', 'come on dude')

        } else {

            if ( !field.classList.contains('true') ) {

                field.classList.remove('error');
                field.classList.add('true');

            }
        }
    }

    /***********************************/
    /************ onsubmit *************/
    /***********************************/

    var checkingOnSubmit = function(e) {

        var _val = false;

        e.preventDefault();

        /* check all the inputs values => if empty */
        for (var i = 0; i < allInputs.length; i++) {

            var _i = allInputs[i];

            if ( _i.value == '' ||  _i.value == null ) {

                _val = false;

                isEmpty( _i, _val );
            }
        }

        /* check value in response object */
        for ( var prop in response ) {

            var _el = el( '.' + prop );

            if ( _el ) {

                if ( !response[prop] ) {

                    _val = false;

                    isEmpty( _el, _val  );

                } else {

                    _val = true;

                    isEmpty( _el, _val );
                }
            }
        }
    }

    /***********************************/
    /************ listeners ************/
    /***********************************/

    for (var i = 0; i < allInputs.length; i++) {

        var _i = allInputs[i];

        _i.addEventListener( 'paste', pasteString, false );

        _i.addEventListener( 'keyup', function() {

            if ( this.classList.contains('cardNumber') || this.classList.contains('cvv') ) {

                deleteNaN( this );

                if ( this.classList.contains('cardNumber') ) {

                    var _cardType = whichCardType( this );
                    isGoodLength( response.cardType, this );
                    printCardType( el('.input-group-addon') );
                    response.cardNumber = '';

                    if ( response.cardNumLen ) {

                        response.cardNumber = ( isCardNumberValid( this.value ) ) ? this.value : '';
                        response.cvv = ( response.cardNumber ) ? response.cvv : '';

                        if ( response.cardNumber ){

                            if ( !el('.input-group-addon').classList.contains('true') ) {

                                el('.input-group-addon').classList.add('true');

                            }

                        } else {

                            if ( el('.input-group-addon').classList.contains('true') ) {

                                el('.input-group-addon').classList.remove('true');

                            }
                        }

                    }

                } else {

                    if( response.cvvType ) {
                       isValidCvv( this );
                    }

                }

            }

            if ( this.classList.contains('name') ) {

                isPossibleName( this );

            }

            if ( this.classList.contains('date') ) {

                isValidDate( this );

            }

            console.log( 'response : ', response );

        }, false );

    };

    form.addEventListener('submit', checkingOnSubmit, false);

})( document.querySelector('.form'), document.querySelectorAll('input') );