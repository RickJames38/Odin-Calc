class Calculator {
  constructor(prevOperandTextElement, currentOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  choseOp(operation) {
    if (this.currentOp === "") return;
    if (this.prevOp !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOp = this.currentOp;
    this.currentOp = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOp);
    const current = parseFloat(this.currentOp);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOp = computation;
    this.operation = undefined;
    this.prevOp = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const deciamlDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (deciamlDigits != null) {
      return `${integerDisplay}.${deciamlDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOp
    );
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.prevOp} ${this.operation}`;
    } else {
      this.prevOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-num]");
const operationButtons = document.querySelectorAll("[data-op]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const prevOperandTextElement = document.querySelector("[data-prev-op]");
const currentOperandTextElement = document.querySelector("[data-current-op]");

const calculator = new Calculator(
  prevOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choseOp(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
