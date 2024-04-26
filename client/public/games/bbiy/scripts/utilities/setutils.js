export function cartesianProduct(setA, setB) {
  const product = new Set();
  
  setA.forEach(a => {
      setB.forEach(b => {
          product.add([a, b]);
      });
  });

  return product;
}

export function filterSet(set, condition) {
  const filtered = new Set()
  set.forEach(element => {
      if (condition(element)) {
          filtered.add(element)
      }
  })
  return filtered
}

export function mergeSets(original, other) {
  other.forEach(element => {
      original.add(element)
  })
  return original
}
