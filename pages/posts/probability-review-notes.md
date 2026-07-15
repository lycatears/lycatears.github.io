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
- **全概率公式** （必考）
  - 在计算比较复杂的概率时，通常将复杂的事件分解为互不相容的、相对简单的事件的并集，计算这些简单事件的概率后利用概率的可加性计算所求概率。这就是全概率公式的原理。
  - 完备事件组：设试验 $E$ 的样本空间为 $\varOmega$，事件 $A_1,A_2,\cdots,A_n$两两互不相容（即当 $i,j=1,2,\cdots,n$ 且 $i\neq j$ 时，有 $A_iA_j=\emptyset$），且 $\bigcup \limits_{i=1}^n A_i=\varOmega$，则称 $A_1,A_2,\cdots,A_n$ 为样本空间 $\varOmega$ 的一个完备事件组（或完全事件组）
  - 全概率公式的推导：若 $P(A_i)>0(i=1,2,\cdots,n)$，则对于任意事件 $B$ 有
    $$B=B\varOmega=B\left(\bigcup_{i=1}^n A_i\right)=\bigcup_{i=1}^{n}(A_iB)$$
    由于 $(A_iB)\cap (A_jB)=\emptyset$，根据概率的有限可加性可得
    $$P(B)=P\left(\bigcup_{i=1}^n(A_iB)\right)=\sum_{i=1}^nP(A_iB)$$
    根据乘法公式有
    $$P(B)=\sum_{i=1}^nP(A_i)P(B|A_i)$$
    该公式称为全概率公式.
  - 如果事件 $B$ 是在两两不互相容的事件 $A_1,A_2,\cdots,A_n$ 中某一个发生的情况下发生的，并且知道各个 $A_i$ 事件发生的概率以及在事件 $A_i$ 已经发生的条件下，事件 $B$ 发生的条件概率 $P(B|A_i)$，则可使用全概率公式计算 $P(B)$. 把事件 $A_1,A_2,\cdots,A_n$ 视为事件 $B$ 发生的原因，则 $P(A_i)$ 称为先验概率.
- **贝叶斯公式**（必考）
  - 后验概率：条件概率 $P(A_i|B)$ 称为后验概率，是在获得观测数据或结果后，对某事件发生的原因进行概率推断的结果。
  - 根据乘法公式得
    $$P(A_iB)=P(B)P(A_i|B)=P(A_i)P(B|A_i)$$
  - 由此得
    $$P(A_i|B)=\dfrac{P(A_i)P(B|A_i)}{P(B)}$$
  - 根据全概率公式有
    $$P(A_i|B)=\dfrac{P(A_i)P(B|A_i)}{\sum\limits_{j=1}^nP(A_j)P(B|A_j)}$$
    该公式称为 **贝叶斯公式**.

### 事件的独立性
- 同一试验中的 $A,B$ 两个事件，若 $P(A)\neq0$，则条件概率 $P(B|A)$ 可能等于 $P(B)$，也可能不等于. 若 $P(AB)=P(A)P(B)$，则事件 $A$ 和事件 $B$ 是独立的. ~~（2021·新高考一卷，8）~~
  - 若 $P(A)>0$，则 $A$ 与 $B$ 相互独立的充分必要条件是 $P(B|A)=P(B)$；同理，若 $P(B)>0$，则 $B$ 与 $A$ 相互独立的充分必要条件是 $P(A|B)=P(A)$.
  - 若 $A,B$ 相互独立，则 $A,\bar{B}$、$\bar{A},B$、$\bar{A},\bar{B}$ 也相互独立.
- 三个事件的两两相互独立：若同一个随机试验 $E$ 的三个事件 $A,B,C$ 满足 $P(AB)=P(A)P(B),P(AC)=P(A)P(C),P(BC)=P(B)P(C)$，则称 $A,B,C$ 两两相互独立.
- 三个事件的相互独立：如果三个事件 $A,B,C$ 两两相互独立，且 $P(ABC)=P(A)P(B)P(C)$，则称三个事件 $A,B,C$ 是相互独立的.
  - *三个事件相互独立* 是 **三个事件两两相互独立** 的充分不必要条件。
- $n$ 个事件的相互独立：设 $A_1,A_2,\cdots,A_n$ 是同一个试验 $E$ 的 $n$ 个事件，如果对于任意正整数 $k$，$n$ 个事件中的任意 $k$ 个事件 $A_{i_1},A_{i_2},\cdots,A_{i_k}(2\le k \le n)$ 都有等式 $P(A_{i_1}A_{i_2}\cdots A_{i_k})=P(A_{i_1})P(A_{i_2})\cdots P(A_{i_k})$，则称这 $n$ 个事件是相互独立的.
  - 也就是说，证明 $n$ 个事件 $A_i,A_2,\cdots,A_n$ 相互独立，需要证明对于任意 $2\le k \le n$，在这 $n$ 个事件中选择任意 $k$ 个事件，这 $k$ 个事件都相互独立. 因此，证明 $n$ 个事件相互独立，需要证明 $\sum\limits_{i=2}^n\binom{n}{i}$ 个等式.（注：$\binom{n}{i}=\text{C}_n^i$ 都是组合数符号）
  - 若已知 $A_1,A_2,\cdots,A_n$ 相互独立，将其中任意 $k(2\le k \le n)$ 个事件替换成其对应的逆事件，仍然满足独立性.
  - 若 $A_1,A_2,\cdots,A_n$ 相互独立，则有
    - $$P(A_1A_2\cdots A_n)=\prod\limits_{i=1}^n P(A_i)$$
    - $$P(A_1\cup A_2\cup\cdots\cup A_n)=1-P(\overline{A_1\cup A_2\cup\cdots\cup A_n})=1-P(\bar{A_1}\bar{A_2}\cdots\bar{A_n})=1-\prod_{i=1}^nP(\bar{A_i})$$

### 伯努利（Bernoulli）概型
- ~~其实就是高中那个 $n$ 次独立重复试验~~
- 独立试验：将试验 $E$ 重复进行 $n$ 次，在每次试验中，事件 $A$ 要么发生，要么不发生，且各次试验的结果互不影响（即每次试验中事件 $A$ 发生的概率保持不变，不受其他各次试验结果影响），则称这 $n$ 次试验相互独立.
- 伯努利概型：在 $n$ 次独立试验的基础上，如果试验 $E$ 只有两个可能的对立结果 $A,\bar{A}$，且 $P(A)=p,P(\bar{A})=1-p\ (0<p<1)$，则将试验 $E$ 独立地重复进行 $n$ 次所构成的一个试验叫做 $n$ 重伯努利试验，简称为伯努利试验或伯努利概型.
- $n$ 次独立重复试验中事件 $A$ 若发生 $k$ 次，则 $\bar{A}$ 必定发生 $n-k$ 次，该基本事件的概率为 $P_n(k)=\binom{n}{k}p_k(1-p)^{n-k}$. （二项概率公式）

## 随机变量及其分布
### 分布函数
- 随机变量：设随机试验 $E$ 的样本空间为 $\varOmega=\{\omega\}$，若对于每一个 $\omega\in\varOmega$，都有唯一实数 $X(\omega)$ 与之对应，则称 $X=X(\omega)$ 为随机变量. 随机变量是随着试验结果不同而变化的量，一般用大写字母表示.
- 分布函数：设 $X$ 为随机变量，对于任意实数 $x$，称 $F(x)=P\{X\le x\}\ (x\in \R)$ 为随机变量 $X$ 的分布函数.
  - 随机变量 $X$ 的分布函数的定义域为 $\R$，表示随机事件 $\{X\le x\}$ 发生的概率. 若 $X$ 表示数轴上随机点的坐标，则 $F(a)$ 表示随机点落在区间 $\left(-\infty,a\right]$ 上的概率.
  - $\forall x,0\le F(x)\le 1$
  - $\forall x_1,x_2\ (x_1<x_2),\ P\{x_1<X\le x_2\}=F(x_2)-F(x_1)$
  - $F(-\infty)=\lim\limits_{x\to-\infty}F(x)=0,F(+\infty)=\lim\limits_{x\to+\infty}F(x)=1$
  - $F(x)$ 处处右连续，即 $F(x^+)=F(x)$
  - $F(x)$ 是 $\R$ 上的单调不减函数

### 离散型随机变量
- ~~高中数学到此为止~~
- 如果一个随机变量 $X$ 所有可能取到的不同值是有限个或者可列无穷多个，并且以确定的概率取这些不同的值，则 $X$ 为离散型随机变量.
- 分布律：设离散型随机变量 $X$ 所有可能的取值为 $x_k(k=1,2,\cdots)$，事件 $\{X=x_k\}$ 的概率为 $P\{X=x_k\}=p_k$，且满足 $p_k\ge 0,\sum\limits_{i=1}^\infty p_k=1$，则 $P\{X=x_k\}=p_k$ 称为随机变量 $X$ 的概率分布或分布律.
- 概率分布也可用表格形式表示：

  |$X$|$x_1$|$x_2$|$\cdots$|$x_k$|$\cdots$|
  |-|-|-|-|-|-|
  |$P$|$p_1$|$p_2$|$\cdots$|$p_k$|$\cdots$|

- 对于任意实数 $x$，随机事件 $\{X\le x\}$ 等价于 $\bigcup\limits_{x_k\le x}\{X=x_k\}$，根据概率的可加性，离散型随机变量 $X$ 的分布函数为 $F(x)=\sum\limits_{x_k\le x}P\{X=x_k\}=\sum\limits_{x_k\le x} p_k$.

### 连续型随机变量
- 对于随机变量的分布函数 $F(x)$，如果存在非负函数 $f(x)$，使得对任意 $x$ 都有 $F(x)=\int_{-\infty}^x f(t)\mathrm{d}t$，则称随机变量 $X$ 是连续型随机变量，其中函数 $f(x)$ 是 $X$ 的概率密度函数，简称概率密度，记作 $X\sim f(x)$.
  - 连续型随机变量的分布函数在 $\R$ 上连续.
  - 概率密度函数不一定是连续的.
- 概率密度函数的性质
  - $f(x)\ge 0$
  - $\int_{-\infty}^{+\infty}f(x)\mathrm{d}x=1$
  - 满足以上两条性质的函数必定是某个随机变量的概率密度函数.（2024概率B考过）
  - 对于任意实数 $a,b\ (a<b)$ ，有 $P\{a<X\le b\}=F(b)-F(a)=\int_{a}^bf(x)\mathrm{d}x$
  - 如果 $f(x)$ 在 $x$ 处连续，则有 $F'(x)=f(x)$
- 连续型随机变量取任意指定实数的概率为0. 计算连续型随机变量在区间上取值的概率时，可以不区分区间的开闭性.
### 常用分布
#### (0-1) 分布【离散型】
如果随机变量 $X$ 只取 $0,1$ 两个值，其概率分布为
$$P\{X=0\}=1-p,P\{X=1\}=p,0<p<1$$
或者写成
$$P\{X=k\}=p^k(1-p)^{1-k},k=0,1,0<p<1$$
则称随机变量 $X$ 服从参数为 $p$ 的（0-1）分布或两点分布.
#### 二项分布【离散型】
在 $n$ 重伯努利试验中，如果以 $X$ 表示事件 $A$ 出现的次数，则 $X$ 是一个离散型随机变量. $X$ 的可能取值为 $0,1,\cdots,n$，由二项概率公式可得
$$P\{X=k\}=\binom{n}{k}p^k(1-p)^{n-k}$$
称 $X$ 服从参数为 $n,p$ 的二项分布，记作 $X\sim B(n,p)$. 特别地，当 $n=1$ 时，$X$ 服从参数为 $p$ 的（0-1）分布.

在有放回抽样中，通常会用到二项分布.
#### 泊松分布【离散型 可数无穷多个】
如果随机变量的所有可能取值为 $0,1,2,\cdots$，且
$$P\{X=k\}=\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!},k=0,1,2,\cdots$$
其中 $\lambda>0$ 为常数，则称随机变量 $X$ 服从参数为 $\lambda$ 的泊松分布，记为 $X\sim P(\lambda)$ 或者 $X\sim \pi(\lambda)$.

泊松定理：设 $\lambda>0$ 为常数，$n\in \N^*$，且满足 $\lambda=np$，则对于 $\forall k\in \N$ 有
$$\lim_{n\to\infty}\binom{n}{k}p^k(1-p)^{n-k}=\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!}$$
由于 $np=\lambda$，当 $n$ 很大时，$p$ 必定很小. 泊松定理表明，当 $n$ 很大而 $p$ 很小时，有近似公式
$$\binom{n}{k}p^k(1-p)^{n-k}\approx\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!}$$
即当 $n$ 很大时，$p$ 很小时，二项分布 $B(n,p)$ 可以近似为泊松分布 $P(np)$.
#### 几何分布【离散型 可数无穷多个】
设试验 $E$ 只有两个对立的结果 $A,\bar{A}$，且 $P(A)=p,P(\bar{A})=1-p,0<p<1$，若将试验 $E$ 独立重复进行直至事件 $A$ 发生为止，以 $X$ 表示需要进行的试验次数，则 $X$ 是一个随机变量，且取值为 $1,2,\cdots$ . 随机变量 $X$ 的分布律为
$$P\{X=k\}=(1-p)^{k-1}p,k=1,2,\cdots$$
称随机变量 $X$ 服从参数为 $p$ 的几何分布.

几何分布得名于其分布列构成一个几何级数.

#### 超几何分布【离散型】【不在考试范围内】
在无放回抽样中，通常会用到超几何分布.

超几何分布描述了在不放回抽样的情况下，从 $N$ 个物品（指定种类物品有 $M$ 个）中抽取 $n$ 个物品，成功抽取 $m$ 个指定种类物品的概率. 其分布列为

$$P\{X=k\}=\dfrac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}},k=0,1,\cdots,\min(M,n)$$

#### 均匀分布【连续型】
若连续型随机变量 $X$ 的概率密度为
$$
f(x)=\begin{equation*}
\begin{cases}
\dfrac{1}{b-a},&a<x<b, \\
0,& \text{其他}.
\end{cases}
\end{equation*}
$$
则称 $X$ 在区间 $(a,b)$ 上服从均匀分布，记为 $X\sim U(a,b)$ . 易得 $X$ 的分布函数为
$$
F(x)=\begin{equation*}
\begin{cases}
0, & x<a,\\
\dfrac{x-a}{b-a},&a\le x<b, \\
1,& x\ge b.
\end{cases}
\end{equation*}
$$
对于任意实数 $x_1,x_2\in (a,b)$，若 $x_1<x_2$，则有 $P\{x_1\le X \le x_2\}=\dfrac{x_2-x_1}{b-a}$ .这表明随机变量 $X$ 位于区间 $(a,b)$ 的任意子区间 $[x_1,x_2]$ 内的概率只取决于 $[x_1,x_2]$ 的长度，与子区间的位置无关.
#### 指数分布【连续型】
若连续型随机变量 $X$ 的概率密度为
$$
f(x)=\begin{equation*}
\begin{cases}
\lambda \mathrm{e}^{-\lambda x},&x>0, \\
0,&x\le 0.
\end{cases}
\end{equation*}
$$
其中 $\lambda$ 为常数，则称 $X$ 服从参数为 $\lambda$ 的指数分布 . 易得 $X$ 的分布函数为
$$
F(x)=\begin{equation*}
\begin{cases}
1-\mathrm{e}^{-\lambda x},&x>0, \\
0,& x \le 0.
\end{cases}
\end{equation*}
$$
#### 正态分布【连续型】
如果随机变量 $X$ 具有概率密度
$$
f(x)=\dfrac{1}{\sqrt{2\pi}\sigma}\mathrm{e}^{-\frac{(x-\mu)^2}{2\sigma^2}},-\infty<x<+\infty
$$
其中 $\mu,\sigma(\sigma>0)$ 为常数，则称 $X$ 服从参数为 $\mu,\sigma$ 的正态分布，记作 $X\sim N(\mu,\sigma^2)$.

正态分布的分布函数
$$F(x)=\dfrac{1}{\sqrt{2\pi}\sigma}\int_{-\infty}^x\mathrm{e}^{-\frac{(t-\mu)^2}{\sigma^2}}\mathrm{d}t,-\infty<x<+\infty$$
不能用初等函数的形式表示.

正态分布的概率密度函数的图像是一条钟形曲线，关于直线 $x=\mu$ 对称，并在 $x=\mu$ 处取得最大值 $\dfrac{1}{\sqrt{2\pi}\sigma}$，在 $x=\mu \pm \sigma$ 处有拐点，以 $x$ 轴为水平渐近线.

固定 $\sigma$ 改变 $\mu$ 的值，概率密度曲线沿着 $x$ 轴左右平移，形状不变；固定 $\mu$ 改变 $\sigma$ 的值，当 $\sigma$ 越小时，曲线在 $x=\mu$ 处附近越陡峭，图像越“瘦”，反之则越平缓，图像越“胖”.

标准正态分布是 $\mu=0,\sigma=1$ 时的特殊情形. 服从标准正态分布的随机变量 $X$ 的概率密度和分布函数分别记作
$$
\varphi(x)=\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{-\frac{x^2}{2}},-\infty<x<+\infty
$$

$$
\varPhi(x)=\dfrac{1}{\sqrt{2\pi}}\int_{-\infty}^x \mathrm{e}^{-\frac{t^2}{2}}\mathrm{d}t,-\infty<x<+\infty
$$
概率密度函数 $\varphi(x)$ 是偶函数，因此有 $\varPhi(-x)=1-\varPhi(x)$ .

对一般的正态分布作变换 $u=\dfrac{x-\mu}{\sigma}$ 可得到标准正态分布，即
$$
f(x)=\varphi\left(\dfrac{x-\mu}{\sigma}\right),F(x)=\varPhi\left(\dfrac{x-\mu}{\sigma}\right)
$$
因此对于任意实数 $x_1,x_2(x_1<x_2)$，有
$$
P\{x_1<X<x_2\}=P\{x_1<X \le x_2\}=F(x_2)-F(x_1)=\varPhi\left(\dfrac{x_2-\mu}{\sigma}\right)-\varPhi\left(\dfrac{x_1-\mu}{\sigma}\right)
$$
对于给定的实数 $0<\alpha<1$，满足条件
$$
P\{X\ge u_\alpha\}=\dfrac{1}{\sqrt{2\pi}}\int_{u_\alpha}^{+\infty}\mathrm{e}^{-\frac{x^2}{2}}\mathrm{d}t=\alpha
$$
的实数 $u_\alpha$ 称为标准正态分布的上 $\alpha$ 分位点数.（注意这里是大于，和分布函数正好相反）
### 随机变量函数的分布
