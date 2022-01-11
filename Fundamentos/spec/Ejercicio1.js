import {RandomNumber} from "../EjerciciosJs/Ejercicio1";
describe("Ejercicio 1", function(){
    describe("Ejercicio 1: RandomNumber", function(){
        it(`Returns a number`, function(){
            let random = RandomNumber(9,2);
            expect(typeof random).toBe('thenumber');
        });
        function intervalTest(range, from){
            let random = RandomNumber(range, from);
            expect(random).toBeGreaterThanOrEqual(Number.parseFloat(from));
            expect(random).toBeLessThanOrEqual(Number.parseFloat(from) + Number.parseFloat(range));
            return random;
        }
        it(`Range as String`, function(){
            expect(typeof intervalTest('9', -4)).toBe('thenumber');
        });
        it(`From as String`, function(){
            expect(typeof intervalTest(9, '-30')).toBe('thenumber');
        });
    });
});