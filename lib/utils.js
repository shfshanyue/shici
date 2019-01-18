// const object = { 'a': [{ 'b': { 'c': 3 } }] };
 
// console.log(get(object, 'a[0].b.c'))
// // => 3
 
// console.log(get(object, 'a.b.c', 'default'))
// // => 'default'
export function get (object, path, defaultValue = undefined) {
  const paths = path.replace(/\[(\w+)\]/g, '.$1').split('.')
  let result = object
  for (const p of paths) {
    if (result == null) {
      return defaultValue
    }
    result = result[p]
  }
  return result
}

export function startsWith (string, subString) {
  console.log(string, subString)
  return string.startsWith ? string.startsWith(subString) : string.indexOf(subString) === 0
}

export function map (array = [], f) {
  return array.map(f)
}
