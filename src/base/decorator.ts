function approves<T extends { new (...args: any[]): {} }>(constructor: T): T {
  return class extends constructor {
    approved = true;
  };
}

@approves
class MyClass {
  constructor() {}
}


const obj = new MyClass();


console.log((obj as any).approved); // true