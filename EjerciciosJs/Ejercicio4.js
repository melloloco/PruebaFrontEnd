const limite = 100; //Aqui eliges hasta donde quieres que busque numeros primos
const primos = [];
let iteraciones = 0;

for(let valor = 2; valor <= limite; valor++) {
    let primo = true;
    for(let divisor=2; divisor < valor; divisor++) {
        iteraciones++;
        if(valor%divisor === 0) {
            primo = !primo;
            break;
        }
    }
    if(primo) primos.push(valor);
}

console.log(primos);