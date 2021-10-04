/**
 * CLI RPN Calculator
 */

(function() {
    const supportedOperators = new Set(['+', '-', '*', '/']);
    const isNumeric = (number) => isFinite(number) && !isNaN(parseFloat(number));

    /**
     * Basic 4 arithmetic operations
     * @param op
     * @param a
     * @param b
     * @returns {number|*}
     */
    const operate = (op, a, b) => {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/': {
                if (b === 0) {
                    throw (`can't divide by zero`);
                }
                return a / b;
            }
            default:
                throw (`can't handle operator '${op}'`);
        }
    }

    const calculator = () => ({
        operands: [],
        calculate: function(operators) {
            if (!Array.isArray(operators)) {
                throw (`operators were not defined`);
            }
            while (operators.length) {
                const op = operators.shift();
                if (isNumeric(op)) {
                    this.operands.push(Number(op));
                } else if (supportedOperators.has(op)) {
                    if (this.operands.length < 2) {
                        throw (`${op} requires 2 operands`);
                    }
                    const b = this.operands.pop();
                    const a = this.operands.pop();
                    this.operands.push(operate(op, a, b));
                } else {
                    throw (`can't handle operator '${op}'`);
                }
            }
            const length = this.operands.length;
            return length ? this.operands[length - 1] : Number.NaN;
        }
    });

    const params = process.argv.slice(2);
    const calc = calculator();
    const result = calc.calculate(params);

    console.log(result);
})();
