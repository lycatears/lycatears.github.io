---
layout: post
title: C++ 模板入门
date: '2026-10-16 23:16:59'
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

假设有定义：
```cpp
// 用于在 decltype 中“携带”推导出的 T
template <typename T> struct TypeIdentity { using type = T; };

// 四种形参形式
template <typename T> TypeIdentity<T> f_value(T);          // 值传递
template <typename T> TypeIdentity<T> f_lref(T&);          // 左值引用
template <typename T> TypeIdentity<T> f_cref(const T&);    // const 左值引用
template <typename T> TypeIdentity<T> f_forward(T&&);      // 万能引用

// 用于验证引用折叠的别名模板
template <typename T> using LRef = T&;
template <typename T> using RRef = T&&;
```
使用 `static_assert` 检查模板形参 `T` 的类型：
```cpp
int x = 27;
const int cx = x;
volatile int vx = x;
const volatile int cvx = x;
const int& rx = cx;

int* p = &x;            // 指向 int
const int* pc = &x;     // 底层 const
int* const cp = &x;     // 顶层 const

// ============================================================
// 情形一：值传递 T
//   规则：剥离引用、剥离顶层 CV；底层 CV 保留；数组/函数退化
// ============================================================

static_assert(std::is_same_v<decltype(f_value(x)),   TypeIdentity<int>>);
static_assert(std::is_same_v<decltype(f_value(cx)),  TypeIdentity<int>>);   // 顶层 const 丢弃
static_assert(std::is_same_v<decltype(f_value(vx)),  TypeIdentity<int>>);   // volatile 丢弃
static_assert(std::is_same_v<decltype(f_value(cvx)), TypeIdentity<int>>);   // const+volatile 都丢弃
static_assert(std::is_same_v<decltype(f_value(rx)),  TypeIdentity<int>>);   // 引用性 + const 都丢弃
static_assert(std::is_same_v<decltype(f_value(p)),   TypeIdentity<int*>>);
static_assert(std::is_same_v<decltype(f_value(pc)),  TypeIdentity<const int*>>); // 底层 const 保留
static_assert(std::is_same_v<decltype(f_value(cp)),  TypeIdentity<int*>>);       // 顶层 const 丢弃
```
编译通过，证明了上述规则的正确性。但需要注意，在值传递情形下，数组实参会退化为指向其首元素的指针，函数实参会退化为函数指针。

对于左值引用（`T&`）的形参，`T` 本身不会被推导为带有引用的类型。编译器会 **保留** CV限定符，**去掉** 形参类型中的引用（不管是左值引用还是右值引用），例如：
```cpp
template<typename T> void f(T& param);

int x = 27;
const int cx = x;
const int& rx = cx;

f(x);  // T -> int, ParamType -> int&
f(cx); // T -> const int, ParamType -> const int&
f(rx); // T -> const int, ParamType -> const int&
```
`const T&` 与 `T&` 的情形类似，不过编译器不保留 `T` 的顶层 `const`，因为形参已经带有 `const` 了。通过 `static_assert` 断言检查下面的代码，能够通过编译，这证明了上面推导 `T` 的规则：
```cpp
	// ============================================================
	// 情形二：T&
	//   规则：去掉 T 的引用；CV 全部保留
	// ============================================================
	static_assert(std::is_same_v<decltype(f_lref(x)),  TypeIdentity<int>>);
	static_assert(std::is_same_v<decltype(f_lref(cx)), TypeIdentity<const int>>);
	static_assert(std::is_same_v<decltype(f_lref(vx)), TypeIdentity<volatile int>>);
	static_assert(std::is_same_v<decltype(f_lref(rx)), TypeIdentity<const int>>); // rx 本身是 const int&
	static_assert(std::is_same_v<decltype(f_lref(cp)), TypeIdentity<int* const>>);
  static_assert(std::is_same_v<decltype(f_lref(someFunc)), TypeIdentity<void(int, double)>>);

	// ============================================================
	// 情形二特例：const T&
	//   规则：const 由 ParamType 承担，T 中不再含顶层 const
	// ============================================================
	static_assert(std::is_same_v<decltype(f_cref(x)),  TypeIdentity<int>>);
	static_assert(std::is_same_v<decltype(f_cref(cx)), TypeIdentity<int>>);       // T 不含 const
	static_assert(std::is_same_v<decltype(f_cref(rx)), TypeIdentity<int>>);
	static_assert(std::is_same_v<decltype(f_cref(42)), TypeIdentity<int>>);       // 可绑定右值
	static_assert(std::is_same_v<decltype(f_cref(cp)), TypeIdentity<int*>>);
```
在引用传递的情形下，数组 **不会** 退化为指针，`T` 被推导为数组类型本身（例如`int[10]`），函数形参的类型就是 `int (&)[10]`；对于函数来说，`T` 的类型就是传入的函数类型，函数形参的类型是函数引用。
### 转发引用
当 `T` 是该函数模板正在推导的、没有 cv 限定的类型参数时，`T&&` 有一条特殊规则：传入左值时，`T` 被推导为左值引用。这样的形参叫**转发引用**。

> 转发引用可以是：1）声明为该函数模板的cv非限定类型模板参数的右值引用的函数模板的函数参数；2） `auto&&`，除非从花括号初始化列表推导，或者在类模板参数推导期间表示类模板的模板参数时(自 C++17 起)

其他的规则都比较好理解，但是这个”正在推导“是什么？**正在推导** 需要在编译器发现函数被调用时动态判断。编译器在看到 `f(expr)` 这个调用时，`T` 是否还没有被确定？这需要根据传入的实参 `expr` 来反推它的类型。如果是，`T` 就“正在推导”，`T&&` 才是转发引用；如果不是，`T&&` 就只是一个普通的右值引用。例如，这是一个典型的转发引用：
```cpp
template<typename T>
void f(T&& param); // 调用 f(expr) 时，T 未知，需要从 expr 推导 → 转发引用
```
需要注意，一个变量直接出现在 `decltype(r)` 的括号内是判断该变量的类型，而如果再加上一层括号变成 `decltype((r))` 就是判断表达式类型了，会变成左值引用。

下面有几种典型的“退化”成普通右值引用的例子：
```cpp
f<int>(x); // 调用点已经明确 T = int，T&& 就是 int&&，纯右值引用

// 类模板的成员函数：
template<typename U>
struct Container {
    void push(U&& x); // 这里的 T 是类模板参数，Container 类实例化后 U 已经被确定
};

template<typename V>
void g(const V&& param); // 不能带 CV 限定
```
不过成员函数的形参也不一定就不是转发引用，可以在类内部再定义模板：
```cpp
template<class T>
struct Queue {
    void push(T&& value);  // 使用类模板的 T，不是转发引用

    template<class U>
    void submit(U&& value); // U 在调用 submit 时独立推导，是转发引用
};
```
除了函数模板、类模板，`auto&&` 也有类似的推导规则，但使用初始化列表的除外：
```cpp
int x = 6;
auto&& r1 = 7;
auto&& r2 = x;
static_assert(std::is_same_v<decltype(r1), int&&>);
static_assert(std::is_same_v<decltype(r2), int&>);
```
引用折叠和完美转发已在 [C++ 移动语义入门](./movement-semantics.md) 复习过，不再赘述。

## 模板特化
在一些低精度的量化模型中，经常会用到 FP8、INT4 这样数据范围较窄的类型。多个低精度数据相加时，可能会出现溢出问题。例如，3个 `int8_t` 的8位整数相加：`100+100+100`，在补码机器上，8位整数的最大值是 255，而这个算式的结果是300，显然会产生溢出错误。假如我们希望为较高精度的数据应用默认的累加规则，而对低精度数据用更高精度的数据类型“中转”，比如用32位整数作为8位整数的累加结果。这就需要我们在模板中，为低精度数据指定特殊规则。
### 主模板
提供特殊规则的是模板特化，相对的，提供默认规则的就是主模板。例如，上面的累加例子中，默认类型就是传入的数据类型本身，因此可以这样定义主模板：
```cpp
template<class T>
struct Accumulator { using type = T; };
```
比如 `Accumulator<float>::type` 就是 `float` 本身，这是我们定义的主模板的规则。这里的 `using type = T;` 只是一个类型别名，它不会分配内存也不会创建对象。
### 全特化
假如我们指定 `int8_t` 的累加中间变量类型是 `int32_t`，可以这样编写代码：
```cpp
template<>
struct Accumulator<std::int8_t> { using type = std::int32_t; };
```
由于这里所有的模板参数都被指定了，不再保留待推导的类型参数，因此模板定义的尖括号中没有模板形参，也就是 `template<>`。这个模板特化专门规定了一组完整的模板参数组合 `Accumulator<std::int8_t>`，这就是全特化。那么我们如何使用这套特殊规则进行求和呢？
```cpp
template<class T>
typename Accumulator<T>::type sum(const T* data, std::size_t count) {
    typename Accumulator<T>::type result{};
    for (std::size_t i = 0; i < count; ++i) result += data[i];
    return result;
}
```
上面的代码中，`typename Accumulator<T>::type` 就是提取出中间累加变量的类型，`typename` 告诉编译器后面的依赖名称表示一个类型。在本例中：
- 遇到 `float` `int` 等宽类型：使用默认规则，返回值和中间变量都是形参的类型。
- 遇到特化的 `int8_t`：使用特殊规则，返回值和中间变量都是 `int32_t`。

如果先在低精度变量中完成所有计算，最后再转入宽类型，很显然这可能会导致溢出/精度损失。
### 偏特化
偏特化指定的是一种“形状”，比如：
```cpp
template<class T>
struct StorageInfo { static constexpr bool borrowed = false; };

template<class T>
struct StorageInfo<T*> { static constexpr bool borrowed = true; };
```
第二个定义匹配“指向任意 T 的指针”，但仍保留了未定参数 `T`，这就是**偏特化**。`StorageInfo<float*>` 和 `StorageInfo<int*>` 都匹配它。这里的 `static constexpr bool` 是属于类型的编译期常量，可直接写 `StorageInfo<float*>::borrowed`。这也是后面类型萃取的原理。

偏特化也可以是类似于全微分和偏微分那样，只是指定部分模板参数：
```cpp
template<class U, class V>
struct StorageInfo {/* ... */};

template <class V>
struct StorageInfo<int, V> {/* ... */};

template <class U>
struct StorageInfo<U, U> {/* ... */}; // 这也是偏特化，只不过是要求两个模板参数相同
```
更进一步来说，其实编译器并不要求特化模板的参数列表有几个参数，也不关心这些形参究竟叫什么名字。编译器关心的是这些参数能不能从实参模式里推导出来，以及整体是不是比主模板更特化。比如下面的代码中，后两个模板也是偏特化：
```cpp
template<typename T>
struct ContainerTraits {
    static constexpr const char* name = "unknown";
};

template<typename T, typename Alloc>
struct ContainerTraits<std::vector<T, Alloc>> {
    static constexpr const char* name = "vector";
};

template<typename T, typename Alloc>
struct ContainerTraits<std::list<T, Alloc>> {
    static constexpr const char* name = "list";
};
```
尖括号 `X<...>` 里的实参个数必须和主模板一致，`template<...>` 里有多少个参数则不受限制。
```cpp
template<typename T> struct X {};

template<typename T>                       struct X<T*> {};               // 1 个
template<typename K, typename V, typename C, typename A>
                                           struct X<std::map<K,V,C,A>> {}; // 4 个
template<typename R, typename... Args>     struct X<R(*)(Args...)> {};   // 参数包
template<typename T, std::size_t N>        struct X<T[N]> {};            // 非类型参数
```
相反，如果参数不能被推导出来，就是编译错误：
```cpp
template<typename T, typename U>
struct X<std::vector<T>> {};   // U 没出现在模式里，无法推导

template<typename V>
struct Y<typename std::remove_pointer<V>::type> {};  // V 处于 ::type 左边，不可推导
```
偏特化的参数列表中不能有默认实参：
```cpp
template<typename T, typename A = std::allocator<T>> // 错误
struct X<std::vector<T, A>> {};
```
### 特化与重载
上面的模板特化都是针对类模板的，函数模板也可以特化。但是**函数模板只支持全特化，不支持偏特化**，如果需要定义特殊规则，需要使用重载。例如：
```cpp
template<class T> void inspect(T value);
template<class T> void inspect(T* value); // 重载，不是偏特化
```
特化的函数模板和重载函数的区别，主要是它们发生在不同的决策阶段。假如我们有重载函数用于打印变量：
```cpp
void print(int value) {
    std::cout << "int: " << value << '\n';
}

void print(double value) {
    std::cout << "double: " << value << '\n';
}

void print(const std::string& value) {
    std::cout << "string: " << value << '\n';
}
```
显然，编译器会通过重载决议，为不同的实参类型选择合适的函数。函数模板特化也能实现这样的规则，比如：
```cpp
template<typename T>
void print(const T& value) {
    std::cout << "generic: " << value << '\n';
}

// 针对 std::string 的显式特化
template<>
void print<std::string>(const std::string& value) {
    std::cout << "string: " << value << '\n';
}
```
在这个特化案例中，主模板输出 `generic`，但对 `std::string` 的特化模板输出 `string`。重载是为不同的数据类型定义一组独立的函数，分别实现；而特化的思想是，先定义一个通用规则，再针对某些特殊类型专门定义一个特殊规则。模板特化并不是简单地增加一个同名函数，而是为已有模板的特定模板参数提供专门实现。但考虑下面的代码：
```cpp
template<typename T>
void foo(T) {
    std::cout << "primary template\n";
}

// 函数模板显式特化
template<>
void foo<int>(int) {
    std::cout << "specialization\n";
}

// 普通函数重载
void foo(int) {
    std::cout << "non-template overload\n";
}

int main() {
    foo(10);
}
```
似乎三个函数定义都能匹配上实参 `10`。最终的输出是 `non-template overload`，编译器选择了 **非模板函数**。根据 C++ 的重载决议规则，在其他条件相同的情况下，非模板函数优先于函数模板特化。重载决议大致是这样进行的：
1. 确定候选函数：当编译器遇到 `foo(10)` 时，编译器会考虑 `template<class T> void foo(T)` 和 `void foo(int)` 两个候选项。注意全特化的函数模板 `template<> void foo<int>(int)` 没有被单独列出来，因为它仍然属于主模板，不会被单独列入候选函数。
2. 执行重载决议：编译器从函数模板推导得到特化的函数 `void foo<int>(int)` 和普通函数 `void foo(int)`，二者都能精确匹配实参。但在其他条件相同的情况下，非模板函数的优先级更高，因此编译器最后选择了后者。
3. 只有编译器选定了某个模板实例的情况下，编译器才会考虑是否有可用的特化。如果想强制使用特化函数，要显式指定 `foo<int>(10)`。函数重载决定选择哪个函数或函数模板；函数模板显式特化决定被选中的**主模板**针对某组模板参数使用哪个实现。
### 函数模板重载
函数模板不支持偏特化，但如果想要给指针等类型指定特殊规则怎么办？这时候就要使用函数模板重载。看下面的例子，由于C++不允许函数模板的偏特化，这样的代码编译会出现错误：
```cpp
template<typename T>
void foo(T value) {
    std::cout << "generic\n";
}

template<typename T>
void foo<T*>(T* value) {  // 编译错误
    std::cout << "pointer\n";
}
```
但我们可以这样为指针类型指定特殊规则：
```cpp
template<typename T>
void foo(T value) {
    std::cout << "generic\n";
}

template<typename T>
void foo(T* value) {
    std::cout << "pointer\n";
}
```
这两个函数模板是独立的。为什么说上例中的函数是试图进行偏特化，而本例中的两个函数是独立的两个模板呢？上例中，第二个 `foo` 函数后面带有实参列表 `<T*>`——它试图通过模板实参列表指定特化对象。但是，C++不允许函数模板的重载，因此它不能被编译。而在本例的 `template<typename T> void foo(T* value)` 中，它没有模板实参列表，定义了一个新的模板，形成了函数模板重载。
### 例题：选择累加策略
为 `std::uint8_t` 添加全特化，使累加类型为 `std::uint32_t`。保留主模板和已有算法，不要直接把所有类型都改成无符号整数。应输出 `uint8 sum: 400`，类型断言也必须通过。
```cpp
#include <cassert>
#include <cstdint>
#include <iostream>
#include <type_traits>

template<class T> struct Accumulator { using type = T; };

template<> // [!code ++]
struct Accumulator<std::uint8_t> {  // [!code ++]
    using type = std::uint32_t;  // [!code ++]
};  // [!code ++]

template <class T>
auto sum(const T *data, std::size_t size) -> typename Accumulator<T>::type
{
    typename Accumulator<T>::type result{};
    for (std::size_t i = 0; i < size; ++i) result += data[i];
    return result;
}

int main() {
    const std::uint8_t values[]{200, 200};
    static_assert(std::is_same_v<Accumulator<std::uint8_t>::type, std::uint32_t>);
    assert(sum(values, 2) == 400);
    std::cout << "uint8 sum: " << sum(values, 2) << '\n';
}
```
### PyTorch源码分析：累加类型提取
在 PyTorch 的代码 `torch/headeronly/core/AccumulateType.h` 中，有这样一系列为不同的数据类型指定累加类型的宏：
```cpp:line-numbers=96
TORCH_HEADERONLY_MPS_ACC_TYPE(BFloat16, float)
TORCH_HEADERONLY_MPS_ACC_TYPE(Half, float)
TORCH_HEADERONLY_MPS_ACC_TYPE(Float8_e5m2, float)
TORCH_HEADERONLY_MPS_ACC_TYPE(Float8_e4m3fn, float)
TORCH_HEADERONLY_MPS_ACC_TYPE(Float8_e5m2fnuz, float)
TORCH_HEADERONLY_MPS_ACC_TYPE(Float8_e4m3fnuz, float)
// ...
```
`TORCH_HEADERONLY_MPS_ACC_TYPE` 还有把 `MPS` 替换为 `XPU` `CUDA` `CPU` 等变体，替换的逻辑基本上一致。追踪这个宏的定义：
```cpp:line-numbers=87
#define TORCH_HEADERONLY_MPS_ACC_TYPE(t, acc_t) \
  TORCH_HEADERONLY_ACC_TYPE(t, acc_t, c10::DeviceType::MPS)
#define TORCH_HEADERONLY_XPU_ACC_TYPE(t, acc_t) \
  TORCH_HEADERONLY_ACC_TYPE(t, acc_t, c10::DeviceType::XPU)
#define TORCH_HEADERONLY_CUDA_ACC_TYPE(t, acc_t) \
  TORCH_HEADERONLY_ACC_TYPE(t, acc_t, c10::DeviceType::CUDA)
#define TORCH_HEADERONLY_CPU_ACC_TYPE(t, acc_t) \
  TORCH_HEADERONLY_ACC_TYPE(t, acc_t, c10::DeviceType::CPU)
// ...
```
从字面意义来看，宏 `TORCH_HEADERONLY_ACC_TYPE` 的第一个参数代表输入的数据类型，第二个参数代表中间累加变量的类型，第三个参数代表计算使用的设备。继续追踪这个宏的定义：
```cpp:line-numbers=82
#define TORCH_HEADERONLY_ACC_TYPE(t, acc_t, device_type) \
  template <>                                            \
  struct AccumulateTypeDevice<t, device_type> {          \
    using type = acc_t;                                  \
  };
```
这里出现了一个全特化模板 `struct AccumulateTypeDevice<t, device_type>`，它的主模板是 `template <typename T, c10::DeviceType D> struct AccumulateTypeDevice {};`，位于第 60 行，空定义。显然我们上面的猜想是正确的，通过 `typename AccumulateTypeDevice<Half, c10::DeviceType::CUDA>::type` 这样的代码就可以知道：在设备 `CUDA` 上，半精度浮点数的累加类型是 `float`。另外这个头文件中还定义了一个类似的模板：
```cpp:line-numbers=63
template <typename T, bool>
struct AccumulateType {};

template <typename T>
struct AccumulateType<T, false> {
  using type = typename AccumulateTypeDevice<T, c10::DeviceType::CPU>::type;
};

template <typename T>
struct AccumulateType<T, true> {
  using type = typename AccumulateTypeDevice<T, c10::DeviceType::CUDA>::type;
};
```
这个模板通过非类型参数把推导累加变量类型转发给了 `AccumulateTypeDevice`。最终两个模板得到的是：
```cpp:line-numbers=76
template <typename T, c10::DeviceType device>
using acc_type_device = typename AccumulateTypeDevice<T, device>::type;

template <typename T, bool is_cuda>
using acc_type = typename AccumulateType<T, is_cuda>::type;
```
这两个类型别名可以直接使用。官方文档指出：
> `acc_type<T, is_cuda>` and `acc_type_device<T, DeviceType>` give the dtype a
reduction over `T` should accumulate into, using the same tables as `at::acc_type`:
>
> ```cpp
> #include <torch/headeronly/core/AccumulateType.h>
>
> using acc_t = torch::headeronly::acc_type<torch::headeronly::Half, /*is_cuda*/true>;
> ```

## 可变参数模板

## 折叠表达式

## if constexpr

## 类型萃取
