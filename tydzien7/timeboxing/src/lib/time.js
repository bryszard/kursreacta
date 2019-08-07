const rjust = (val, placesCount) => {
  let str = String(val)
  if(str.length < placesCount) {
    str = `${'0'.repeat(placesCount - str.length)}${str}`
  }

  return str;
}

const extractTimeFromMilliseconds = (milliseconds) => {
  if (milliseconds >= (24 * 60 * 60 * 1000)) {
    throw new Error("Value passed in milliseconds is too big. Should be lower than 24 hours.");
  }

  return (
    {
      milliseconds: rjust(Math.floor(milliseconds % 1000), 3),
      seconds: rjust((Math.floor(milliseconds / 1000) % 60), 2),
      minutes: rjust((Math.floor(milliseconds / (60 * 1000)) % 60), 2),
      hours: rjust((Math.floor(milliseconds / (60 * 60 * 1000)) % 24), 2)
    }
  )
}

export {
  rjust,
  extractTimeFromMilliseconds
};
