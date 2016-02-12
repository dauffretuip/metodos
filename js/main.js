var input = $('#numero');
var tipo = '';
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


$(document).ready(function () {

    function checkAlfaStatus() {
        console.info('Ultimo caracter es un número?', (!alfa) ? 'Si!' : 'No!');

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
        console.warn('El número es un posible binario?', (bin) ? 'Si!' : 'No!');

        //si es positivo, deshabilitamos los botones
        if (!bin) {
            messageBox.removeClass().addClass('ui icon message estado blue');
            messageText.text('Este número solo podrá ser convertido a binario.');
            messageIcon.removeClass().addClass('info circle icon');
            decimal.attr('disabled', true);
        }
    }

    function checkIntStatus() {
        console.warn('El número es un entero?', (int) ? 'Si!' : 'No!');

        //si es positivo, deshabilitamos los botones
        if (!int) {
            messageBox.removeClass().addClass('ui icon message estado purple');
            messageText.text('Gracias de ingresar un número entero positivo.');
            messageIcon.removeClass().addClass('info announcement icon');
            decimal.attr('disabled', true);
        }
    }

    function checkIfAllOk() {
        if (!alfa && bin) {
            binario.attr('disabled', false);
            decimal.attr('disabled', false);
            messageBox.addClass('hidden');
        }
    }

    function typeNumber() {

        //buscamos el valor de lo ingresado
        var val = input.val();

        //si hay algo ingresado, evaluarlo
        if (val) {

            //habilitar los botones para permitir la codificación
            binario.attr('disabled', false);
            decimal.attr('disabled', false);

            //evaluamos si el valor ingresado contiene solo digitos y si es un posible binario
            var isNumber = val.match(new RegExp('^[0-9]+$'));
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
        var res1 = 999;
        var args = input.val();
        while (args > 1) {
            var arg1 = parseInt(args / 2);
            var arg2 = args % 2;
            args = arg1;
            if (res1 === 999) {
                res1 = arg2.toString();
            }
            else {
                res1 = arg2.toString() + res1.toString();
            }
        }
        if (args === 1 && res1 !== 999) {
            res1 = args.toString() + res1.toString();
        }
        else if (args === 0 && res1 === 999) {
            res1 = 0;
        }
        else if (res1 === 999) {
            res1 = 1;
        }
        var ll = res1.length;
        while (ll % 16 !== 0) {
            res1 = "0" + res1;
            ll = res1.length;
        }

        return normalize(res1);
    }

    function convertToBin2() {

    }

    /**
     * Se evaluan cada digito por separado.
     * En este punto ya no importa el numero completo en si, sino cada digito con su posición relativa al numero total
     * de digitos.
     * La potencia que se aplica a cada digito es la posición del número desde la derecha.
     */
    function convertToDec() {

        var digitos = input.val().toString();
        var cantidad = digitos.length;
        var potencia = digitos.length - 1;
        var suma = 0;
        var isPosisive = (+digitos.charAt(0) !== 0);
        var tempNeg = '';
        var tempNeg2 = '';


        if(!isPosisive) {

            console.info('el numero es negativo');

            for (var i = 0; i < cantidad; i ++) {
                console.log('digitos:', +digitos.charAt(i));
                tempNeg += (+digitos.charAt(i) === 0) ? '1' : '0';
            }

            console.log('tempNeg', tempNeg);

            var stop = false;

            for (var i = cantidad-1; i >= -1; i --) {

                var test = +tempNeg.charAt(i);

                if(test === 0 && !stop) {

                    tempNeg2 = '1' + tempNeg2;
                    console.warn('test = 0', i, tempNeg2);
                    stop = true;
                } else if (test === 1 && !stop){
                    tempNeg2 = '0' + tempNeg2;
                    console.warn('test = 1', i, tempNeg2);
                } else {
                    tempNeg2 = +tempNeg.charAt(i) + tempNeg2;
                    console.warn('test = rest', i, tempNeg2);
                }


                //console.log('k',i, tempNeg2);

                tempNeg = tempNeg2;
            }


        } else {
            tempNeg = digitos;
        }


        for (var i = 0; i < cantidad; i ++) {
            suma += +tempNeg.charAt(i) * (1 << potencia);
            potencia--;
        }

        suma = (isPosisive) ? suma : suma * (-1);

        return normalize(suma);
    }

    /**
     * Escribir el resultado de la operación en la caja verde
     * @param respuesta es el numero calculado en las funciones anteriores
     */
    function normalize(respuesta) {
        convertingNumber.text(input.val());
        convertMethod.text(tipo);
        convertedNumber.text(respuesta);
    }


    //llamar la funcion que maneja la verificación del numero
    input.on('keyup', function () {
        console.clear();
        typeNumber();
    });

    //ejecutar la funcion de reinicio con el boton de reinicio
    reset.on('click', function () {
        console.clear();
        resultado.hide();
        resetStatus();
    });

    //si le das click al boton de binario, ejecutar esto
    binario.on('click', function () {
        tipo = 'binario';
        convertingNumber.text(input.val());
        resultado.show();
        convertToBin();
    });

    //si le das click al boton de decimal, ejecutar esto
    decimal.on('click', function () {
        tipo = 'decimal';
        resultado.show();
        convertToDec();
    });
});