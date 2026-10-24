---
layout: post
title: C++ 模板入门
date: 2026-10-16 23:16:59
categories: 编程
excerpt: 诸葛亮是何等人物？只要钱粮在手，他马上就会变出十万精兵来！
cover: https://www.helloimg.com/i/2026/10/12/6accd854aef3f.jpg
tags:
  - 南京大学
  - C++
  - 学习
  - 编程
---
## 函数模板与类模板
### 函数模板
假设一个推理服务需要计算【浮点激活值求和】和【消耗 token 值求和】两类数据。激活函数输出的是浮点数，而消耗 token 的数量通常是整数，如果分别为两个任务编写求和函数，会导致出现冗余、重复的代码，影响后续维护效率。在这个场景下，两个任务非常相似：都需要遍历数组、累加、返回结果，它们的执行步骤是基本相同的，只有数据类型不同。

C++ 模板允许把数据类型的不同写成一个参数，这就构成了函数模板。回顾函数的定义，函数的参数需要接收实参，这个实参是一个“值”；模板的形参也需要接收相应的模板实参，不过这里的实参是一个类型。例如：
```cpp
template<class T>
T add(T a, T b) {
    return a + b;
}
```
- `template<class T>` 声明了一个名为 `T` 的类型参数。其中的 `class` 也可以换成关键字 `typename`。
- `add` 是模板函数，它的返回值类型和两个形参的类型都是 `T`。
- 函数体要求类型 `T` 支持运算符 `+`，且结果可作为 `T` 类型返回。
- `T` 不是一定需要一个类作为实参（这里和 Java 泛型不同），也可以是 `int` 这样的基本类型。

可以按照下面这几种方式使用模板函数 `add`：
```cpp
add<int>(2, 3);       // 明确指定 T = int
add<float>(1, 2);     // 先确定 T = float，实参可转换成 float
add(2, 3);            // 编译器从参数推导出 T = int
```
注意模板函数不是一个“运行时自动变化类型的函数”，只是编译器在需要时根据具体参数实例化为具体的版本（也就是把参数类型推迟到使用时才决定）。**模板参数必须在编译时确定。**
### 类模板
函数模板把算法中的类型留待确定，类模板可以把成员、接口中的类型留待确定。例如，下面的缓冲区类是一个类模板：
```cpp
template<class T>
class Buffer {
public:
    explicit Buffer(std::size_t n, T value) : data_(n, value) {}
    const std::vector<T>& values() const { return data_; }
private:
    std::vector<T> data_;
};
```
- `template<class T>` 和上面的模板函数一样，都是模板参数声明。
- 模板实参不同的实例化类，不能视为同一个类，也不能相互赋值。比如 `Buffer<float>` 的数据成员是 `vector<float>`，`Buffer<int>` 的数据成员是 `vector<int>`，二者不是同一个类。

假设上面任务中的两类数据都存储在我们自定义的 `Buffer` 类中，我们可以用模板完成相应的任务：
```cpp
template<class T>
T sum(const Buffer<T>& buffer) {
    T result{};
    for (const T& value : buffer.values()) result += value;
    return result;
}
```
如果我们想要计算的是激活参数求和的任务，假设参数存储在 `Buffer<float> activations`，调用 `sum(activation)` 时，编译器可从 `Buffer<T>` 和 `Buffer<float>` 的对应关系中推导得到 `T = float`。同样，如果计算的是消耗 token 的数量，传入 `Buffer<int> tokens` ，也能推导出 `T = int`。这样，两项任务都可以用这个模板函数完成。

模板的 **定义** 通常放在头文件中，因为调用处进行隐式实例化需要模板的定义。如果仅仅是在头文件中声明模板，在 `.cpp` 文件中提供定义，可能会导致链接失败。不过，如果模板只支持有限类型，也可以在 `cpp` 文件中显式实例化已知类型。

### 例题：向量点积
补全 `dot`，让两个等长的 `std::vector<T>` 做逐元素相乘再求和。要求支持示例中的 `int`、`float`，空输入返回 `T{}`；长度相等作为本练习的前提，用 `assert` 表达。不要为了通过测试删掉断言。
```cpp
#include <cassert>
#include <iostream>
#include <vector>

template<typename T> // [!code ++]
T dot(const std::vector<T>& a, const std::vector<T>& b) { // [!code ++]
    T res{}; // [!code ++]
    size_t len = a.size(); // [!code ++]
    for (size_t i = 0; i < len; i++) { // [!code ++]
        res += a.at(i) * b.at(i); // [!code ++]
    } // [!code ++]
 // [!code ++]
    return res; // [!code ++]
} // [!code ++]

int main() {
    assert(dot(std::vector<int>{}, std::vector<int>{}) == 0);
    assert(dot(std::vector<int>{1, 2}, std::vector<int>{3, 4}) == 11);
    std::cout << "dot: " << dot(std::vector<float>{1, 2}, std::vector<float>{3, 4}) << '\n';
}
```
## 实参推导
之前在学习移动语义时，遇到了【完美转发】，里面的 `T&&` 转发引用有着特殊的推导规则。对于模板定义 `template<class T> void fun(T&& x)`，我们需要回答三个问题：
- 传入的表达式是什么类型？
- `T` 推导成什么？
- 替换后的形参最终是什么类型？
### 值传递与引用传递
```cpp
template<class T> void by_value(T value);
template<class T> void by_ref(T& value);
template<class T> void by_const_ref(const T& value);
```
除了转发引用，这三种参数形式是比较常见的。C++模板的类型推导规则，可以围绕一个核心问题进行拆解：当调用 `f(expr)` 时，编译器如何根据形参类型 `ParamType` 来推断模板参数 `T` 和最终的形参类型？

对于值传递来说，也就是 **函数形参** 是 **模板形参** 本身时，编译器将对实参的类型进行简化。
- 忽略引用性：如果实参是引用类型，这个引用会被忽略，比如 `int&` 变成 `int`。
- 忽略 **顶层CV限定**：这条规则一般是针对指针来说的，比如 `const int* const` 中，前一个 `const` 代表不能通过指针修改指向的对象，这是 **底层CV**，后一个 `const` 代表指针指向哪个对象不能被修改，这是 **顶层CV**。值传递在函数作用域中会创建一个新的副本，实参的 CV 限定不应该继承到函数里面去。
- 保留 **底层CV**：指针的底层 CV 会被保留，比如 `const int*` 的 `const` 不会被移除。
