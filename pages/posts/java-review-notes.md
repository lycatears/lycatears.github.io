---
layout: post
title: Java基础知识复习笔记
date: 2024-05-31 20:54:36
updated: 2025-11-01 13:10:14
categories: 学习
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

试卷下载：[百度网盘](https://pan.baidu.com/s/1oi5kkmgDdxZNFFHXev37Sw?pwd=kdge)
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
### 静态成员
- 由该类所有对象共享的成员或者方法，可以将它设为静态成员。与C++不同的是，Java的静态成员可通过成员访问，也可通过类名访问。静态成员随着类的加载而被加载，先于所有对象存在。
- 静态成员属于类，而不属于任何一个对象。
- 静态方法常用于工具类和测试类中。
- 静态方法只能访问静态变量和静态方法，且没有this，因为它不属于任何一个对象，而是属于类本身。非静态方法可以访问所有静态/非静态的成员。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        Student s1 = new Student(20, "lisi");
        Student s2 = new Student(21, "wangwu");
        Student s3 = new Student();
        System.out.println(Student.getCount());
    }


}

class Student {
    private int age;
    private String name;
    private static int count = 0;
    public Student(int age, String name) {
        this.age = age;
        this.name = name;
        count++;
    }

    public Student() {
        this(18, "zhangsan");
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static int getCount() {
        return count;
    }
}
```
### 继承
- 继承适合描述具有共同特征，而在具体行为上又有差异的事物。Java中，继承需要使用关键字`extends`，例如定义一个基于人类`Person`的学生类`Student`可以这样定义：`public class Student extends Person`。所有类的公共祖先类都是~~余胜军~~`Object`。
- 被继承的类称为父类（或者基类、超类），继承其他类的类叫做子类（或者派生类）。
- 使用继承，多个子类中实现相似功能的代码可以提取到父类中，无需重复实现，提高代码复用性。子类是父类的“一种特化”，可在父类的基础上增加更多行为、功能。
- Java**不支持**多继承，一个子类只能继承一个父类。但是，可以多层继承，例如C继承于B，而B又继承于A是可以的，B是C的直接父类，A叫做C的间接父类或者祖先类。
- 父类中`private`私有的成员也会被子类继承，只不过子类无法直接访问。`protected`是保护成员，在本类以及自己的子类中可直接访问，但在类外不能直接访问。`public`是公共成员，类内外均可直接访问。
## 字符串
- 字符串是`java.lang`包中提供的类`String`，无需导入。
- 字符串创建后，其值不可修改。
- 使用`String s1 = "abc";`这样形式创建的字符串，`abc`常量存储在常量池中，如果再创建一个`String s2 = "abc";`，则s1与s2指向的数组是同一个。
- 使用`byte[] b = new byte[]{'a', 'b', 'c'}; String s3 = new String(b);`创建的字符串，每次初始化都会拷贝该字符数组。`String s4 = new String(b);`s3与s4指向的字符数组不是同一个。
::: code-group
```java:line-numbers[StringFromConstant.java]
public class StringFromConstant {
    public static void main(String[] args) {
        String s1 = "114514";
        String s2 = "114514";
        System.out.println(s1);
        System.out.println(s2);
        System.out.println(s1==s2);
    }
}
// 输出：114514 114514 true
```
```java:line-numbers[StringFromConstructor.java]
public class StringFromConstructor {
    public static void main(String[] args) {
        byte[] b = new byte[]{97, 98};
        String s1 = new String(b);
        String s2 = new String(b);
        System.out.println(s1);
        System.out.println(s2);
        System.out.println(s1==s2);
    }
}
// 输出：ab ab false
```
:::
- 如需比较两个字符串的值，可以用`equals`（考虑大小写）或者`equalsIgnoreCase`（忽略大小写）方法，返回值均为布尔型。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        String s1 = "114514abc";
        String s2 = "114514Abc";
        String s3 = "114514abc";
        System.out.println(s1.equals(s2));
        System.out.println(s1.equals(s3));
        System.out.println(s2.equalsIgnoreCase(s3));
    }
}
// 输出：false true true
```
- Java8之后，如果几个常量字符串拼接，编译时会提前优化。例如`String s1 = "abc"; String s2 = "a"+"b"+"c";`中，两个字符串对象指向常量池中的同一个字符串。
### StringBuilder
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::
- `StringBuilder`可以看作一种容器，创建之后其中的内容是可变的，能够提高对字符串的操作效率。
- StringBuilder有两种常用的构造方法。
  - 空参构造：创建一个空白的可变字符串对象，不含内容。
  - 传入字符串对象：根据传入的字符串的内容，创建可变字符串对象，内容与该字符串相同。
- 常用方法包括`append`（拼接）`reverse`（反转）等：
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("123");
        System.out.println(sb); // 123
        StringBuilder sb2 = sb.append("456");
        sb.append("456");
        System.out.println(sb); // 123456
        System.out.println(sb.length()); // 6
        System.out.println(sb.reverse()); // 654321
        System.out.println(sb.toString()); // 654321
        System.out.println(sb == sb2);
    }
}
```
- 空的StringBuilder默认创建长度为16的数组，当超出该限制需要扩容时，扩展到原限制的2倍+2；仍然不足时扩展到实际长度。
### StringJoiner
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::
- StringJoiner是JDK8加入的特性，可以在构造字符串时添加分隔符、前缀、后缀（可以只传入分隔符）。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        int[] arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i;
        }
        StringJoiner sj = new StringJoiner(", ", "[", "]");
        for (int i = 0; i < arr.length; i++) {
            sj.add(String.valueOf(arr[i]));
        }
        System.out.println(sj);
    }
}
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
## 常用容器
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::
### ArrayList
- ArrayList使用了泛型，创建一个`ArrayList`需要传入一个类型参数。注意，基本类型是不能传递给泛型参数的，我们需要传递对应的包装类。
- `ArrayList`在`java.utils`包中，需要导入。
- 常用方法：
  - `add`：添加一个元素
  - `remove`：传入整数时，为删除对应索引的元素；传入对象时，删除相应的元素（删除第一个遇到的，若不存在则不操作）。例如下面的代码中，直接传递0则会删除索引为0的元素，而传入包装类`Integer`类的0，则会直接删除元素0。
  - `get`：得到对应索引值的元素。
  - `set`：设置对应索引值的元素。
  - `indexOf`：传入一个对象，查找该对象第一次出现的位置。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            list.add(random.nextInt(10));
        }
        System.out.println(list);
        list.remove(0); // 按照索引移除
        // list.remove((Integer) 0); // 按照元素移除
        // list.remove(list.indexOf(0)); // 按照元素移除
        System.out.println(list);
        list.set(0, 826);
        System.out.println(list);
        System.out.println(list.get(0));

    }
}
// [1, 1, 6, 3, 3, 0, 1, 5, 0, 8]
// [1, 6, 3, 3, 0, 1, 5, 0, 8]
// [826, 6, 3, 3, 0, 1, 5, 0, 8]
// 826
```
