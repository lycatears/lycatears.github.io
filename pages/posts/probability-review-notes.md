---
layout: post
title: 《概率论与数理统计》复习笔记（上）
date: 2026-07-11 10:02:27
categories: 学习
excerpt: 她可能在一些地方，也可能在某些地方。
tags:
  - 数学
  - 学习
  - 吉林大学
  - 概率论
---
::: warning
本文是猫娘学习概率论与数理统计的笔记，整理了吉林大学数学学院《随机数学》、茆诗松《概率论与数理统计教程》两本教材和知乎上的有关内容，有很多超出校内考试范围的内容，可能不适合期末考试复习。
:::
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

在有放回抽样中，通常会用到二项分布. 若 $X\sim B(n_1,p),Y\sim B(n_2,p)$ 且 $X,Y$ 相互独立，则 $X+Y\sim B(n_1+n_2,p)$.
#### 泊松分布【离散型 可数无穷多个】
如果随机变量的所有可能取值为 $0,1,2,\cdots$，且
$$P\{X=k\}=\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!},k=0,1,2,\cdots$$
其中 $\lambda>0$ 为常数，则称随机变量 $X$ 服从参数为 $\lambda$ 的泊松分布，记为 $X\sim P(\lambda)$ 或者 $X\sim \pi(\lambda)$.

泊松定理：设 $\lambda>0$ 为常数，$n\in \N^*$，且满足 $\lambda=np$，则对于 $\forall k\in \N$ 有
$$\lim_{n\to\infty}\binom{n}{k}p^k(1-p)^{n-k}=\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!}$$
由于 $np=\lambda$，当 $n$ 很大时，$p$ 必定很小. 泊松定理表明，当 $n$ 很大而 $p$ 很小时，有近似公式
$$\binom{n}{k}p^k(1-p)^{n-k}\approx\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!}$$
即当 $n$ 很大时，$p$ 很小时，二项分布 $B(n,p)$ 可以近似为泊松分布 $P(np)$.

若随机变量 $X\sim P(\lambda_1),Y\sim P(\lambda_2)$，则 $X+Y\sim P(\lambda_1+\lambda_2)$.
#### 几何分布【离散型 可数无穷多个】
设试验 $E$ 只有两个对立的结果 $A,\bar{A}$，且 $P(A)=p,P(\bar{A})=1-p,0<p<1$，若将试验 $E$ 独立重复进行直至事件 $A$ 发生为止，以 $X$ 表示需要进行的试验次数，则 $X$ 是一个随机变量，且取值为 $1,2,\cdots$ . 随机变量 $X$ 的分布律为
$$P\{X=k\}=(1-p)^{k-1}p,k=1,2,\cdots$$
称随机变量 $X$ 服从参数为 $p$ 的几何分布.

几何分布得名于其分布列构成一个几何级数.

#### 超几何分布【离散型】
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

当随机变量 $X \sim N(\mu,\sigma^2)$ 时， $X$ 的线性函数 $Y=aX+b(a\neq 0)$ 服从正态分布 $N(a\mu+b,a^2\sigma^2)$.
#### 柯西分布【连续型】
概率密度函数为
$$f(x)=\dfrac{1}{\pi(1+x^2)},-\infty<x<+\infty$$
分布函数为
$$F(x)=\dfrac{1}{\pi}\arctan x,-\infty<x<+\infty$$
柯西分布的数学期望和方差不存在.
### 随机变量函数的分布
#### 离散型
设离散型随机变量 $X$ 的概率分布为
$$P\{X=x_k\}=p_k,k=1,2,\cdots$$
设 $y=g(x)$ 是连续函数，则对于 $X$ 的函数 $Y=g(x)$ 有
$$P\{Y=g(x_k)\}=p_k,k=1,2,\cdots$$
即为 $Y$ 的概率分布. 如果 $g(x_k)$ 的数值有相同的，把相应的概率相加即可.
#### 连续型
求连续型随机变量 $Y=g(X)$ 的分布函数，关键在于解出关于 $X$ 的不等式 $g(X)\le y$. 设随机变量 $X$ 的概率密度为 $f_X(x)$，定义域为 $\R$，函数 $g(x)$ 是处处可导的严格单调函数，则随机变量 $Y=g(X)$ 的概率密度为
$$
f_Y(y)=\begin{equation*}
\begin{cases}
f_X[h(y)]\ |h'(y)|,&\alpha<x<\beta, \\
0,& \text{其他}.
\end{cases}
\end{equation*}
$$
其中 $\alpha=\min(g(-\infty),g(+\infty)),\beta=\max(g(-\infty),g(+\infty)),h(y)$ 是 $g(x)$ 的反函数.

## 二维随机变量及其分布
### 二维随机变量
- 二维随机变量：设随机试验 $E$ 的样本空间为 $\varOmega$，$X,Y$ 是定义在 $\varOmega$ 上的两个随机变量，由它们构成的向量 $(X,Y)$ 称为二维随机变量或二维随机向量.
- 联合分布函数：设 $(X,Y)$ 是二维随机变量，对于任意实数 $x,y$，记事件 $\{X\le x\},\{Y\le y\}$ 的交事件为 $\{X\le x,Y\le y\}$，称二元函数
  $$F(x,y)=P\{X\le x,Y\le y\},(x,y)\in \R^2$$
  为二维随机变量 $(X,Y)$ 的分布函数，或称为随机变量 $X,Y$ 的联合分布函数.
- 分布函数 $F(x,y)$ 在 $(x,y)$ 处的函数值表示 $xOy$ 平面上的随机点 $(X,Y)$ 落在以 $(x,y)$ 为顶点的左下方的无界域的概率.
#### 联合分布函数的性质
- $0\le F(x,y) \le 1,\lim\limits_{x\to-\infty,\ y\to-\infty}F(x,y)=0,\lim\limits_{x\to+\infty,\ y\to+\infty}F(x,y)=1$
- 对于任意固定的 $x,F(x,-\infty)=\lim\limits_{y\to-\infty}F(x,y)=0$
- 对于任意固定的 $y,F(-\infty,y)=\lim\limits_{x\to-\infty}F(x,y)=0$
- $F(x,y)$ 对于两个变量都是单调不减函数. 对于任意固定的 $y,x_1<x_2,F(x_1,y)\le F(x_2,y)$；对于任意固定的 $x,y_1<y_2,F(x,y_1)\le F(x,y_2)$.
- $F(x,y)$ 对于两个变量都是右连续的.
- $\forall x_1<x_2,\forall y_1<y_2,P\{x_1<X\le x_2,y_1<Y\le y_2\}=F(x_2,y_2)-F(x_1,y_2)-F(x_2,y_2)+F(x_1,y_1)$
#### 边缘分布
设二维随机变量 $(X,Y)$ 的分布函数为 $F(x,y)$，记 $X$ 的分布函数为 $F_X(x)$，$Y$ 的分布函数为 $F_Y(y)$，二者分别称为 $(X,Y)$ 关于 $X,Y$ 的边缘分布函数. 边缘分布函数是一维随机变量的分布函数，是一元函数.
$$
F_X(x)=P\{X\le x\}=P\{X\le x,Y<+\infty\}=F(x,+\infty),x\in \R
$$
$$
F_Y(y)=P\{Y\le y\}=P\{X<+\infty,Y\le y\}=F(+\infty,y),y\in \R
$$
如果对于任意实数 $x,y$ 有 $F(x,y)=F_X(x)F_Y(y)$ 则称随机变量 $X,Y$ 是相互独立的. 二维随机变量的联合分布函数唯一确定边缘分布函数，但两个随机变量的边缘分布函数只有在相互独立时才能确定联合分布函数.

若 $X,Y$ 相互独立，则 $X,Y$ 的函数 $f(X),g(Y)$ 也是相互独立的.
### 二维离散型随机变量的概率分布
若二维随机变量 $(X,Y)$ 的可能的取值是有限个或可列无限个，则 $(X,Y)$ 是二维离散型随机变量.

设二维离散型随机变量 $(X,Y)$ 所有可能的取值为 $(x_i,y_i)(i=1,2,\cdots)$，如果
$$
P\{X=x_i,Y=y_i\}=p_{ij},\ \ i,j=1,2,\cdots (*)
$$
且满足
$$
p_{ij}\le 0,\sum_{i=1}^\infty\sum_{j=1}^\infty p_{ij}=1
$$
则称 (*) 式为二维离散型随机变量 $(X,Y)$ 的概率分布，或者 $X,Y$ 的联合概率分布、联合分布律. 二维离散型随机变量 $(X,Y)$ 的分布律可以用下面的表格表示：

||$Y$|||||
|-|-|-|-|-|-|
|$X$|$y_1$|$y_2$|$\cdots$|$y_j$|$\cdots$|
|$x_1$|$p_{11}$|$p_{12}$|$\cdots$|$p_{1j}$|$\cdots$|
|$x_2$|$p_{21}$|$p_{22}$|$\cdots$|$p_{2j}$|$\cdots$|
|$\vdots$|$\vdots$|$\vdots$||$\vdots$|$\vdots$|
|$x_i$|$p_{i1}$|$p_{i2}$|$\cdots$|$p_{ij}$|$\cdots$|
|$\vdots$|$\vdots$|$\vdots$||$\vdots$|$\vdots$|

联合分布函数为
$$F(x,y)=P\{X\le x,Y\le y\}=\sum_{x_i\le x}\sum_{y_j\le y}p_{ij}$$

$X,Y$ 的概率分布分别为
$$P\{X=x_i\}=p_{i\cdot},i=1,2,\cdots$$
$$P\{Y=y_i\}=p_{\cdot j},i=1,2,\cdots$$
其中 $p_{i\cdot}=\sum\limits_{j=1}^\infty p_{ij},\ p_{\cdot j}=\sum\limits_{i=1}^\infty p_{ij}$，两个概率分布分别称为二维随机变量 $(X,Y)$ 关于 $X,Y$ 的边缘概率密度.

简单来说，就是找到给了的那个变量取值的那一行/列，把所有的概率加起来，比如求 $P\{X=1\}$，就在联合概率分布的表格里面找到 $X=1$ 那一行，再把这一行所有的概率加起来.

随机变量 $X,Y$ 相互独立的充分必要条件是 $\forall i,j,p_{ij}=p_{i\cdot}p_{\cdot j}$，其中 $i,j=1,2,\cdots$ .
### 二维连续型随机变量的概率分布
设二维随机变量 $X,Y$ 的分布函数为 $F(x,y)$，若存在非负二元函数对于任意实数 $x,y$，满足
$$F(x,y)=\int_{-\infty}^x\int_{\infty}^y f(u,v)\mathrm{d}u\mathrm{d}v,(x,y)\in \R^2$$
则称二维随机变量 $(X,Y)$ 为二维连续型随机变量，$f(x,y)$ 称为概率密度（联合概率密度）.
- $f(x,y)\ge 0$
- $\int_{-\infty}^{+\infty}\int_{\infty}^{+\infty} f(x,y)\mathrm{d}x\mathrm{d}y=1$. 这表明曲面 $z=f(x,y)$ 位于平面 $xOy$ 上方，且介于 $xOy$ 平面和该曲面之间的体积恒为 $1$.
- 若 $f(x,y)$ 在点 $(x,y)$ 处连续，则有 $f(x,y)=\dfrac{\partial^2F(x,y)}{\partial x \partial y}$.
- 若 $G$ 是平面 $xOy$ 上的一个区域，则有 $P\{(X,Y)\in G\}=\iint\limits_{G}f(x,y)\mathrm{d}x\mathrm{d}y$. 这表明随机点 $(X,Y)$ 落在平面区域 $G$ 内的概率等于以 $G$ 为底、以曲面 $
z=f(x,y)$ 为顶面的曲顶柱体的体积.

$X,Y$ 的概率密度函数分别为一元函数
$$
f_X(x)=\int_{-\infty}^{+\infty}f(x,y)\mathrm{d}y,x\in\R
$$
$$
f_Y(y)=\int_{-\infty}^{+\infty}f(x,y)\mathrm{d}x,y\in\R
$$
分别叫做 $(X,Y)$ 关于 $X,Y$ 的边缘密度函数. 随机变量 $X,Y$ 相互独立的充分必要条件是 $f(x,y)=f(x)f(y)$.
### 常用二维连续型随机变量分布
#### 均匀分布
设 $D$ 是 $xOy$ 平面上的有界区域，其面积为 $A$，若二维连续型随机变量 $X,Y$ 具有概率密度
$$
f(x,y)=\begin{equation*}
\begin{cases}
\dfrac{1}{A},&(x,y)\in D, \\
0,&\text{其他},
\end{cases}
\end{equation*}
$$
则称 $(X,Y)$ 在区域 $D$ 上服从均匀分布. 联合概率服从均匀分布的二维随机变量，两个边缘分布不一定相互独立.
#### 二维正态分布
二维连续型随机变量服从二维正态分布，则其概率密度为
$$
f(x,y)=\dfrac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}}\mathrm{e}^{\frac{-1}{2(1-\rho^2)}\left[\frac{(x-\mu_1)^2}{\sigma_1^2}-2\rho\frac{(x-\mu_1)(y-\mu_2)}{\sigma_1\sigma_2}+\frac{(y-\mu^2)}{\sigma^2_2}\right]},(x,y)\in\R^2
$$
其中 $\mu_1,\mu_2,\sigma_1,\sigma_2,\rho$ 均为常数，且满足 $\sigma_1>0,\sigma_2>0,-1<\rho<1$，称二维随机变量 $(X,Y)$ 服从参数为 $\mu_1,\mu_2,\sigma_1,\sigma_2,\rho$ 的二维正态分布，记作 $(X,Y)\sim N(\mu_1,\mu_2,\sigma_1,\sigma_2,\rho)$.

$X,Y$ 相互独立的充分必要条件是 $\rho=0$. $X,Y$ 的边缘概率分布分别为一维正态分布，$X\sim N(\mu_1,\sigma_1^2),Y\sim N(\mu_2,\sigma^2_2)$.

$(X,Y)$ 的分布与参数 $\rho$ 有关，对于不同的 $\rho$ 会有不同的二维正态分布，但是 $(X,Y)$ 关于 $X,Y$ 的边缘分布与 $\rho$ 无关.

仅根据边缘分布，一般无法确定联合分布.

### 条件分布
#### 离散型随机变量的条件分布
设二维连续型随机变量 $(X,Y)$ 的概率分布为
$$P\{X=x_i,Y=y_i\}=p_{ij},i,j=1,2,\cdots$$
$(X,Y)$ 关于 $(X,Y)$ 的边缘概率分布分别为
$$P\{X=x_i\}=p_{i\cdot},i=1,2,\cdots$$
$$P\{Y=y_j\}=p_{\cdot j},j=1,2,\cdots$$
则对于固定的 $j$，若有 $P\{Y=y_j\}=p_{\cdot j}>0$，称
$$P\{X=x_i|Y=y_j\}=\dfrac{P\{X=x_i,Y=y_j\}}{P\{Y=y_j\}}=\dfrac{p_{ij}}{p_{\cdot j}}$$
为在条件 $Y=y_j$ 下随机变量 $X$ 的条件概率分布；对于固定的 $i$ ，若有 $p_{i\cdot}>0$，则称
$$P\{Y=y_j|X=x_i\}=\dfrac{P\{X=x_i,Y=y_j\}}{P\{X=x_i\}}=\dfrac{p_{ij}}{p_{i\cdot}}$$
为在条件 $X=x_i$ 下随机变量 $X$ 的条件概率分布. 例如，列表表示在条件 $Y=0$ 下的条件概率分布：

|$X=i$|0|1|
|-|-|-|
|$P\{X=i\|Y=0\}$|$\dfrac{1}{4}$|$\dfrac{3}{4}$|

#### 连续型随机变量的条件分布
设二维随机变量 $(X,Y)$ 的分布函数为 $F(x,y)$，概率密度为 $f(x,y)$，若在点 $(x,y)$ 处函数 $f(x,y)$ 连续，且 $(X,Y)$ 关于 $Y$ 的边缘概率密度 $f_Y(x)$ 连续，且 $f_Y(y)>0$，则在条件 $Y=y$ 下 $X$ 的条件分布函数为
$$F_{X|Y}(x|y)=\int_{-\infty}^x f(u,y)\mathrm{d}u,x\in \R$$
条件概率密度为
$$f_{X|Y}(x|y)=\dfrac{f(x,y)}{f_Y(y)},x\in\R$$
类似可得在条件 $X=x$ 下 $Y$ 的条件分布函数为
$$F_{Y|X}(y|x)=\int_{-\infty}^y f(x,u)\mathrm{d}u,y\in \R$$
条件概率密度为
$$f_{Y|X}(y|x)=\dfrac{f(x,y)}{f_X(x)},y\in\R$$
### 二维随机变量的函数的分布
对于离散型的二维随机变量，只需计算该函数可能的取值所对应的概率，即得该函数的概率分布.
对于二维连续型随机变量 $(X,Y)$，概率密度为 $f(x,y)$，设关于 $X,Y$ 的二元函数 $Z=g(X,Y)$ 是连续型随机变量，$Z$ 的分布函数为
$$F_Z(z)=P\{Z\le z\}=P\{g(X,Y)\le z\}=\iint\limits_{g(X,Y)\le z}f(x,y)\mathrm{d}x\mathrm{d}y$$
其概率密度为
$$f_Z(z)=F'(z)$$
对于随机变量 $X,Y$ 的函数 $Z=X+Y$，若 $X,Y$ 相互独立，有卷积公式
$$f_Z(z)=f_X(x)*f_Y(y)=\int_{-\infty}^{+\infty}f_X(x)f_Y(z-x)\mathrm{d}x=\int_{-\infty}^{+\infty}f_Y(y)f_X(z-y)\mathrm{d}y$$
对于随机变量函数 $M=\max(X,Y),N=\min(X,Y)$（ $X,Y$ 相互独立），其分布函数为
$$F_{\max}(z)=F_X(z)F_Y(z),z\in\R$$
$$F_{\min}(z)=1-[1-F_X(z)][1-F_Y(z)],z\in\R$$
求导可得其概率密度.

### n 维随机变量
$n$ 维随机变量与二维随机变量具有相似的性质，这里总结一些常见的概念：
- 定义：随机试验 $E$ 的样本空间 $\varOmega$ 上定义的 $n$ 个随机变量 $X_1,X_2,\cdots,X_n$，其构成的向量 $(X_1,X_2,\cdots,X_n)$ 为 $n$ 维随机变量或随机向量.
- 分布函数：对任意 $n$ 个实数 $x_1,x_2,\cdots,x_n$，$n$ 元函数
    $$F(x_1,x_2,\cdots,x_n)=P\{X_1\le x_1,X_2\le x_2,\cdots,X_n\le x_n\}$$
    称为 $n$ 维随机变量 $(X_1,X_2,\cdots,X_n)$ 的分布函数（或 $X_1,X_2,\cdots,X_n$ 的联合分布函数）.
- 离散型随机变量： $(X_1,X_2,\cdots,X_n)$ 的取值是有限个或可列无限个 $n$ 元数组，则称为 $n$ 维随机变量，其概率分布为
    $$P\{X_1=x_{i_1},X_2=x_{i_2},\cdots,X_n=x_{i_n}\}=p_{i_1i_2\cdots i_n},i_1,i_2,\cdots,i_n=1,2,\cdots$$

- 连续型随机变量：若存在非负 $n$ 元函数 $f(x_1,x_2,\cdots,x_n)$ 对任意 $n$ 个实数 $x_1,x_2,\cdots,x_n$ 有
    $$F(x_1,x_2,\cdots,x_n)=\int_{-\infty}^{x_1}\int_{-\infty}^{x_2}\cdots\int_{-\infty}^{x_n}f(t_1,t_2,\cdots,t_n)\mathrm{d}t_n\cdots\mathrm{d}t_2\mathrm{d}t_1$$
  则  $(X_1,X_2,\cdots,X_n)$ 是 $n$ 维连续型随机变量，$f(x_1,x_2,\cdots,x_n)$ 为  $(X_1,X_2,\cdots,X_n)$ 的概率密度（联合概率密度）.
- 边缘分布：在 $n$ 维随机变量中可以有 $k(1\le k < n)$ 维的边缘分布. 已知 $n$ 维随机变量  $(X_1,X_2,\cdots,X_n)$ 的分布函数 $F(x_1,x_2,\cdots,x_n)$，即可确定 $k$ 维边缘分布函数，在 $F(x_1,x_2,\cdots,x_n)$ 保留需要求边缘概率分布的变量，其他变量趋近于 $+\infty$，该极限即为所求边缘分布函数.

  例如， $(X_1,X_2,\cdots,X_n)$ 关于 $X_1$ 的边缘分布函数为
  $$F_{X_1}(x_1)=F(x_1,+\infty,+\infty,\cdots,+\infty),x_1\in\R$$
  而关于 $(X_1,X_2,X_3)$ 的边缘分布函数为
  $$F_{X_1X_2X_3}(x_1)=F(x_1,x_2,x_3,+\infty,+\infty,\cdots,+\infty),(x_1,x_2,x_3)\in\R^3$$
  对于连续型随机变量 $(X_1,X_2,\cdots,X_n)$，其概率密度为 $f(x_1,x_2,\cdots,x_n)$，则关于 $X_1$ 的边缘概率密度为
  $$f_{X_1}(x_1)=\overbrace{\int^{+\infty}_{-\infty}\int^{+\infty}_{-\infty}\cdots\int^{+\infty}_{-\infty}}^{n-1\text{个积分号}}f(x_1,x_2,\cdots,x_n)\mathrm{d}x_2\mathrm{d}x_3\cdots\mathrm{d}x_n,x_1\in\R$$
  关于 $(X_1,X_2,X_3)$ 的边缘概率密度为
  $$f_{X_1X_2X_3}(x_1,x_2,x_3)=\overbrace{\int^{+\infty}_{-\infty}\int^{+\infty}_{-\infty}\cdots\int^{+\infty}_{-\infty}}^{n-3\text{个积分号}}f(x_1,x_2,\cdots,x_n)\mathrm{d}x_4\mathrm{d}x_5\cdots\mathrm{d}x_n,(x_1,x_2,x_3)\in\R^3$$
  对于离散型随机变量， $(X_1,X_2,\cdots,X_n)$ 关于 $X_1$ 的边缘概率分布为
  $$P\{X_1=x_{i_1}\}=\sum_{i_2=1}^\infty\sum_{i_3=1}^\infty\cdots\sum_{i_n=1}^\infty p_{i_1i_2\cdots i_n},i=1,2,\cdots$$
- 相互独立：对于任意 $n$ 个实数 $x_1,x_2,\cdots,x_n$ 满足
  $$F(x_1,x_2,\cdots,x_n)=\prod_{i=1}^nF_{X_i}(x_i)$$
  则随机变量 $(X_1,X_2,\cdots,X_n)$ 是相互独立的.
  - 离散型 $n$ 维随机向量的相互独立的充分必要条件：
    $$P\{X_1=x_{i_1},X_2=x_{i_2},\cdots,X_n=x_{i_n}\}=\prod_{j=1}^n P\{X_i=x_{i_j}\}$$
  - 连续型 $n$ 维随机向量的相互独立的充分必要条件：
    $$f(x_1,x_2,\cdots,x_n)=\prod_{i=1}^nf_{X_i}(x_i)$$
- 正态分布：$n$ 维随机变量  $X_1,X_2,\cdots,X_n$ 相互独立，且均服从正态分布，即 $X_i\sim N(\mu_i,\sigma_i^2)$，则他们的线性函数也服从正态分布：
  $$\sum_{i=1}^nc_iX_i\sim N\left( \sum_{i=1}^nc_i\mu_i,\sum_{i=1}^nc_i^2\sigma^2_i \right)$$
- 对于任意 $m+n$ 个实数 $x_1,x_2,\cdots,x_m,y_1,y_2,\cdots,y_n$，如果有
  $$F(x_1,x_2,\cdots,x_m,y_1,y_2,\cdots,y_n)=F_1(x_1,x_2,\cdots)F_2(y_1,y_2,\cdots,y_n)$$
  其中 $F,F_1,F_2$ 分别为 $(X_1,\cdots,X_m,Y_1,\cdots,Y_n),(X_1,\cdots,X_m),(Y_1,\cdots,Y_n)$ 的分布函数，则 $(X_1,\cdots,X_m),(Y_1,\cdots,Y_n)$ 是相互独立的，相应的函数 $h(X_1,\cdots,X_m)$ 和 $g(Y_1,\cdots,Y_n)$ 也是相互独立的.
- $X_1,X_2,\cdots,X_n$ 是 $n$ 个相互独立的随机变量，则 $M=\max(X_1,X_2,\cdots,X_n)$ 的分布函数为
  $$F_{\max}(z)=\prod_{i=1}^nF_{X_i}(z),z\in\R$$
  $M=\min(X_1,X_2,\cdots,X_n)$ 的分布函数为
  $$F_{\min}(z)=1-\prod_{i=1}^n[1-F_{X_i}(z)],z\in\R$$
#### 多项分布
多项分布是二项分布的推广，适用于随机试验 $E$ 中有 $r$ 种互不相容事件 $A_1,A_2,\cdots,A_r$ 可能发生的情况. 记 $P(A_i)=p_i,X_i$ 为 $n$ 次独立重复试验中事件 $A_i$ 发生的次数，则 $n$ 维随机变量 $(X_1,X_2,\cdots,X_r)$ 取值为 $(n_1,n_2,\cdots,n_r)$ 的概率为
$$P\{X_1=n_1,X_2=n_2,\cdots,X_r=n_r\}=\dfrac{n!}{n_1!n_2!\cdots n_r!}p_1^{n_1}p_2^{n_2}\cdots p_r^{n_r}$$
这个概率分布称为多项分布，也叫 $r$ 项分布，因为其系数对应 $(p_1+p_2+\cdots+p_r)^n$ 展开的系数. $r$ 项分布是 $r-1$ 维随机变量的分布，因为 $n_r$ 总可以用前 $r-1$ 个自变量表示.
#### 多维超几何分布
多维超几何分布是超几何分布的推广，适用于不放回抽样. 袋中有 $N$ 个球，其中 $i(i=1,2,\cdots,r)$ 号球有 $N_i$ 个，取出任意 $n(n\le N)$ 个球，记随机变量 $X_i$ 表示 $i$ 号球抽到 $n_i$ 个，则
$$P\{X_1=n_1,X_2=n_2,\cdots,X_r=n_r\}=\dfrac{\binom{N_1}{n_1}\binom{N_2}{n_2}\cdots\binom{N_r}{n_r}}{\binom{N}{n}}$$
$r$ 维超几何分布同样是 $r-1$ 维随机变量的分布.
#### 多维均匀分布
设有界区域 $D\sub \R^n$，其度量为 $S_D$（面积、体积等），若随机变量 $(X_1,X_2,\cdots,X_n)$ 的联合密度函数为
$$
f(x_1,x_2,\cdots,x_n)=\begin{equation*}
\begin{cases}
\dfrac{1}{S_D},&(x_1,x_2,\cdots,x_n)\in D, \\
0,&\text{其他},
\end{cases}
\end{equation*}
$$
则称 $(X_1,X_2,\cdots,X_n)$ 服从 $D$ 上的均匀分布，记为 $(X_1,X_2,\cdots,X_n)\sim U(D)$.

## 随机变量的数字特征
### 数学期望
设离散型随机变量 $X$ 的概率分布为 $P\{X=x_k\}=p_k(k=1,2,\cdots)$，无穷级数 $\sum\limits_{k=1}^\infty x_kp_k$ 绝对收敛，则称无穷级数 $\sum\limits_{k=1}^\infty x_kp_k$ 的和为离散型随机变量 $X$ 的数学期望或均值，记作 $E(X)$.

设离散型随机变量 $X$ 的概率密度为 $f(x)$，若反常积分 $\int_{-\infty}^{+\infty}xf(x)\mathrm{d}x$ 绝对收敛，则称该反常积分的值为连续型随机变量 $X$ 的数学期望或均值，记作 $E(X)$.

设随机变量 $Y=g(X)$，其中 $g(x)$ 为一元连续函数.
- 若 $X$ 为离散型随机变量，其概率分布为 $P\{X=x_k\}=p_k(k=1,2,\cdots)$，如果无穷级数 $\sum\limits_{k=1}^\infty x_kp_k$ 是绝对收敛的，则 $Y$ 的数学期望为 $E(Y)=E[g(X)]=\sum\limits_{k=1}^\infty g(x_k)p_k$.
- 若 $Y$ 为连续型随机变量，其概率密度为 $f(x)$，若反常积分若反常积分 $\int_{-\infty}^{+\infty}g(x)f(x)\mathrm{d}x$ 绝对收敛，则 $Y$ 的数学期望为 $E(Y)=E[g(X)]=\int_{-\infty}^{+\infty}g(x)f(x)\mathrm{d}x$.
- 对于二维随机变量也有类似的结论：对于离散型随机变量，$E[g(X,Y)]=\sum\limits_{i=1}^\infty\sum\limits_{j=1}^\infty g(x_i,y_j)p_{ij}$；对于连续型随机变量，$E[g(X,Y)]=\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}g(x,y)f(x,y)\mathrm{d}x\mathrm{d}y$. 其中 $g(x,y)$ 是二元连续函数，要求上述无穷级数或反常积分都是绝对收敛的.

数学期望具有如下性质，假定 $C$ 为常数，$X,Y$ 的数学期望都存在：
- $E(C)=C$
- $E(CX)=CE(X)$
- $E(X+Y)=E(X)+E(Y)$
- $E(aX+bY+c)=aE(X)+bE(Y)+c$
- 若随机变量 $X,Y$ 相互独立，则 $E(XY)=E(X)E(Y)$，反之未必成立
- $[E(XY)]^2\le E(X^2)E(Y^2)$

数学期望反映了随机变量的加权平均值.
### 方差
方差反映随机变量与其均值之间的偏离程度. 设 $X$ 为随机变量，若期望 $E\{[X-E(X)]^2\}$ 存在，则称之为 $X$ 的方差，记作 $D(X)$. $\sqrt{D(X)}$ 称作随机变量的标准差或均方差，记为 $\sigma(X)$. 如果随机变量的取值在期望附近，则方差较小；若随机变量取值较为分散，则方差会更大. 根据定义，离散型、连续型随机变量的方差计算公式如下：
$$D(X)=\sum_{i=1}^\infty[x_k-E(X)]^2p_k$$
$$D(X)=\int_{-\infty}^{+\infty}[x-E(X)]^2f(x)\mathrm{d}x$$
常用的计算方差的公式是
$$D(X)=E(X^2)-[E(X)]^2$$
其中，$E(X^2)$ 可由随机变量函数的期望的计算方法求得.

方差具有如下性质，假定 $C$ 为常数，$X,Y$ 的数学期望和方差都存在：
- $D(C)=0$
- $D(CX)=C^2D(X)$
- $D(X+C)=D(X)$
- 若 $X,Y$ 相互独立，则 $D(X\pm Y)=D(X)\pm D(Y)$
- 随机变量 $X$ 的方差为 0 的充分必要条件是 $P\{X=C\}=1$

随机变量 $X$ 具有数学期望 $E(X)=\mu$ 和方差 $D(X)=\sigma^2$，则称 $X^*=\dfrac{X-\mu}{\sigma}$ 是 $X$ 的标准化变量. 该标准化变量的 $E(X^*)=0,D(X^*)=1$.
### 常见分布的期望和方差
|名称|概率密度函数/分布律|数学期望|方差|
|-|-|-|-|
|（0-1）分布|$P\{X=k\}=p^k(1-p)^{1-k}\\k=0,1,0<p<1$|$p$|$p(1-p)$|
|二项分布 $B(n,p)$|$P\{X=k\}=\binom{n}{k}p^k(1-p)^{n-k}$|$np$|$np(1-p)$|
|泊松分布 $P(\lambda)$|$P\{X=k\}=\dfrac{\lambda^k\mathrm{e}^{-\lambda}}{k!}$|$\lambda$|$\lambda$|
|几何分布|$P\{X=k\}=(1-p)^{k-1}p$|$\dfrac{1}{p}$|$\dfrac{1-p}{p^2}$|
|均匀分布 $U(a,b)$|$f(x)=\dfrac{1}{b-a}$|$\dfrac{a+b}{2}$|$\dfrac{(b-a)^2}{12}$|
|正态分布 $N(\mu,\sigma^2)$|$f(x)=\dfrac{1}{\sqrt{2\pi}\sigma}\mathrm{e}^{-\frac{(x-\mu)^2}{2\sigma^2}}$|$\mu$|$\sigma^2$|
|指数分布|$f(x)=\lambda\mathrm{e}^{-\lambda x}(x>0)$|$\dfrac{1}{\lambda}$|$\dfrac{1}{\lambda^2}$|

### 协方差
设随机变量 $X,Y$ 的数学期望都存在，若 $E\{[X-E(X)][Y-E(Y)]\}$ 存在，则称其为 $X,Y$ 的协方差，记为 $\text{Cov}(X,Y)$.

常用的计算协方差的公式是
$$\text{Cov}(X,Y)=E(XY)-E(X)E(Y)$$
协方差具有以下性质：
- $\text{Cov}(X,Y)=\text{Cov}(Y,X)$
- 若 $a,b$ 为常数，则 $\text{Cov}(aX,bY)=ab\text{Cov}(X,Y)$
- $\text{Cov}(X+Y,Z)=\text{Cov}(X,Z)+\text{Cov}(Y,Z)$
- $D(X\pm Y)=D(X)+D(Y)\pm 2\text{Cov}(X,Y)$
- $\text{Cov}(X,X)=D(X)$
- $X,Y$ 相互独立是 $\text{Cov}(X,Y)=0$ 的充分不必要条件

### 相关系数
设随机变量 $X,Y$ 的方差都存在且不等于0，协方差 $\text{Cov}(X,Y)$ 存在，称
$$\rho_{XY}=\dfrac{\text{Cov}(X,Y)}{\sqrt{D(X)}\sqrt{D(Y)}}$$
为 $X,Y$ 的相关系数. 当 $\rho_{XY}=0$ 时，称为 $X,Y$ 不相关.
- 相关系数为0的两个随机变量不一定相互独立.
- 相互独立的两个随机变量，相关系数必定为0.
- $|\rho_{XY}|\le 1$
- $|\rho_{XY}| = 1$ 的充分必要条件是存在常数 $a,b$ 使 $P\{Y=a+bX\}=1$

相关系数表示两个随机变量线性相关的程度.
- $|\rho_{XY}|= 1$ 时，两个随机变量存在线性关系
- $|\rho_{XY}|$ 较大时，两个随机变量线性相关关系的程度较好
- $|\rho_{XY}|$ 较小时，两个随机变量线性相关的程度较差
- $\rho_{XY}>0$ 时，$X$ 与 $Y$ 正相关，反之则为负相关

对于随机变量 $X,Y$，若相关的数字特征是存在的，则下列命题等价：
- $\text{Cov}(X,Y)=0$
- $X,Y$ 不相关
- $E(XY)=E(X)E(Y)$
- $D(X+Y)=D(X)+D(Y)$

上述条件都是 $X,Y$ 相互独立的必要不充分条件.

对于二维正态分布 $(X,Y)\sim N(\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho)$，$X,Y$ 相互独立的充分必要条件是 $\rho=0$，且 $\rho_{XY}=\rho$. 因此二维正态分布完全由 $X,Y$ 的期望、方差、相关系数决定.
### 矩
设 $X,Y$ 为随机变量，$k,l$ 为正整数.
- 原点矩：若 $E(X^k)$ 存在，则称为 $X$ 的 $k$ 阶原点矩，记作 $\mu_k=E(X^k)$.
- 中心矩：若 $E\{[X-E(X)]^k\}$ 存在，则称为 $X$ 的 $k$ 阶中心矩，记为 $\nu_k=E\{[X-E(X)]^k\}$.
- 混合原点矩：若 $E(X^kY^l)$ 存在，则称为 $X,Y$ 的 $k+l$ 阶原点矩.
- 混合中心矩：若 $E\{[X-E(X)]^k [Y-E(Y)]^l\}$ 存在，则称为 $X,Y$ 的 $k+l$ 阶混合中心矩.

显然 $E(X)$ 是 $X$ 的一阶原点矩，$D(X)$ 是 $X$ 的二阶中心矩，协方差 $\text{Cov}(X,Y)$ 是 $X,Y$ 的二阶混合中心矩.

中心矩和原点矩的关系为
$$E\{[X-E(X)]^k\}=E[(X-\mu_1)^k]$$
根据二项式定理有
$$E[(X-\mu_1)^k]=E\left[\sum_{i=0}^k(-1)^{k-i}\binom{k}{i}\mu_1^{k-i}X^i\right]=\sum_{i=0}^k(-1)^{k-i}\binom{k}{i}\mu_1^{k-i}E(X^i)$$
**注意到** $E(X^i)=\mu_i$，即
$$E\{[X-E(X)]^k\}=\sum_{i=1}^k(-1)^{k-i}\binom{k}{i}\mu_1^{k-i}\mu_i$$
随机变量 $X$ 的前四阶中心矩可用原点矩表示如下：
$$\nu_1=0$$
$$\nu_2=\mu_2-\mu_1^2$$
$$\nu_3=\mu_3-3\mu_1\mu_2+2\mu_1^3$$
$$\nu_4=\mu_4-4\mu_1\mu_3+6\mu_2\mu_1^2-3\mu_1^4$$
正态分布$N(0,\sigma^2)$ 的偶数阶原点矩为 $\nu_k=(k-1)!!\sigma^k,k=2,4,6\dots$，奇数阶原点矩总为0.
### 分位数
设连续型随机变量 $X$ 的分布函数为 $F(x)$，概率密度为 $f(x)$，对任意实数 $p\in(0,1)$，满足
$$F(x_p)=\int_{-\infty}^{x_p}f(x)\mathrm{d}x=p$$
的实数 $x_p$ 称为下侧 $p$ 分位数，它表示概率密度曲线下 $x_p$ 左侧部分的面积为 $p$；满足
$$1-F(x_p')=\int_{x_p'}^{+\infty}f(x)\mathrm{d}x=p$$
的实数 $x_p'$ 称为上侧 $p$ 分位数（因为分布函数表示 $x_p'$ 左侧的面积，因此要用1减去分布函数值），它表示概率密度曲线下 $x_p'$ 右侧部分的面积为 $p$.

对于同一个 $p$ 值，上下侧分位数满足 $x_p=x_{1-p}',x_p'=x_{1-p}$.

一般情况下，分位数指的是下侧分位数.
### 中位数
设连续型随机变量 $X$ 的分布函数为 $F(x)$，概率密度为 $f(x)$，称 $p=0.5$ 时的分位数 $x_{0.5}$ 为 $X$ 的中位数，即
$$F(x_{0.5})=\int_{-\infty}^{x_{0.5}}f(x)\mathrm{d}x=0.5$$
### 偏度
设随机变量 $X$ 的前三阶矩存在，则称
$$\beta_s=\dfrac{\nu_3}{\nu_2^{\frac{3}{2}}}=\dfrac{E\{[X-E(X)]^3\}}{\sigma^3(X)}$$
为随机变量 $X$ 的偏度系数，简称偏度，偏度是无量纲数.
- 当 $\beta_s>0$ 时，称该分布右偏（正偏），概率密度函数的图像中右侧有长尾，表示变量在高值处有较大的偏离均值的趋势.
- 当 $\beta_s<0$ 时，称该分布左偏（负偏），概率密度函数的图像中左侧有长尾，表示变量在低值处有较大的偏离均值的趋势.
- 当密度函数关于数学期望对称时，偏度为0. 所有正态分布的偏度都为0.
- 当 $\beta_s\neq 0$ 时，称该分布为偏态分布.
### 峰度
设随机变量 $X$ 的前四阶矩存在，则称
$$\beta_k=\dfrac{\nu_4}{\nu_2^2}-3=\dfrac{E\{[X-E(X)]^4\}}{[D(X)]^2}-3$$
为随机变量 $X$ 的峰度系数，即峰度，峰度也是无量纲数. 峰度是描述分布尾部粗细和尖峭程度的特征数.

峰度不是密度函数上峰值的高低，与方差无关，是一个相对于正态分布的指标. 记 $X$ 的标准化变量为 $X^*$，则
$$\beta_k=\dfrac{E\{[X-E(X)]^4\}}{[D(X)]^2}-3=\dfrac{E\{[X-E(X)]^4\}/[\sigma(X)]^4}{[D(X)]^2/[\sigma(X)]^4}-3=E[(X^*)^4]-3$$
**注意到** 标准正态分布的四阶原点矩为3，因此峰度系数表示的是 **标准化变量** 相对于标准正态分布而言的超出量.
- $\beta_k>0$ 表示标准化后的分布比正态分布更加陡峭、尾部更粗
- $\beta_k<0$ 表示标准化后的分布比正态分布更加平坦、尾部更细
- $\beta_k=0$ 表示标准化后的分布与正态分布的陡峭程度相同
- 实际分布若峰度、偏度均接近0，则可认为该分布近似为正态分布
- 偏度和峰度两个特征数描述了分布的形状，如果偏度、峰度与某个参数均无关，则该参数不能称为形状参数；反之，若偏度、峰度与参数有关，则该参数为形状参数.

### 变异系数
若随机变量 $X$ 的二阶矩存在，则称
$$C_v(X)=\dfrac{\sqrt{D(X)}}{E(X)}$$
为 $X$ 的变异系数. 变异系数消除了量纲和取值大小的差异，能表示波动的相对大小.

## 大数定律与中心极限定理
### 切比雪夫不等式
设随机变量 $X$ 具有数学期望 $E(X)=\mu$ 和方差 $D(X)=\sigma^2$，则对于任意给定的正数 $\varepsilon$ 有
$$P\{|X-E(X)|\ge \varepsilon\}\le \dfrac{D(X)}{\varepsilon^2}$$
该不等式称为切比雪夫不等式，等价于
$$P\{|X-E(X)|< \varepsilon\}\ge 1- \dfrac{D(X)}{\varepsilon^2}$$
### 大数定律
- 依概率收敛：设 $X_1,X_2,\cdots,X_n$ 是随机变量序列，$a$ 为常数，若对于任意给定实数 $\varepsilon$，有
  $$\lim_{n\to\infty}P\{|X_n-a|<\varepsilon\}=1$$
  则称随机变量 $X_1,X_2,\cdots,X_n$ 依概率收敛于 $a$，记为 $X_n\xrightarrow{P} a$.
- 切比雪夫定理：设随机变量 $X_1,X_2,\cdots,X_n,\cdots$ 相互独立，分别具有数学期望和方差，且方差是一致有上界的（$\exists M>0,D(X_n)\le M$），则对任意给定正数 $\varepsilon$ 有
  $$\lim_{n\to\infty}P\left\{\left|\dfrac{1}{n}\sum_{i=1}^nX_k-\dfrac{1}{n}\sum_{i=1}^nE(X_k)\right|<\varepsilon\right\}=1$$
  即 $X_1,X_2,\cdots,X_n,$ 的算术平均值与它们的数学期望的算术平均值之差当 $n\to\infty$ 时依概率收敛于0.

  推论：若 $X_1,X_2,\cdots,X_n,\cdots$ 又具有相同的数学期望 $E(X_k)=\mu$ 和相同的方差 $D(X_k)=\sigma^2$，则$X_1,X_2,\cdots,X_n$ 的算术平均值当 $n\to\infty$ 时依概率收敛于数学期望 $\mu$，即对于任意给定的正数 $\varepsilon$，恒有
  $$\lim_{n\to\infty}P\left\{\left|\dfrac{1}{n}\sum_{i=1}^nX_k-\mu\right|<\varepsilon\right\}=1$$
  这是在实际问题中使用算术平均数的理论依据. 对同一个量在相同条件下重复测量 $n$ 次，得到测量结果 $x_1,x_2,\cdots,x_n$，可以认为它们是服从同一分布、具有相同数学期望和方差 $\mu,\sigma^2$ 的随机变量 $X_1,X_2,\cdots,X_n$ 的观测值，当 $n$ 充分大时测量结果的平均值与真实值的误差趋近于0.
- 伯努利定理：设 $n_A$ 是在 $n$ 次独立重复试验中事件 $A$ 发生的次数，$p$ 是一次试验中 $A$ 发生的概率，则对于任意正数 $\varepsilon$ 有
  $$\lim_{n\to\infty}P\left\{\left|\dfrac{n_A}{n}-p\right|<\varepsilon\right\}=1$$
  这表明事件 $A$ 在 $n$ 次独立重复试验中发生的频率当 $n\to\infty$ 时依概率收敛于 $p$，即频率的稳定性，在实际中当 $n$ 很大时，可以用频率近似替代概率.
- 辛钦定理：设随机变量 $X_1,X_2,\dots,X_n,\dots$ 独立同分布，且具有数学期望 $E(X_k)=\mu(k=1,2,\dots)$，则对于任意正数 $\varepsilon$ 有
  $$\lim_{n\to\infty}P\left\{\left|\dfrac{1}{n}\sum_{i=1}^nX_k-\mu\right|<\varepsilon\right\}=1$$
  即前 $n$ 个随机变量的算术平均值 $\dfrac{1}{n}\sum\limits_{i=1}^nX_k$ 依概率收敛于它们的数学期望 $\mu$. 如果 $E(X^l_k)=\mu_l$ 存在，则有 $\dfrac{1}{n}\sum\limits_{i=1}^nX_k\xrightarrow{P}\mu_l$. 辛钦定理是矩估计法的理论基础.
### 中心极限定理
- 依分布收敛：设随机变量 $X,X_1,X_2,\cdots,X_n,\cdots$ 的分布函数依次为 $F(x),F_1(x),F_2(X),\cdots,F_n(x),\cdots$，如果对于 $F(x)$ 的每一个连续点都有
  $$\lim_{n\to\infty}F_n(x)=F(x)$$
  则称 $X_1,X_2,\cdots,X_n,\cdots$ 依分布收敛于 $X$，记作 $X_n\xrightarrow{L}X$.
- 独立同分布的中心极限定理：（莱维-林德伯格定理）设随机变量 $X_1,X_2,\cdots,X_n,\cdots$ 独立同分布，且具有数学期望和方差 $X_k=\mu,D(X_k)=\sigma^2\neq 0$，随机变量
  $$Y_n=\dfrac{\sum\limits_{k=1}^nX_k-n\mu}{\sqrt{n}\sigma}$$
  的分布函数为 $F_n(x)$，即
  $$F_n(x)=P\{Y_n\le x\}=P\left\{\dfrac{\sum\limits_{k=1}^nX_k-n\mu}{\sqrt{n}\sigma}\le x\right\},x\in\R$$
  则对任意实数 $x$ 恒有
  $$\lim_{n\to\infty}F_n(x)=\varPhi(x)=\int_{-\infty}^x\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{-\frac{t^2}{2}}\mathrm{d}t$$
  也就是说，随机变量 $X_1,X_2,\cdots,X_n,\cdots$ 独立同分布，且具有数学期望和方差 $X_k=\mu,D(X_k)=\sigma^2\neq 0$，则它们的算术平均值的标准化变量依分布收敛于标准正态分布的随机变量，即 $Y_n\xrightarrow{L}u$.
- 棣莫弗-拉普拉斯极限定理：设随机变量 $Y_n\sim B(n,p)(n=1,2,\dots,)$，则对任意实数 $x$ 恒有
  $$\lim_{n\to\infty}P\left\{\dfrac{Y_n-np}{\sqrt{np(1-p)}}\le x\right\}=\int_{-\infty}^x\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{-\frac{t^2}{2}}\mathrm{d}t$$
  这一定理表明当 $n$ 充分大时，可用正态分布近似计算二项分布的概率，即正态分布是二项分布的极限分布.
