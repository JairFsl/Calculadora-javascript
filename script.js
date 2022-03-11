// Variável para receber os dados dos números:
const numberButtons = document.querySelectorAll("[data-number]");

// Variável para receber os dados das operações:
const operationButtons = document.querySelectorAll("[data-operator]");

// Variável para receber o comando de igualdade(=) ao ser precionado:
const equalsButton = document.querySelector("[data-equals]");

// Variável para receber o comando de deletar(DEL) ao ser precionado:
const deleteButton = document.querySelector("[data-delete]");

// Variável para receber o comando de Apagar Tudo(AC) ao ser precionado:
const allClearButton = document.querySelector("[data-all-clear]");

// Variável para receber os dados dos números e operações já digitadas:
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

// Variável para receber os dados dos números que estão sendo digitados:
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("de", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "x":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  appendNumber(number) {
    // this.currentOperand = this.currentOperand.toString();
    if (this.currentOperand.includes(".") && number === ".") return;

    // if (number === "," && this.currentOperand === "") {
    //   this.currentOperand = 0;
    // }

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
    this.updateDisplay();
  }

  // Método para apagar os números e operações que foram digitados:
  clear() {
    // Cria novas variáveis com valores vazios:
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  // Método para atualizar os dados digitados, setando-os como variáveis com valores específicos ao método (linhas 32, 41, )
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", (e) => {
    if (numberButton.innerText === ",") {
      e = ".";
      calculator.appendNumber(e);
    } else {
      calculator.appendNumber(numberButton.innerText);
    }
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
  });
}

equalsButton.addEventListener("click", () => {
  calculator.calculate();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
});
