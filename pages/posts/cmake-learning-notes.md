---
layout: post
title: CMake 学习记录
date: 2026-09-22 16:33:44
categories: 学习
excerpt: 莫非朕不知兵吗？
cover: https://www.helloimg.com/i/2026/09/23/6ab2bfb14944c.jpg
tags:
  - 编程
  - 学习
  - C++
  - 南京大学
  - 工具链
---
> 本笔记根据 CMake 官方教程记录。
## 命令列表
- `cmake_minimium_required` 指定项目所需最低的 CMake 版本，确保构建时遵循该版本的行为。顶层 `CMakeLists.txt` 必须在第一行包含这条命令。例如：`cmake_minimium_required(VERSION 3.23)` 要求最低使用3.23版本的 CMake。
- `project()` 规定项目名称，告诉 CMake 下面的内容是对一个软件项目的描述，CMake 会对环境进行检查，识别字节序等系统属性。例如 `project(HelloWorld)` 指定项目名称为 HelloWorld。
- `add_executable` 添加一个要生成的可执行文件（工件）。
- `add_library` 添加一个要生成的库（工件）。
- `target_source` 将源文件与输出工件（目标）相关联。
- `target_link_libraries` 将输出工件（目标）链接。

## 相关概念
- 静态库：是一组目标文件的集合，编译阶段会被链接到文件中。在 Linux 平台上的扩展名通常为 `.a`，在 Windows 平台上的扩展名通常为 `.lib`。使用静态库时，库函数代码会被复制到可执行文件中，生成的程序可以独立执行，不需要依赖外部的库文件。
- 动态库：是一组目标文件链接成的共享模块，也叫共享库。编译时不会复制到可执行文件中，只会记录依赖信息，运行时由操作系统负责加载。动态库允许多个程序共享同一份库文件，节省内存和磁盘空间。更新程序时可以只更新库文件，无需整个项目全部更新，但依赖文件较多。
## Step 0: Hello, World!
C++源代码如下：
```cpp:line-numbers[HelloWorld.cxx]
#include <cstdio>

int main()
{
  std::printf("Hello World\n");
}
```
CMake 配置如下：
```cmake:line-numbers[CMakeLists.txt]
cmake_minimum_required(VERSION 3.23)

project(Tutorial)

add_executable(hello)
target_sources(hello
  PRIVATE
    HelloWorld.cxx
)
```
切换到对应的目录，在终端输入命令 `cmake -B build` 将会生成一系列 Visual Studio 项目文件，与使用 VS 创建的项目基本上差不多。

如果想要指定自定义使用的工具链，可以指定参数：
```bash
cmake -B build-gcc -G Ninja -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++ -DCMAKE_BUILD_TYPE=Debug
cmake --build build-gcc
```
其中 `-G` 参数是指定生成器，`-B` 参数指定生成文件的目录。`-DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++` 指定 C 和 C++ 使用的编译器，并使用 Debug 构建配置。这条命令生成了项目文件（工程文件），但不进行编译，也不产生二进制可执行文件。

`cmake --build build-gcc` 命令的作用是调用当前生成器对应的原生构建工具，并对它做一层统一封装。这一步才会真正生成可执行文件。

## Step 1: Math Functions
先看源文件，这个教程进入了多文件工程：
:::code-group
```cpp:line-numbers[Tutorial/Tutorial.cxx]
// A simple program that computes the square root of a number
#include <cmath>
#include <iostream>
#include <string>

// TODO8: Include the MathFunctions header

int main(int argc, char* argv[])
{
  if (argc < 2) {
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
  }

  // convert input to double
  double const inputValue = std::stod(argv[1]);

  // TODO9: Use the mathfunctions::sqrt function
  // calculate square root
  double const outputValue = std::sqrt(inputValue);
  std::cout << "The square root of " << inputValue << " is " << outputValue
            << std::endl;
}
```

```cpp:line-numbers[MathFunctions/MathFunctions.h]
#pragma once

namespace mathfunctions {
double sqrt(double x);
}

```

```cpp:line-numbers[MathFunctions/MathFunctions.cxx]
#include <iostream>

namespace {
// a hack square root calculation using simple operations
double mysqrt(double x)
{
  if (x <= 0) {
    return 0;
  }

  double result = x;

  // do ten iterations
  for (int i = 0; i < 10; ++i) {
    if (result <= 0) {
      result = 0.1;
    }
    double delta = x - (result * result);
    result = result + 0.5 * delta / result;
    std::cout << "Computing sqrt of " << x << " to be " << result << std::endl;
  }
  return result;
}
}

namespace mathfunctions {
double sqrt(double x)
{
  return mysqrt(x);
}
}
```
:::

首先完成第一部分（TODO 1-4），使 `Tutorial` 能够使用标准库提供的平方根函数进行编译：
```cmake
# TODO1: Set the minimum required version of CMake to be 3.23
cmake_minimum_required(VERSION 3.23)
# TODO2: Create a project named Tutorial
project(Tutorial)
# TODO3: Add an executable target called Tutorial to the project
add_executable(Tutorial)
# TODO4: Add the Tutorial/Tutorial.cxx source file to the Tutorial target
target_sources(Tutorial
    PRIVATE
        Tutorial/Tutorial.cxx
)
```
该文件指定了一个可执行文件生成目标 `Tutorial`，并把 `Tutorial.cxx` 作为它的源文件。

库是另一种工件，我们在 TODO 5-6 中添加一个包含平方根计算函数的库：
```cmake
# TODO5: Add a library target called MathFunctions to the project
add_library(MathFunctions)
# TODO6: Add the source and header file located in Step1/MathFunctions to the
#        MathFunctions target, note that the intended way to include the
#        MathFunctions header is:
#          #include <MathFunctions.h>
target_sources(MathFunctions
    PRIVATE
        MathFunctions/MathFunctions.cxx
    PUBLIC
        FILE_SET myHeaders
        TYPE HEADERS
        BASE_DIRS
            MathFunctions
        FILES
            MathFunctions/MathFunctions.h
)
```
其中 `add_library` 和上面的 `add_executable` 类似，都是添加一个生成目标，只不过这里需要生成的是一个库文件。

下面这里为库文件添加源文件的配置比较复杂，我们逐行拆解：
- `PRIVATE` 属于 **作用域关键字**，决定下面列出的文件只属于 MathFunctions 这一个目标本身，不会作为使用要求传播给链接它的其他目标。这里的“使用要求”，除了源文件，还可能包含 C++ 标准版本、编译宏、构建规则等信息。
- 常用的作用域关键字有 `PUBLIC` `PRIVATE` `INTERFACE`。
  - `PUBLIC` 表示该目标本身和依赖该目标的其他目标都需要服从下面的使用要求。
  - `INTERFACE` 表示该目标自身不需要遵循这些使用要求，但是依赖它的其他目标需要。
- `MathFunctions/MathFunctions.cxx` 将源文件添加到这个目标中。
- `FILE_SET myHeaders` 表示下面定义了一个文件集合，其名称为 `myHeaders`。推荐使用小写字母开头的名称表示文件集合。
- `TYPE HEADERS` 表示这个文件集合是头文件集合，可以告诉 CMake 这些文件通常不会直接编译，且 `BASE_DIR` 目录可以作为头文件搜索路径，今后可以导出、安装这个头文件集合。
- `BASE_DIR` 指定这个目标的基准目录，确定头文件对使用者呈现的相对路径，为目标建立对应的头文件搜索路径。例如在上面的配置代码中，CMake 将头文件集 `myHeaders` 的根目录认为是 `Step1/MathFunctions`（也会在该目录下搜索头文件），因此编写代码时可以直接使用 `#include <MathFunctions.h>`。
- `FILES` 列出了该文件集中所包含的文件。多个文件可以分别列出，但是都需要在 `BASE_DIR` 目录内。

这时运行 `cmake --build build`，在 `Debug` 目录下就能发现除了 `Tutorial.exe` 外还生成了 `MathFunctionss.lib`，这是一个静态库。

接下来我们需要在项目中使用自己的库（TODO 7-9），使用 `target_link_libraries` 链接 `MathFunctions` 库：
```cmake
# TODO7: Add the MathFunctions library as a linked dependency
#        to the Tutorial target
target_link_libraries(Tutorial
    PRIVATE
        MathFunctions
)
```
然后修改 `Tutorial.cxx` 源代码文件，导入自定义头文件，并改用库中的平方根函数：
```cpp:line-numbers[Tutorial.cxx]
// A simple program that computes the square root of a number
#include <cmath>
#include <iostream>
#include <string>

// TODO8: Include the MathFunctions header
#include <MathFunctions.h> // [!code ++]
int main(int argc, char* argv[])
{
  if (argc < 2) {
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
  }

  // convert input to double
  double const inputValue = std::stod(argv[1]);

  // TODO9: Use the mathfunctions::sqrt function
  // calculate square root
  double const outputValue = std::sqrt(inputValue); // [!code --]
  double const outputValue = mathfunctions::sqrt(inputValue); // [!code ++]
  std::cout << "The square root of " << inputValue << " is " << outputValue
            << std::endl;
}
```
重新构建并运行，程序输出了计算过程，计算结果收敛于标准库得到的值。
```
Computing sqrt of 826 to be 413.5
Computing sqrt of 826 to be 207.749
Computing sqrt of 826 to be 105.862
Computing sqrt of 826 to be 56.8325
Computing sqrt of 826 to be 35.6832
Computing sqrt of 826 to be 29.4157
Computing sqrt of 826 to be 28.748
Computing sqrt of 826 to be 28.7402
Computing sqrt of 826 to be 28.7402
Computing sqrt of 826 to be 28.7402
The square root of 826 is 28.7402
```
在工程规模逐渐扩大时，我们可能需要将项目根目录下的 CML（CMakeLists.txt）拆分到各个目标的目录下。这时我们需要使用 `add_subdirectory` 命令整合项目子目录中的 CML。注意，当 CMake 处理子目录中的 `CMakeLists.txt` 时，子目录 CML 中描述的所有相对路径都是 **相对于该子目录** 的，而不是顶层 CML（项目根目录）。

拆分时只需要把与子目录下目标的相关命令放到子目录的 CML 中，另外需要注意 **相对路径** 是相对于子目录而言的。拆分后的 CML 如下：
::: code-group
```cmake[根目录]
cmake_minimum_required(VERSION 3.23)
project(Tutorial)
add_subdirectory(Tutorial)
add_subdirectory(MathFunctions)
```

```cmake[Tutorial]
# TODO10: Move all the Tutorial target commands to this CMakeLists.txt. Ensure
#          that all paths are updated to be relative to this new location.
add_executable(Tutorial)

target_sources(Tutorial
    PRIVATE
        Tutorial.cxx
)

target_link_libraries(Tutorial
    PRIVATE
        MathFunctions
)

```

```cmake[MathFunctions]
# TODO12: Move all the MathFunctions target commands to this CMakeLists.txt.
#         Ensure that all paths are updated to be relative to this new location.
add_library(MathFunctions)

target_sources(MathFunctions
    PRIVATE
        MathFunctions.cxx
    PUBLIC
        FILE_SET myHeaders
        TYPE HEADERS
        BASE_DIRS
            .
        FILES
            MathFunctions.h
)
```
:::

由于项目发生重构，我们需要在重新构建之前清理原始构建目录，可以使用 `--clean-first` 参数实现：
```bash
cmake --build build --clean-first
```
新构建的项目产物中，两个目标被放在了不同的目录中，例如可执行文件就存放在 `Step1/build/Tutorial/Debug/Tutorial.exe`。
## Step 2: CMake Language Basics

## Step 3: Variables

## Step 4: Target Commands
