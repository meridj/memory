import App from '../classes/App';

const newInlineStyle = (elem, property, newStyle) => {
  elem.style[property] = newStyle;
};

const shuffleArray = array => {
  array.map((element, index, array) => {
    let newIndex = Math.floor(Math.random() * index);
    let tmp = array[index];
    array[index] = array[newIndex];
    array[newIndex] = tmp;
  });
};

const setObj = function(key, obj) {
  return localStorage.setItem(key, JSON.stringify(obj));
};

const getObj = function(key) {
  return JSON.parse(localStorage.getItem(key));
};

export { newInlineStyle, shuffleArray, setObj, getObj };
