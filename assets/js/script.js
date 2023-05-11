/*
    /*
M = (P * i) / (1 - (1 + i)^-n)
donde:

M es el pago mensual que se debe realizar.
P es el monto pedido o principal.
i es la tasa de interés en términos mensuales (es decir, el interés anual dividido entre 12).
n es el número de cuotas en las que se pagará el préstamo.

M = (100000*0.03)/(1-(1+0.003)^-12)

*/

let intereses = [];

//fetch al json de intereses
fetch("assets/mock/intereses.json")
    .then(response => response.json())
    .then(data=>{
        intereses = data;
    })
    .catch(error=> console.log(error))


    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault();
        let installments = parseFloat(document.getElementById("installments").value);
        let base = parseFloat(document.getElementById("base").value); 
        //validar
        let expression = /^[\d]+$/
        //guardines
        if(!expression.test(installments)){
            alert("input invalido, verifica el campo cuotas")
            return;//escapo de la funcion
        }
        
        if(!expression.test(base)){
            alert("input invalido, verifica el campo monto")
            return;//escapo de la funcion
        }

        if(installments<1 || installments>25){
            alert("numero de cuotas invalido debe estar entre 0-24")
            return;
        }

        let intesesObj = intereses.find(i=>i.cuotas == installments)
        console.log(intesesObj);

        document.getElementById("interest").value = `${Math.round(intesesObj.interes_mensual*1000)/10}%`
        //para obtener un decimal redondeado, multiplicar por 1000 y luego dividir por 10

        let resultado = calcularInteres(base, installments, intesesObj.interes_mensual)

        console.log(resultado);
        let message = `¡NO TE PREOCUPES! PUEDES PAGARLO EN ${installments} CUOTAS DE $${Math.round(resultado).toLocaleString("es-CL")}`
        document.getElementById("message").innerHTML = message
    })


    function calcularInteres(base,installments, interest){
        //const M = (P * ir) / (1 - Math.pow(1 + ir, -n));
        const cuotaMensual =(base*interest) /(1- Math.pow(1+ interest, -installments))
        return cuotaMensual;
    }
