(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VinoModuleA = factory());
})(this, (function () { 'use strict';

  const aFn = () => {
      const desc = 'moduleA fn';
      console.log(desc);
  };

  return aFn;

}));
//# sourceMappingURL=module-a.global.js.map
