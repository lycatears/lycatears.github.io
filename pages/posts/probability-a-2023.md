---
layout: post
date: 2026-07-16 16:41:29
title: 《概率论与数理统计A》2023年试题解析
categories: 学习
hide: true
tags:
  - 数学
  - 学习
  - 考试
  - 吉林大学
  - 概率论
---
## 选择题
1. 设随机变量 $X$ 的分布函数为
    $$
    F(x)=\begin{equation*}
    \begin{cases}
    0,&x< 0, \\
    \dfrac{1}{2},&0\le x< 1, \\
    1-\mathrm{e}^{-x},&x\ge 1.
    \end{cases}
    \end{equation*}
    $$
    则 $P\{X=1\}=$

    A. $0$

    B. $\dfrac{1}{2}$

    C. $\dfrac{1}{2}-\mathrm{e}^{-1}$

    D. $1-\mathrm{e}^{-1}$

> 这是一个离散型和随机型混合的分布函数. 分布函数是右连续的，$F(1)=1-\mathrm{e}^{-1},F(1^-)=\dfrac{1}{2}$，因此 $P\{X=1\}=F(1)-F(1^-)=\dfrac{1}{2}-\mathrm{e}^{-1}$，故选C.

2. 设随机变量 $X$ 服从正态分布 $N(\mu,\sigma^2)$，密度函数为 $f(x)$，且 $f(1)=1$，$P\{X\ge1\}=\dfrac{1}{2}$，则

    A. $\mu=1,\sigma^2=1$

    B. $\mu=1,\sigma^2=\dfrac{1}{\sqrt{2\pi}}$

    C. $\mu=1,\sigma^2=\dfrac{1}{2\pi}$

    D. $\mu=0,\sigma^2=1$

> 考察正态分布概率密度函数图像的性质. 根据概率密度曲线的对称性和 $P\{X\ge 1\}=\dfrac{1}{2}$ 可得图像的对称轴是 $x=1$，即 $\mu=1$，排除D项.
>
> 概率密度曲线在对称轴 $x=\mu$ 处取得最大值 $\dfrac{1}{\sqrt{2\pi}\sigma}=1$，解得 $\sigma=\dfrac{1}{\sqrt{2\pi}}$，即 $\sigma^2=\dfrac{1}{2\pi}$，故选C.

3. 若随机变量 $X$ 与 $Y$ 满足 $Y=1-\dfrac{X}{2}$，且 $D(X)=2$，则 $\text{Cov}(X,Y)=$

    A. $1$

    B. $2$

    C. $-1$

    D. $-2$

> 随机变量 $X,Y$ 的分布都未知，只有 $D(X)$ 这一个数据可利用，因此根据 $\text{Cov}(X,X)=D(X)$ 转化为关于 $D(X)$ 的表达式. $\text{Cov}(X,Y)=\text{Cov}(X,1-\dfrac{X}{2})=E(X-\dfrac{X^2}{2})-E(X)E(1-\dfrac{X}{2})=E(X)-\dfrac{1}{2}E(X^2)-E(X)+\dfrac{1}{2}E(X)^2=-\dfrac{1}{2}D(X)=-1$.
>
> 故选C.

4. 设两个相互独立的随机变量 $X$ 和 $Y$ 分别服从正态分布 $N(0,1)$ 和 $N(1,1)$，则

    A. $P\{X+Y\le 1\}=\dfrac{1}{2}$

    B. $P\{X-Y\le 1\}=\dfrac{1}{2}$

    C. $P\{X+Y\le 0\}=\dfrac{1}{2}$

    D. $P\{X-Y\le 0\}=\dfrac{1}{2}$

> 根据随机变量 $X$ 和 $Y$ 相互独立且服从正态分布，可得 $X+Y\sim N(1,2),X-Y\sim N(-1,2)$（教材P96），因此 $X+Y$ 的均值为 $1$，$X-Y$ 的均值为 $-1$，根据正态分布曲线的对称性可得A选项正确.

5. 设 $X_1,X_2,\cdots,X_n$ 为总体 $N(1,2^2)$ 的一个样本，$\bar{X}$ 为样本均值，则下列结论正确的是

    A. $\dfrac{\bar{X}-1}{2/\sqrt{n}}\sim t(n)$

    B. $\dfrac{1}{4}\sum\limits_{i=1}^n (X_i-1)^2\sim F(n,1)$

    C. $\dfrac{\bar{X}-1}{\sqrt{2}/\sqrt{n}}\sim N(0,1)$

    D. $\dfrac{1}{4}\sum\limits_{i=1}^n (X_i-1)^2\sim \chi^2(n)$

> 做这类题要了解三大分布的形式，比如分子分母哪里放标准正态分布，哪里放平方和，看选项的形式就行。
>
> A 选项：$\dfrac{\bar{X}-1}{2/\sqrt{n}}$ 服从的是标准正态分布 $N(0,1)$，错误.
>
> B 选项：$\dfrac{1}{4}\sum\limits_{i=1}^n (X_i-1)^2$ 是服从标准正态分布的随机变量平方和相加的形式（$\dfrac{X_i-1}{2}$ 是 $X_i$ 的标准化变量），应该服从 $\chi^2(n)$ 分布，没有出现平方和相除的形式，因此不是 $F$ 分布，故B选项错误.
>
> C 选项：$\bar{X}$ 的方差是 $\dfrac{\sigma^2}{n}=\dfrac{4}{n}$，标准差是 $\dfrac{2}{\sqrt{n}}$，选项中的是 $\dfrac{\sqrt{2}}{\sqrt{n}}$，故C选项错误.
>
> D选项：参见B选项，正确.

6. 设 $X_1,X_2$ 为来自总体 $N(\mu,\sigma^2)$ 的样本，若 $aX_1+\dfrac{1}{2023}X_2$ 为 $\mu$ 的一个无偏估计，则常数 $a=$

    A. $\dfrac{1}{2023}$

    B. $-\dfrac{1}{2023}$

    C. $\dfrac{2022}{2023}$

    D. $-\dfrac{2022}{2023}$

> 回顾无偏估计的定义：$E(\hat{\mu})=E(\mu)$，因此有 $E(aX_1+\dfrac{1}{2023}X_2)=\mu$.
>
> $E(aX_1+\dfrac{1}{2023}X_2)=aE(X_1)+\dfrac{1}{2023}E(X_2)=(a+\dfrac{1}{2023})\mu=\mu$，解得 $\mu=\dfrac{2022}{2023}$，故选C.

## 填空题
7. 已知 $P(A)=\dfrac{1}{2},P(B|A)=\dfrac{1}{3},P(A|B)=\dfrac{1}{2}$，概率 $P(A\cup B)=\underline{\hspace{4em}}$.

> $P(B|A)=\dfrac{P(AB)}{P(A)}=\dfrac{1}{3}$，解得 $P(AB)=\dfrac{1}{6}$
>
> $P(A|B)=\dfrac{P(AB)}{P(B)}=\dfrac{1}{2}$，解得 $P(B)=\dfrac{1}{3}$
>
> 根据加法公式有 $P(A\cup B)=P(A)+P(B)-P(AB)=\dfrac{2}{3}$

8. 设随机变量 $X$ 与 $Y$ 相互独立，具有相同的分布律

    |$X$|0|1|
    |-|-|-|
    |$P$|0.4|0.6|

    则 $\max(X,Y)$ 的分布律为 $\underline{\hspace{4em}}$.

> 所求随机变量表示的是 $X,Y$ 中的最大值，因此取值为 0，1. $\max(X,Y)=0$ 包括 $\{X=0,Y=0\}$ 一种情况，而 $\max(X,Y)=1$ 包含 $\{X=1,Y=1\},\{X=1,Y=0\},\{X=0,Y=1\}$ 三种情况.
>
> 由于$X,Y$ 相互独立，有 $P\{X=0,Y=0\}=0.4^2=0.16,P\{X=0,Y=1\}=0.4\times 0.6=0.24,P\{X=1,Y=0\}=0.6\times 0.4=0.24,P\{X=1,Y=1\}=0.6^2=0.36$，即 $P\{\max(X,Y)=1\}=0.24+0.24+0.36=0.84,P\{\max(X,Y)=0\}=0.16$
>
> 故分布律为
> |$\max(X,Y)$|0|1|
> |-|-|-|
> |$P$|0.16|0.84|

9. 设随机变量 $X$ 的概率密度为
    $$
    f(x)=\begin{equation*}
    \begin{cases}
    \dfrac{1}{2}\cos\dfrac{x}{2},&0\le x\le \pi, \\
    0,&\text{其他}.
    \end{cases}
    \end{equation*}
    $$
    对 $X$ 独立重复地观察4次，用 $Y$ 表示观察值大于 $\dfrac{\pi}{3}$ 的次数，则 $E(Y^2)=\underline{\hspace{4em}}$.

> 在区间 $[0,\pi]$ 上，$X$ 的分布函数为 $\int_{0}^x \dfrac{1}{2}\cos\dfrac{t}{2}\mathrm{d}t=\sin\dfrac{x}{2}$. 因此，$P\{X\ge \dfrac{\pi}{3}\}=1-P\{X\le \dfrac{\pi}{3}\}=1-\sin\dfrac{\pi}{6}=\dfrac{1}{2}$
>
> $Y$ 即为 4 次伯努利试验，服从二项分布 $B(4,\dfrac{1}{2})$，由此可得 $E(Y)=2,D(Y)=1=E(Y^2)-[E(Y)]^2$，解得 $E(Y^2)=5$.

10. 设在每次试验中，事件 $A$ 发生的概率是$0.8$，用 $X$ 表示 $1000$ 次独立试验中事件 $A$ 发生的次数，根据切比雪夫不等式，有 $P\{760<X<840\}\ge\underline{\hspace{4em}}$.

> 1000次独立重复实验中 $A$ 发生的次数为 $X$，服从二项分布 $B(1000,0.8)$，易得 $E(X)=800,D(X)=1000\times 0.8\times 0.2=160$，根据切比雪夫不等式有 $P\{|X-E(X)|\le \varepsilon\}\ge 1-\dfrac{D(X)}{\varepsilon^2}$. 所求概率为 $P\{|X-800|\le 40\}\ge1-\dfrac{160}{40^2}=\dfrac{9}{10}$.

11. 设总体 $X\sim N(\mu,3^2)$，要使未知参数 $\mu$ 的置信水平为0.95的置信区间的长度 $L\le 2$，样本容量 $n$ 至少为 $\underline{\hspace{4em}}$.

> 已知总体方差求总体均值 $\mu$ 的置信区间，选用统计量 $\dfrac{\bar{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1)$，得到不等式
> $$-u_{0.025}<\dfrac{\bar{X}-\mu}{\sigma/\sqrt{n}}<u_{0.025}$$
> 解得置信区间为
> $$\left(\bar{X}-\dfrac{\sigma}{\sqrt{n}}u_{0.025},\bar{X}+\dfrac{\sigma}{\sqrt{n}}u_{0.025}\right)$$
> 因此区间长度为 $\dfrac{2\sigma}{\sqrt{n}}u_{0.025}\le 2$，即 $n\ge 9\times 1.96^2 \approx 34.5744$，取 35
> （不知道这个题考场上有没有补充参考数据……）

12.  设 $X_1,X_2,\cdots,X_n$ 是来自总体 $X\sim N(\mu,\sigma^2)$ 的样本，若 $\sigma^2$ 未知， $\bar{X}$ 和 $S^2$ 分别为样本均值和样本方差，检验假设为 $H_0:\mu=\mu_0,H_1:\mu\neq\mu_0$，则应取检验统计量为 $\underline{\hspace{4em}}$.

> $\sigma^2$ 未知，对 $\mu$ 进行假设检验，选择统计量 $\dfrac{\bar{X}-\mu_0}{S/\sqrt{n}}$

## 解答题
13. （8分）已知 9 支手枪中有 6 支已校准过，3 支未校准。一名射手如果用校准过的手枪射击，命中率为 0.9，如果用未校准过的手枪射击，命中率为 0.3。现从这 9 支手枪中任取一支射击。求：
- （1）他能命中目标的概率；
- （2）如果他命中目标，则所用的手枪是校准过的概率.


---
14. （8分）设连续型随机变量 $X$ 的概率密度为
    $$
    f(x)=\begin{equation*}
    \begin{cases}
    x,&0\le x< 1, \\
    k(2-x),&1\le x< 2, \\
    0,&\text{其他}.
    \end{cases}
    \end{equation*}
    $$
    求：
- （1）$k$ 的值；
- （2）随机变量 $X$ 落在 $(1,3)$ 内的概率；
- （3）$X$ 的分布函数.


---
15. （6分）据以往经验，某种电器元件的寿命服从均值为 100h 的指数分布，现随机地取 16 只，设它们的寿命是相互独立的，求这 16 只元件的寿命总和大于 1920h 的概率.（$\varPhi(0.8)=0.7881$）


---
16. （8分）设总体 $X$ 具有概率分布

    |$X$|1|2|3|
    |-|-|-|-|
    |$P$|$\theta^2$|$2\theta(1-\theta)$|$(1-\theta)^2$|

    其中 $\theta(0<\theta<1)$ 是位置参数，已知来自总体 $X$ 的样本值为 $1,2,1,3$. 求 $\theta$ 的矩估计值和最大似然估计值.


---
17. （6分）设总体 $X\sim N(\mu,\sigma^2),X_1,X_2,\cdots,X_{2n}(n\ge 2)$ 为取自 $X$ 的样本，其样本均值为
    $$\bar{X}=\dfrac{1}{2n}\sum_{i=1}^{2n}X_i$$
    且
    $$Y=\sum_{i=1}^n(X_i+X_{n+i}-2\bar{X})^2$$
    求 $E(Y)$.



---
18. （14分）设 $A$ 和 $B$ 为两个随机事件，且 $P(A)=\dfrac{1}{4},P(B|A)=\dfrac{1}{3},P(A|B)=\dfrac{1}{2}$，令
    $$
    X=\begin{equation*}
    \begin{cases}
    1,&A\text{发生}, \\
    0,&A\text{不发生}, \\
    \end{cases}
    \end{equation*}
    Y=\begin{equation*}
    \begin{cases}
    1,&B\text{发生}, \\
    0,&B\text{不发生}, \\
    \end{cases}
    \end{equation*}
    $$
    求 $X$ 与 $Y$ 的联合概率分布和 $Z=X^2+Y^2$ 的概率分布.


---
19. （14分）已知二维随机变量 $(X,Y)$ 的概率密度为
    $$
    f(x,y)=\begin{equation*}
    \begin{cases}
    k\mathrm{e}^{-(2x+y)},&x>0,y>0, \\
    0,&\text{其他}.
    \end{cases}
    \end{equation*}
    $$
- （1）求系数 $k$；
- （2）求条件概率密度 $f_{X|Y}(x|y)$；
- （3）判断 $X$ 和 $Y$ 是否相互独立；
- （4）计算概率 $P\{X<2|Y<1\}$.
