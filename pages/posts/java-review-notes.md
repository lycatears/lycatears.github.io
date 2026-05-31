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
本文是猫娘**复习**Java时所做的笔记，主要是为了巩固基础，理清一些冷门、复杂的概念。
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
