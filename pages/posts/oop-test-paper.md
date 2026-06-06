---
layout: post
title: 面向对象程序设计试卷大题解析
date: 2023-07-02 19:11:01
updated: 2026-05-30 10:53:36
categories: 学习
excerpt: 手把手带你做oop期末考试大题
cover: https://i.ibb.co/XxVsR8T6/172.jpg
tags:
  - 编程
  - 学习
  - 考试
  - 吉林大学
  - C++
---
# 课程信息
- 第二学期必修课，3学分，计入保研绩点。
- 平时分30，期末考试70分。猫娘是zjq班级，作业很少，最终成绩基本上就是你的期末考试成绩，但是也捞人。
- 试卷结构如下：
  - 判断题，错误的写出理由（其实大部分都是错误的）10*2=20分
  - 简答题 10题，30分。每小题2-4分均有可能
  - 改错、编程、阅读代码给出结果等大题，50分
- 考察内容都差不多，本文以2019年软件学院试题为例。
- 真正困难的是前面的小题，大题比较好水的。小题知识点很碎，而且繁杂。

## 改错题
~~何为人主？那就是知错、改错、不认错！~~

三、指出下列程序代码中存在的错误或不足，说明原因并给出改正建议。假定已经定义好相关头文件，第3题有两处错误。（共10分）
### 1
```cpp:line-numbers {5} [1.cpp]
class A {
  int val;
  static int s;
public:
    int A(int x) { val = x; }
    void display() const;
};
int A::s = 0;
```
- **注意到**第5行是构造函数，而构造函数是不能有返回值的，因此需要去掉返回值类型`int`。
### 2
```cpp:line-numbers {5-7} [2.cpp]
class A {
  int x;
public:
  A(int s): x(s) {}
  A operator+ (A a, A b) {
    return A(a.x + b.x);
  }
};
void main() {
  A a(1);
  A b(2);
  A c(-2);
  A d = a + b + c;
}
```
- 注：广大人民群众指出，`void main()`是谭语言，属于非标准写法。但是考试题里面这么出了，你不能算他错。
- 当左操作数是类的对象时，适用成员函数重载。例如设计一个人民币类RMB，想要让RMB对象和int能够相加，就可以在RMB类内设计一个成员函数，以int为唯一的参数，也就是`RMB operator+ (int x)`。想要让RMB对象之间可以相互相加，可以是`RMB operator+ (RMB& b)`。
- 否则就要用非成员函数重载，例如`RMB operator+ (int x, RMB& a)`。成员函数重载也可以写成非成员函数重载的形式，也就是`RMB operator+ (RMB& a, int x)`
- 因此，上述代码中的运算符重载编写有错误。有两种修改方法，一个是保留成员函数重载，但改为一个参数，另一种则是改成非成员函数重载。修改后的代码如下：
```cpp:line-numbers {5-7} [2-fix1.cpp]
class A {
  int x;
public:
  A(int s): x(s) {}
  A operator+ (A a) {
    return A(x + a.x);
  }
};
void main() {
  A a(1);
  A b(2);
  A c(-2);
  A d = a + b + c;
}
```
或者
```cpp:line-numbers {7-9} [2-fix2.cpp]
class A {
  int x;
public:
  A(int s): x(s) {}
};

A operator+ (A a, A b) {
  return A(a.x + b.x);
}

void main() {
  A a(1);
  A b(2);
  A c(-2);
  A d = a + b + c;
}
```
### 3
```cpp:line-numbers [3.cpp]
void main() {
	int * const p=new int[10];
	*(p+2)=2;
	int const *q=p;
	int *f=&(*q++);
	delete p;
}
```
我们逐行分析：
1. `int * const p=new int[10];` 在堆内存创建了一个`int`数组，长度为10。注意指针的`const`在\*后面，这是一个**指针常量**，也就是说：该指针自身的值不能改变（不能被赋值为其他地址），但指向的数据的值可以改变。
2. `*(p+2)=2;` 将p[2]赋值为2。
3. `int const *q=p;`将`p`的值赋给`q`。`p`是**指针常量**，只是他自己的指向不能被修改，指向的数据不受影响，因此该赋值是合法的。但是`q`的`const`在*前面，这代表`q`是**常量指针**，也就是指向的数据不能被修改。
4. `int *f=&(*q++);`首先由第三点可知，`q`指向的数据是不能被修改的，`*q++`对该数据自增，属于非法操作。另外，`q`是常量指针，而`f`是非常量指针，因此该赋值也是非法的。
5. `delete p;` 由第一点可知，`p`指向的是一个数组，因此需要使用`delete[]`。

综上，修改后的代码为：
```cpp:line-numbers [3-fix.cpp]
void main() {
	int * const p=new int[10];
	*(p+2)=2;
	int const *q=p;
	int *f=&(*q++);  //  [!code --]
    *p++; //  [!code ++]
    int const* f = q; //  [!code ++]
	delete p; //  [!code --]
    delete[]; //  [!code ++]
}
```
### 4
```cpp:line-numbers [4.cpp]
class A {
  virtual void f() {
    cout << "A::f" << endl;
  }
};
class B: public A {
  void f() {
    cout << "B::f" << endl;
  }
public:
  void g(){f();}
};
void main()
{B s; A& t=s; s.g(); t.g();}
```
1. 首先检查`A` `B`两个类的定义。`B`覆盖了`A`类中的虚函数，又加入公共方法`g()`调用`f()`。类定义无错误。
2. 主函数中先创建了一个`B`类对象`s`，又将该对象赋给一个`A`类的引用`t`。因为`B`是`A`的派生类，因此该赋值是合法的。通过`s`本身调用它的公有方法`g()`完全没问题，但是后面的`t.g()`是在尝试用基类的引用来调用派生类的新增方法，这是语法上的错误，需要改正。
```cpp:line-numbers [4.cpp]
class A {
  virtual void f() {
    cout << "A::f" << endl;
  }
};
class B: public A {
  void f() {
    cout << "B::f" << endl;
  }
public:
  void g(){f();}
};
void main()
{B s; A& t=s; s.g(); t.g();} //  [!code --]
{B s; B& t=s; s.g(); t.g();} //  [!code ++]
```
## 编程题
### 问题描述
四、根据吉林大学2018版软件工程本科培养方案，所设课程分为核心课程、实验课程和实践课程，亦可分为必修课和选修课。课程内容设置一般包括课程简介、目标、教学内容和教学要求等内容。教学要求一般包括教学形式与方法、考核与成绩评定；教学形式一般包括课堂教学、课堂测验、课外指导、实验等形式；教学方法一般包括讲授法、讨论法、练习法、任务驱动法和自主学习法等；考核方式一般包括平时考核、实验考核和期末考核三种方式；相应成绩评定也由“平时成绩”、“实验课成绩”和“期末考试成绩”三部分组成，所占比例不确定。随着软件学科的发展，今后培养方案中的课程会发生新的变化，课程内容设置也需要与时俱进。请给出设计软件工程专业本科培养方案实现所需类，需要满足可复用、可拓展、可维护的特点。（8分）

### 注意事项
- 怎么体现【可复用】【可拓展】【可维护】？意思就是你的代码里面，类的定义不能定得太死了。
- 建议在做这类题目时，多用抽象类+继承的模式。题目一般是需要构建一个大的系统，这个系统内有很多模块，每种模块都有很多种型号。每个模块都用相应抽象类的指针作为系统类的成员，创建这个系统类的时候，new一个具体类的对象，把指针传递给构造函数。我们的原则是——推出一种模块的新型号的时候，不修改类内部的实现，而是创建一个新的类。
- 本题需要给出所需的类，因此不需要给出`main`函数。
- 没有说明的属性就认为他是字符串，后面如果这个属性拆出了更详细的东西，就改成类对象指针。
### 模块拆分
1. 首先拆分模块。根据题意可以了解到，整个培养方案主要由【课程】这个唯一的主体元素构成，每个【课程】包括课程内容、教学形式、教学要求、教学方法、考核方式。每个课程的属性，题干中的表示是“包括”。这个“包括”有两种含义：一种是“一种特征”，比如一辆汽车的特征有颜色、品牌等；另一种是“一种类型“，比如动物可以分类为人、老虎、恐龙等。
2. **所设课程分为核心课程、实验课程和实践课程，亦可分为必修课和选修课。** 这句话给【课程】按照两种标准进行了分类。对于这种多维度分类的要求，考试中一般采用多继承。但是本题中，如果使用多继承，就会出现菱形继承问题，需要采用虚拟继承，避免共同祖先的属性冲突。设所有课程的祖先类都是`Course`，按照上述分类可分为`CoreCourse` `ExperimentalCourse` `PracticeCourse` 和 `RequiredCourse` `ElectiveCourse`。这样，一门课程的继承可以这样编写：
```cpp:line-numbers {13-15}
class Course {
  // ...
};

class CoreCourse: virtual public Course {
  //...
};

class RequiredCourse: virtual public Course {
  // ...
};

class ProgrammingBasics: public CoreCourse, public RequiredCourse {
  // ...
};
```
3. **课程内容设置一般包括课程简介、目标、教学内容和教学要求等内容。** Wait a minute，这个【包括】是哪一种包括？很显然是前者，一门课的设置肯定是要包括这些内容的，后面这些内容很显然不是“一种课程内容”。那么问题来了，这些属性是单独放到一个类，还是直接放到`Course`类？我建议选择后者，首先它们都是【课程内容】，字面意思，课程的内容。而且这是考试，oop的时间还是很紧张的，两个半小时很多人都写不完试卷。因此将上述属性加到该类中：
```cpp:line-numbers
class Course {
  string introduction;
  string goal;
  string context;
  string requirement;
};
```
4. **教学要求一般包括教学形式与方法、考核与成绩评定**。在上面的代码中，我们把【教学要求】作为一个属性安排到了`Course`类中，但题目又给出了更细分的要求。显然这里的包括也是【属性】，我们可以把`requirements`作为一个类指针，指向包含这两大要素的对象；或者直接变成`Course`类包含这二要素。考试中我建议选择前者，毕竟是单独一句话要求的，要给人家一点面子。
```cpp:line-numbers
class Requirement { // [!code ++]
  string form; // [!code ++]
  string method; // [!code ++]
  string examing; // [!code ++]
  string scoring; // [!code ++]
}; // [!code ++]

class Course {
  string introduction;
  string goal;
  string context;
  string requirement; // [!code --]
  Requirement* requirement; // [!code ++]
};
```
5. **教学形式一般包括课堂教学、课堂测验、课外指导、实验等形式；教学方法一般包括讲授法、讨论法、练习法、任务驱动法和自主学习法等；考核方式一般包括平时考核、实验考核和期末考核三种方式；相应成绩评定也由“平时成绩”、“实验课成绩”和“期末考试成绩”三部分组成，所占比例不确定。**【教学形式】【教学方法】【考核方式】【成绩评定】的“包括”明显是后一种，也就是分类。因此可以设计基类`TeachingForm` `TeachingMethod` `ExamingMethod` `ScoringMethod`，再根据题目要求设计相应派生类。注意本题只需要你给出类的体系，不需要你真正实现一个系统，**你不用考虑这几个类之间的交互**，把类定义放在那就行了。最后那个压轴的编程题会要求你给出一个`main`函数测试，你只需要把用得到的几个函数**定义出来**即可，具体怎么实现，后面会请**注释大法**闪亮登场。`Requirement`类的属性都需要升级为类指针，记住一定是基类指针。
6. 每门课的考核往往都是好几个分项加权得到的，题干中也体现了这一点。可以考虑用`vector` `map`这样的STL容器，或者链表、数组都可以。
### 最终解答
综上，本题最终的答案为：
```cpp:line-numbers
class TeachingForm {
  // ...
};

class TeachingMethod {
  // ...
}

class ExamingMethod {
  // ...
}

class ScoringMethod {
  // ...
}

class LectureTeaching: public TeachingForm {
  // ...
}

class LectureQuiz: public TeachingForm {
  // ...
}
// 以下省略剩余两种教学形式，和上面两种是一样的，可以命名为 ExtraGuide Experiment
class Teaching: public TeachingMethod {
  // ...
}

class Talking: public TeachingMethod {
  // ...
}
// 以下省略3种教学方法 Practice WorkDriving SelfLearning
class RegularExaming: public ExamingMethod {
  // ...
}
// 以下省略两种考核方式 ExperimentExaming FinalExaming
class RegularScoring: public Scoring {
  // ...
}
// 以下省略两种成绩评定 ExperimentScoring FinalScoring
class Requirement {
  TeachingForm* form;
  TeachingMethod* method;
  vector<ExamingMethod*> examing;
  vector<ScoringMethod*> scoring;
};

class Course {
  string introduction;
  string goal;
  string context;
  string requirement;
  Requirement* requirement;
};

class TrainingProgramming {
  vector<Course*> courses;
}
```
- 注：如果不是菱形继承，下面的代码会出现编译错误。
```cpp:line-numbers
class A{
public:
	virtual void f(){
		printf("a");
	}
};

class B{
public:
	virtual void f(){
		printf("b");
	}
};

class C:virtual public A, virtual public B{
};

int main(void) {
	C* c = new C;
	c->f();
	return 0;
}
// In function 'int main()':
// request for member 'f' is ambiguous
// candidates are: 'virtual void B::f()'
//                  'virtual void A::f()'
```
## 代码阅读题
一般都是关于类的构造顺序、析构顺序、多态的。基本上必考。
### 问题描述
五、阅读程序，写出程序执行结果。（10分）
```cpp:line-numbers
#include <iostream>
using namespace std;
class M
{
	public:
		M()
		{
			cout << "creating M" << endl;
		}
};
class A
{
		int* a;
		static M m;
	public:
		A(int x)
		{
			a = new int[x];
			cout << "creating A" << endl;
		}
		virtual void func1()
		{
			cout << "in A::func1" << endl;
			func2();
		}
		virtual void func2()
		{
			cout << "in A::func2" << endl;
			func3();
		}
		virtual void func3()
		{
			cout << "in A::func3" << endl;
			func4(1);
		}
		virtual void func4(double dx)
		{
			cout << "in A::func4" << endl;
		}
		virtual ~A()
		{
			cout << "erasing A" << endl;
			delete[] a;
		}
};

M A::m;

class B: public A
{
	public:
		B(int x, int y): A(x)
		{
			b = new int[y];
			cout << "creating B" << endl;
		}
		void func1()
		{
			cout << "in B::func1" << endl;
			func2();
		}
		void func3()
		{
			cout << "in B::func3" << endl;
			func4(1.5);
		}
		void func4(int ix)
		{
			cout << "in B::func4" << endl;
		}
		virtual ~B()
		{
			delete[] b;
			cout << "erasing B" << endl;
		}
	private:
		int* b;
		M m2;
};
void foo(A& ra)
{
	ra.func1();
}
int main()
{
	int i = 2;
	A** att = new A*[i];
	att[0] = new A(1);
	att[1] = new B(2, 2);
	foo(*att[1]);
	for (int j = 0; j <= i - 1; j++)
		delete att[j];
	delete[] att;
}
```
### 构造顺序解析
一个类在构造时，首先要构造它的基类，就像没有爹妈就没有子女、没有恩情就没有朝鲜一样。虚基类的构造优先级最高，**且只构造一次**，即使被多个派生类间接继承。例如：
```cpp
class A {};           // 虚基类
class B : virtual A {};
class C : virtual A {};
class D : public B, public C {};
```
在构造D时，首先会构造A，然后是BC，最后回到A本身。

在单继承中，首先会构造基类。如果初始化列表显式指定了使用的构造函数，则执行该构造函数，但如果没有指定，就执行默认构造函数（没有则报错）。对于多继承，会按照在继承列表中出现的顺序进行构造，**与初始化列表的顺序无关**。基类的构造完毕后，再按照声明的顺序构造各个对象成员，最后构造自身，执行自己的构造函数。

另外还需要注意，如果代码中有静态的对象：静态成员变量不参与对象构造顺序，它们在程序启动时已初始化。全局静态对象（命名空间作用域的静态变量）与类的静态成员对象都属于静态存储期对象，它们的构造（动态初始化）发生在`main` 函数之前，在同一源文件中按照出现的顺序构造。

析构函数的执行，与构造完全相反。做题时，倒过来执行析构函数即可。
### 试题解析
1. 首先检查有没有静态对象：`A`有一个静态成员，类型为`M`。因此，该对象在`main`函数执行前就被构造，输出`creating M`。
2. 进入`main`函数后，首先创建了一个堆区的`A`类对象指针数组，注意这个数组里面装的是指针！`A**`是指向`A`的二级指针，回想一下数组名的本质，这个数组里面都是指向`A`类对象的指针。现在这两个指针都还是`void`。
3. 程序将`att`数组的0号指针指向了一个`A`类对象。分析该对象的构造：无继承，无对象成员。因此可以直接执行自己的构造函数，输出`creating A`。
4. 程序将`att`数组的1号指针指向了一个`B`类对象，`B`是`A`的派生类。分析对象构造：有单继承基类，有非静态对象成员。先执行基类`A`的构造，再执行成员`M`，最后是自己的构造。输出三行：`creating A` `creating M` `creating B`。
5. 程序执行了`foo`函数。这个函数是调用传入的A类对象`ra`的`fun1`方法。传入的是`B`类对象，这就涉及到多态。虽然这里传入的是基类的引用，但是由于A的`func1-4`都是虚函数，这就构成了多态，**要调用派生类的对应函数**。`B`的`func1`调用`func2`，但是`B`没有覆盖`func2`的定义，因此依旧执行`A`的`func2`。虽然`func2`执行的是`A`的版本，但是调用中如果还有虚函数，仍然要执行B的版本。因此，后续依次会执行`B`的`func3` `func4`。输出`in B::func1` `in A::func2` `in B::func3` `in B::func4`四行。
6. 最后来到析构部分。如上所述，析构函数的执行顺序和构造函数的执行顺序完全相反。之前我们提到过，`A`只执行自己的构造函数；`B`先执行A的构造函数，再执行`B`自己的构造函数，那么B的析构顺序就是先`B`后`A`。`att`数组中的两个对象依次被删除，A被删除时输出`erasing A`；`B`被删除时先输出`erasing B`再输出`erasing A`。

因此，最终的输出结果为：
```
creating M
creating A
creating A
creating M
creating B
in B::func1
in A::func2
in B::func3
in B::func4
erasing A
erasing B
erasing A
```
## 补全代码
相对于编程题，增加了更多的语法细节问题。
### 问题描述
六、补充设计一个小汽车类Car，并能支持完成以下代码调用的相应功能。（10分）
```cpp:line-numbers
#include <iostream>
using namespace std;
class Car
{
		char* pName;/*发动机名字*/
		int iId;/*车架号，自动产生具有唯一性*/
		int iI;/*行车里程数，初始化为0*/
	public:
		/*需要补充的代码*/
};
void main()
{
	Car c1("捷达发动机");
	Car c2("奥迪发动机");
	Car c3(c1);
	c3 = c1;
	c2 = c2 + 3;/*又跑了3公里*/
	++c2;/*又跑了1公里*/
	cout << c2 << endl; /*输出小汽车c2的信息*/
}
```
### 问题分析
问题看似很简单，其实也不难。关键的问题在于要找到问题的关键，如果我们在关键时刻找不到问题的关键，我们看问题的抓手不在关键的领域、关键的问题上，就很难找到问题的关键。那么问题的关键在哪里呢？就在我们亲爱的`main`函数上。如果你把这个代码放到IDE里面，他一定会回报给你满屏的红色错误消息。但是考试时我们可没有IDE，对于这个`main`函数，也只能逐条分析了。
1. `Car c1("捷达发动机");` `Car c2("奥迪发动机");` 显然是在初始化对象，用一个有参的构造函数。根据语文阅读理解知识可以得到，这两行的代码解决的是同一个问题，就是给汽车安装一个发动机。至于另外两个属性，一个是自动产生，这个可以用随机数模拟一下，或者用时间戳，然后加上注释，点到为止；一个默认为0，直接赋值即可。因此我们需要补充的构造函数就是：
```cpp:line-numbers
#include <iostream>
using namespace std;
class Car
{
		char* pName;/*发动机名字*/
		int iId;/*车架号，自动产生具有唯一性*/
		int iI;/*行车里程数，初始化为0*/
	public:
		Car(char* name){ // [!code ++]
      this->pName = name; // [!code ++]
      iI = 0; // [!code ++]
      iId = random(); // 用随机数模拟生成  // [!code ++]
    } // [!code ++]
}; // [!code ++]
void main()
{
	Car c1("捷达发动机");
	Car c2("奥迪发动机");
	Car c3(c1);
	c3 = c1;
	c2 = c2 + 3;/*又跑了3公里*/
	++c2;/*又跑了1公里*/
	cout << c2 << endl; /*输出小汽车c2的信息*/
}
```
2. `Car c3(c1);`是在尝试调用一个拷贝构造函数，注意最好是使用深拷贝。
```cpp:line-numbers=8
// ...
		Car(char* name){
      this->pName = name;
      iI = 0;
      iId = random(); // 用随机数模拟生成
    }

    Car(const Car& c){  // [!code ++]
      strcpy(this->pName, c.pName);  // [!code ++]
      this->iI = c.iI;  // [!code ++]
      this->iId = this->iId;  // [!code ++]
    }  // [!code ++]
// ...
```
3. `c3 = c1;` `c2 = c2 + 3;` `++c2;` 属于运算符重载，需要重载3个运算符：`=` `+` `++`。注意这里的自增是前置自增，也就是`++`在前面的，不需要加`int`。注意主函数中的注释，两个车对象的相加只加里程。
```cpp:line-numbers=19
// ...
    void operator=(const Car& c) { // [!code ++]
			if (this->pName != c.pName) { // [!code ++]
				strcpy(this->pName, c.pName); // [!code ++]
			} // [!code ++]
			this->iI = c.iI; // [!code ++]
			this->iId = this->iId; // [!code ++]
		} // [!code ++]
 // [!code ++]
    Car operator+(const Car& c) { // [!code ++]
			Car newCar(c.pName); // [!code ++]
			strcpy(newCar.pName, this->pName); // [!code ++]
			// 由于题干中没有定义应该怎么处理车架号、发动机，所以可以自由发挥一下 // [!code ++]
			newCar.iI = this->iI + c.iI; // [!code ++]
			newCar.iId = this->iId; // [!code ++]
			return newCar; // [!code ++]
		} // [!code ++]
 // [!code ++]
    Car operator+(const int& x) { // [!code ++]
      Car newCar(this->pName); // [!code ++]
      newCar.iI = this->iI + x; // [!code ++]
      newCar.iId = this->iId; // [!code ++]
      return newCar; // [!code ++]
    } // [!code ++]
 // [!code ++]
    Car operator++(){ // [!code ++]
      Car newCar(this->pName); // [!code ++]
      this->iI++; // [!code ++]
      newCar.iId = this->iId; // [!code ++]
      return newCar;  // [!code ++]
    } // [!code ++]
// ...
```
4. `cout << c2 << endl;` 同样是运算符重载。**注意流对象的操作。** 但由于流对象在左边，我们需要使用非成员函数的重载；但是Car类的属性都是私有，因此还需要添加getter，详见最终答案的代码。
```cpp:line-numbers=46
// ...
    ostream& operator<<(ostream& os){ // [!code ++]
      os << "车架号："<< this->iId << "，发动机型号：" << this->pName << "，里程数：" << this->iI; // [!code ++]
      return os; // [!code ++]
    } // [!code ++]
// ...
```
### 最终答案
```cpp:line-numbers
#include <iostream>
#include <string.h>
using namespace std;
class Car {
		char* pName;/*发动机名字*/
		int iId;/*车架号，自动产生具有唯一性*/
		int iI;/*行车里程数，初始化为0*/
	public:
		Car(char* name) {
			this->pName = name;
			iI = 0;
			iId = rand(); // 用随机数模拟生成
		}

		Car(const Car& c) {
			this->pName = new char[strlen(c.pName) + 1];
			strcpy(this->pName, c.pName);
			this->iI = c.iI;
			this->iId = this->iId;
		}

		void operator=(const Car& c) {
			if (this->pName != c.pName) {
				strcpy(this->pName, c.pName);
			}
			this->iI = c.iI;
			this->iId = this->iId;
		}

		Car operator+(const Car& c) {
			Car newCar(c.pName);
			strcpy(newCar.pName, this->pName);
			// 由于题干中没有定义应该怎么处理车架号、发动机，所以可以自由发挥一下
			newCar.iI = this->iI + c.iI;
			newCar.iId = this->iId;
			return newCar;
		}

		Car operator+(const int& x) {
			Car newCar(this->pName);
			newCar.iI = this->iI + x;
			newCar.iId = this->iId;
			return newCar;
		}

		Car operator++() {
			Car newCar(this->pName);
			this->iI++;
			newCar.iId = this->iId;;
			return newCar;
		}

		char* getpName() {
			return pName;
		}

		int getiI() {
			return iI;
		}

		int getiId() {
			return iId;
		}
};

ostream& operator<<(ostream& os, Car& c) {
	os << "车架号：" << c.getiId() << "，发动机型号：" << c.getpName() << "，里程数：" << c.getiI();
	return os;
}
int main() {
	Car c1("捷达发动机");
	Car c2("奥迪发动机");
	Car c3(c1);
	c3 = c1;
	c2 = c2 + 3;/*又跑了3公里*/
	++c2;/*又跑了1公里*/
	cout << c2 << endl; /*输出小汽车c2的信息*/
}
```
- 注：其实不用太在意细节问题，这个考试属于点到为止的那种。

## 综合设计题
本质上就是增强版的编程题，但是需要一点细节。相比于编程题没有什么变化，只不过需要你组织一下这些类，实现某种功能。当然，这里的“实现”属于画大饼，也就是给几个函数，里面写上注释就等于你已经实现了这个功能。对象之间互相调用一下，这就是功能的实现。类的定义这里不做过多介绍，参考上面的编程题即可。这里主要讲怎么画大饼，或者叫怎么“实现”。
### 问题描述
七、综合编程题。（12分）

各大通信运营商提供的手机运营业务主要包括通话业务、流量业务、短信业务等等。不同的业务具有不同资费方案，例如不同运营商具有不同通话业务资费标准，根据用户的不同需求还提供有月租套餐、包年套餐等，月租套餐一般包括基本的月基本费用（常规包含一定的本地或异地通话时间和数据流量），超出部分主叫费用/分钟和费用/流量等。（具体业务资费规则可参考同学自己的资费情况）。随着手机业务需求的不断发展，允许新的运营加入竞争，并可能推出新的业务类型，新的资费方案，特别是5G即将全面上线，对于流量业务资费影响颇大。

请你设计并实现手机业务管理系统，请以收费为关注点设计类的体系和主要接口，并给出调用程序（比如main函数）模拟张同学在2019年1月到2019年6月期间手机业务的费用情况。

### 问题分析
和编程题一样，我们需要的还是一个“类继承体系”。业务目前有三种，也就是通话、流量和短信。套餐目前有月租和包年套餐两类。根据我们平时使用运营商套餐的经验来看，题目中提到的业务资费标准应该是最基础的费用，也就是没有套餐时的收费标准，比如移动流量套餐外流量1M收费0.29元。套餐往往是包含一定的业务量的优惠价格，比如20G流量、50分钟通话、50条短信。题目中还提到要允许新的运营商加入，因此还需要设计运营商类。

注意到题目中提到我们的关注点是**收费**，因此我们的每个业务对象中都得有一个计费的接口。我们的类可以这样设计：

- 所有业务类派生于业务基类`AbstractBusiness`，派生的业务可以有`CallingBussiness` `InternetBusiness` `MessageBussiness`。抽象基类含有业务收费标准成员`singleCharge`，包含纯虚函数`charge(int used)`，对该项业务的无套餐情况进行收费。例如：
```cpp:line-numbers
class AbstractBusiness {
private:
  float singleCharge;
public:
  virtual float charge(int used)=0;
  // ...
}

class CallingBusiness {
  public:
  CallingBusiness(float singleCharge = 0.19) {
    // 设置套餐外通话单价
    this->singleCharge = singleCharge;
  }

  float charge(int used) {
    // 假设按秒计算通话时长，但是按照分钟收费
    return ceil(used / 60) * singleCharge;
  }
}

class InternetBusiness {
  public:
  InternetBusiness(float singleCharge = 0.29) {
    // 设置套餐外费用单价
    this->singleCharge = singleCharge;
  }

  virtual float charge(int used) {
    // 假设按KB计算流量，但是按照MB收费
    return ceil(used / 1024) * singleCharge;
  }
}
```
为什么要刻意采取一些单位变换的手段，让各个派生类的函数看起来不一样呢？因为oop的一个重要考点就是多态，这道题很大程度上，老师关注的就是多态这个点你有没有掌握。从同一个基类派生出的子类，在被调用同一个接口时会产生不同的行为，这是你实现了多态的重要标志。
- 所有运营商基于抽象基类`MobileOperator`，那么我们可以有`ChinaMobile` `ChinaUnion` `ChinaTelecom`等运营商类。**不同运营商具有不同通话业务资费标准**，也就是说业务类应该放到运营商里面，作为一个没有套餐时的基础定价。显然不能仅有三个业务，因为题目要求业务类型是可扩展的。如果只有三个业务指针，加入一个新的业务（比如彩信）就需要所有运营商类都做修改。但是这样一来又带来了新的问题，如何找到对应的业务进行收费呢？我们选择使用STL容器`map`实现，你也可以用两个数组，一个存放业务名称，一个存放业务对象指针，效果是一样的。下面代码中的`vector`你也可以替换为数组，都是一样的效果。
```cpp:line-numbers
class MobileOperator {
private:
  map<string, Business*> bs;
public:
  void addBusiness(string name, Business* b) {
    // 运营商公司添加一种业务
    bs[name] = b;
  }

  virtual float charge(string name, float used) {
    // 计算套餐外业务产生的费用
    return bs[name]->charge(used);
  }
}

class ChinaMobile: MobileOperator{
  // 中国移动派生类，可对套餐外收费细化定制
}
```
- 套餐`Plan`可以派生`MonthlyPlan` `AnnuallyPlan`。套餐里面需要包含各种业务，计算套餐内的费用；需要知道这是哪个运营商推出的套餐，收取套餐外费用。因此，`Plan`需要有成员存储运营商对象和业务对象。由于后续还可能产生其他的业务，显然我们不能定死一个套餐只有三种业务；套餐还有限额，超出后按照套餐外标准收费。考虑用STL容器`map`实现，存放业务名称和套餐限额的对应关系。当然，你也可以用两个数组实现，一个数组放业务的名称，另一个放各个套餐的限额。
- 题目没有要求多个运营商联合推出套餐，只要求允许加入新的运营商，我们显然已经满足了这个需求。
```cpp:line-numbers
class Plan {
private:
  map<string, int> bus; // 套餐名称与限额
  MobileOperator* mo; // 运营商，处理套餐外费用
  float planCharge; // 套餐固定费
public:
  Plan(MobileOperator* mo) {
    // 设置运营商
    this->mo = mo;
  }

  void addBussiness(string name, int maxuse){
    // 为套餐添加业务和额度
    bus[name] = maxuse;
  }

  void setPlanCharge(float planCharge) {
    // 设置套餐基本费用
    this->planCharge = planCharge;
  }

  virtual float singleCharge(vector<string> names, vector<float> used) {
    // 单个套餐周期的收费
    float total = planCharge; // 先收套餐费
    for (int i = 0;i < names.size(); i++) {
      // 逐个业务收取费用
      if (bus[names[i]] <= used[i]) {
        // 如果没用完套餐，则无需收取套餐外费用
        continue;
      }
      else {
        // 收取套餐外费用，需要减掉套餐内额度
        total += mo->charge(names[i], used[i] - bus[names[i]]);
      }
    }

    return total;
  }

  virtual float charge(vector<string> names, vector<vector<float> used>) {
    // 用二维数组实现多个套餐周期的收费
    float total;
    for (int i = 0; i < names.size(); i++) {
      total += singleCharge(names[i], used[i]);
    }
  }
}

class MonthlyPlan: public Plan {
  // 包月套餐，与上述规则大致相同
}

class AnnuallyPlan: public Plan {
  // 统计全年每项业务的消费，按年计费
  float charge(vector<string> names, vector<vector<float> used>) {
    float total = planCharge;
    // 各项业务先设为0消耗
    vector<float> annually_used(names.size(), 0);
    for(int i = 0; i < names.size(); i++) {
      // 逐业务统计这段时间内使用了多少业务量
      for(int j = 0;j < used.size(); i++) {
        // 加单月的单个业务使用量
        annually_used[i] += used[j][i];
      }
    }
    for (int i = 0;i < names.size(); i++) {
      if (bus[names[i]] <= annually_used[i]) {
        // 未超出套餐额度则不额外扣费
        continue;
      }
      else {
        // 对套餐外部分收费
        total += mo->charge(names[i], annually_used[i] - bus[names[i]]);
      }
    }
    return total;
  }
}

int main(void) {
  Mobile* cm = new ChinaMobile();
  cm->addBusiness("通话", new CallingBussiness);
  cm->addBusiness("流量", new InternetBussiness);
  cm->addBusiness("短信", new MessageBusiness);
  Plan* p = new MonthlyPlan(cm);
  p->addBusiness("通话", 60*50);
  p->addBusiness("流量", 20*1024);
  p->addBusiness("短信", 50);
  p->setPlanCharge(8);
  vector<string> names = {"通话", "流量", "短信"};
  vector<vector<float>> used = {{888, 9999, 114}, {1234, 5678, 5}, {1145, 1419, 8}, {1611, 1645, 16}, {888, 999, 77}};// 考试的时候随便编几个数据
  p->charge(names, used);
}
```
- 以上代码合起来，就是最终的答案了。
- 但是我们往往没有时间设计这样的细节，在考试时间不足的情况下，我们需要简单粗暴的解决方法——注释大法。看到代码里面的那些注释了吗？如果你没有时间去考虑这么多细节了，比如用数组还是vector，那就用最简单的方法、你最熟悉的方法。然后，在没时间实现的函数里面，粗暴的填充大量注释。**体现多态性的函数最好不要。** 因为这个题的考点就是多态，你摆出类继承体系和多态的关注点函数就已经拿到大部分的分数了。
- 你不用考虑数组越界、空指针什么的，即使你用的是最原始的数组，那也不要紧，因为这个大题看的就是你的继承体系和多态的掌握情况。直接循环就行，点到为止，能表达出那个意思即可。所以你没学过STL也不要紧，这只是我刷太多力扣养成的习惯，该咋样咋样就行。

## 后记
- OOP是一门以背诵为基础的学科，前面的小题才是难点，需要你非常熟悉PPT上面的知识点。
- 祝你满绩通关OOP！
- 需要用的函数随便用，不用管什么头文件。至于这个函数是什么功能，由你的注释决定。非常的唯心主义，不是吗？
