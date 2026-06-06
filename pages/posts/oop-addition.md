---
layout: post
title: 面向对象程序设计试卷大题解析（第二弹）
date: 2026-05-30 19:56:50
categories: 学习
excerpt: OOP考试中可能遇到的其他大题解析
cover: https://i.ibb.co/DfQgQG1f/176.jpg
codeHeightLimit: 1000
tags:
  - 编程
  - 学习
  - 考试
  - 吉林大学
  - C++
---
# 面向对象程序设计试卷大题解析（第二弹）
鉴于上一篇关于OOP考试的文章[面向对象程序设计试卷大题解析](./oop-test-paper.md)有计算机学院的部分题型没有照顾到，猫娘收集了部分奔腾等资料上的真题，对上一篇文章没有涉及到的题型进行进一步解析。

## 接口转换
> 如今望向你眼眉，却看不到那熟悉的谁。——《落花霁》
### 问题描述
四、(5分)某绘图程序已存在矩形(Rect)、椭圆(Ellipse)两种图形元素。现要将三角形(Triangle)图形元素加入该程序以实现功能扩充。已知某第三方类库中提供了XTriangle类，且完全满足程序新增的Triangle图形元素所需的功能，但XTriangle不是由Shape派生而来，而且由于缺少XTriangle类的源代码，不能从XTriangle类直接派生子类。请在下边给出的类的基础上，利用XTriangle类，定义并实现Triangle类。
```cpp:line-numbers
class Shape {
	public: virtual ~Shape( ){ }
	virtual void Draw( )=0;
};
class Ellipse: public Shape{
	public: virtual ~ Ellipse ( ) { }
	virtual void Draw ( ) { /*略 */ }
};
class Rect: public Shape {
	public:
	Rect ( ) { /*略 */}
	virtual ~Rect ( ) { }
	virtual void Draw ( )  { /*略 */ }
};
//第三方类库中提供的XTriangle类定义
class XTriangle {
	public:
	virtual ~ XTriangle ( );
	void DrawIt( ) ;
};
```
### 问题分析
首先我必须再次强调，OOP的大部分大题就是在画大饼，尤其是这种看起来高深莫测的题目，不要被看起来高端的需求吓到。没接触过这类东西的开发很正常，而且我相信找到这里来的同学绝大部分都是来突击的，可能有的同学会感觉很困难，但其实这一切都只是纸老虎。

回到正题，题目中指出我们需要实现三角形类，但是现有的类库无法被继承，而这个类恰好又满足我们的需求。另外，我们是在把三角形**扩充到**现有的程序中， **注意到** 椭圆和矩形类都是派生于`Shape`的，按照人教版小学三年级数学《找规律》这一章的知识，我们自然会 **注意到** 这个三角形类是需要加入到现有的类继承体系中的，也就是说我们的目的是设计一个既派生于`Shape`类，又具有`XTriangle`全部功能的类。

具有另一个类的全部功能，可能你第一时间会想到使用继承，但是很遗憾，继承被ban掉了。那么，有没有其他办法实现这个需求呢？友元肯定也不行，因为`XTriangle`类来自于第三方类库，没有代码，我们不可能给它添加友元。如果把一个 `XTriangle`类的对象作为`Triangle`类的成员呢？**注意到** `XTriangle`类的定义中，其绘图函数是公有的无参函数，而我们的基类`Shape`恰好与之结构相同，因此我们可以想到，让`Triangle`被调用到`Draw()`方法时，把这个任务外包给`XTriangle`类的`DrawIt()`方法，这样就成功完成了任务。因此，这个思路是可行的。我们可以这样编写`Triangle`类：
```cpp:line-numbers
class Triangle{
private:
  XTriangle* xt;
public:
  Triangle() {
    this->xt = new Xtriangle();
  }

  Draw() {
    xt->DrawIt();
  }

  ~Triangle() {
    delete xt; // 自己产生的对象要记得释放掉哦
  }
};
```
这种设计类的方法体现了设计模式中**适配器模式**的思想。比如有的手机只有Type-C接口，移除了3.5mm耳机接口，但是我们想要使用有3.5mm耳机，这时候我们就需要使用一根转接线把这个不适配的接口转换到适配的接口。回到本题，`XTriangle`类提供的接口在我们调用`Shape`类时，是无法被直接调用的，这就可以理解为接口的不兼容。我们通过一个“转接线”`Triangle`类将它转换到我们可以通过基类`Shape`使用的接口，这就完成了我们的需求。

## 代码阅读II
这是一类相对简单的代码阅读题，需要你理解题目中给出的类继承体系，并举出实际例子。近年真题考察较少。
> 天淡天青，宿雨沾襟。——《棠梨煎雪》
### 问题描述
五、(5分)现请你使用文字，描述一个实际问题，使得该问题是对应于下表中代码的一个应用例子，同时请指出你所描述的问题中分别与A、B、C、D、E、F、f、g具有对应关系的事物或行为。

```cpp:line-numbers
class D
{
	public:
		virtual ~D( );
		virtual void g( ) = 0;
};
class E: public D
{
	public:
		virtual ~E( );
		virtual void g( ) { /*略*/ }
};
class F: public D
{
	public:
		virtual ~F( );
		virtual void g( ) { /*略*/ }
};
class  A
{
	public:
		virtual ~A( );
		virtual void f(D&) = 0;
};
class B: public A
{
	public:
		virtual ~B( );
		virtual void f(D& d)
		{
			d.g( ); /*其它代码略*/
		}
};
class C: public A
{
	public:
		virtual ~C( );
		virtual void f(D& d)
		{
			d.g( ); /*其它代码略*/
		}
};
```
### 问题分析
分析代码中的继承关系，很容易发现`E`,`F`派生于`D`，`B`,`C`派生于`A`，`D`类提供了`g()`虚函数，`A`类提供了`f()`虚函数接收一个`D`类对象，`f()`的两个子类实现都是在内部调用了被传入的`D`类对象的方法`g()`。

因此，`A`系列的类和`D`系列的类，是一种“使用”的关系，或者叫依赖关系。`D`不是`A`的一部分，但`A`需要`D`类对象完成某些功能。这样的例子有很多，比如人使用手机，而人可以分为不同的职业，手机又可以分为不同品牌。

### 答案（不唯一）
实际问题：人使用手机。A类代表人类，其派生类代表不同职业的人；D类代表手机，其派生类表示不同的手机品牌。例如，A代表手机，B代表工人，C代表农民，D代表手机，E代表华为手机，F代表小米手机，f代表人浏览手机内容，g代表手机显示内容。

## 补全代码II
### 问题描述
七、 (10分)填写代码。
::: code-group
```cpp:line-numbers [类定义]
#include <iostream.h>
class CallBackObject;
class Server {
	public:
		Server(int size) : len(size) {
			____1____;
			for (int i = 0; i < len; ++i)
				data[i] = i + 1;
		}
		~Server( ) {
			____2____;
		}
		int Total(CallBackObject& obj);
	private:
		int  len;
		int * data;
};
int Server::Total(CallBackObject& obj) {
	int sum = 0;
	for (int i = 0; i < len; ++i) {
		____3____;
	}
	return sum;
}
class CallBackObject {
	public:
		virtual ~CallBackObject( ) {}
		____4____;
};
class ClientA: public CallBackObject {
	public:
		virtual ~ClientA( ) {}
		virtual int CallBackFunc(int val) {
			return val;
		}
		void RequestA(Server& srv) {
			cout << ____5____ << endl;
		}
};
class ClientB: public CallBackObject {
	public:
		virtual ~ClientB( ) {}
		virtual int CallBackFunc(int val) {
		____6____;
		}
		void RequestB(Server& srv) {
		____7____;
		}
};
```
```cpp:line-numbers [主函数1]
void main( ) {
  Server   srv2(2),srv5(5);
  ClientA  a;
  a.RequestA(srv2);  //输出3
  a.RequestA(srv5);  //输出15
}
```
```cpp:line-numbers [主函数2]
void main( ) {
	Server   srv2(2), srv3(3);
	ClientB  b;
	b.RequestB(srv2);
	b.RequestB(srv3);
}
```
:::
1.(5分)请分别给出空格1-5中正确的代码，使得主函数1的输出为3和15.

2.(2分)请分别给出空格6-7中正确的代码，使得主函数2的输出为：

平方和=5

平方和=14

3.(3分)请重新实现ClientB中的相关函数，使得主函数2的输出为：

1  2  的平方和=5

1  2  3  的平方和=14
### 问题分析
与第一篇不同的是，这道题目限制性较强，是代码挖空形式，对代码上下文的理解要求更高，因此完全不能采用注释逃课的方法。我们需要根据给出的主函数判断需要填充的内容。

1. 首先注意，1、2两问虽然要求补全的代码不同，但是二者都创建了`Server`类对象，空白1-5会影响两问的行为。
2. 先解决第一问。**注意到** `Server`类的定义中，包含`int`型变量`len`和指向`int`的指针`data`。结合该类构造函数，我们发现该构造函数中包含对`data`数组遍历的行为，因此可以确定`data`指向了一个数组。既然没有对该数组初始化的代码，且遍历循环次数为`len`，显然该数组的长度就是`len`。因此第一空填写`data = new int[len]`。构造函数中的行为，正是给`data`数组赋值为为首项，公差为1的等差数列1,2,3…
3. 析构函数在考试中的作用一般是两个，输出一些信息、释放自身成员中指针指向的堆内存空间，其中后者在需要编写代码的题目中更为常见——自己制造的垃圾自己清理。`Server`类创建了数组`data`，需要释放。因此第二空填写`delete[] data`
4. 第三空是在类外定义的函数`int Server::Total(CallBackObject& obj)`中出现的。CallBack的含义是*回调函数*，通常用于一个函数作为参数被传递给另一个函数，在特定时刻被调用。不知道回调函数或者Callback是什么也不要紧，我们看函数内部的代码。`sum`很显然是一个什么东西的总和，而且是遍历某个数组后的求和。我们在该函数中能访问到的数组只有`data`，因此被遍历的数组只能是`data`。看到第2、3问的提示“平方和”，想必很多人能想到这个遍历执行的是一个数列求和操作，而循环体中间的第三个空白正是将数列的每一个值增加到`sum`上。**注意到**派生于`CallBackObject`的`ClientA`，它的`CallBackFunc()`方法直接返回了输入参数`val`，这就是数列$a_n = n$，第一问的结论告诉我们，调用`ClientA`类得到的数列前2项和为3，前5项和为15，印证了我们的猜想。因此，第三空是在调用`CallBackFunc()`方法计算数列中第i个元素的值，并且增加到`sum`上，所以应当填写`sum += obj.CallBackFunc(data[i])`
5. 可能有人**注意到**基类`CallBackObject`并没有`CallBackFunc()`方法。没关系，第四空正好在该类的公有部分，把这个函数定义补上就行了。因此，第四空填写`virtual int CallBackFunc(int val)=0`，或者给一个空定义也行。
6. 根据题目给出的输出结果，`ClientA`只需要输出数列求和的结果即可。这个空缺处的类型肯定是一个`int`型。问题来了，怎么让`srv`去执行我们的数列通项公式呢？我们需要传入的是`CallBackObject`类对象，而在这里我们能接触到的该类及其派生类的对象只有自己，也就是`*this`。把`*this`传入后，由`srv`调用`CallBackFunc()`计算数列和。这就是回调函数——传入一个函数，需要时调用它完成特定的任务。因此，第五空填写`srv.Total(*this)`。
7. 根据上面的分析，很明显`CLientB`计算的是数列$a_n = n^2$的前n项和，第6空填写`return val * val`即可。
8. 第7空本质上与第5空差别不大，都是输出结果，只不过需要添加汉字提示。填写`cout << "平方和=" << srv.Total(*this) << endl`即可。
9. 第三问注意我们需要 **重新实现** 函数，这意味着我们不能新增其他函数或者删除现有的函数。注意到与第二问的区别无非就是输出了数列各项的值，找一个遍历的地方加上即可。两个函数中，`CallBackFunc()`是被`srv`遍历执行的，可以在这里加上，也可以在`RequestB`中加入一个循环。
```cpp:line-numbers
class ClientB: public CallBackObject {
	public:
		virtual ~ClientB( ) {}
		virtual int CallBackFunc(int val) {
		  cout << val << " ";
      return val * val;
		}
		void RequestB(Server& srv) {
      n = srv.Total(*this);
      cout << "的平方和=" << endl;
		}
};
```
## 单例模式/多例模式
单例/多例模式的本质是控制对象访问，通常是将构造函数设为私有，再编写静态公有函数，用于创建本类的对象。
### 问题描述
（2018·计算机学院，8分）请重新实现下面给出的Conn类，确保该类的实例对象至多只能存在三个。
```cpp:line-numbers
class Conn {
  public:
    Conn() {/* ... */}
    ~Conn() {/* ... */}
    void doAction() {/* ... */}
};
```
### 问题分析
单例/多例模式比较套路化，都是把构造函数放到私有成员，这样的类无法直接构造，且不能被继承。如果需要这个对象，则使用静态成员函数创建，并将对象计数+1。注意多例模式中，当对象被析构时，要将对象计数减1。
```cpp:line-numbers
class Conn {
private:
	Conn() {/* ... */}
public:
	~Conn() {
		instanceCount--;
	}
	void doAction() {/* ... */}
	static int instanceCount;
	static Conn* getInstance() {
		if(instanceCount < 3) {
			instanceCount++;
			return new Conn;
		} else {
			return nullptr;
		}
	}
};

int Conn::instanceCount = 0;
```

单例模式又分为”饱汉“和”饿汉“两类。饱汉式是在需要这个对象时才创建，饿汉式则是提前创建出所需的对象，需要时直接返回指针。

## 重构
要求对给出的代码进行重构，提高其扩展性，计算机学院考察较多。
> 在这老街回眸，烟云中追溯我是谁，只消暮雨点滴，便足以粉饰这是非。——《霜雪千年》
### 问题描述
八、 (共12分)小王根据应用的需要，定义并实现了一个适用于特殊格式的图形类(MyPic)，其主要功能包括根据给定的输出选项向指定的设备输出图形。Printer(打印机),Bitmap(位图),Point(点)都是类库中的预定义类。类MyPic的部分代码如下所示：
```cpp:line-numbers
class MyPic {
	public:
  //根据指定的页边留白和对齐方式(居中/左对齐)等输出选项，输出到打印机
		bool SendTo(Printer& printer, int marginLeft, int marginTop, int marginRight, int marginBottom, int alignKind)      {  /* 略 */  }

//根据指定的页边留白和对齐方式(居中/左对齐) 等输出选项，输出到打印机
//其中一个Point对象表示一个具有（x,y）坐标的点
		bool SendTo(Printer& printer, Point marginLT, Point marginRB, int alignKind)   {
			return SendTo(printer, marginLT.x, marginLT.y, marginRB.x, marginRB.y, alignKind);
		}
		//根据指定的起始偏移、透明度和位操作掩码等输出选项，输出到位图
		bool SendTo(Bitmap& bmp, int xOffset, int yOffset, int transparent, int mask)      {  /* 略 */  }  // 其它略
};
```
对于MyPic类，小王发现重载的SendTo函数和过长的参数表影响了使用的方便性。小王希望通过对参数表中多个参数的进一步抽象，去掉函数重载，使类中只有一个SendTo函数，并使该函数只有一个参数。重新设计时，小王需要考虑如下的实际情况：

a. Printer、Bitmap等类是第三方类库中预先定义好的，无法得到完整的源代码，因此不能从Printer、Bitmap等类直接派生新的子类；

b.以后肯定还要继续增加新的输出选项，如增加打印方向选项(横打/竖打)等；

c.以后肯定还要增加其它的输出设备，如文件、视窗、晒图仪等；

请回答：
1. (8分)请你修改类MyPic的设计，使新设计满足小王的愿望。可以增加你认为必要的类，要求给出完整的设计方案或示例代码。
2. (2分)请说明在你的方案中，如何适应实际情况b？
3. (2分)请说明在你的方案中，如何适应实际情况c？
### 问题分析
我们面临的问题是：重载函数的参数表太长，希望把参数进一步抽象，并不再使用函数重载。重构一个程序，首先要搞清楚这个程序是干什么的，熟悉其内部的业务逻辑。`MyPic`类根据其字面意思和题设条件，可以得知它是一个自定义的图形类，而`SendTo()`方法的功能是向某种设备输出图像。观察三个重载`SendTo()`方法的形式，我们能够发现这三个重载函数的形式都是：第一个参数表示该图像需要被输出到的设备，后面的各个参数都是对这个输出操作做一些具体的调整，而且这些参数只在输出过程中使用，对这个图片自身实际上没有什么意义，都是对输出设备的参数进行调节。

**去掉函数重载，使类中只有一个SendTo函数** 很明显是在让我们使用多态实现，因为这些方法所做的事是类似的，只不过需要的参数不同，输出到的设备不同，在行为上有一定差别。**注意到** 要求c中指出今后会增加更多输出设备，因此我们一定是需要给各种设备设计一套继承体系的，比如`BaseDevice`类作为所有设备的基类，包含虚函数`Print(MyPic& mp)`，`PrinterDevice` `BitmapDevice`分别作为打印机和位图设备对应的派生类。那么如何统一各种设备所需的参数呢？参考前面【接口转换】的内容，在本题中，`Printer`和`Bitmap`也是相似的情况，不能被继承，也没有源代码，因此我们依旧把输出的任务外包给这些外部类库，将它们作为一个成员去调用。回到`MyPic`类，`SendTo()`方法就可以保留唯一参数，也就是设备，即改造为`SendTo(BaseDevice& bd)`，内部调用`bd.Print(*this)`即可。

但是如何解决参数的差异，并实现要求b的新参数呢？前面我们提到过，这些参数调整的都是设备的行为，与图像本身无关，我们应该在设备类上做调整。在当前代码中仅有两种设备，二者所需的参数已经有了很大差异，很明显我们是不能在基类中加入这些参数作为数据成员的，这样会使得不需要某些参数的设备也被强行加入这些参数。比如打印机不需要透明度，但是构造打印机时仍然需要传递这个参数，这就很麻烦，不利于维护。因此我们选择在各个子类中加入`setMargin()` `setTransparent()`这样的setter函数，来为具体的设备设定相关参数。

相同的一种设备在今后又加入了更多参数怎么办？很简单，我们可以视作是一种升级版的设备，例如打印机加入了单双面打印，可以由`PrinterDevice`类派生子类`PrinterDeviceV2`，添加`isDoublePrint`数据成员即可。至于具体怎么打印，这就不是我们需要解决的事了，而且原代码中也没有提到，用注释说明一下即可。

因此，最终的改造方案是：设计设备基类，具有打印接口；各重载函数中的参数（设备除外），移动到对应的设备类中，`MyPic`类仅保留设备一个参数；已有设备添加新参数时，设计升级版类继承原有设备类；新设备继承设备基类即可。

### 最终解答
注意，下面的注释不是让你补充代码。
1.
```cpp:line-numbers
class MyPic;
class BaseDevice {
public:
  BaseDevice(){}
  virtual ~BaseDevice(){}
  virtual bool Print(MyPic& pic) = 0;
};

class MyPic {
public:
  bool SendTo(BaseDevice& device) {
    return device.Print(*this);
  }
};

class PrinterDevice: public BaseDevice {
private:
  Printer* pt;
  int marginLeft;
  int marginRight;
  int marginTop;
  int marginBottom;
  int alignKind;
public:
  PrinterDevice() {
    pt = new Printer(); // 根据类库需求填充参数
  }

  virtual ~PrinterDevice() {
    delete pt;
  }

  bool Print(MyPic& pic) {
    // 原来的打印业务逻辑
  }

  void setMarginLeft(int marginLeft){
    this->marginLeft = marginLeft;
  }

  void setMarginRight(int marginRight){
    this->marginRight = marginRight;
  }

  void setMarginTop(int marginTop){
    this->marginTop = marginTop;
  }

  void setMarginBottom(int marginBottom){
    this->marginBottom = marginBottom;
  }

  void setAlignKind(int alignKind){
    this->alignKind = alignKind;
  }

  void setMarginLT(Point& marginLT) {
    this->marginLeft = marginLT.x;
    this->marginTop = marginLT.y;
  }

  void setMarginRB(Point& marginRB) {
    this->marginRight = marginRB.x;
    this->marginBottom = marginRB.y;
  }
};

class BitmapDevice: public BaseDevice {
private:
  Bitmap* bm;
  int xOffset;
  int yOffset;
  int transparent;
  int mask;
public:
  BitmapDevice() {
    bm = new Bitmap();
  }

  virtual ~BitmapDevice(){
    delete bm;
  }

  bool Print(MyPic& pic) {
    // 原来的打印业务逻辑
  }

  void setXOffset(int xOffset) {
    this->xOffset = xOffset;
  }

  void setYOffset(int yOffset) {
    this->yOffset = yOffset;
  }

  void setTransparent(int transparent) {
    this->transparent = transparent;
  }

  void setMask(int mask) {
    this->mask = mask;
  }
};
```
2. 设计派生类继承原有的设备类，添加新的参数。例如：
```cpp:line-numbers
class PrintDeviceV2: public PrintDevice {
private:
  int direction;
public:
  void setDirection(int direction) {
    this->direction = direction;
  }

  bool Print() {
    // 在原有打印机的基础上，添加打印方向的业务逻辑
  }
};
```
3. 从`BaseDevice`派生新的设备类。例如：
```cpp:line-numbers
class FileDevice: public BaseDevice {
  // 设计文件相关的输出选项和业务逻辑
}
```
