function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  var result = range(10, 18); //Introduces el rango que quieras para obtener el numero de elementos que quieras, inicializandose el array en la posicion que le des al primer valor A, en este caso el 10
  console.log(result);