# typescript
ts是js的超集

js是弱类型，且是动态编程语言，错误只有在运行时才被感知

ts提供了静态检测机制，让我们在编译时发现错误

### 安装
```
npm install -g typesctipt // 全局安装

npm install -D typescript // 项目安装

npm install -D @types/node

npm install -D ts-node
```

## 基础类型
- boolean
- string
- number
- symbol
- bigint
- null
- undefined
- any，表示任何类型
- void，表示没有任何类型
- never，永不存在的值的类型，异常、死循环
- unknown
- object

### 类型注意点
- 任何类型都可以被归为any类型；变量如果在声明的时候，未指定其类型，那么它会被识别为any类型
- never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使any也不可以赋值给never
- Object包含原始类型，object仅包含非原始类型
- unknown与any的最大区别是：任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。unknown, 任何类型的值都可以赋值给它，但它只能赋值给unknown和


### 数组
```ts
const arr: string[] = []:
const arr: Array<类型> = []
```

### 元祖Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```ts
const x:[string, numer] = ['lpr', 18]
const x:[string, numer?] = ['lpr']
```

## 枚举
默认从0开始自增
```ts
enum Color {Red, Green, Blue}
let c:Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
```


## 接口interface
- 对类的一部分行为进行抽象
- 描述对象的形状
- 与type的区别是接口只能为对象指定类型
- 使用typeof快速获取对象的形状 type objShape = typeof obj
  
```ts
interface Person  {
  readonly sex: string; // 只读属性
  name: string, // 必选属性
  sayHi(): void,
  [propName: string]: any;
  age?: 18, // 可选属性
}

// 接口继承
interface IAnimal {}

interface IDog entends IAnimal {}
```

### 绕开额外属性检查的方式
- 鸭式辨型法

```
interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

printLabel({ size: 10, label: "Size 10 Object" }); // Error

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj); // OK
```
### 类型断言

```
interface Person { 
  name: string; 
}

let p: Person = {
  name: "兔神",
  sex: box
} as Props; // OK
```

### 索引签名
```
interface Person { 
  name: string; 
  [key: string]: any; // 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
}

let p: Person = {
  name: "兔神",
  sex: box
}; // OK
```

### 函数
如果函数没有返回值，应该使用void类型
```js
function add(a:number, b:number):number {
  return a + b;
}

const myAdd = function(x: number, y: number): number { return x + y; };

const myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

// 默认值
function add(a:number=10,b:number):number {
  return a + b;
}

// 可选参数
function slice (a?:number, b?:number) {
  // 注意：可选参数只能在必须参数的后面
  console.log(111);
}
```

### 类型注解/类型声明
```ts
let str:string = 'mijiu';
```

### 类型推断
基于赋值表达式推断类型的能力称之为类型推断
```ts
let s:string = 'str';
let s = 'str'; // 等同于
```

### 类型断言
有时候开发会比TypeScript更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。TypeScript会假设你，程序员，已经进行了必须的检查。

注意：在TypeScript里使用JSX时，因尖括号语法会产生语法冲突，只有as语法断言是被允许的，

```ts
// 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

#### 确定赋值断言
允许在实例属性和变量声明后面放置一个!号，从而告诉 TypeScript 该属性会被明确地赋值
```ts
function initialize() {
  x = 10;
}
let x: number;
initialize();
// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error

// 如果按照以下声明就不会报错
let x!: number;
```


## 高级类型

### 交叉类型
使用&定义交叉类型，多个类型合并为一个类型，包含了所需的所有类型的特性

### 联合类型
联合类型表示一个值可以是几种类型之一，使用竖线|分隔每个类型

### typeof类型保护
```ts
function(a: number | string) {
  if (typeof a === "number") {}
  if (typeof a === "string") {}
}
```

### instanceof类型保护
instanceof类型保护是通过构造函数来细化类型的一种方式

### 可以为null的类型
默认情况下，类型检查器认为 null与 undefined可以赋值给任何类型。 null与 undefined是所有其它类型的一个有效值。可以在tsconfig.json指定"strictNullChecks": true使得null和undefined只能赋值给void

x!将从x值域中排除null和undefined
```ts
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)。
```

### 类型别名
- 类型别名仅仅是给类型取了一个新的名字，并不是创建了一个新的类型
- 常用于联合类型
```
type Message = string | string[]
```



### 泛型
使用泛型来创建可重用的组件
```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output = identity("myString");
```


### tsconfig.json
tsconfig.json是TypeScript项目的配置文件

- files:设置要编译的文件的名称
- include
- exclude
- compilerOptions:设置与编译流程相关的选项

```
{
  "compilerOptions": {
  
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```


