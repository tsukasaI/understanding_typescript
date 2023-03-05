const Logger = (message: string) => {
  console.log("Logger Factory called");
  return (constructor: Function) => {
    console.log(message);
    console.log(constructor);
  };
};

const WithTemplate = (template: string, hookId: string) => {
  console.log("WithTemplate Factory called");
  return (_: Function) => {
    console.log("With Template");

    const hookElem = document.getElementById(hookId);
    if (hookElem) {
      hookElem.innerHTML = template;
    }
  };
};

@Logger("Person create")
@WithTemplate("<h1>person Class hofge</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Person Obj creating");
  }
}

const pers = new Person();

console.log(pers);

// ----

const LogProduct = (target: any, propNmae: string | Symbol) => {
  console.log("prop decorator");
  console.log(target, propNmae);
};

const LogAccessor = (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  console.log("accessor Decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const LogFunction = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log("Functon Logger");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const LogParam = (target: any, name: string | Symbol, posirion: number) => {
  console.log("log Param");
  console.log(target);
  console.log(name);
  console.log(posirion);
};

class Product {
  @LogProduct
  title: string;
  private _price: number;

  @LogAccessor
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("価格が不正です 0 以下は設定できません");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @LogFunction
  getIncludingTax(@LogParam tax: number) {
    return this._price * (1 + tax);
  }
}
