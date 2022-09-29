/**
 * Direction:
 * Find all fields that have different value & must can detect all field dynamically
 *
 * Expected Result:
 * ['firstName', 'lastName']
 *
 */
const data = [
  { firstName: "Adi", lastName: "Nugroho", age: 25 },
  { firstName: "Deddy", lastName: "Dores", age: 25 },
];

function result(data) {
  // your code here
  for (let i = 0; i < data.length; i++) {
    let keys = Object.keys(data[i]);
    const same = [];
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const unique = [...new Set(data.map((item) => key))];
      if (unique.length > 1) {
        same.push(key);
      }
      return unique;
    }
  }
}

console.log(result(data));
