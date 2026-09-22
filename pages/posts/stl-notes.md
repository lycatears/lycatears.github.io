---
layout: post
title: C++ STL 学习笔记
date: 2026-08-14 18:40:33
cover: https://www.helloimg.com/i/2026/08/14/6a7ef2a36ef90.jpg
categories: 学习
hide: true
tags:
  - 编程
  - 学习
  - C++
---
## STL 相关概念
- 容器：各种用于存放数据的数据结构，例如 `map` `vector` 等都是容器，一般用类模板实现。
- 算法：各种常用算法，例如 `sort` `find` 等，一般用函数模板实现。
- 迭代器：类似于指针，可用于遍历容器中的元素。可以通过运算符 `*` `++` 等进行访问、遍历操作。原生指针也是一种迭代器。
- 仿函数：用类来模拟函数行为的技术，通过重载类的 `operator()`，可以创建一个行为类似于函数的对象。
- 适配器：用于修饰容器、仿函数、迭代器
- 空间配置器：负责空间分配与管理

## 容器
- 分为序列式容器鹤关联式容器两种。
  - 序列式容器：元素在容器中的位置由元素进入容器的顺序决定，以线性方式存储。例如，`array` `vector` `deque` `list` 等都是序列式容器。序列式容器的存储空间不一定是连续的。
  - 关联式容器：元素在容器中的位置由一定的规则决定。一般采用红黑树实现，例如 `set` `multiset` `map` `multimap` 等。。
  - 无序关联式容器：与关联式容器类似，但内部元素是无序的，不保证访问顺序。一般采用哈希表实现，例如 `unordered_map` `unordered_set` 等。

## 算法
- 算法分为质变算法和非质变算法两种。
  - 质变算法：执行过程中会更改区间内的元素内容，例如 `copy` `replace` `erase` 等。
  - 非质变算法：执行过程中不更改区间内元素内容，例如 `find` `binary_search` 等。

## 迭代器
- 迭代器类似于指针，用于遍历容器中的元素。通常情况下，迭代器类型在容器类内部定义，例如 `MyArray::iterator`：
```cpp:line-numbers
template<typename T>
class MyArray {
		int size = 0;
		int capacity = 16;
		T* data = nullptr;
	public:
		typedef T* iterator;
		MyArray() {
			data = new T[capacity];
		}

		iterator begin() {
			return data;
		}

		iterator end() {
			return data + size;
		}

		void push_back(T element) {
			if (size < capacity) {
				data[size] = element;
			} else {
				capacity *= 2;
				T* newdata = new T[capacity];
				for (int i = 0; i < capacity / 2; i++) {
					newdata[i] = data[i];
				}
				delete data;
				data = newdata;

				data[size] = element;
			}
			size++;
		}
};


int main(int argc, char** argv) {
	MyArray<int> arr;
	arr.push_back(1);
	arr.push_back(1);
	arr.push_back(4);
	arr.push_back(5);
	arr.push_back(1);
	arr.push_back(4);
	for (MyArray<int>::iterator it = arr.begin(); it != arr.end(); it++) {
		printf("%d ",*it);
	}
	return 0;
}
```
- 通常情况下不写迭代器的类型名称，一般用 `auto` 自动推导。
- 注意STL中的 `end()` 返回的迭代器通常指向最后一个元素之后的位置。
- 迭代器分为五种类型：
  - 输入迭代器：只读访问，支持 `++ == !=` 三种运算符
  - 输出迭代器：只写访问，支持 `++` 一种运算符
  - 前向迭代器：读写访问，可以向前推进迭代器，支持 `++ == !=`
  - **双向迭代器**：读写访问，可以向前或向后推进迭代器，支持 `-- ++`
  - **随机访问迭代器**：在双向迭代器的基础上支持随机访问，额外支持 `[n] -n > >= < <=` 等运算
