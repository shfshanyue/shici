// const object = { 'a': [{ 'b': { 'c': 3 } }] };
 
// console.log(get(object, 'a[0].b.c'))
// // => 3
 
// console.log(get(object, 'a.b.c', 'default'))
// // => 'default'

// console.log(get({a: null}, 'a.b.c', 'default'))
// // => 'default'
//
// get({a: null}, 'a.b.c', 3)
// => 3
export function get (source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result = source
  for (const p of paths) {
    result = Object(result)[p]
    if (result === undefined) {
      return defaultValue
    }
  }
  return result
}

export function omit (target, paths) {
  return Object.keys(target).filter(key => paths.indexOf(key) === -1).reduce((acc, x) => {
    acc[x] = target[x]
    return acc
  }, {})
}

export function isNil (x) {
  return x === null || x === undefined
}

export function map (array, f) {
  if (isNil(array)) {
    array = []
  }
  return array.map(f)
}

export function flatten (array) {
  if (isNil(array)) {
    array = []
  }
  return array.reduce((acc, x) => acc.concat(x), [])
}

export function slice (array, ...rest) {
  if (isNil(array)) {
    array = []
  }
  return array.slice(...rest)
}

// TODO: use Component
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

export function keyBy (collection, key) {
  return collection.reduce((acc, item) => {
    acc[item[key]] = item
    return acc
  }, {})
}

export function groupBy (collection, key) {
  return collection.reduce((acc, item) => {
    acc[item[key]] = [...acc[item[key]] || [], item]
    return acc
  }, {})
}

export function isObject (value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

// { a: [{ b: 2 }] } { a: [{ c: 2 }]} -> { a: [{b:2}, {c:2}]}
// merge({o: {a: 3}}, {o: {b:4}}) => {o: {a:3, b:4}}
export function merge (source, other) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other
  }
  return Object.keys({
    ...source,
    ...other
  }).reduce((acc, key) => {
    acc[key] = merge(source[key], other[key])
    return acc
  }, Array.isArray(source) ? [] : {})
}

export function uniq (collection, key) {
  return Object.values(keyBy(collection, key))
}

export function compose (...fns) {
  return fns.reduce((fn0, fn) => (...v) => fn0(fn(...v)), x => x)
}