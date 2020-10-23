const getSCClasses = el => Array.from(el.classList)
  .filter(cls => cls.startsWith('sc-') || /(^|\s)[a-zA-Z]{5,6}(\s|$)/.test(cls));

module.exports = {
  test(val) {
    return val instanceof HTMLElement && getSCClasses(val).length !== 0;
  },

  serialize(el, config, indentation, depth, refs, printer) {
    const scClasses = getSCClasses(el);

    scClasses.forEach(cls => el.classList.remove(cls));

    return printer(el, config, indentation, depth, refs);
  }
};
