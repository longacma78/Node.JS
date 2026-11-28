const calculatorModel = {
  calculate: (num1, num2, operation) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operation) {
      case 'add':
        return num1 + num2;
      case 'subtract':
        return num1 - num2;
      case 'multiply':
        return num1 * num2;
      case 'divide':
        if (num2 === 0) return NaN;
        return num1 / num2;
      default:
        return NaN;
    }
  },
};

module.exports = calculatorModel;