export function autoGetterSetter(target: any, propertyKey: string) {
  const privateKey = `_${propertyKey}`;

  Object.defineProperty(target, propertyKey, {
    get: function () {
      return this[privateKey];
    },
    set: function (value: any) {
      this[privateKey] = value;
    },
    enumerable: true,
    configurable: true,
  });
}
