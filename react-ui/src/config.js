
// export const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'
// export const API_URL = 'http://localhost:5000'
// export let API_URL = 'http://localhost:5000';
// if (process.env.FLASK_ENV !== 'development') {
//   let API_URL = 'https://mixmeld.herokuapp.com';
// };

// export let API_URL = process.env.FLASK_ENV === 'development' ? 'http://localhost:5000' : 'https://mixmeld.herokuapp.com';
export let API_URL = process.env.REACT_APP_BASE_URL

console.log(API_URL)
console.log('new-build')