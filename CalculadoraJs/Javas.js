var input = document.getElementById('tela'),
  numero = document.querySelectorAll('.numeros div'),
  conta = document.querySelectorAll('.signos div'),
  resultado = document.getElementById('resultado'),
  limpiar = document.getElementById('limpiar'),
  resultadoEstaMostrado = false;

for (var i = 0; i < numero.length; i++) {
  numero[i].addEventListener("click", function(e) {

    var textoTela = input.innerHTML;
    var ultimoChar = textoTela[textoTela.length - 1];

    if (resultadoEstaMostrado === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultadoEstaMostrado === true && ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷") {
      resultadoEstaMostrado = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultadoEstaMostrado = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

for (var i = 0; i < conta.length; i++) {
  conta[i].addEventListener("click", function(e) {

    var textoTela = input.innerHTML;
    var ultimoChar = textoTela[textoTela.length - 1];

    if (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷") {
      var newString = textoTela.substring(0, textoTela.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (textoTela.length == 0) {
      alert("Primero escriba un numero");
    } else {
      input.innerHTML += e.target.innerHTML;
    }

  });
}

resultado.addEventListener("click", function() {

  var inputString = input.innerHTML;

  var numeros = inputString.split(/\+|\-|\×|\÷/g);

  var signos = inputString.replace(/[0-9]|\./g, "").split("");

  var divide = signos.indexOf("÷");
  while (divide != -1) {
    numeros.splice(divide, 2, numeros[divide] / numeros[divide + 1]);
    signos.splice(divide, 1);
    divide = signos.indexOf("÷");
  }

  var multiply = signos.indexOf("×");
  while (multiply != -1) {
    numeros.splice(multiply, 2, numeros[multiply] * numeros[multiply + 1]);
    signos.splice(multiply, 1);
    multiply = signos.indexOf("×");
  }

  var subtract = signos.indexOf("-");
  while (subtract != -1) {
    numeros.splice(subtract, 2, numeros[subtract] - numeros[subtract + 1]);
    signos.splice(subtract, 1);
    subtract = signos.indexOf("-");
  }

  var add = signos.indexOf("+");
  while (add != -1) {
    numeros.splice(add, 2, parseFloat(numeros[add]) + parseFloat(numeros[add + 1]));
    signos.splice(add, 1);
    add = signos.indexOf("+");
  }

  input.innerHTML = numeros[0]; 

  resultadoEstaMostrado = true; 
});

limpiar.addEventListener("click", function() {
  input.innerHTML = "";
})