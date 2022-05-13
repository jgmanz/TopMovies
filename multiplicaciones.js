function sumar(x, y)
{
    if( !isNaN(x) && !isNaN(y))
    {
        return x + y;
    }else{
        return -1;
    }
}

function multiplicar(x, y)
{
    if(!isNaN(x) || !isNaN(y))
    {
        return x * y;
    }else{
        return -1;
    }
}
function holaMundo()
{
    var now1 = Date.now;
    var x = 0;
    // if is Not a Number
    x = ":";

    if(isNaN(x))
    {
        console.log('No es un numero');
    }else{
        console.log('Si es un numero');
    }
    console.log(multiplicar(2,3));
}

function calcularMultiplicacion()
{
    var x = document.getElementById('txtX').value;
    var y = document.getElementById('txtY').value;
    var resMult = multiplicar(x,y);
    if(resMult === NaN || resMult === -1)
    {
        alert('Error de captura de datos invalidos');
    }
    else
    {
        var res = "El resultado de " + x + " por " + y + " es " + multiplicar(x,y)

        document.getElementById('txtResultado').innerText = res;
        console.log(res);
    }
} 