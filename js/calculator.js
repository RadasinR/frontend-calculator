let buffer = "";
let tokens = undefined;

function display() {
  let screen = document.querySelector("#screen");
  screen.innerText = buffer;
}

function send(ch) {
  buffer = buffer + ch;
  display();
}

function del() {
  console.log(buffer);
  buffer = buffer.slice(0, buffer.length - 1);
  display();
}

function reset() {
  buffer = "";
  display();
}

/* type and value are strings */
class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

function tokenize() {
  let tokens = [];
  const operators = /^[-+*\/]$/;
  let token = new Token("Number", "");
  for (const ch of buffer) {
    if (!isNaN(ch) || ch == ".") {
      token.value = token.value + ch;
    } else {
      tokens.push(token);
      if (operators.test(ch)) {
        tokens.push(new Token("op", ch));
      }
      token = new Token("Number", "");
    }
  }
  if (token.value.length > 0) {
    tokens.push(token);
  }
  return tokens;
}

function calc() {
  tokens = tokenize();
  if(tokens.length === 0) {
    return
  }
  let result = expresion();
  document.querySelector("#screen").innerText = result;
  buffer = "" + result;
}

function getToken() {
  let t = tokens.shift();
  return t;
}

function unget(tk) {
  tokens.unshift(tk);
}

function term() {
  let lv = primary();
  if (lv === undefined) {
    return 1; /* 1 is neutral 1 time any number is that number any number divide bty 1 is that number */
  }
  let op = getToken();
  if (op === undefined) {
    return lv;
  }

  switch (op.value) {
    case "*":
      lv *= term();
      break;
    case "/":
      lv /= term();
      break;
    case "+":
    case "-":
      unget(op);
      break;
  }
  return lv;
}

function primary() {
  let tk = getToken();
  if (tk === undefined) {
    return undefined;
  }

  if (tk.type === "op") {
    throw new Error("Number expected");
  }

  return Number(tk.value);
}

function expresion() {
  try {
    let lv = term();

    tk = getToken();
    if (tk === undefined) {
      return lv;
    }
    switch (tk.value) {
      case "+":
        lv += term();
        break;
      case "-":
        lv -= term();
        break;
      default:
    }
    return lv;
  } catch (error) {
    return error.message;
  }
}
