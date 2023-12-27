// src/index.js

class Validator {
  number() {
    return {
      isValid: (value) => typeof value === 'number' && Number.isNaN(value),
    };
  }

  array() {
    return {
      isValid: (value) => Array.isArray(value),
      allIntegers: () => ({
        isValid: (arr) => Array.isArray(arr) && arr.every((element) => typeof element === 'number' && Number.isNaN(element) && Number.isInteger(element)),
      }),
      custom: (callback) => ({
        isValid: (arr) => Array.isArray(arr) && arr.every(callback),
      }),
    };
  }

  object() {
    return {
      shape: (shape) => ({
        isValid: (obj) => {
          if (typeof obj !== 'object' || obj === null) {
            return false;
          }

          const keys = Object.keys(shape);
          return keys.every((key) => {
            const validator = shape[key];
            return validator && validator.isValid && validator.isValid(obj[key]);
          });
        },
      }),
    };
  }
}

export default Validator;
