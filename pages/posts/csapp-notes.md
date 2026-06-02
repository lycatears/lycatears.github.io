---
layout: post
title: CSAPP学习笔记
date: 2026-06-01 12:54:02
categories: 学习
hide: true
codeHeightLimit: 500
tags:
  - 编程
  - 学习
---
# CSAPP学习笔记

## 基础工具
### gcc
gcc全称GNU Compiler Collections，GNU编译套件。gcc处理代码源文件时，分为四步：
- 预处理，生成.i文件。可以使用`cpp`程序进行预处理，也可使用`gcc -E`参数输出预处理结果。预处理结果默认输出到标准输出，因此我们需要指定一个输出文件。下面以一个简单的计算程序为例进行预处理。
  :::code-group
  ```c:line-numbers[main.c]
  #include <stdio.h>
  #include "func.h"

  int main(void) {
      int a, b;
      scanf("%d %d", &a, &b);
      printf("%d", cal(a, b));
      return 0;
  }
  ```

  ```c:line-numbers[func.h]
  int cal(int x, int y);
  ```

  ```c:line-numbers[func.c]
  #include "func.h"

  int cal(int x, int y) {
      return x + y;
  }
  ```
  :::
  程序很简单，就是引用了自编的函数进行加法运算。下面用命令对两个C语言源程序文件进行预处理：
  ```bash
  gcc -E func.c -o build/func.i
  gcc -E main.c -o build/main.i
  ```
  `build`目录下出现了两个.i文件。两个文件都是文本文件，可直接用文本编辑器打开。
  ```c
  # 0 "main.c"
  # 0 "<built-in>"
  # 0 "<command-line>"
  # 1 "/usr/include/stdc-predef.h" 1 3 4
  # 0 "<command-line>" 2
  # 1 "main.c"
  # 1 "/usr/include/stdio.h" 1 3 4
  # 27 "/usr/include/stdio.h" 3 4
  # 1 "/usr/include/x86_64-linux-gnu/bits/libc-header-start.h" 1 3 4
  # 33 "/usr/include/x86_64-linux-gnu/bits/libc-header-start.h" 3 4
  // 以下省略，main.i共749行...
  ```
  这么一大坨基本都是将头文件的内容加入到源文件中，或者进行宏替换。如果指定了`-D`参数，也可进行宏替换，例如`gcc -E main.c -o build/main.i -DLSW=826`将会把源文件中的`LSW`替换为826。除此之外，`-U`可以取消宏定义。
- 编译是将预处理后的源文件编译为汇编语言程序的过程，在gcc中可以使用参数`-S`，让gcc进行到编译就终止。
  :::code-group
  ```bash:line-numbers[命令]
  cd build
  ls
  # func.i main.i
  gcc -S main.i func.i
  ```

  ```asm:line-numbers[func.s]
    .file	"func.c"
    .text
    .globl	cal
    .type	cal, @function
  cal:
  .LFB0:
    .cfi_startproc
    endbr64
    pushq	%rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq	%rsp, %rbp
    .cfi_def_cfa_register 6
    movl	%edi, -4(%rbp)
    movl	%esi, -8(%rbp)
    movl	-4(%rbp), %edx
    movl	-8(%rbp), %eax
    addl	%edx, %eax
    popq	%rbp
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
  .LFE0:
    .size	cal, .-cal
    .ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04.3) 11.4.0"
    .section	.note.GNU-stack,"",@progbits
    .section	.note.gnu.property,"a"
    .align 8
    .long	1f - 0f
    .long	4f - 1f
    .long	5
  0:
    .string	"GNU"
  1:
    .align 8
    .long	0xc0000002
    .long	3f - 2f
  2:
    .long	0x3
  3:
    .align 8
  4:

  ```

  ```asm:line-numbers[main.s]
    .file	"main.c"
    .text
    .section	.rodata
  .LC0:
    .string	"%d %d"
  .LC1:
    .string	"%d"
    .text
    .globl	main
    .type	main, @function
  main:
  .LFB0:
    .cfi_startproc
    endbr64
    pushq	%rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq	%rsp, %rbp
    .cfi_def_cfa_register 6
    subq	$16, %rsp
    movq	%fs:40, %rax
    movq	%rax, -8(%rbp)
    xorl	%eax, %eax
    leaq	-12(%rbp), %rdx
    leaq	-16(%rbp), %rax
    movq	%rax, %rsi
    leaq	.LC0(%rip), %rax
    movq	%rax, %rdi
    movl	$0, %eax
    call	__isoc99_scanf@PLT
    movl	-12(%rbp), %edx
    movl	-16(%rbp), %eax
    movl	%edx, %esi
    movl	%eax, %edi
    call	cal@PLT
    movl	%eax, %esi
    leaq	.LC1(%rip), %rax
    movq	%rax, %rdi
    movl	$0, %eax
    call	printf@PLT
    movl	$0, %eax
    movq	-8(%rbp), %rdx
    subq	%fs:40, %rdx
    je	.L3
    call	__stack_chk_fail@PLT
  .L3:
    leave
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
  .LFE0:
    .size	main, .-main
    .ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04.3) 11.4.0"
    .section	.note.GNU-stack,"",@progbits
    .section	.note.gnu.property,"a"
    .align 8
    .long	1f - 0f
    .long	4f - 1f
    .long	5
  0:
    .string	"GNU"
  1:
    .align 8
    .long	0xc0000002
    .long	3f - 2f
  2:
    .long	0x3
  3:
    .align 8
  4:

  ```
  :::
- 接下来进入汇编阶段。汇编器将汇编语言代码翻译为机器语言，生成.o文件。
  ```bash:line-numbers
  gcc -c func.s main.s
  ```
- 最后，我们将生成的对象文件链接成可执行文件。
  ```bash:line-numbers
  gcc -o main func.o main.o
  ./main
  # 输入：826 132
  # 输出：958
  ```
- 直接执行`gcc main.c`，得到的是可执行文件`a.out`。`-o`参数后面可以指定一个输出文件名。
- `-Wall` 启用所有警告，`-Werror` 将警告视为错误
- `-C`将源文件编译为对象文件，`-save-temps`保留所有中间文件
- `-l`后接共享库的文件名（不含扩展名so）可以链接共享库，`-fPIC`产生位置无关代码，适用于共享库的开发
- `@opt_file`表示从`opt_file`文件中读取gcc参数
- `-I`后面跟头文件的路径，可指定头文件搜索的位置
- `-std=c++11`表示使用C++11标准
- `-static`表示生成静态链接的文件，也就是把库函数和其他依赖都编译进最终文件
### gdb
gdb是一款由GNU开发的命令行调试工具，全称GNU debugger。要使用gdb调试程序，需要使用`-g`参数，在gcc编译时保留调试信息。
```bash
gcc -g program.c -o program
```
#### 启动gdb
```bash
gdb main # 直接启动对main的调试
gdb -p 114514 # 对pid为114514的进程进行调试，可能需要权限
gdb main core # 分析main崩溃时产生的核心转储文件core
gdb --args main -a -b -c # 对main启动调试，并传递abc三个选项
```
#### 退出gdb
在gdb调试控制台下输入如下任意一条命令：
```bash
quit
q
exit
```
或者按下Ctrl-D也可退出gdb。
#### shell命令
如需在gdb运行期间执行一些shell命令，无需退出gdb。可以直接输入`!ls` `shell ls`这样的命令，就能执行`ls`命令。
#### 常用调试命令
- `run`(`r`)：启动目标程序，持续运行，直至运行结束或者遇到断点。
- `continue`(`c`)：继续运行目标程序，直到下一个断点。
- `start`：启动目标程序，运行到`main`函数的第一行。
- `break`(`b`)：添加断点。
  - `b 4`：在当前代码文件的第4行添加断点。
  - `b main.c:10`：在main.c文件的第10行添加断点。
  - `b cal`：在cal函数入口设置断点。
  - `b *0x11451419`：在该地址设置断点。
  - `b +1`：在当前行之后的1行添加断点。减号则是在之前的n行添加断点。
  - `b 15 if x == 114`：条件断点，如果x=114，则在15行打断。
- `file`：装入需要调试的可执行文件。
- `list`：列出源代码。
- `next`：单步执行，但不进入函数
- `step`：单步执行，并进入函数
- `backtrace`(`bt`)：列出堆栈信息
- `print`(`p`)：打印表达式的值
- `whatis`：打印变量的类型
- `finish`：继续运行，直到当前函数返回
- `watch a`：监视变量a，当a的值发生改变时打印出变化前后的值
- `info`(`i`)：打印信息
  - `info breakpoints`：打印断点信息
  - `i variables`：全局、静态变量
  - `i locals`：局部变量
  - `i args`：当前函数的参数
### objdump
