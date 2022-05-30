(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VinoModuleA = {}));
})(this, (function (exports) { 'use strict';

  const aFn = () => {
      const desc = 'moduleA fn';
      return new Promise((resolve, reject) => {
          console.log(desc);
          resolve(`promise - ${desc}`);
      });
  };
  const aConst = '这里是moduleA';

  exports.aConst = aConst;
  exports["default"] = aFn;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=module-a.global.js.map
