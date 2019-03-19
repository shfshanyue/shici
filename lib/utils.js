// const object = { 'a': [{ 'b': { 'c': 3 } }] };
 
// console.log(get(object, 'a[0].b.c'))
// // => 3
 
// console.log(get(object, 'a.b.c', 'default'))
// // => 'default'
export function get (object, path, defaultValue = undefined) {
  const paths = path.replace(/\[(\w+)\]/g, '.$1').split('.')
  let result = Object(object)
  if (result === undefined) {
    return defaultValue
  }
  for (const p of paths) {
    result = result[p]
    if (result === undefined) {
      return defaultValue
    }
  }
  return result
}

export function startsWith (string, subString) {
  return string.startsWith ? string.startsWith(subString) : string.indexOf(subString) === 0
}

export function map (array = [], f) {
  return array.map(f)
}

export function highlight (string = '', words) {
  if (!Array.isArray(words)) {
    words = [words] 
  }
  if (!words.length || words.every(word => string.indexOf(word) === -1)) {
    return string
  }
  const reg = new RegExp(words.join('|'), 'g')
  const content = string.replace(reg, '<span class="highlight">$&</span>')
  return <span dangerouslySetInnerHTML={{ __html: content }}></span>
}

