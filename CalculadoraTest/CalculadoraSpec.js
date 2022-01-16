describe("Calculator tests:", function(){
    let calc = null;
    beforeEach(function(){
        calc = new Calculator();
    });
    describe("Press a number:", function(){
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '12', '456','123456789'];
        numbers.forEach(number => {
            it(`Press ${number}`, function(){
                for(let i=0; i<number.length; i++){
                    calc.pressNumber(number[i]);
                }
                expect(calc.nextValue()).toBe(number);
            });
        });
    });
    describe("Press an operation:", function(){
        let operations = ['+', '-', 'x', '/', '='];
        operations.forEach(op => {
            it(`Press ${op}`, function(){
                calc.pressOperation(op);
                expect(calc.operation()).toBe(op);
            });
        });
    });
    describe("Testing operations:", function(){
        describe("Regular operations", function(){
            let cases = [
                {a:'4', op:'+', b:'5', r:9},
                {a:'0', op:'+', b:'0', r:0},
                {a:'2', op:'+', b:'-3', r:-1},
                {a:'19', op:'-', b:'0', r:19},
                {a:'2', op:'-', b:'2', r:0},
                {a:'-28', op:'-', b:'3', r:-31},
                {a:'3', op:'x', b:'6', r:18},
                {a:'-2', op:'x', b:'6', r:-12},
                {a:'4.5', op:'x', b:'2', r:9},
                {a:'10', op:'/', b:'4', r:2.5},
                {a:'-10', op:'/', b:'-4', r:2.5},
                {a:'3', op:'/', b:'3', r:1},
            ];
            cases.forEach(c => {
                it(`${c.a} ${c.op} ${c.b} = ${c.r}`, function(){
                    calc.nextValue(c.a);
                    calc.pressOperation(c.op);
                    calc.nextValue(c.b);
                    calc.pressOperation('=');
                    expect(calc.currentValue()).toBe(c.r);
                });
            });
        });
        describe("Conflictive cases", function(){
            let cases = [
                {a:'0.1', op:'+', b:'0.2', r:0.3},
                {a:'1', op:'/', b:'0', r:Infinity},
                {a:'Infinity', op:'+', b:'0', r:Infinity},
                {a:'Infinity', op:'x', b:'2', r:Infinity},
                {a:'Infinity', op:'-', b:'3', r:Infinity},
                {a:'Infinity', op:'/', b:'-2', r:-Infinity},
                {a:'Infinity', op:'/', b:'0', r:Infinity},
            ];
            cases.forEach(c => {
                it(`${c.a} ${c.op} ${c.b} = ${c.r}`, function(){
                    calc.nextValue(c.a);
                    calc.pressOperation(c.op);
                    calc.nextValue(c.b);
                    calc.pressOperation('=');
                    expect(calc.currentValue()).toEqual(c.r);
                });
            });
        });
    });
    describe("Support functionalities:", function(){
        it("Change sign", function(){
            calc.nextValue(1);
            expect(calc.nextValue()).not.toContain('-');
            calc.changeSign();
            expect(calc.nextValue()).toContain('-');
            calc.changeSign();
            expect(calc.nextValue()).not.toContain('-');
        });
        it("Decimal", function(){
            expect(calc.nextValue()).not.toContain('.');
            calc.pressDecimal();
            expect(calc.nextValue()).toContain('.');
            expect(calc.nextValue().split('.').length).toBe(2);
        });
        it("Decimal does nothing if number is already decimal", function(){
            calc.pressNumber('2');
            calc.pressDecimal();
            calc.pressDecimal();
            expect(calc.nextValue()).toContain('.');
            expect(calc.nextValue().split('.').length).toBe(2);
        });
        it("Reset", function(){
            calc.pressNumber('3');
            calc.pressOperation('+');
            calc.init();
            expect(calc.nextValue()).toBe('0');
        });
        it("GoBack: number", function(){
            calc.pressNumber('7');
            calc.pressNumber('3');
            calc.goBack();
            expect(calc.nextValue()).toBe('7');
        });
        it("GoBack: decimal", function(){
            calc.pressDecimal();
            calc.goBack();
            expect(calc.nextValue()).toBe('0');
        });
    });
    describe("Conversion tests:", function(){
        let cases = [
            {n:'0',bin:'0',oct:'0',hex:'0'},
            {n:'8',bin:'1000',oct:'10',hex:'8'},
            {n:'16',bin:'10000',oct:'20',hex:'10'},
            {n:'5',bin:'101',oct:'5',hex:'5'},
            {n:'100',bin:'1100100',oct:'144',hex:'64'},
            {n:'123456',bin:'11110001001000000',oct:'361100',hex:'1e240'},
            {n:'7777',bin:'1111001100001',oct:'17141',hex:'1e61'},
            {n:'26',bin:'11010',oct:'32',hex:'1a'},
            {n:'5.8',bin:'-',oct:'-',hex:'-'},
            {n:'-5',bin:'-',oct:'-',hex:'-'},
        ];
        describe("Convert to binary:", function(){
            cases.forEach(c => {
                it(`Bin(${c.n})=${c.bin}`, function(){
                    expect(convertTo(c.n,'2')).toBe(c.bin);
                });
            });
        });
        describe("Convert to octal:", function(){
            cases.forEach(c => {
                it(`Oct(${c.n})=${c.oct}`, function(){
                    expect(convertTo(c.n,'8')).toBe(c.oct);
                });
            });
        });
        describe("Convert to hexadecimal:", function(){
            cases.forEach(c => {
                it(`Hex(${c.n})=${c.hex}`, function(){
                    expect(convertTo(c.n,'16')).toBe(c.hex);
                });
            });
        });
    });
});