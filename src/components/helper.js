export function pad(number, max){
  return number.toString().length < max ? "0" + number.toString(): number.toString();
}

export function getMonth(date){
  return pad(date.getMonth() + 1, 2);
}

export function toDateString(date, text){
  try {
    var mydate = new Date(date);
    return mydate.getFullYear() + text + getMonth(mydate) + text + pad(mydate.getDate(),2);
  
  }catch(err){
  }
}

export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
