---
layout: post
title: 《概率论与数理统计》复习笔记
date: 2026-07-11 10:02:27
categories: 学习
excerpt: 她可能在一些地方，也可能在某些地方。
tags:
  - 数学
  - 学习
  - 吉林大学
  - 概率论
---
## 随机事件及其概率
### 随机试验
- 必然现象与随机现象：在一定条件下必然出现的现象是必然现象，相同的条件下可能出现不同的结果，而在试验前无法预测结果的现象是随机现象。
- 随机现象在观测前不能确定其结果，是随机现象的随机性；大量重复试验后随机现象的结果表现出某种规律性，这叫做随机现象的统计规律性。
- 随机事件的特点：
  - 可重复性，试验可以在相同条件下重复进行多次
  - 可观测性：每次试验的所有可能结果都是明确的、可观测的，可能结果有至少两个
  - 随机性：每次试验的结果是不确定的，实验前无法确定会出现哪一个结果
- 随机事件通常用字母 $E$ 表示，随机事件的基本结果称为样本点，用 $\omega$ 表示，所有基本结果的集合称为样本空间 $\varOmega=\{\omega\}$
### 随机事件
- 随机试验 $E$ 的样本空间 $\varOmega$ 的子集称为随机事件，简称事件，用大写字母 $A,B,C\cdots$ 表示。
- 设事件 $A\sub \varOmega$，如果某次试验的结果 $\omega \in \varOmega$，则称为事件 $A$ 发生，否则称为不发生。
- 只有一个样本点的事件称为基本事件，样本空间成为必然事件，空集称为不可能事件。
- 样本空间可以按照样本点的数量，分为有限样本空间和无限样本空间两类。
### 事件的关系
- 包含：事件 $A$ 发生时，事件 $B$ 一定发生，则称为事件 $B$ 包含事件 $A$，记作 $A\sub B$.
  - 对于任意事件都有 $\emptyset\sub A \sub \varOmega$.
  - 如果 $A\sub B,B\sub C$，则 $A\sub C$.
- 相等：如果事件 $A$ 和事件 $B$ 相互包含，即 $A\sub B,B\sub A$，则称为事件 $A$ 与事件 $B$ 相等，记作 $A=B$.
  - 这表明两个事件是样本空间的同一个子集，实际上二者是同一个事件。
- 互斥：事件 $A,B$ 在一次试验中不能同时发生，则称 $A,B$ 互不相容，或者互斥。
  - 互斥事件 $A,B$ 的交集是空集。
- 互逆：每次试验中，$A$ 和 $B$ 两个事件必有一个且仅有一个发生，则称两个事件是互逆的（或者对立的），称其中一个事件是另一个事件的逆事件，记作 $\bar{A}=B$，或者 $\bar{B}=A$。
  - 显然有 $\overline{\overline{A}}=A$.
  - 互逆的事件在样本空间中互为补集。
### 事件的运算
- 并运算：事件$A,B$至少有一个发生，这样一个事件称为$A,B$的和事件或交事件，记作 $A\cup B$.
  - $A\cup B=\{\omega|\omega\in A \text{或} \omega\in B\}$
  - $A\cup A=A,A\cup \emptyset=A,A\cup B=B\cup A,A\cup \bar{A}=\varOmega,A\sub A\cup B,B\sub A\cup B$
  - 如果 $A\sub B$，则$A\cup B=B$
  - 并运算可以推广到多个、无穷多个事件
  - $$\bigcup_{i=1}^nA_i=\{\text{事件}A_1,A_2,\cdots,A_n\text{至少有一个发生}\}$$
  - $$\bigcup_{i=1}^{\infty}A_i=\{A_1,A_2,\cdots,A_n,\cdots\text{至少有一个发生}\}$$
- 交运算：如果事件 $A,B$ 同时发生，则这样的一个事件称为 $A,B$ 的交事件（或者积事件），记作 $A\cap B$ 或者 $AB$.
  - $A\cap B=\{\omega|\omega\in A\ \text{且}\  \omega \in B\}$
  - $A\cap A=A,A\cap \emptyset=A,A\cap B=B\cap A,A\cap \bar{A}=\emptyset,A\cap B\sub A,A\cap B\sub B$
  - 如果 $A\sub B$，则有 $A\cap B=A$.
  - 如果 $A,B$ 互不相容，则 $A\cap B = \emptyset$.
  - 交运算同样可以推广到多个集合甚至无穷多个事件
  - $$\bigcap_{i=1}^nA_i=\{\text{事件}A_1,A_2,\cdots,A_n\text{同时发生}\}$$
  - $$\bigcap_{i=1}^\infty A_i=\{\text{事件}A_1,A_2,\cdots,A_n,\cdots\text{同时发生}\}$$
- 差运算：如果事件$A$发生而$B$不发生，则这样的事件称为 $A$ 与 $B$ 的差事件，记作 $A-B$.
  - $A-B=\{\omega|\omega\in A\ \text{且}\ \omega \notin B\}$
  - $A-A=\emptyset,A-\emptyset=A,A-B=A-AB=A\bar{B},\varOmega-A=\bar{A},A-\varOmega=\emptyset,(A-B)\cup B=A\cup B$
- 事件运算的运算律
  - 交换律：$A\cup B=B\cup A,AB=BA$
  - 结合律：$(A\cup B)\cup C=A\cup(B \cup C),(AB)C=A(BC)$
  - 分配律：$A(B\cup C)=(AB)\cup (AC),A\cup (BC)=(A\cup B)(A\cup C)$
  - 对偶律（德摩根律）：$\overline{A\cup B}=\bar{A}\bar{B},\overline{AB}=\bar{A}\cup \bar{B}$
### 随机事件的概率
- 频率：在相同条件下进行的 $n$ 次试验中，事件 $A$ 发生了 $n_A$ 次，称 $n_A$ 是事件 $A$ 发生的频数，比值 $f_n(A)=\dfrac{n_A}{n}$ 是事件 $A$ 发生的频率.
  - 非负性：$\forall A,f_n(A)\ge 0$
  - 规范性：$f_n(\varOmega)=1$
  - 有限可加性：两两互不相容的事件 $A_i,A_2,\cdots,A_m$ 满足 $f_n\left(\bigcup\limits_{i=1}^mA_i\right)=\sum\limits_{i=1}^mf_n(A_i)$
  - 由于试验结果具有随机性，频率也是具有随机性的，当 $n$ 较小时波动性较大. 相同条件下重复进行 $n$ 次试验，当 $n$ 增大时事件 $A$ 发生的频率呈现稳定性，逐渐趋向于某个常数 $p$.
  - 常数 $p$ 表示事件 $A$ 发生的可能性大小，称为事件 $A$ 的概率，记作 $P(A)$. 当 $n$ 很大时，可以用频率 $f_n(A)$ 作为 概率的近似值.
- 概率的定义：设随机事件 $E$ 的样本空间为 $\varOmega$，如果对于 $E$ 的每一个事件 $A$，都有唯一实数 $P(A)$ 与之对应，且事件的函数 $P(A)$ 满足以下条件：
  - 非负性：$\forall A,P(A)\ge 0$
  - 规范性：$P(\varOmega)=1$
  - 可列可加性：对于两两互不相容的事件$A_1,A_2,\cdots$ 有 $P\left(\bigcup\limits_{i=1}^{\infty}A_i\right)=\sum\limits_{i=1}^{\infty}P(A_i)$

  则称 $P(A)$ 为事件 $A$ 的概率.

- 概率的性质
  - $P(\emptyset)=0$
  - 有限可加性：对于两两互不相容的事件 $A_1,A_2,\cdots,A_n$，有$P\left(\bigcup\limits_{i=1}^{n}A_i\right)=\sum\limits_{i=1}^{n}P(A_i)$
  - 对于任一事件 $A$，有 $P(\bar{A})=1-P(A)$
  - 如果 $A\sub B$，那么 $P(B-A)=P(B)-P(A),P(A)\le P(B)$
  - 对于任意事件 $A$，$P(A)\le 1$
  - **减法公式** ：对于任意两个事件 $A,B$，有 $P(B-A)=P(B)-P(AB)$
  - **加法公式** ：对于任意两个事件 $A,B$，有 $P(A\cup B)=P(A)+P(B)-P(AB)$，且 $P(A\cup B)\le P(A)+P(B)$
  - **一般加法公式** ：加法公式可以推广到任意有限个事件的情形. 设 $A_1,A_2,\cdots,A_n$ 是 $n$ 个随机事件，则
  $$P\left(\bigcup_{i=1}^{n}A_i\right)=\sum_{i=1}^{n}P(A_i)-\sum_{1\le i<j\le n}P(A_iA_j)+\sum_{1\le i<j<k\le n}P(A_iA_jA_k)+\cdots+(-1)^{n-1}P(A_1A_2\cdots A_n)$$
### 古典概型
- 古典概型的定义：如果随机试验具有以下特点，则这种试验称为古典概型（或者等可能概型）
  - 试验的样本空间只包括有限个样本点
  - 试验中每个基本事件发生的概率相同
- 设 $\varOmega$ 是样本空间，$A$ 为随机事件，则 $P(A)=\dfrac{|A|}{|\varOmega|}$
### 几何概型
- 几何概型的定义特点
  - 样本点有**无限多个**
  - 每个样本点发生的可能性是相等的
- $P(A)=\dfrac{A\text{的度量值}}{\varOmega \text{的度量值}}$
### 条件概率
- 条件概率
  - 设 $A,B$ 是试验 $E$ 的两个事件，且 $P(A)>0$，
则称 $\dfrac{P(AB)}{P(A)}$ 为在事件 $A$ 已经发生的条件下，事件 $B$ 的条件概率，记作 $P(B|A)$.
  - 乘法公式：$P(AB)=P(A)P(B|A),P(A)>0$
  - 非负性：$P(A|B)\ge 0$
  - 规范性：$P(\varOmega|A)=1$
  - 可列可加性：对于两两互不相容的事件 $B_1,B_2,\cdots,B_n$，有
  $$P\left[\left(\bigcup_{i=1}^{\infty}B_i\right)| A\right]=\sum_{i=1}^\infty P(B_i|A)$$
  - 乘法公式的推广：$P(A_1A_2\cdots A_n)=P(A_1)P(A_2|A_1)P(A_3|A_1A_2)\cdots P(A_n|A_1A_2\cdots A_{n-1})$
  - $P(\emptyset|A)=0,P(\varOmega|A)=1$
  - $P(\bar{B}|A)=1-P(B|A)$
  - $P((B_1\cup B_2)|A)=P(B_1|A)+P(B_2|A)-P((B_1B_2)|A)$
