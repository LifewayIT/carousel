
module.exports = {
  test(val) {
    return val instanceof HTMLElement && val.id === 'children';
  },

  print() {
    return '{children}';
  }
};
