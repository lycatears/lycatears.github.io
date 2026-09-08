---
layout: post
title: 现代C++学习笔记
date: 2026-09-04 12:34:49
categories: 学习
excerpt: 学习现代C++，为Infra打下基础
tags:
  - 编程
  - 学习
  - C++
---
## C 与 C++ 混合的代码
由于C++支持函数重载，编译时，C++的函数名会增加一串表示参数表的字符串，而C语言的函数不会这样。因此，两种语言混合的代码在连接时会产生“undefined references”之类的错误。

这时需要条件编译：
::: code-group
```cpp [foo.h]
// foo.h
#ifdef __cplusplus
extern "C" {
#endif

int func(int x, int y);

#ifdef __cplusplus
}
#endif
```

```cpp [foo.c]
#include "foo.h"

int func(int x, int y) {
    return x + y + x * y;
}
```

```cpp [main.cpp]
#include <iostream>
#include "foo.h"

int main(void) {
    printf("%d", func(826, 132));

    return 0;
}
```
:::

使用如下命令编译：
```bash
gcc -c foo.c
g++ -c main.cpp
gcc -o main main.o doo.o
```
g++ 编译 cpp 文件时会自动连接标准库，而 gcc 不会，需要使用参数 `-lstdc++ -shared-libgcc` 连接。g++ 会将所有后缀名的文件均视为 C++ 代码。

## nullptr
`nullptr` 关键字是 C++ 11 新加入的特性，用于初始化空指针。它的类型是 `nullptr_t` ，可以隐式转换为任意指针类型。

在 C 或者 C++ 98 中，初始化一个空指针变量往往需要使用宏 `NULL`。有的系统实现为 `(void*)0`，有的是 `0`，这样的空指针传递进重载函数时，可能会选中数字类型参数的重载，而不是指针类型的重载，或者产生二义性导致编译失败。因此，现在更推荐使用 `nullptr` 初始化空指针。

## constexpr
`constexpr` 是 C++ 11 引入的关键字，主要作用是声明变量的值或函数的返回值可以在常量表达式中使用。在编译期间，常量表达式可以直接被求值，
### constexpr 修饰的变量

### constexpr 修饰的函数

## 智能指针
