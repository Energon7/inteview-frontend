export default function({ app }, inject) {
  inject('singularize', (word) => {
    const endings = {
      ves: 'fe',
      ies: 'y',
      i: 'us',
      zes: 'ze',
      ses: 's',
      es: 'e',
      s: ''
    };
    return word.replace(
      new RegExp(`(${Object.keys(endings).join('|')})$`),
      r => endings[r]
    );
  })

  inject('objectsEquality', (object1, object2) => {
    return JSON.stringify(object1) === JSON.stringify(object2);
  })
}
