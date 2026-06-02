---
layout: post
title: Java基础知识复习笔记
date: 2026-05-31 20:54:36
categories: 学习
hide: true
excerpt: 太久没写Java，有些生疏，花点时间复习一下。如您在复习吉林大学《Java程序设计》课程，本文可能也有一定帮助作用。
tags:
  - 编程
  - 学习
  - Java
  - 开发
---
# Java基础知识复习笔记
本文是猫娘**复习**Java时所做的笔记，主要是为了巩固基础。
## Java相关概念
- JVM：Java Virtual Machine，Java虚拟机，负责解释和执行Java代码。
- JRE：Java Runtime Environment，Java运行时环境。包含JVM和核心类库。
- JDK：Java Development Kit，Java开发环境，包含JRE和开发工具。
- 安装Java环境需要在系统Path环境变量中添加相应路径。
### HelloWorld
第一个Java程序：输出Hello, World语句
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```
- `HelloWorld`是一个类，它可以创建对象。
- `main`是主函数，是程序入口。
- `System.out`是核心类库提供的标准输出对象，包含的`println`方法能够打印语句到控制台上，并换行。
- Java源代码需要由`javac`编译为.class字节码文件，再交由java执行，由JVM将字节码翻译为机器码执行。
## 输入输出
### 输入
- 利用`Scanner`类
```java:line-numbers
Scanner sc = new Scanner(System.in);
while (sc.hasNextInt()) {
  System.out.println(sc.nextInt());
  // 只要有整数就一直输出，直到读到不符合整数的字符串
  // 同样支持double, byte, float, BigDecimal等类型
}

while (sc.hasNext()) {
  System.out.println(sc.next());
  // 只要有字符串就一直输出，以空格为分隔符，因此不能输出带空格的字符串
  // 必须读到有效字符才开始输入，之前的空白字符会被去掉
}

while (sc.hasNextLine()) {
  System.out.println(sc.nextLine());
  // 按行读入字符串并输出
  // 以回车为分隔符，可以得到带空格的字符串
}
```
### 输出
- `println` `print`差别不大，只不过`println`自动添加换行符
- `printf`可实现与C/C++类似的格式化输出
- 另外也可使用`String.format()`方法生成格式化字符串，然后输出
## 数据类型
- Java共有8种基本数据类型：byte、short、int、long、char、boolean、float、double
- 其余均为引用类型，如数组、对象（包括基本数据类型的包装类）、字符串、枚举等
- 引用数据类型通常存放在堆内存中，基本数据类型存放在栈内存中
- 引用数据类型作为参数传递给函数时，传递的是这个引用，而基本数据类型传递的是该数据的副本，也就是传递到函数后，在该函数内部修改引用数据类型的值，会影响原对象的值
- 引用数据类型进行==操作，对比的是两个引用是否指向同一对象，而基本数据类型比较的是值是否相等
## 数组
