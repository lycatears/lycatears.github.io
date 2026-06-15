---
layout: post
title: Java基础知识复习笔记
date: 2024-05-31 20:54:36
updated: 2026-06-09 23:36:14
categories: 学习
excerpt: 太久没写Java，有些生疏，花点时间复习一下。如您在复习吉林大学《Java程序设计》课程，本文可能也有一定帮助。
tags:
  - 编程
  - 学习
  - Java
  - 开发
---
# Java基础知识复习笔记
本文是猫娘**复习**Java时所做的笔记，主要是为了巩固基础。
:::danger
本文不包含吉林大学软件学院Java程序设计课程中的GUI部分。
:::
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
- 父类中`private`私有的成员也会被子类继承，只不过子类无法直接访问。`protected`是保护成员，在本类以及自己的子类中可直接访问，但在类外不能直接访问。`public`是公共成员，类内外均可直接访问。如果未指定访问权限修饰符，则默认为包访问权限，在同一个包中的其他类中可见。
- 父类的成员可以通过`super`关键字访问。
- 在Java中，非静态、非私有、没有被`final`修饰的方法是虚方法，虚方法可被子类重写。建议在重写的方法上加上`@override`注解，以便发现重写中的错误。重写的方法，访问权限应该大于等于父类，以保证父类的引用可以访问这些方法；返回值类型应当小于等于父类（在类继承体系中）。
:::code-group
```java:line-numbers [Main.java]
public class Main {
    public static void main(String[] args) {
        Animal a1 = new Cat("mimi", 3);
        Animal a2 = new Dog("wangwang", 2);
        a1.say();
        a2.say();
    }
}
```

```java:line-numbers [Animal.java]
public class Animal {
    String name;
    int age;
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Animal() {
        this(null, 0);
    }

    public void say() {
        System.out.println("Hello " + name + " " + age);
    }
}
```

```java:line-numbers [Cat.java]
public class Cat extends Animal {
    public Cat(String name, int age) {
        super(name, age);
    }

    public Cat() {
        this(null, 0);
    }

    @Override
    public void say() {
        System.out.println("meow " + name + " " + age);
    }
}
```

```java:line-numbers [Dog.java]
public class Dog extends Animal {
    public Dog(String name, int age) {
        super(name, age);
    }

    public Dog() {
        this(null, 0);
    }

    @Override
    public void say() {
        System.out.println("woff " + name + " " + age);
    }
}
```
:::
- 子类不会继承父类的构造方法，子类中所有的构造方法在默认情况下，会调用父类中的无参构造方法。子类构造方法的第一行应当为`super()`调用父类的构造方法，如果我们在代码中没有加上，编译时也会生成。想要调用有参构造，必须在`super()`中指定参数。
- 使用`this()`调用本类中其他构造方法时，不用`super()`，因为其他构造函数会调用。
### 多态
Java的多态与C++的基本上一样，都是通过父类指针调用不同的子类方法，产生不同的行为。可参考上面的动物类，初步了解Java多态的实现。
- 多态需要继承（或者实现）关系，要用父类引用指向子类对象，且需要子类重写父类的方法。
- 通过父类引用只能访问父类中包含的成员，子类自行增加的成员则不能通过父类引用访问。例如在上面的动物类中，假如`Cat`类新增了一个`catchMouse()`方法，则`Animal a = Cat(); a.catchMouse();`会导致编译错误。
- 在程序运行时，实际上运行的是具体的子类的方法。
- `instanceof`关键字可以判断一个对象是否是某个类的实例。如果想要调用某个子类的特有方法，但又不知道这个对象具体是什么类，就可以通过这个关键字判断（例如：`if(a instanceof A){}`），避免出现类型转换错误。
### 包
- Java中的包可以对各种类进行分门别类的管理，便于管理和使用。
- 一般情况下，包名采用公司域名反写，全英文+小写，需要见名知义。
- Java文件的第一行用`package com.example.mypackage;`声明包名。
- 全类名/全限定名：一个类的完整标识，包括它所在的包名和自身的类名，可以唯一标识一个类，能够避免同名的类发生名称冲突。假如我们在`com.example.mypackage`包中定义了`Student`类，则该类的全类名为`com.example.mypackage.Student`。
- 使用其他类时，最完整的类名实际上应该是全类名。但是全类名过于复杂，使用非常不方便，因此需要使用`import`关键字导入这些类。
  - 同一个包中的其他类不需要导入。
  - `java.lang`中的包不需要导入。
  - 除上述两种情况之外，都需要导入包。
  - 如果同时使用了来自不同包的同名的类，只能使用全类名。
### final关键字
- final的字面意思，就是"最终"。在Java中，final可以修饰类、方法、变量。
- final修饰类时，表示该类是最终类，不能被继承。
- final修饰方法，该方法不能被子类重写。
- final修饰变量时，该变量成为常量，赋值后不能被修改。基本数据类型的常量，其值不能被修改；引用数据类型的常量，其指向的对象不能更换，但是仍然可以调用该对象的方法，修改该对象内部的数据。
### 权限修饰符
Java中，类的成员访问权限共有四种，分别是私有、默认、保护、公共。
| 修饰符 | 类内 | 同一个包内 | 其他包子类 | 不同包的无关类 |
| ------ | ---- | ---------- | ---------- | -------------- |
|`private`|✅|❌|❌|❌|
|默认|✅|✅|❌|❌|
|`protected`|✅|✅|✅|❌|
|`public`|✅|✅|✅|✅|
### 代码块
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::
#### 局部代码块
- 局部代码块是写在**方法内**的一对单独的大括号内的代码，其作用主要是提前结束变量的生命周期。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        {
            int a = 1;
            System.out.println(a);
        }
        //  会导致编译错误
        //  System.out.println(a);
    }
}
```
#### 构造代码块
- 构造代码块需要写在类成员的位置，在构造该类的对象时，会优先于构造方法执行。多个构造方法中重复的内容可以提取到构造代码块中。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        Cat c1 = new Cat();
        Cat c2 = new Cat();
    }
}

class Cat {
    {
        System.out.println("Meow~");
    }
    Cat() {
        System.out.println("喵~");
    }
}
// Meow~
// 喵~
// Meow~
// 喵~
```
#### 静态代码块
- 静态代码块是通过`static`关键字修饰的构造代码块，随着**类**的加载而执行，自动触发，而且只会被执行一次。
- 一般在类加载时，需要进行数据初始化时使用。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        Cat c1 = new Cat();
        Cat c2 = new Cat();
    }
}

class Cat {
    static {
        System.out.println("Meow~");
    }
    Cat() {
        System.out.println("喵~");
    }
}
// Meow~
// 喵~
// 喵~
```
### 抽象类与抽象方法
- 如果在父类中抽取了各个子类的共性方法，但是不能确定该父类的具体方法体，这时候就可以使用抽象类和抽象方法。
- 如果一个类中定义了抽象方法，则必须声明为抽象类。与C++不同的是，抽象类必须用`abstract`关键字声明。抽象类和抽象方法的定义如下所述：
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        Animal cat = new Cat();
        Animal dog = new Dog();
        cat.say();
        dog.say();
    }
}

abstract class Animal {
    public abstract void say();
}

class Cat extends Animal {
    @Override
    public void say() {
        System.out.println("Meow");
    }
}

class Dog extends Animal {
    @Override
    public void say() {
        System.out.println("Woff");
    }
}
```
- 抽象方法的定义不能有方法体。
- 抽象类不能实例化，也就是说不能创建抽象类的对象。
- 抽象类不一定有抽象方法，但有抽象方法的类必须是抽象类。
- 抽象类可以有构造方法，创建子类对象时用于给成员变量赋值。
- 抽象类的子类必须重写所有的抽象方法，或者为抽象类。因此抽象方法不得定义为`private`，因为这样的方法无法被子类重写。
### 接口
- 相较于抽象类，接口是对行为的抽象，更偏向对方法定义的约定。
- 接口用关键字`interface`定义，接口和类之间是实现关系，用关键字`implements`表示。
- 接口不能被实例化。接口的实现类必须重写接口中的所有方法，或者为抽象类。
- 一个类可以实现多个接口，可以在继承一个抽象类的同时实现多个接口。
- 与类一样，`public`修饰的接口，其所在的文件名必须与该接口名称相同。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        CatchMouse cm = new Cat();
        cm.catchMouse();
    }
}

abstract class Animal {
    public abstract void say();
}

interface CatchMouse {
    void catchMouse();
}


class Cat extends Animal implements CatchMouse {
    @Override
    public void say() {
        System.out.println("Meow");
    }

    @Override
    public void catchMouse() {
        System.out.println("Caught 1 mouse");
    }
}

class Dog extends Animal {
    @Override
    public void say() {
        System.out.println("Woff");
    }
}
```
- 接口可以定义成员变量，但只能是静态常量，默认会添加`public static final`修饰。成员方法默认为`public abstract`关键字修饰，也就是抽象方法。由于接口没有继承，只有实现，因此接口的成员都是公共的。
- 接口没有构造方法。
- 如果一个类继承了多个接口，这些接口有重名的方法，则只需要实现一次即可。通过哪个接口的引用来调用该方法，调用的都是子类中重写的这个方法。
- 接口和接口之间可以多继承。
- JDK8加入了接口的默认方法，可以给接口中的方法编写方法体，主要是为了更新接口时更方便，需要使用`default`关键字，例如`public default void fun(){}`。默认方法不是抽象方法，可以不重写；但是如果实现了多个接口，而这些接口中有同名的默认方法，则必须重写。实现类重写接口中的默认方法时，应当去掉`default`关键字。
- JDK9可以在接口中加入私有方法，可抽取各个默认方法中的重复代码。
- 适配器模式：如果一个接口中的方法太多，而我们并不需要全部的方法，可以设计一个中间的适配器类，实现所有方法（但都是空方法，这个类一般声明为抽象类），再编写我们需要的类，继承这个适配器类，然后只重写需要的方法即可。
### 内部类
:::warning
内部类在吉大软院期末考察较少。如果时间紧迫，建议跳过。
:::
类的成员包括属性、方法、构造方法、代码块、内部类。内部类就是在一个类的内部再定义一个类，例如在A类的内部定义了B类，则B类称为内部类。一般情况下，内部类表示的事物是外部类的一部分，且内部类单独出现无意义，这时候我们会考虑使用内部类。

- 内部类可以直接访问外部类的成员，包括其私有属性。
- 外部类想要访问内部类的成员，则必须创建对象。
- Java16前不支持内部类的静态成员。
#### 成员内部类
写在类的成员部分的内部类，就是成员内部类。
- 成员内部类可被访问控制修饰符修饰，与方法、变量的效果类似。
- 获取内部类的对象有两种方法：
  - 所在的外部类编写方法，对外提供内部类的对象。
  - 直接创建。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
      // 直接创建
        Car.Engine ce = new Car("高级轿车", "黑色", 24)
                .new Engine("田所发动机", 24);
        ce.show();
    }
}

class Car {
    private String carName;
    private String carColor;
    private int carAge;

    public void show() {
        System.out.println("Car Name: " + carName);
        System.out.println("Car Color: " + carColor);
        System.out.println("Car Age: " + carAge);
    }

    class Engine {
        private String engineName;
        private int engineAge;
        public void show() {
            Car.this.show(); // 外部类this
            System.out.println(carName + " " + carColor + " " + engineName + " " + engineAge);
        }

        public Engine(String engineName, int engineAge) {
          // 内部类this正常发挥作用
            this.engineName = engineName;
            this.engineAge = engineAge;
        }
    }

    private Engine engine;

    public Car(String carName, String carColor, int carAge) {
        this.carName = carName;
        this.carColor = carColor;
        this.carAge = carAge;
        // 外部类中可以直接创建
        this.engine = new Engine(carName, carAge);
    }

    public Engine getEngine() {
        return engine;
    }
}
// Car Name: 高级轿车
// Car Color: 黑色
// Car Age: 24
// 高级轿车 黑色 田所发动机 24
```
- 内部类想要访问外部类的方法、属性，可以通过`Outer.this`（Outer需要替换为实际上的外部类名）调用。Java会为内部类隐式生成一个外部类的引用，指向其对应的外部类。
#### 静态内部类
静态内部类是一种特殊的成员内部类，就是用`static`修饰的成员内部类。
- 与静态方法类似，静态内部类也只能访问外部类的静态成员。如果需要访问外部类的非静态成员，需要创建对象。创建静态内部类的对象的格式为：`Outer.Inner oi = new Outer.Inner()`
- 可以直接调用静态内部类的静态方法，例如`Outer.Inner.s_fun();`
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        Outer.Inner oi = new Outer.Inner();
        oi.fun();
        Outer.Inner.s_fun();
    }
}

class Outer {
    public static class Inner {
        public static void s_fun() {
            System.out.println("Static Inner Function");
        }
        public void fun() {
            System.out.println("Inner Function");
        }
    }
    public void o_fun() {
        Inner inner = new Inner();
        inner.fun();
        System.out.println("Outer Function");
    }
}
// Inner Function
// Static Inner Function
```
#### 局部内部类
定义在方法内部的内部类叫做局部内部类，类似于局部变量。
- 外界无法直接使用该内部类，必须在定义该内部类的方法内部创建该内部类的对象并使用。
- 局部内部类可以直接访问外部类的成员，也可以访问方法内的局部变量。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.o_fun();
    }
}

class Outer {
    public void o_fun() {
        System.out.println("Outer o_fun");
        class Inner {
            public void i_fun() {
                System.out.println("Inner i_fun");
            }
        }
        Inner inner = new Inner();
        inner.i_fun();
    }
}
// Outer o_fun
// Inner i_fun
```
#### 匿名内部类
匿名内部类是没有标识符的内部类，在四种内部类中最为重要。
- 匿名内部类的定义格式可参考如下代码：
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        new CatchMouse() {
            @Override
            public void catchMouse() {
                System.out.println("猫抓老鼠");
            }
        }.catchMouse();
    }
}

interface CatchMouse {
    public abstract void catchMouse();
}
```
- 可以看到，创建的匿名内部类在定义时移除了`class`关键字和类的名称。该类实现了`CatchMouse`接口，重写了该接口中的所有方法，接口名写在大括号之前，就表示该匿名内部类实现的是该接口。匿名内部类就是一个类的子类或接口的实现类。
- 匿名内部类的定义就是`new CatchMouse()`之后大括号中的内容，`new`关键字创建的是这个匿名内部类的对象，而不是接口`CatchMouse`的实例。
- 匿名内部类的定义、创建对象中，我们可以看到三种要素：
  - 实现/继承关系：实现一个接口，或者继承其他类。
  - 重写方法：重写所有抽象方法。
  - 创建对象：创建了匿名内部类的对象。
- 匿名内部类可以写在方法内，也可以写在类的成员位置。
- 当方法的参数需要传递接口或者类时，但该实现类只需要使用一次，如果直接编写实现类过于麻烦，我们就可以用匿名内部类简化代码。
- 匿名内部类对象如果想多次使用，可以把该匿名内部类的对象传递给一个被继承/实现的类/接口的引用。
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
## 常用API
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::
### Math
`Math`是一个用于数学计算的工具类。它的构造方法是私有的，且为`final`修饰的类，所有方法都是静态方法。
- 常见的数学函数`abs` `ceil` `floor` `log`...与其他语言类似，且提供了针对不同数据类型的重载函数。
- -2147483648 通过`Math.abs()`不能得到正确的绝对值，计算结果仍是它本身。这是因为补码规则下该数字没有32位整数范围内的绝对值，在JDK15后可使用`Math.absExact()`，这时会抛出异常。
### System
`System`也是一个工具类，提供了与系统相关的操作和信息访问功能。
- `System.exit()` 退出当前运行的Java虚拟机。
- `System.currentTimeMillis()` 返回当前系统的时间，返回`long`类型的毫秒数。
- `System.arraycopy()` 提供数组拷贝的方法。
- `System.gc()` 运行垃圾回收器。
- `in`（标准输入流） `out`（标准输出流） `err`（标准错误输出流）是三个常用的静态字段。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis()); // 1781170338637
        System.out.println(System.getProperty("user.dir")); // F:\projects\java-review\java-review
        System.out.println(System.getProperties()); // {java.specification.version=24, sun.cpu.isalist=amd64, sun.jnu.encoding=GBK,。。。
        System.err.println(114514); // 114514
    }
}
```
### Runtime
`Runtime`提供了与Java运行时环境交互的方法，采用单例模式，不能直接创建该类的对象。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        System.out.println("Total memory: " + runtime.totalMemory()); // JVM已获取的内存大小
        System.out.println("Free memory: " + runtime.freeMemory()); // JVM的可用内存大小
        System.out.println("Max memory: " + runtime.maxMemory()); // JVM可以使用的总内存大小
        System.out.println("available processors: " + runtime.availableProcessors()); // 线程数
        runtime.exec("taskmgr"); // 打开任务管理器
        runtime.exit(0);
    }
}
// Total memory: 266338304
// Free memory: 260980088
// Max memory: 4223664128
// available processors: 16
```
### Object
~~余胜军~~`Object`是Java中所有类的公共祖先类，所有的类都直接或者间接的继承了`Object`类。
- `toString()`方法是将对象转换成字符串的方法，我们在调用`System.out.println()`时，传入非字符串对象也能打印出语句，就是调用了这个方法。重写这个方法可以自定义对象转换为字符串的格式。
- `equals()`方法用于对比两个对象是否相同。默认情况下使用`==`运算符比较两个对象，但是这样比较的是两个对象的地址值，我们可以重写该方法自定义对比的规则，例如比较对象的属性值。建议在重写时，首先判断传入的另一个对象是否为空。
  - `Object`提供静态方法`equals(Object a, Object b)`判断两个对象是否相同。若`a` `b`是同一个对象，则返回`true`，否则，如果`a`是`null`，则返回`false`；最后调用`a`的`equals`方法判断。
  - `isNull` `nonNull`也是`Object`提供的判断对象是否为空的静态方法。
- `clone()` 方法用于对象拷贝（复制），把一个对象的属性值完全拷贝给另一个对象。创建可拷贝的类时要实现`Clonable`接口，这是一个标记性接口，没有任何抽象方法需要实现。
- `hashCode()`方法，计算对象的哈希值。
  - 在同一对象上多次调用 `hashCode` 方法时，必须一致地返回相同的整数值，前提是对象在 `equals` 比较中使用的信息没有被修改。
  - 如果两个对象根据 `equals` 方法是相等的，则调用 `hashCode` 方法时必须返回相同的值。
  - 如果两个对象根据 `equals` 方法是不相等的，不要求 `hashCode` 方法时返回不同的整数值，但返回不同的值可以提高哈希表的性能。
```java:line-numbers
@Override
public int hashCode() {
   int hash = 7;
   hash = 31 * hash + (int) id;
   hash = 31 * hash + (name == null ? 0 : name.hashCode());
   hash = 31 * hash + (email == null ? 0 : email.hashCode());
   return hash;
}
```
### BigInteger
`BigInteger`是Java提供的大整数类，在`java.math`包中，需要导入。
- 常用的构造方法有三种：
  - `BigInteger(int num, Random rnd)`传入整数`num`和随机数生成器`rnd`，返回一个$[0, 2^{num} - 1]$范围内的大整数。
  - `BigInteger(String val)`获取指定的十进制大整数。需要注意传入的字符串只能是整数，不能出现小数等。
  - `BigInteger(String val, int radix)`获取`radix`进制的大整数。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) throws IOException {
        BigInteger bi1 = new BigInteger("1145141919810");
        BigInteger bi2 = new BigInteger(128, new Random(19260817));
        BigInteger bi3 = new BigInteger("1234567890abcdef", 16);

        System.out.println(bi1);
        System.out.println(bi2);
        System.out.println(bi3);
    }
}
// 1145141919810
// 163610571792295475396706436168772444707
// 1311768467294899695
```
- `BigInteger`类提供了静态方法`valueOf()`，传入`long`类型的数字，返回对应的大整数对象。该类含有一个静态代码块，提前对$[-16, 16]$范围内的整数创建了相应的对象，需要这些较小的整数时，直接返回这些创建好的对象（享元模式）。
- 与字符串类似，大整数对象创建后不能修改其值。只要进行了计算，就会创建新的对象。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(1);
        BigInteger b2 = BigInteger.valueOf(2);
        BigInteger b3 = b1.add(b2);
        BigInteger b4 = BigInteger.valueOf(1);

        System.out.println(b1 == b4); // true
        System.out.println(b3 == b1); // false
    }
}
```

```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) throws IOException {
        BigInteger b1 = BigInteger.valueOf(1919810);
        BigInteger b2 = BigInteger.valueOf(114514);

        System.out.println(b1.add(b2)); // 加法 2034324
        System.out.println(b1.subtract(b2)); // 减法 1805296
        System.out.println(b1.multiply(b2)); // 乘法 219845122340
        System.out.println(b1.divide(b2)); // 整数除法 16
        System.out.println(Arrays.toString(b1.divideAndRemainder(b2))); // 整除+余数 [16， 87586]
        System.out.println(b1.mod(b2)); // 取余 87586
        System.out.println(b1.pow(3)); // 指数，传入的是int 7075786959929141000
        System.out.println(b1.modPow(b1, b2)); // a^b mod c的值 50896
        System.out.println(b1.equals(b2)); // 比较是否相等 false
        System.out.println(b1.compareTo(b2)); // 比较大小，返回-1 0 1 int型 1
        System.out.println(b1.max(b2)); // 求两数较大值 1919810
        System.out.println(b1.min(b2)); // 较小值 114514
        System.out.println(b1.intValue()); // 返回int型数值，过大时取末尾32bit 1919810
        // 需要在数值过大时抛出异常，使用带有Exact的方法
        System.out.println(b1.longValue()); // 返回long型整数值，过大取末尾64bit 1919810
    }
}
```
### BigDecimal
`BigDecimal`是`java.math`包下的不可变任意精度十进制小数类型。
- 构造方法与`BigInteger`类似，可以传入浮点数，或者小数字符串。
  - 静态方法`BigDecimal.valueOf()`也可将浮点数转化为`BigDecimal`。
  - 整数0-10与`BigInteger`中的-16~+16类似，都会提前创建这些对象。
- 四则运算的方法名称与`BigDecimal`基本上相同。
```java:line-numbers
public class HelloWorld {
    public static void main(String[] args) {
        BigDecimal bd1 = new BigDecimal("1.14514");
        BigDecimal bd2 = BigDecimal.valueOf(1.91981);
        BigDecimal bd3 = new BigDecimal(1.155); // 可能导致精度丢失

        System.out.println(bd1.add(bd2)); // 3.06495
        System.out.println(bd1.subtract(bd2)); // -0.77467
        System.out.println(bd1.multiply(bd2)); // 2.1984512234
        System.out.println(bd1.divide(bd2, 2, RoundingMode.HALF_UP)); // 0.60
        System.out.println(bd1.sqrt(MathContext.DECIMAL32)); // 1.070112
    }
}
```
### 包装类
## 异常
异常代表程序出现的问题。程序运行时抛出异常，我们要想办法去处理异常。异常体系最上层是`java.lang`包下的`Throwable`类，分为`Error` `Exception`两种，其中`Error`（错误）一般是Java内部的问题（如JVM运行错误），程序无法处理错误。`Exception`（异常）是程序可以处理的，又分为`RuntimeException`（运行时异常，例如数组越界）和编译时异常（例如IO异常、SQL异常）两类。运行时异常通常是程序存在逻辑错误引起的，编译时不做检查；其他异常会在编译时被检查，如果没有通过`throws`抛出异常或者处理该异常，则会发生编译错误。

## 流
### Stream流
### IO流

## 方法引用
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::

## 多线程

## 网络编程

## 反射
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::

## 动态代理
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::

## 泛型
:::warning
如果您正在复习吉林大学相关课程的考试，您可以跳过本小节。
:::

## JDBC数据库连接相关
:::warning
如果您是普班同学，且正在复习吉林大学相关课程的考试，您可以跳过本小节。本节内容在黑马程序员的Java基础课程上并未讲解，您可搜索该机构的Java Web相关课程学习；本节笔记为本人根据DB2考试经验自行整理，请谨慎参考。
:::
:::tip
根据本人在读时的考试经验，普班对该部分不做考察要求。卓班/唐班可能有单独的附加题考察。
:::
## 2019级真题参考答案与解析
:::warning
仅供参考，不保证正确。
:::
## 2020级真题参考答案与解析
:::warning
仅供参考，不保证正确。
:::
