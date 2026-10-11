---
layout: post
title: C++ 移动语义入门
date: 2026-10-10 15:43:08
categories: 编程
excerpt: 老母居于北方，而冀州早就归于了北方
cover: https://www.helloimg.com/i/2026/10/11/6aca69df6bbb5.jpg
tags:
  - 南京大学
  - C++
  - 学习
  - 编程
---
移动语义是 C++ 11 引入的特性。一个对象不再需要某种资源（如堆内存、套接字、文件等）时，可以把持有的资源交给其他对象，而不是复制一份再交给其他对象，省下重复分配和复制的工作。右值引用和移动语义就能够表达这种意图。
## 表达式的值类别
首先要区别 **类型** 和 **值类别** 两个概念。例如我们声明一个变量 `int x = 1;`，显然 `x` 的数据类型是 `int`。从表达式的角度来看 `x`，类型告诉我们这个表达式“是什么”（是数字？字符串对象？指针？），值类别告诉我们这个表达式如何标识一个对象，以及该对象的资源是否可以被复用。值类别是表达式的属性，而不是对象的属性。

现代 C++ 有三种值类别：lvalue（左值），xvalue（将亡值），prvalue（纯右值）。其中 lvalue 和 xvalue 合称为 glvalue（广义左值），xvalue 和 prvalue 合称 rvalue（右值）。“左值”和“右值”这两个术语属于历史遗留问题，不代表它们一定能/不能放到赋值号的左边。“将亡值”不保证对象马上被销毁，只是意味着资源可以被转移。常见的表达式值类型如下：

| 表达式                                 | 值类别            | 理解方式                     |
| -------------------------------------- | ----------------- | ---------------------------- |
| `s`，其中 `s` 是已命名的 `std::string` | lvalue（左值）    | 标识一个对象                 |
| `std::move(s)`                         | xvalue（将亡值）  | 标识原对象，但允许资源被移走 |
| `std::string{"hi"}`                    | prvalue（纯右值） | 用于计算值、初始化结果对象   |
| `42`                                   | prvalue           | 一个值                       |
| `rr`，其中声明为 `std::string&& rr`    | lvalue            | 名字表达式仍标识一个对象，即使是右值引用，它也是左值     |

> - 一个 glvalue（“广义”左值）是一个表达式，其求值确定了一个对象或函数的身份；
>
> - 一个 prvalue（“纯”右值）是一个表达式，其求值
>   - 计算内置运算符操作数的值（这种 prvalue 没有结果对象），或者
>   - 初始化一个对象（这种 prvalue 被认为有一个结果对象）。
>
>     结果对象可以是一个变量，一个由 new-expression 创建的对象，一个由 临时实质化 创建的临时对象，或者它们的成员。请注意，非 void 被丢弃的 表达式具有结果对象（实质化的临时对象）。此外，每个类和数组 prvalue 都有一个结果对象，除非它是 decltype 的操作数；
> - 一个 xvalue（“将过期”的值）是一个 glvalue，它表示一个其资源可以被重用的对象；
> - 一个 lvalue 是一个不是 xvalue 的 glvalue；

更详细的定义可在 [cppreference](https://cppreference.cn/w/cpp/language/value_category) 找到。

## 引用参数
实践中的函数有三种常见的引用参数：
```cpp
void read(const std::string&); // 只读借用；可绑定左值，也可绑定右值
void edit(std::string&);       // 可修改的左值引用；不绑定临时字符串
void take(std::string&&);      // 右值引用；可绑定临时对象或 std::move(s)
```
以 `T&&` 类型作为形参，可以区分实参对象是否允许被移走它持有的资源。但是将一个右值引用绑定到拥有资源的对象并不会移走它的资源，也不会创建另一个拥有资源的对象，例如：

```cpp
std::string s = "hello";
std::string&& rr = std::move(s); // rr 是 s 的别名，s 的内容还没变
std::string a = rr;             // rr 表达式是左值：拷贝
std::string b = std::move(rr);  // 选择适用的右值构造重载
```
右值引用是一个左值，在函数体内需要注意：
```cpp
void take(std::string&& parameter) {
    std::string a = parameter;            // 拷贝
    std::string b = std::move(parameter); // 移动
}
```
又如，该程序最后输出为 1，因为虽然 `main` 函数中传入了右值，但是在函数体内 `other` 是具名的右值引用，因此 `other` 作为表达式是一个左值。在 `A::foo` 函数中，自然就会匹配到 `val(A&)` ，也就是左值引用版本。想要保持表达式是右值，需要用到完美转发。
```cpp
class A {
public:
	void foo(A&& other) {
		val(other);
	}

	void val(A&) {
		std::cout << "1" << std::endl;
	}
	void val(A&&) {
		std::cout << "2" << std::endl;
	}
};

int main() {
	A a, b;
	a.foo(std::move(b));
}
```
“拷贝”是比“移动”更保守的做法，因为具名的参数可能会被多次使用，如果资源被拿走了，后面却又用到了源对象，很可能出现运行时的错误。确实需要“移动”时，需要用 `std::move()` 明确表示。

在普通引用形参的绑定和重载决议中，编译器选择重载函数不关心传入的实参 **变量** 被声明为左值还是右值引用，关心的是 **表达式** 的类型和值类别。
## 移动构造与移动赋值
假设某人准备搬家，一般的做法是把他的家具全部从旧房子搬到新房子去，而不是把所有家具重新买一份放到新房子，然后扔掉那些旧家具。在对象持有资源时，如果要转移它持有的资源，用拷贝构造函数会造成不必要的性能损失。C++ 11 引入了右值引用和移动语义解决这个问题。

如果某个对象拥有一块大小为 N 的堆内存，对它进行**拷贝**，则需要再新对象内重新分配内存，并复制其中的元素，复杂度为 $O(N)$；如果进行的是**移动**，可以让新对象直接接管堆内存的指针，原来的对象进入可以被安全销毁的状态，复杂度为 $O(1)$。
```text
拷贝前：a ──→ [1, 2, 3]
拷贝后：a ──→ [1, 2, 3]     b ──→ [1, 2, 3]（另一块内存）
------------------------------------------------------
移动前：a ──→ [1, 2, 3]
移动后：a ──→ nullptr       b ──→ [1, 2, 3]（原来那块内存）
```
下面展示了一个拥有移动构造、移动赋值函数的类：
```cpp:line-numbers
// Invariant: size_ == 0 iff data_ == nullptr.
// This class explicitly promises an empty source after moving to another object.
class Buffer {
public:
    Buffer() noexcept = default;
    // 无参构造标记为不抛出异常，使用编译器提供的默认构造函数

    explicit Buffer(std::size_t size)
        : size_(size), data_(size ? std::make_unique<int[]>(size) : nullptr) {}
    // explicit 表示该构造函数不能用于隐式类型转换
    // 初始化列表首先初始化 size_，若size不为0，则申请长度为size的堆内存数组，否则为空指针

    ~Buffer() = default;
    // 析构函数使用默认析构函数

    Buffer(const Buffer& other) : Buffer(other.size_) {
        if (size_ != 0) {
            std::copy_n(other.data_.get(), size_, data_.get());
        }
    }
    // 拷贝构造函数，使用左值引用形参

    Buffer& operator=(const Buffer& other) {
        if (this != &other) {
            Buffer copy(other); // Allocation can throw; *this is still unchanged.
            swap(copy);
        }
        return *this;
    }
    // 拷贝赋值函数，使用左值引用形参，且返回对自身的引用

    Buffer(Buffer&& other) noexcept
        : size_(std::exchange(other.size_, 0)), data_(std::move(other.data_)) {}
    // 移动构造函数，使用右值引用形参，标记为不抛出异常

    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            data_ = std::move(other.data_); // Releases our previous allocation.
            size_ = std::exchange(other.size_, 0);
        }
        return *this;
    }
    // 移动赋值函数，使用右值引用形参，标记为不抛出异常

    void swap(Buffer& other) noexcept {
        using std::swap;
        swap(size_, other.size_);
        swap(data_, other.data_);
    }

    // [[nodiscard]] 表示返回值不可忽略，否则会报出警告
    [[nodiscard]] std::size_t size() const noexcept { return size_; }
    [[nodiscard]] bool empty() const noexcept { return size_ == 0; }
    [[nodiscard]] const int* data() const noexcept { return data_.get(); }

    int& at(std::size_t index) {
        if (index >= size_) {
            throw std::out_of_range("Buffer::at");
        }
        return data_[index];
    }

    const int& at(std::size_t index) const {
        if (index >= size_) {
            throw std::out_of_range("Buffer::at");
        }
        return data_[index];
    }

private:
    std::size_t size_ = 0;
    std::unique_ptr<int[]> data_;
};

inline void swap(Buffer& left, Buffer& right) noexcept { left.swap(right); }
```

被移动后的对象可以继续使用，但不应依赖它原有的内容，也不能假设该对象为空（称为“值未指定”）。移动语义不保证源对象被移动后置空，除非类本身提供了更强的保证。
### 特殊成员函数
- 析构函数：`~Object()`
  - 调用每个成员和基类的析构函数
  - 负责在对象生命周期结束后释放其持有的资源
- 拷贝构造函数：`Object(const Object& other)`
  - 调用每个成员和基类的拷贝构造函数
  - 通过另一个同类对象初始化当前对象
  - 规定了对象如何被拷贝（例如浅拷贝、深拷贝）
  - 默认为浅拷贝
- 拷贝赋值函数：`Object& operator=(Object& other)`
  - 调用每个成员和基类的拷贝赋值函数
  - 需要检查自赋值的情况，即检查赋值者与被赋值者是否是同一个对象
  - 默认为浅拷贝
  - 一般先检查自赋值，调用拷贝构造创建临时对象，然后从临时对象赋值
- 移动构造函数：`Object(Object&& other)`
  - 调用每个成员和基类的移动构造函数
  - 通过移动而非拷贝来初始化一个对象，通常涉及资源的转移，使得原对象变为无效状态
- 移动赋值函数：`Object& operator=(Object&& other)`
  - 调用每个成员和基类的移动赋值函数
  - 通过移动的方式进行赋值，转移其他对象持有的资源，使原对象变为无效状态
### 三五零法则
三五零法则 是一种最佳实践的规范（尤其是配合 RAII），不符合也不是语法错误。
- 三法则：如果一个类需要显式定义【析构函数、拷贝构造函数、拷贝赋值函数】其中一项时，那么它应当显式定义这全部的三项。
  - 注：在代码中定义函数体、`=delete`、`=default` 都是“用户定义的特殊函数”。
- 五法则：是三法则的扩展。如果一个类需要显式定义【析构函数、拷贝构造函数、拷贝赋值函数、移动构造函数、移动赋值函数】其中一项时，那么建议显式定义这全部的五项。
  - 不实现移动语义也不是错误的，但是复制操作效率相对更低。
  - 用户定义的析构函数、拷贝构造函数、拷贝复制函数会阻止编译器生成默认的移动构造、移动赋值函数，所以如果我们需要移动语义，必须定义以上全部五个特殊成员函数。
  - 如果定义了移动赋值/移动构造函数，相应的**默认**拷贝构造/拷贝赋值函数会被标记为删除状态。
- 零法则：如果没有显式定义任何特殊成员函数，则编译器会隐式定义所有特殊成员函数。
  - 如果一个类需要自己管理动态资源，则需要遵循五法则；如果不需要，则遵循零法则。
  - 建议使用智能指针等工具自动管理资源，避免重复释放、内存泄漏等问题。
> 具有自定义析构函数、复制/移动构造函数或复制/移动赋值运算符的类应专门处理所有权（这遵循单一职责原则）。其他类不应具有自定义析构函数、复制/移动构造函数或复制/移动赋值运算符。

使用 `=default` 只是请求编译器生成默认函数，而不保证能生成成功。例如：
```cpp
struct B {
	B() = default;
	B(B&& b) = delete;
	B& operator=(B&& b) = delete;
};


struct A {
	B b;
	A() = default;
	A(A&& a) = default;
	A& operator=(A&& a) = default;
};


int main(void) {
	A a1, a2;
	// A a3(std::move(a1));
    // error: use of deleted function 'A::A(A&&)'
    // note: 'A::A(A&&)' is implicitly deleted because the default definition would be ill-formed:
    // error: use of deleted function 'B::B(B&&)'
}
```
移动构造需要初始化 `B` 类成员对象 `b`，但它的移动构造函数被删除了，因此编译器无法生成需要的移动构造函数（不能绕过成员定义的限制），将其标记为已删除。但如果我们为 `A` `B` 添加了拷贝构造函数，则可以退化到拷贝完成初始化。

另外，如果这个移动构造函数是标记为默认函数后被删除，该函数会被重载决议忽略，如果有可用的拷贝构造函数，可退化到拷贝。如果是用户定义的 `=delete`，该函数仍然会被重载决议考虑，选中该函数会导致编译错误（即使有可用的拷贝构造也不会使用）。


标准库模板 `std::is_move_constructible_v<T>` 可用于检查是否能用 `T&&` 构造 `T`，而不是判断是否有一个可用的移动构造函数。这意味着，如果我们只定义了拷贝构造函数（编译器这时不会生成默认的移动构造函数），虽然传入右值引用时的行为是拷贝，但这个模板仍然得到 `true`。

以下代码可以验证部分 `Buffer` 类的特殊成员函数的行为：
```cpp
void check(bool condition, const char* message) {
    if (!condition) {
        throw std::runtime_error(std::string("Check failed: ") + message);
    }
}

int main() {
    using tutorial::Buffer;
    static_assert(std::is_nothrow_move_constructible_v<Buffer>);
    // 确定有不抛出异常的移动构造函数
    static_assert(std::is_nothrow_move_assignable_v<Buffer>);
    // 确定有不抛出异常的移动赋值函数

    Buffer original(3);
    original.at(0) = 42;
    Buffer copied = original;
    check(copied.data() != original.data(), "copy owns a separate allocation");
    // 验证拷贝构造函数，因为初始化 copied 的是左值
    copied.at(0) = 7;
    check(original.at(0) == 42, "copy is independent");
    // 验证拷贝构造函数

    const int* allocation = original.data();
    Buffer moved = std::move(original);
    check(moved.data() == allocation && moved.at(0) == 42, "move transfers allocation");
    check(original.empty() && original.data() == nullptr, "our source becomes empty");
    // 验证移动构造函数是否真正转移了原对象的资源

    Buffer target(10);
    target = std::move(moved);
    check(target.data() == allocation && moved.empty(), "move assignment transfers allocation");
    target = std::move(target);
    check(target.data() == allocation && target.at(0) == 42, "our self-move is a no-op");
    // 验证移动赋值函数是否能转移原对象资源，以及对于自赋值情况的特殊处理（什么都不做）

    original = target; // 拷贝赋值
    original.at(0) = 99;
    check(target.at(0) == 42, "copy assignment is deep");
    // 验证深拷贝
    original = original;
    check(original.at(0) == 99, "self-copy preserves value");
    // 自拷贝的情况，仍保持原来的值

    Buffer empty;
    Buffer empty_copy(empty);
    target = std::move(empty);
    check(target.empty() && empty_copy.empty(), "empty buffers are supported");
    // 空容器
    bool rejected = false;
    try { target.at(0); } catch (const std::out_of_range&) { rejected = true; }
    check(rejected, "at() checks bounds even after a move");
    // 验证这次实现的 Buffer 是保证移动后清空原对象的
    std::cout << "copy: independent allocation\nmove: same allocation, empty source\n";
    std::cout << "assignment, self-move, empty and bounds checks passed\n";
}

```
## std::move
`std::move()` 是 `<utility>` 下定义的函数，作用是产生一个可被绑定到右值引用的表达式。这个函数并不像字面意义那样“移动”了什么东西，也不会产生汇编指令：
```cpp
 /**
   *  @brief  Convert a value to an rvalue.
   *  @param  __t  A thing of arbitrary type.
   *  @return The parameter cast to an rvalue-reference to allow moving it.
  */
  template<typename _Tp>
    constexpr typename std::remove_reference<_Tp>::type&&
    move(_Tp&& __t) noexcept
    { return static_cast<typename std::remove_reference<_Tp>::type&&>(__t); }
```
可以看到 `std::move` 只是把参数做了类型转换——转换为允许移动的右值，不涉及对传入实参的任何修改。`std::move` 也不会移除实参的 `const` 属性，例如：
```cpp
int main(void) {
	const string s1 = "hello";
	string s2 = std::move(s1);
	cout << (void*)s1.c_str() << endl; // 0x64feac
	cout << (void*)s2.c_str() << endl; // 0x64fe94
	return 0;
}
```
虽然 `std::move` 确实返回了 `s1` 的右值引用，但它带着`const`，这就意味着 `std::string&` 形参不能绑定这个右值引用。这样就只能让拷贝构造的 `const std::string&` 绑定它，最终退化到了拷贝构造。

移动意味着需要修改对象持有的资源的所有权状态，因此通常来说移动接口接受的都是非 `const` 的右值引用。如果一个类型只有移动构造/赋值，且禁止对应的拷贝构造/赋值（例如 `unique_ptr` ），从一个带 `const` 限定的对象移动资源通常会导致编译错误。

## 关于 noexcept

标准库常用 `std::move_if_noexcept` 保证移动语义的异常安全，其实它和 `std::move` 很像，只不过会根据传入类的特殊函数的情况确定返回哪种引用，从而影响后续模块使用移动还是拷贝。
```cpp
  /**
   *  @brief  Conditionally convert a value to an rvalue.
   *  @param  __x  A thing of arbitrary type.
   *  @return The parameter, possibly cast to an rvalue-reference.
   *
   *  Same as std::move unless the type's move constructor could throw and the
   *  type is copyable, in which case an lvalue-reference is returned instead.
   */
  template<typename _Tp>
    constexpr typename
    conditional<__move_if_noexcept_cond<_Tp>::value, const _Tp&, _Tp&&>::type
    move_if_noexcept(_Tp& __x) noexcept
    { return std::move(__x); }
```
从注释和代码中可以知道，在常见标准库实现中：

| 元素类型条件               | 扩容时常见的搬迁选择             |
| -------------------------- | -------------------------------- |
| 移动构造保证不抛异常       | 移动                             |
| 移动可能抛异常，且能拷贝   | 拷贝                             |
| 移动可能抛异常，且不能拷贝 | 仍需移动；若抛异常，某些保证受限 |

C++ 不强制移动构造函数和移动赋值函数必须是 `noexcept` 的，但如果确定这些函数不会抛出异常，最好加上，这会影响编译器的重载决议。在移动元素的过程中，执行移动的行为可能是比较容易的，但如果中途突然抛出异常，那就很难恢复原来的状态了。如果通过拷贝搬迁，旧元素仍保留原值；新内存里的构造失败后，可清理已经创建的新元素，保留旧容器。这有助于满足相应操作的强异常保证。
- 假如有 `vector<Buffer> vb;`，当动态数组 `vb` 需要扩容时，标准库为防止在移动过程中破坏原有元素，需要强异常保证：重新分配内存并搬移旧元素时，必须保证即使抛出异常，原来的 `vector` 必须保持不变。如果移动构造函数可能抛出异常，编译器将会选择使用拷贝构造函数（通常使用 `std::move_if_noexcept` 等实现）：
  - 如果移动构造函数是 `noexcept` 的，则使用高效的移动；
  - 如果移动构造函数不是 `noexcept` 的且允许拷贝，则退化为低效但安全的拷贝构造；
  - 如果移动构造函数不是 `noexcept`，但又不允许拷贝，则只能用移动，可能影响异常安全。
- 其他标准库函数（例如 `vector::erase` 等）也会用类似的规则判断是否使用移动。
- 移动构造通常只是转移指针、句柄、文件描述符等资源，不分配内存；移动赋值通常释放当前资源再接管新资源，而释放/析构本身不应抛。因此它们通常可以做到不抛异常。

`noexcept` 是对调用者的承诺，并不是从语法层面上保证这个函数一定就不会抛出异常。如果标记了 `noexcept` 的函数抛出了异常，将会直接调用 `std::terminate` 终止进程。

如果类含有较为复杂的成员，可以根据实际情况标记 `noexcept`，或者不写特殊成员函数，让编译器推导。例如：
```cpp
struct A {
	A() = default;
	A(A&& a) {};
};

struct B {
	B() = default;
	B(B&& b) noexcept {};
};

class C {
	A a;
	B b;
};

int main(void) {
    cout << std::is_nothrow_move_constructible_v<C>; // 0
}
```
`C` 的两个成员中有一个不支持 `noexcept` 的移动构造函数，因此编译器推导 `C` 的默认移动构造函数也不是 `noexcept` 的。

> 拷贝被删除、移动不是 noexcept 的类型能否放入 `vector`？
>
> 通常可以，这时仍然可以调用移动语义，但是不再提供异常安全保证。
