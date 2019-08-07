function toRoman(arabic) {
  let roman, ones, tens, hundreds, thousands;
  if (arabic <= 0) {
    roman = 'none'
  } else {
    ones = handleOnes(arabic % 10)
    tens = handleTens(Math.floor((arabic % 100) / 10))
    hundreds = handleHundreds(Math.floor((arabic % 1000) / 100))
    thousands = handleThousands(Math.floor(arabic / 1000))

    roman = thousands + hundreds + tens + ones
  }

  return roman
}

function handleOnes(digit) {
  return handleDigit(digit, 'I', 'V', 'X');
}

function handleTens(digit) {
  return handleDigit(digit, 'X', 'L', 'C');
}

function handleHundreds(digit) {
  return handleDigit(digit, 'C', 'D', 'M');
}

function handleDigit(digit, single, fifth, next) {
  let result;

  if (digit < 5) {
    result = single.repeat(digit)
  } else {
    result = fifth + single.repeat(digit - 5)
  }
  if (digit === 4) {
    result = single + fifth
  }
  if (digit === 9) {
    result = single + next
  }
  return result;
}

function handleThousands(digit) {
  return 'M'.repeat(digit);
}

export default toRoman;
