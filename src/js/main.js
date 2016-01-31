var input = $('#numero');
var binario = $('.binario');
var decimal = $('.decimal');
var reset = $('.reset');
var alfa = false;
var bin = true;
var messageBox = $('.message');
var messageText = $('.message .content p');
var messageIcon = $('.message .icon');


$(document).ready(function() {

    function checkAlfaStatus() {

        console.clear();
        console.info('Ultimo caracter es un número?', (!alfa) ? 'Si!': 'No!');
        //si es positivo, deshabilitamos los botones
        if (alfa) {
            messageBox.removeClass('hidden').addClass('red');
            messageText.text('El número solo puede contener dígitos.');
            messageIcon.removeClass().addClass('warning sign icon');

            binario.attr('disabled', true);
            decimal.attr('disabled', true);
        } else {
            messageBox.addClass('hidden');

            binario.attr('disabled', false);
            decimal.attr('disabled', false);
        }
    }

    function checkBinStatus() {

        console.warn('El número es un posible binario?', (bin) ? 'Si!': 'No!');

        //si es positivo, deshabilitamos los botones
        if (!bin){
            messageBox.removeClass('hidden').addClass('blue');
            messageText.text('Este número solo podrá ser convertido a binario.');
            messageIcon.removeClass().addClass('info circle icon');

            decimal.attr('disabled', true);

        }
    }

    function typeNumber() {

        var val = input.val();
        var lastone = val.toString().split('').pop();

        //verificamos si lo ingresado es un numero
        if($.isNumeric(val)) {
            alfa = false;

            //verificamos si el ultimo numero es un posible binario
            if(lastone > 1) {
                bin = false;
            }
        }
        else {
            alfa = true;
        }
        //llamamos a las funciones de cambio de estado
        checkAlfaStatus();
        checkBinStatus();
    }



    function resetStatus() {

        //reiniciar el formulario
        binario.attr('disabled', false);
        decimal.attr('disabled', false);
        messageBox.addClass('hidden');
        input.val('');
    }

    //llamar la funcion que maneja la verificación del numero
    input.on('keyup', function() {
        typeNumber();
    });

    //ejecutar la funcion de reinicio con el boton de reinicio
    reset.on('click', function() {
        console.clear();
        resetStatus();
    });
});
