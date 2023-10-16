document.addEventListener("DOMContentLoaded", function () {
  const num1 = document.getElementById("num1");
  const num2 = document.getElementById("num2");
  const operator = document.getElementById("operator");
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");
  const resultDiv = document.getElementById("result");

  calculateButton.addEventListener("click", function () {
    const number1 = parseFloat(num1.value);
    const number2 = parseFloat(num2.value);
    const selectedOperator = operator.value;

    let result;

    switch (selectedOperator) {
      case "+":
        result = number1 + number2;
        break;
      case "-":
        result = number1 - number2;
        break;
      case "*":
        result = number1 * number2;
        break;
      case "/":
        if (number2 === 0) {
          result = "Cannot divide by zero";
        } else {
          result = number1 / number2;
        }
        break;
      default:
        result = "Invalid operator";
        break;
    }

    resultDiv.textContent = `Result: ${result}`;
  });

  resetButton.addEventListener("click", function () {
    num1.value = "";
    num2.value = "";
    operator.value = "+";
    resultDiv.textContent = "Result: ";
  });
});
