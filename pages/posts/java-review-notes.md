---
layout: post
title: Java基础知识复习笔记
date: 2024-05-31 20:54:36
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

参考文献：[【黑马程序员Java零基础视频教程_上部(Java入门，含斯坦福大学练习题+力扣算法题和大厂java面试题）】](https://www.bilibili.com/video/BV17F411T7Ao?p=63&vd_source=91ec06d110e5e750b94a5c71d6934019)
## Java相关概念
- JVM：Java Virtual Machine，Java虚拟机，负责解释和执行Java代码。
- JRE：Java Runtime Environment，Java运行时环境。包含JVM和核心类库。
- JDK：Java Development Kit，Java开发环境，包含JRE和开发工具。
- 安装Java环境需要在系统Path环境变量中添加相应路径。
### HelloWorld
第一个Java程序：输出Hello, World语句
```java:line-numbers
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
- 数组是一种常见的容器，可以存储同种数据类型的多个值（需要考虑隐式转换）。
- 数组定义有两种格式，分别是`int[] array`和`int array[]`，推荐使用第一种。第二种格式是为了适配C/C++程序员的习惯。
- 静态初始化：`int[] array = new int[]{1, 1, 4, 5, 1, 4};` 可以简化为`int[] array = {1, 1, 4, 5, 1, 4};`
- 直接用`System.out.println()`打印数组，只会得到该数组的地址值，格式为`[I@0x11451419`。`[`代表这是一个数组，`I`代表是int型数组。
- Java数组索引从0开始，获取数组中的元素，格式为`array[0]`。为数组中的元素赋值，格式为`array[4]=826`
- 遍历数组有如下两种格式，一种是传统的for循环，另一种是foreach循环。
```java:line-numbers
int[] arr = {1, 1, 4, 5, 1, 4};
String[] arr2 = {"1", "2", "3", "4"};
for(int i : arr){
  System.out.println(i);
}

for(int i = 0; i < arr2.length; i++){
  System.out.println(arr2[i]);
}
```
- 动态初始化：`int[] array = new int[5]`，也就是不指定初始值，后续自行初始化。默认引用数据类型的初始值为`null`，数字类型为0，布尔为`false`
，字符为`\0`
- Java数组的内存图与C++在堆区创建的数组类似。
- 二维数组定义：`int[][] array = {{1, 2, 3}, {4, 5, 6}};` 或者 `int[][] array = new int[2][3];`访问与C++类似
## 方法
- 方法是程序的执行单元，重复的、具有独立功能的代码可以抽取到方法中。方法有利于提高程序的复用性和可维护性。
- 方法的定义：
```java:line-numbers
public class Test {
  public static int func1(int a){
    // ...
    return 0;
  }
}
```
- 方法需要在类内定义，且不允许嵌套定义。
- `public`是访问控制修饰符，`static`表示静态方法（非静态方法不需要），`int`为返回值类型，`func1`为方法名称，`int a`为参数列表
- 如不需要返回值，返回值类型为`void`，`return`语句后不要跟返回值
- 名称相同，但是参数列表不同的两个方法构成重载，但仅有返回值不同而参数列表相同的不可以。重载示例：
```java:line-numbers
public static int sum(int[] arr){
    int sum = 0;
    for(int i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}

public static double sum(double[] arr){
    double sum = 0;
    for(int i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}
```
## 面向对象
### 类与对象
- 定义类
```java:line-numbers
public class MyClass {
  // 成员变量，又叫属性
  public int a;
  private double b;
  protected String c;
  // 成员方法
  public static void main(String[] args) {
    // ...
  }
  private int func1(int x) {
    return x * x;
  }
  // 可能还包括：构造器、代码块、内部类等
}
```
- 访问属性和方法与C++类似：`obj.a` `obj.func()`
- 获取一个类的对象，需要使用`new MyClass()`
- 建议：类名的首字母要大写，且要见名知义，采用驼峰命名。
- 一个.java文件中可以含有多个类，**但是只能含有一个public类**，且代码文件名必须与该public类相同。
- 类中对成员变量的定义可以赋给初始值，但也可以不给，存在默认值（与上文中数组的规则相同）。
### 封装
可以为变量和方法添加访问控制修饰符，控制外部对它们的访问。
- `private`修饰的属性和方法只有本类方法能够直接访问，在外部不能直接被访问。
```java:line-numbers
public class Student {
  private String name;
  private int age;
  private String gender;
}

Student stu = new Student();
// stu.age = 9999; // 错误
```
- 一般我们使用getter和setter方法访问私有成员，这样可以对这些成员的访问添加额外的控制。
```java:line-numbers
public class Student {
  private String name;
  private int age;
  private String gender;

  public void setAge(int age) {
    if(age > 50 || age < 0) {
      System.out.println("Illegal Age!");
      return;
    }
    this.age = age;
    return;
  }

  public int getAge() {
    return age;
  }
}

Student stu = new Student();
// stu.age = 9999; // 错误
```
### 构造方法
- 构造方法又叫构造器、构造函数，作用是在创建对象时为成员变量赋初始值。
- 之前我们使用`new Student()`创建学生对象时，使用的是无参数的构造方法。
- 构造方法不能有返回值，也不需要加`void`返回值类型，不可以编写`return`语句。构造方法的名称必须与类名完全相同，不能被手动调用，由JVM在创建对象时自动调用。
```java:line-numbers
public class Student {
  private String name;
  private int age;
  private String gender;

  public Student() {
    // 空参构造器，如果我们没有编写任何构造方法，会生成默认的空参构造方法。
    // 如果已编写构造方法，则不会生成
    this.name = "zhangsan";
    this.age = 18;
    this.gender = "unknown";
  }

  public Student(String name, int age, String gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

Student stu1 = new Student();
Student stu2 = new Student("lisi", 20, 'male');
```
- 在IDEA中可以按快捷键Alt+Insert插入构造方法和getter setter。
### `this`关键字
- 代表当前对象，与C++的`this`指针类似。
- 每个非静态方法都会被隐式的传递一个`this`参数，代表当前的对象，作为方法的第一个参数。
- `this`也可用于在一个构造器中调用本类中其他的构造器，且必须在构造器的第一行。
