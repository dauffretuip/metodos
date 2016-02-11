var input = $('#numero');
var binario = $('.binario');
var decimal = $('.decimal');
var reset = $('.reset');
var alfa = false;
var bin = true;
var int = true;
var messageBox = $('.estado');
var messageText = $('.estado .content p');
var messageIcon = $('.estado .icon');
var resultado = $('.resultado');

var convertingNumber = $('.ConvertingNumber');
var convertMethod = $('.ConvertMethod');
var convertedNumber = $('.ConvertedNumber');


$(document).ready(function() {

    function checkAlfaStatus() {
        console.info('Ultimo caracter es un número?', (!alfa) ? 'Si!': 'No!');

        //si es positivo, deshabilitamos los botones
        if (alfa) {
            console.log(111);
            messageBox.removeClass().addClass('ui icon message estado red');
            messageText.text('El número solo puede contener dígitos.');
            messageIcon.removeClass().addClass('warning sign icon');
            binario.attr('disabled', true);
            decimal.attr('disabled', true);
        }
    }

    function checkBinStatus() {
        console.warn('El número es un posible binario?', (bin) ? 'Si!': 'No!');

        //si es positivo, deshabilitamos los botones
        if (!bin){
            messageBox.removeClass().addClass('ui icon message estado blue');
            messageText.text('Este número solo podrá ser convertido a binario.');
            messageIcon.removeClass().addClass('info circle icon');
            decimal.attr('disabled', true);
        }
    }

    function checkIntStatus() {
        console.warn('El número es un entero?', (int) ? 'Si!': 'No!');

        //si es positivo, deshabilitamos los botones
        if (!int){
            messageBox.removeClass().addClass('ui icon message estado purple');
            messageText.text('Gracias de ingresar un número entero.');
            messageIcon.removeClass().addClass('info announcement icon');
            decimal.attr('disabled', true);
        }
    }

    function checkIfAllOk() {
        if (!alfa && bin){
            binario.attr('disabled', false);
            decimal.attr('disabled', false);
            messageBox.addClass('hidden');
        }
    }

    function typeNumber() {

        //buscamos el valor de lo ingresado
        var val = input.val();

        //si hay algo ingresado, evaluarlo
        if(val){

            //habilitar los botones para permitir la codificación
            binario.attr('disabled', false);
            decimal.attr('disabled', false);

            //evaluamos si el valor ingresado contiene solo digitos y si es un posible binario
            var isNumber = val.match(new RegExp('^[0-9\-]+$'));
            var isBin = val.search(/^[10]+$/) != -1;

            //asignamos valores a las variables globales
            bin = (isBin);
            alfa = (!isNumber);
            int = (val % 1 === 0);

            console.warn('int', int);

            //llamamos a las funciones de cambio de estado
            checkBinStatus();
            checkAlfaStatus();
            checkIntStatus();
            checkIfAllOk();

        } else {

            //no hay nada ingresado o se ha borrado
            binario.attr('disabled', true);
            decimal.attr('disabled', true);
        }
    }



    function resetStatus() {
        //reiniciar el formulario
        binario.attr('disabled', false);
        decimal.attr('disabled', false);
        messageBox.addClass('hidden');
        input.val('');
    }


    function convertToBin() {
        var val = input.val();

        console.info((val >>> 0).toString(2));

        convertingNumber.text(val);
        convertedNumber.text(decbin(val,16));
    }

    function decbin(dec,length){
        var out = "";
        while(length--){
            out += (dec >> length ) & 1;
        }
        return out;
    }


    //llamar la funcion que maneja la verificación del numero
    input.on('keyup', function() {
        console.clear();
        typeNumber();
    });

    //ejecutar la funcion de reinicio con el boton de reinicio
    reset.on('click', function() {
        console.clear();
        resultado.hide();
        resetStatus();
    });

    //si le das click al boton de binario, ejecutar esto
    binario.on('click', function() {
        convertingNumber.text(input.val());
        resultado.show();
        convertToBin();
    });

    //si le das click al boton de decimal, ejecutar esto
    decimal.on('click', function() {
        resultado.show();
    });
});

