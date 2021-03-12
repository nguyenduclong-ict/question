export const callOne = (func) => {
  let called = false;
  return (...args) => {
    if (!called) {
      called = true;
      return func.apply(null, args);
    }
  };
};
