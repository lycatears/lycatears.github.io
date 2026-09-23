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
- 变量：CMake 中，变量的基本类型只有字符串和列表，而列表又是以分号为间隔符的字符串。可以使用 `set` 命令创建变量，也就是为字符串命名。例如 `set(var "Hello")` 就是创建 `var` 变量，并赋值为 `Hello`。
  - 变量的值可以用 `${}` 展开访问，例如：
```cmake
set(var "World!")
message("Hello ${var}")
```
使用 `cmake -P` 告诉 CMake 这个文件不构建软件项目，不包含 `project` 命令，而是作为命令解释器。
```bash
cmake -P demo.cmake
# Hello World!
```
- 条件判断：CMake 与其他程序设计语言不同，条件判断是基于一系列约定的。
  - `True` `YES` `Y` `ON` 或者非零数字（例如 `114514` `123.456` `1e-15`）视为真值。注意，上述真值不区分大小写。
  - `False` `NO` `N` `OFF` `NOTFOUND` `IGNORE` `0` 或者空字符串、以 `NOTFOUND` 结尾的字符串视为假值。上述假值也不区分大小写。
- 列表的遍历：列表是以分号作为分隔符的字符串，例如 `Apple;Orange;Banana` 就是一个列表。遍历列表可以使用 `foreach` 命令，例如：
```cmake
set(stooges "Moe;Larry")
list(APPEND stooges "Curly")

message("Stooges contains: ${stooges}")

foreach(stooge IN LISTS stooges)
  message("Hello, ${stooge}")
endforeach()
```
运行结果为：
```
Stooges contains: Moe;Larry;Curly
Hello, Moe
Hello, Larry
Hello, Curly
```
- 宏和函数：需要反复调用一系列命令时可以封装在宏或函数中调用。例如：
```cmake
macro(MyMacro MacroArgument)
  message("${MacroArgument}\n\t\tFrom Macro")
endmacro()

function(MyFunc FuncArgument)
  MyMacro("${FuncArgument}\n\tFrom Function")
endfunction()

MyFunc("From TopLevel")
```
运行结果为：
```
From TopLevel
        From Function
                From Macro
```
函数和宏的区别在于作用域不同。宏中修改、定义的变量会影响到外部作用域，而函数在默认情况下不会，例如：
```cmake
macro(MyMacro)
  set(var "114514")
  message("In Macro var = ${var}")
endmacro()

function(MyFunc)
  set(var "1919810")
  message("In Function var = ${var}")
endfunction()

set(var "0")
message("Original var = ${var}")
MyFunc()
message("After Calling Function var = ${var}")
MyMacro()
message("After Calling Macro var = ${var}")
```
输出结果为：
```
Original var = 0
In Function var = 1919810
After Calling Function var = 0
In Macro var = 114514
After Calling Macro var = 114514
```
可见，函数没有修改外部作用域中的变量（会创建新的作用域），而宏会修改（不创建作用域），产生副作用。如果希望函数中修改的变量是上层作用域中的变量，需要加入 `PARENT_SCOPE` 选项：
```cmake
function(MyFunc)
  set(var "1919810" PARENT_SCOPE)
  message("In Function var = ${var}")
endfunction()

set(var 0)
message("Original var = ${var}")
MyFunc()
message("After Calling Function var = ${var}")
```
输出如下：
```
Original var = 0
In Function var = 0
After Calling Function var = 1919810
```
注意到在函数作用域中 `var=0`，但在全局变量中 `var=1919810` 确实被赋值成功了。官方文档中的 `set` 命令指出：
> 如果给定了 PARENT_SCOPE 选项，变量将在当前作用域的上一级作用域中设置。每个新目录或 function() 命令都会创建一个新作用域。作用域也可以通过 block() 命令创建。set(PARENT_SCOPE) 会将变量值设置到父目录、调用函数或外层作用域中（视具体情况而定）。变量在当前作用域中的之前状态保持不变（例如，如果之前未定义，则仍然未定义；如果之前有值，则该值保持不变）。

但是函数作用域中的这个0是哪里来的呢？定位到 CMake 源代码的 `Sources/cmSetCommand.cxx`，找到 `bool cmSetCommand(std::vector<std::string> const& args, cmExecutionStatus& status)` 函数。前面两个判断都是针对 `ENV` 和 `CACHE` 的，暂时跳过，直接看最一般的命令行为：
```cpp:line-numbers=170
// here are the remaining options
//  SET (VAR value )
//  SET (VAR value PARENT_SCOPE)
//  SET (VAR CACHE TYPE "doc String" [FORCE])
//  SET (VAR value CACHE TYPE "doc string" [FORCE])
std::string value;  // optional
bool cache = false; // optional
bool force = false; // optional
bool parentScope = false;
```
显然我们需要知道 `SET (VAR value PARENT_SCOPE)` 的具体行为。
```cpp:line-numbers=184
// look for PARENT_SCOPE argument
  if (args.size() > 1 && args.back() == "PARENT_SCOPE") {
    parentScope = true;
    ignoreLastArgs++;
  }
```
可以看出这段代码设置了 `parentScope` 标志位。查找这个标志位的其他引用，定位到：
```cpp:line-numbers=207
if (parentScope) {
    status.GetMakefile().RaiseScope(variable, value.c_str());
    return true;
  }
```
继续查看函数 `bool cmStateSnapshot::RaiseScope(std::string const& var, char const* varDef)` 的定义，发现注释中明确指出，创建新的作用域时，会先将当前作用域中的变量本地化一份：
```cpp:line-numbers=455[Source/cmStateSnapshot.cxx]
  // First localize the definition in the current scope.
  cmDefinitions::Raise(var, this->Position->Vars, this->Position->Root);
```
最终定位到：
```cpp:line-numbers=13[Source/cmDefinitions.cxx]
cmDefinitions::Def const& cmDefinitions::GetInternal(std::string const& key,
                                                     StackIter begin,
                                                     StackIter end, bool raise)
{
  assert(begin != end);
  {
    auto it = begin->Map.find(cm::String::borrow(key));
    if (it != begin->Map.end()) {
      return it->second;
    }
  }
  StackIter it = begin;
  ++it;
  if (it == end) {
    return cmDefinitions::NoDef;
  }
  Def const& def = cmDefinitions::GetInternal(key, it, end, raise);
  if (!raise) {
    return def;
  }
  return begin->Map.emplace(key, def).first->second;
}
```
可以发现，底层做的就是遍历作用域栈，递归地查找给定的变量名。只要在某一层作用域找到了这个变量名，就会返回对应的值，最终把这个值赋值给当前作用域中的这个变量。所以，CMake 函数在创建自己的作用域时，就已经把上级作用域中的值保存到当前作用域中了；而 `set(var "1919810" PARENT_SCOPE)` 只对父级作用域生效了，当前作用域中的 `var` 仍然为 `0`。

---
宏和函数都支持 `ARGV` 和 `ARGN` 两个预设变量。`ARGV` 是所有参数的列表，`ARGN` 是剩余参数（即除了预期参数之后的其他参数）的列表。例如：
```cmake
function(MyFunc var)
  message("ARGV = ${ARGV}")
  message("ARGN = ${ARGN}")
endfunction()

set(var 0)
MyFunc(${var} 114 514)
```
输出为：
```
ARGV = 0;114;514
ARGN = 114;514
```
## Step 3: Variables

## Step 4: Target Commands
