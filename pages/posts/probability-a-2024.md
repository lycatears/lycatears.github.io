---
layout: post
title: 《概率论与数理统计A》2024年试题解析
date: 2024-07-02 20:13:28
categories: 学习
# hide: true
excerpt: 中规中矩的一套概率论试题
tags:
  - 数学
  - 学习
  - 考试
  - 吉林大学
  - 概率论
---
## 简介
- 考试时间2024年6月26日13:00-15:00，两小时。
- 难度中规中矩。概率论在吉大公共数学课中的难度比较简单，不必过度复习。
- 没做这套卷之前别看下面的解析。
> 雪落幽静院落，又是一年隆冬。——《寒灯人》
## 选择题
1. 设随机事件$A$与$B$互不相容，则

    A. $P(\overline{AB})=0$

    B. $P(AB)=P(A)P(B)$

    C. $P(A)=1-P(B)$

    D. $P(\overline{A}\cup\overline{B})=1$

> 注意区分 **不相容** 和 **对立** 两个概念. 如果事件$A$和事件$B$不能同时发生（即 $A\cap B = \emptyset$），则称这两个事件不相容或者互斥；特殊地，如果不相容事件$A$和$B$的并集覆盖了整个样本空间（即$A\cup B = U$），则为对立事件. 本题中，$A$、$B$仅仅是不相容事件，显然C选项错误. $A$、$B$的交事件为空事件，$P(AB)=0$，因此$P(\overline{AB})=1$，A、B选项错误.
>
> 由于$A\cap B = \emptyset$，有$A \subseteq \overline{B}, B \subseteq \overline{A}$，又$\overline{A}=U-A,\overline{B}=U-B$，因此$P(\overline{A}\cup\overline{B})=1$. 用韦恩图来解释，就是$\overline{A}$对应全集去掉$A$的部分，与$\overline{B}$相交则正好补上了被挖掉的$A$这一块. 综上，D选项正确.
>
> 故选D.

2. 设二维离散型随机变量$(X,Y)$的概率分布为

   | X\Y | 0     | 1     |
   | --- | ----- | ----- |
   | 0   | $0.4$ | $a$   |
   | 1   | $b$   | $0.1$ |

    已知随机事件$\{X=0\}$与$\{X+Y=1\}$相互独立，则

    A. $a=0.2,b=0.3$

    B. $a=0.4,b=0.1$

    C. $a=0.3,b=0.2$

    D. $a=0.1,b=0.4$

> 根据概率分布的性质可知，表格里面所有的数字加起来等于 $1$ ，即 $0.5+a+b=1$ .
>
> 相互独立的定义：$P(AB)=P(A)P(B)$，二者的交事件显然对应$X=0,Y=1$这一种情况，其概率为$a$. $P\{X=0\}=0.4+b,P\{X+Y=1\}=P\{X=0,Y=1\}+P\{X=1,Y=0\}=a+b$ ，因此有 $(0.4+b)(a+b)=a$.
>
> 联立两式解得$a=0.3,b=0.2$，故选C.
>
> ~~其实得到两个方程之后直接把ABCD带进去就行了~~

3. 已知雷达的圆形屏幕半径为$R$，设目标出现点$(X,Y)$在屏幕上服从均匀分布，则$P\{Y> 0 | Y> X\}=$

    A. $\dfrac{1}{2}$

    B. $\dfrac{3}{4}$

    C. $\dfrac{1}{8}$

    D. $\dfrac{3}{8}$

> 几何概型+条件概率，看图说话，设整个雷达屏幕面积为$S$. ![看图说话](https://www.helloimg.com/i/2026/07/02/6a4556061376f.png)
>
> 满足$Y>X$的是紫色和蓝色区域$\left(\dfrac{1}{2}S\right)$，而满足$Y>0$的是紫色和粉色区域$\left(\dfrac{1}{2}S\right)$，所求条件概率即对应紫色区域的面积$\left(\dfrac{3}{8}S\right)$，因此答案是$\dfrac{3}{4}$，选择B.

4. 设随机变量$X_1,X_2,\cdots,X_n(n> 1)$独立同分布，且其方差为$\sigma^2> 0$. 令$Y=\dfrac{1}{n}\sum\limits_{i=1}^n X_i$，则

    A. $D(X_1+Y)=\dfrac{n+2}{n}\sigma^2$

    B. $D(X_1-Y)=\dfrac{n+1}{n}\sigma^2$

    C. $\text{Cov}(X_1,Y)=\dfrac{\sigma^2}{n}$

    D. $\text{Cov}(X_1,Y)=\sigma^2$

> 根据样本方差的定义有
> $$\text{Cov}(X_1,Y)=\text{Cov}(X_1,\dfrac{1}{n}\sum_{i-1}^n X_i)=\dfrac{1}{n}\sum_{i=1}^n\text{Cov}(X_1,X_i)$$
> 由于 $X_1,X_2,\cdots,X_n$ 独立同分布，因此它们之间两两不相关，即
> $$\text{Cov}(X_i,X_j)=0 (1\le i,j \le n,i\neq j)$$
> 用人话来说就是随便拿出来两个不同的样本，他们的协方差都是0. 由此可得
> $$\dfrac{1}{n}\sum_{i=1}^n\text{Cov}(X_1,X_i)=\dfrac{1}{n}\text{Cov}(X_1,X_1)=\dfrac{D(X_1)}{n}=\dfrac{\sigma^2}{n}$$
> 故C正确，D错误.
>
> 下面证明A，B错误.
> $$D(X_1+Y)=D(X_1)+D(Y)+2\text{Cov}(X_1,Y)=\sigma^2+\dfrac{\sigma^2}{n}+\dfrac{2\sigma^2}{n}=\dfrac{(n+3)\sigma^2}{n}$$
> $$D(X_1-Y)=D(X_1)+D(Y)-2\text{Cov}(X_1,Y)=\sigma^2+\dfrac{\sigma^2}{n}-\dfrac{2\sigma^2}{n}=\dfrac{(n-1)\sigma^2}{n}$$
> 因此A，B两项错误. 综上所述，选择C.

5. 将一枚硬币重复掷$n$次，以$X$和$Y$分别表示正面朝上和反面朝上的次数，则$X$与$Y$的相关系数为

    A. $1$

    B. $-1$

    C. $0$

    D. $0.5$


> $\text{Cov}(X,Y)=\text{Cov}(X,n-X)=E(nX-X^2)-E(X)E(n-X) \\ =[nE(X)-E(X^2)]-[nE(X)-E(X)^2] \\ =-E(X^2)+E(X)^2\\ =-D(X)\\=-\dfrac{n}{4}$
>
> 易得 $X,Y$均服从二项分布 $B\left(n,\dfrac{1}{2}\right)$，因此$D(X)=D(Y)=\dfrac{n}{4}$.
>
> 相关系数为
> $$\rho_{XY}=\dfrac{\text{Cov}(X,Y)}{\sqrt{D(X)}\sqrt{D(Y)} }=-1.$$
> 故选B.
>
> 由于 $P\{Y=n-X\}=1$，可得$|\rho_{XY}|=1$. 又有$X,Y$负相关，因此$\rho_{XY}=-1.$ 故选B.

6. 设总体$X\sim N(\mu ,1),X_1,X_2,\cdots,X_n$是来自总体$X$的样本，检验假设为$H_0:\mu=0,H_1:\mu \neq 0$，则应取检验统计量

    A. $\sum \limits_{i=1}^n X_i^2$

    B. $(n-1)S^2$

    C. $\dfrac{\overline{X}}{S}\sqrt{n}$

    D. $\sqrt{n} \overline{X}$

> 根据题设的检验假设，本题是 $\sigma^2$ 已知，关于 $\mu$ 的假设检验，因此采用 $u$ 检验即可.
>
> 所取的检验统计量为 $u=\dfrac{\bar{X}-\mu_0}{\sigma / \sqrt{n}}$，代入 $\sigma = 1,\mu_0=0$ 得 $u=\sqrt{n}\bar{X}$.故选D.
> 
> **突击请看教材204页表格**

## 填空题
7. 已知$P(A)=\dfrac{1}{4},P(B|A)=\dfrac{1}{3}$，则$P(A\overline{B})=\underline{\hspace{4em}}$.

> $P(B|A)=\dfrac{P(AB)}{P(A)}=\dfrac{1}{3}$，解得$P(AB)=\dfrac{1}{12}$. 又因为$P(A)=P(AB)+P(A\overline{B})$，易得$P(A\overline{B})=\dfrac{1}{6}$.

8. 设随机变量$X$的分布函数为
$$
F(x)=\begin{equation*}
\begin{cases}
0,&x< -1 \\
0.3,&-1\le x< 1 \\
0.4,&1\le x < 3 \\
1,& x\ge 3.
\end{cases}
\end{equation*}
$$
则$E(X)=\underline{\hspace{4em}}$.

> 易得$X$为离散型随机变量，其概率分布为：
> |$X$|-1|1|3|
> |---|---|---|---|
> |$P$|0.3|0.1|0.6|
>
> 因此其数学期望为$E(X)=0.3\times(-1)+0.1\times 1 + 0.6\times 3=1.6$.

9. 已知随机变量$X$的概率密度为
$$
f(x)=\begin{equation*}
\begin{cases}
\dfrac{x}{8},&0\le x \le 4 \\
0,& \text{其他}.
\end{cases}
\end{equation*}
$$
  则随机变量$Y=2X+8$的概率密度为$f_Y(y)=\underline{\hspace{4em}}$.

> $X$的分布函数为$F_X(x)=\int f(x) \mathrm{d}x = \dfrac{1}{16}x^2+C$，易得$C=0$，则$F_X(x)=\dfrac{1}{16}x^2(0\le x \le 4)$.
>
> 因此$Y$的分布函数为 $F_Y(y)=P\{Y\le y\}=P\{2X+8\le y\}=P\{X \le \dfrac{y-8}{2}\}=F_X(\dfrac{y-8}{2})=\dfrac{(y-8)^2}{64}$.
>
> 根据$X$ 与 $Y$ 的关系可得$Y$ 的取值范围为 $8\le Y \le 16$，因此 $Y$ 的概率密度函数为$F_Y'(y)=\dfrac{y-8}{32} ( 8\le y \le 16 )$.
>
> 综上所述：
>
> $$f_Y(y)=\begin{equation*}
> \begin{cases}
> \dfrac{y-8}{32},&8\le y \le 16, \\
> 0,& \text{其他}.
> \end{cases}
> \end{equation*}
> $$

10. 已知二维随机变量$(X,Y)$服从二维正态分布$N(2,2,1,5,0)$，则根据切比雪夫不等式可知$P\{\left|X-Y\right|\ge 6\}\le \underline{\hspace{4em}}$.

> 根据二维正态分布的性质有 $X\sim N(2,1),Y\sim N(2,5)$. 故有
> $$E(X-Y)=2-2=0$$
>
> 注意到二维正态分布中 $\rho = 0$ ，即 $X,Y$ 相互独立（二维正态分布的性质），因此
> $$D(X-Y)=D(X)+D(Y)=6$$
>
> 根据切比雪夫不等式有
> $$P\{|X-Y|\ge 6\}=P\{|X-Y-E(X-Y)|\ge 6\}\le \dfrac{D(X-Y)}{6^2}=\dfrac{1}{6}$$

11. 设$X_1,X_2,\cdots,X_n$是来自总体$X\sim N(0,1)$的样本，则$E\left[(\overline{X}S^2)^2\right]=\underline{\hspace{4em}}$.

> 对于正态总体 $X\sim N(0,1)$，其样本均值 $\bar{X}$ 和样本方差 $S^2$相互独立，因此有$E\left[(\bar{X}S^2)^2\right]=E(\bar{X}^2)E\left[(S^2)^2\right]$.
>
> 先求 $E(\bar{X}^2)$ . 根据方差计算公式可得
> $$D(\bar{X})=E(\bar{X}^2)-\left[E(\bar{X})\right]^2$$
> 正态总体 $X$ 的样本均值方差为
> $$D(\bar{X})=\dfrac{\sigma^2}{n}=\dfrac{1}{n}$$
> 再求 $E\left[ (S^2)^2 \right]$ . 正态总体 $X$ 的样本方差有
> $$\dfrac{(n-1)S^2}{\sigma^2}\sim \chi^2(n-1)$$
> 根据 $\chi^2$ 分布的性质，可得
> $$D\left[\dfrac{(n-1)S^2}{\sigma^2}\right]=\dfrac{(n-1)^2}{\sigma^4}D(S^2)=2(n-1)$$
> 因此，$S^2$ 的方差为
> $$D(S^2)=\dfrac{2\sigma^4}{n-1}=\dfrac{2}{n-1}$$
> 根据方差计算公式得
> $$D(S^2)=E\left[(S^2)^2\right]-\left[E(S^2)\right]^2(*)$$
> $S^2$ 的数学期望为
> $$E(S^2)=\sigma^2=1$$
> 代入 (*) 式，解得
> $$E\left[(S^2)^2\right]=\dfrac{n+1}{n-1}$$
> 综上所述：
> $$E\left[(\bar{X}S^2)^2\right]=E(\bar{X}^2)E\left[(S^2)^2\right]=\dfrac{n+1}{n(n-1)}$$

12. 设$X_1,X_2,\cdots,X_n$为来自总体$X\sim N(\mu ,\sigma^2)$的样本，若$\sigma^2$未知，$\overline{X}$和$S^2$分别为样本均值和样本方差，则$\mu$的置信水平为$1-\alpha$的置信区间为$\underline{\hspace{4em}}$.

> $X$ 服从正态分布，由于 $\sigma^2$ 未知，采用 $t=\dfrac{\bar{X}-\mu}{S}\sqrt{n}\sim t(n-1)$ 进行参数估计.
>
> 对于给定的置信水平 $1-\alpha$ ，根据 $t$ 分布的对称性，有 $-t_{\frac{\alpha}{2}}(n-1)<\dfrac{\bar{X}-\mu}{S}\sqrt{n}< t_{\frac{\alpha}{2}}(n-1)$
>
> 解得
> $$\bar{X}-\dfrac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1)<\mu<\bar{X}+\dfrac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1)$$
> 所求置信区间为
> $$\left(\bar{X}-\dfrac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1),\bar{X}+\dfrac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1)\right)$$
> 区间估计虽然看着吓人，但其实全是套公式的套路题。

## 解答题
13. (10分) 已知来自甲、乙、丙三个学校的学生进行体质达标测试，每个学校参与测试的人数相同，测试不合格的学生分别占7%、12%、11%.现随机抽取一名学生，求：

- (1) 抽到的学生测试不合格的概率；

- (2) 若抽到的学生测试不合格，则其来自乙校的概率.

> (1) 考察全概率公式. $p_1=\dfrac{1}{3}\times 0.07 + \dfrac{1}{3}\times 0.12 + \dfrac{1}{3}\times 0.11=0.1.$
>
> (2) 考察贝叶斯公式. $p_2=\dfrac{\dfrac{1}{3}\times0.12}{\dfrac{1}{3}\times 0.07 + \dfrac{1}{3}\times 0.12 + \dfrac{1}{3}\times 0.11}=\dfrac{0.04}{0.1}=0.4.$
>
> 高中题，这个不会做的话，哥们，你别睡了，你睡不起了，再睡真挂了。

---
14. (8分) 设随机变量$X$的概率密度为
$$
f(x)=C\mathrm{e}^{-|x|},-\infty < x < +\infty.$$
- (1) 求常数$C$；
- (2) 若$X_1,X_2,\cdots,X_n$为来自总体$X$的样本，其样本方差为$S^2$，求$E(S^2)$.

> (1) 根据概率密度函数的性质有
> $$ \int_{-\infty}^{+\infty} C\mathrm{e}^{-|x|}\mathrm{d}x=C\left(\int_{-\infty}^{0} \mathrm{e}^{x}\mathrm{d}x + \int_{0}^{+\infty} \mathrm{e}^{-x}\mathrm{d}x\right)=2C=1$$
> 易得$C=\dfrac{1}{2}$.
>
> (2) 由于 $E(S^2)=\sigma^2$，因此求出该总体的方差即可.
>
> $$E(X^2)=\dfrac{1}{2}\left(\int_{-\infty}^{0}x^2\mathrm{e}^x\mathrm{d}x+\int_{0}^{+\infty}x^2\mathrm{e}^{-x}\mathrm{d}x\right)=1+1=2.$$
> $$E(X)=\dfrac{1}{2}\left(\int_{-\infty}^{0}x\mathrm{e}^x\mathrm{d}x+\int_{0}^{+\infty}x\mathrm{e}^{-x}\mathrm{d}x\right)=-\dfrac{1}{2}+\dfrac{1}{2}=0.$$
>
> 因此 $D(X)=E(X^2)-[E(X)]^2=4.$

---
15. (8分) 已知一批零件长度为随机变量$X$，且$X\sim N(16,25)$（单位：厘米），现独立抽取三个零件观测，求至少有一个零件长度大于$16$厘米的概率.

> 设随机变量 $\eta$ 表示抽取零件长度大于 $16\mathrm{cm}$ 的个数，则 $\eta$ 可能的取值为$0,1,2,3$.
>
> 由于$X\sim N(16,25)$，$P\{X>16\}=\dfrac{1}{2}$.
>
> 三个零件的长度是否大于16cm是独立同分布的，因此 $\eta$ 服从二项分布 $B(3,\dfrac{1}{2})$，$P\{\eta\ge 1\} = 1-P\{\eta = 0 \}=1-\left(\dfrac{1}{2}\right)^3=\dfrac{7}{8}$.

---
16.  (6分) 设总体$X$的概率密度为
$$
f(x)=\begin{equation*}
\begin{cases}
2\mathrm{e}^{-2(x-\theta)},&x\ge \theta, \\
0,& x < \theta.
\end{cases}
\end{equation*}
$$

其中$\theta > 0$是未知参数，$X_1,X_2,\cdots,X_n$为来自总体$X$的样本，记 $\hat{\theta}=\min(X_1,X_2,\cdots,X_n)$，证明：$\hat{\theta}$ 不是 $\theta$ 的无偏估计量.

> 证明：要证 $\hat{\theta}$ 不是 $\theta$ 的无偏估计量，即证 $E(\hat{\theta}) \neq E(\theta)$ .
>
> 要求出 $\hat{\theta}$ 的数学期望，需要求出其概率密度函数，进而需要先得到随机变量$X$的分布函数.
>
> - 当 $x < \theta$ 时：
>
> $$F_X(x)=\int_{-\infty}^{x}0\mathrm{d}t=0$$
>
> - 当 $x \ge \theta$ 时：
>
> $$F_X(x)=\int_{-\infty}^{\theta}0\mathrm{d}t + \int_{\theta}^{x}2\mathrm{e}^{-2(t-\theta)}\mathrm{d}t=1-\mathrm{e}^{-2(x-\theta)}$$
>
> 因此，$X$ 的分布函数为
> $$F_X(x)=\begin{equation*}
> \begin{cases}
> 0,&x < \theta, \\
> 1-\mathrm{e}^{-2(x-\theta)},& x \ge \theta.
> \end{cases}
> \end{equation*}
> $$
>
> 接下来计算 $\hat{\theta}$ 的分布函数. 由于 $\hat{\theta}=\min(X_1,X_2,\cdots,X_n)$，设 $Y=\hat{\theta}$ ~~(这里是因为符号不方便分配)~~，有
>
> $$F_Y(y)=P\{\min(X_1,X_2,\cdots,X_n)\le y\} = 1-P\{\min(X_1,X_2,\cdots,X_n)>y\}$$
>
> 由于 $X_1,X_2,\cdots,X_n$ 均为来自总体 $X$ 的简单随机样本，上式等价于
> $$1-\prod_{i=1}^{n}P\{X_i>y\}=1-\prod_{i=1}^n(1-F_X(y))=1-(1-F_X(y))^n$$
> 即 $Y$ 在区间 $\left[\theta,+\infty \right)$ 上的分布函数为
> $$F_Y(y)=1-\mathrm{e}^{-2n(y-\theta)}$$
> 求导，得其在区间 $\left[\theta,+\infty\right)$ 上的概率密度函数为
> $$f_Y(y)=2n\mathrm{e}^{-2n(y-\theta)}$$
> 易证明区间 $\left(-\infty,\theta\right)$ 上的概率密度恒为0 ~~即得易见平凡，仿照上例显然，留做习题答案略，读者自证不难~~. 估计量 $\hat{\theta}=Y$ 的数学期望为
> $$E(Y)=\int_{+\infty}^\theta0\mathrm{d}y + \int_\theta^{+\infty}2ny\mathrm{e}^{-2n(y-\theta)}\mathrm{d}y=\theta+\dfrac{1}{2n}\neq \theta$$
> 综上所述，$\hat{\theta}$ 不是 $\theta$ 的无偏估计.

---
17.  (10分) 设$X$与$Y$相互独立，且服从同一分布，已知$X$的分布律为
$$
P\{X=i\}=\dfrac{1}{3},i=1,2,3.
$$
设 $M=\max(X,Y),N=\min(X,Y)$. 求：
- (1) 二维随机变量$(X,Y)$的概率分布；
- (2) $\text{Cov}(X+Y,X-Y)$；
- (3) 二维随机变量$(M,N)$的概率分布（概率分布只需列出表格）.

> (1) ~~注意到~~$X$的分布律为
> |$X$|1|2|3|
> |----|---|---|---|
> |$P$|$\dfrac{1}{3}$|$\dfrac{1}{3}$|$\dfrac{1}{3}$|
>
> $Y$与$X$独立同分布. 因此二维随机变量$(X,Y)$的分布律为
>
> |Y\X|1|2|3|
> |-|-|-|-|
> |1|$\dfrac{1}{9}$|$\dfrac{1}{9}$|$\dfrac{1}{9}$|
> |2|$\dfrac{1}{9}$|$\dfrac{1}{9}$|$\dfrac{1}{9}$|
> |3|$\dfrac{1}{9}$|$\dfrac{1}{9}$|$\dfrac{1}{9}$|
>
> (2) $\text{Cov}(X+Y,X-Y)=\text{Cov}(X+Y,X)-\text{Cov}(X+Y,Y)\\ =\text{Cov}(X,X)+\text{Cov}(Y,X)-\text{Cov}(X,Y)-\text{Cov}(Y,Y)\\ = \text{Cov}(X,X)-\text{Cov}(Y,Y)\\ =D(X)-D(Y)$
>
> 由于$X$和$Y$是独立同分布的随机变量，因此$D(X)=D(Y)$，即$\text{Cov}(X+Y,X-Y)=0$.
>
> (3) 易得$M,N$的取值为$1,2,3$. $M,N$的所有取值对应的$(X,Y)$如下表所示：
> |M\N|1|2|3|
> |-|-|-|-|
> |1|$(1,1)$|$\emptyset$|$\emptyset$|
> |2|$(2,1),(1,2)$|$(2,2)$|$\emptyset$|
> |3|$(1,3),(3,1)$|$(3,2),(2,3)$|$(3,3)$|
>
> 因此 $(M,N)$ 的分布律为：
> |M\N|1|2|3|
> |-|-|-|-|
> |1|$\dfrac{1}{9}$|$0$|$0$|
> |2|$\dfrac{2}{9}$|$\dfrac{1}{9}$|$0$|
> |3|$\dfrac{2}{9}$|$\dfrac{2}{9}$|$\dfrac{1}{9}$|

---
18.  (10分) 设二维随机变量$(X,Y)$的概率密度为
$$
f(x,y)=\begin{equation*}
\begin{cases}
\dfrac{1}{8}(x+y),&0\le x\le 2, 0\le y\le 2, \\
0,& \text{其他}.
\end{cases}
\end{equation*}
$$
- (1) 判断$X$与$Y$是否相互独立；
- (2) 求$\rho_{XY}$.

> (1) $X$ 的边缘概率密度为
> $$f_X(x) = \int_{0}^2\dfrac{1}{8}(x+y)\mathrm{d}y=\dfrac{1}{4}x+\dfrac{1}{4}$$
> $Y$ 的边缘概率密度为
> $$f_Y(y) = \int_{0}^2\dfrac{1}{8}(x+y)\mathrm{d}x=\dfrac{1}{4}y+\dfrac{1}{4}$$
> 由于$f_X(x)f_Y(y)=\dfrac{(x+1)(y+1)}{16}\neq f(x,y)$，因此 $X$ 与 $Y$ 不相互独立.
>
> (2) 选择协方差计算公式 $\text{Cov}(X,Y)=E(XY)-E(X)E(Y)$
> $$E(X)=\int_0^2 \dfrac{1}{4}x^2+\dfrac{1}{4}x\mathrm{d}x=\dfrac{7}{6}$$
> $$E(X^2)=\int_0^2 \dfrac{1}{4}x^3+\dfrac{1}{4}x^2\mathrm{d}x=\dfrac{5}{3}$$
> $$E(Y)=\int_0^2 \dfrac{1}{4}y^2+\dfrac{1}{4}y\mathrm{d}y=\dfrac{7}{6}$$
> $$E(Y^2)=\int_0^2 \dfrac{1}{4}y^3+\dfrac{1}{4}y^2\mathrm{d}y=\dfrac{5}{3}$$
> $$E(XY)=\iint_{0\le x,y \le 2} \dfrac{1}{8}xy(x+y)\mathrm{d}x\mathrm{d}y=\dfrac{4}{3}$$
> $$\text{Cov}(X,Y)=E(XY)-E(X)E(Y)=-\dfrac{1}{36}$$
> $$D(X)=E(X^2)-\left[E(X)\right]^2=\dfrac{11}{36}$$
> $$D(Y)=E(Y^2)-\left[E(Y)\right]^2=\dfrac{11}{36}$$
> $$\rho_{XY}=\dfrac{\text{Cov}(X,Y)}{\sqrt{D(X)}\sqrt{D(Y)} }=-\dfrac{1}{11}$$
> 没啥好说的，纯计算题，考察对公式的理解和记忆，公式别记混了就行。

---
19. (12分) 设随机变量$X$的分布函数为
$$
F(x;\alpha, \beta)=\begin{equation*}
\begin{cases}
1-\left(\dfrac{\alpha}{x}\right)^\beta,&x>\alpha \\
0,& x\le \alpha.
\end{cases}
\end{equation*}
$$
其中$\alpha >0,\beta >1$为参数.设$X_1,X_2,\cdots,X_n$为来自总体$X$的样本.
- (1) 当 $\alpha=1$ 时，求未知参数 $\beta$ 的矩估计量和最大似然估计量；
- (2) 当 $\beta=2$ 时，求未知参数 $\alpha$ 的最大似然估计量.

> (1) 当 $\alpha = 1$ 时，$X$ 在区间 $(1,+\infty)$ 上的分布函数为
> $$F(x)=1-\left( \dfrac{1}{x} \right)^\beta=1-x^{-\beta}$$
> 求导得 $X$ 的概率密度函数为
> $$f(x)=F'(x)=\beta x^{-(\beta+1)}$$
> 易得 $X$ 在区间 $\left(-\infty,1\right]$ 上的概率密度恒为$0$.
>
> **先求矩估计量**：
> $$\mu_1=E(X)=\int_{-\infty}^{1}0\mathrm{d}x + \int_{1}^{\infty}\beta x \cdot x^{-(\beta+1)}\mathrm{d}x=\int_{1}^{+\infty}\beta x^{-\beta}\mathrm{d}x$$
> 由于 $\beta > 1$，该反常积分收敛. 计算得总体的均值（一阶矩）为
> $$\left[\dfrac{-\beta x^{-(\beta-1)}}{\beta-1}\right]^{+\infty}_{1}=\dfrac{\beta}{\beta-1}$$
> 样本均值为
> $$\bar{X}=\dfrac{1}{n}\sum_{i=1}^{n}X_i=\dfrac{\beta}{\beta-1}$$
> 解得 $\beta$ 的矩估计量为
> $$\hat{\beta} = \dfrac{\bar{X}}{\bar{X}-1}=\dfrac{\dfrac{1}{n}\sum\limits_{i-1}^{n}X_i}{\dfrac{1}{n}\sum\limits_{i-1}^{n}X_i -1}$$
> > 这里题目条件没给 $\bar{X}$ 这个符号，不知道考试的时候能不能直接写，所以这里的解析都是把样本均值展开写的，看起来形式很繁琐.
>
> **再求最大似然估计量**：
>
> 似然函数为
> $$L(\beta)=\prod_{i=1}^{n}f(x_i)=\prod_{i=1}^{n}\beta x^{-(\beta+1)}=\beta^n(\prod_{i=1}^{n}x_i)^{-(\beta+1)}$$
> 两边取对数，得到对数似然函数为
> $$\ln L(\beta)=n\ln \beta-(\beta+1)\sum_{i=1}^{n}\ln x_i$$
> 对数似然函数关于 $\beta$ 的偏导数为
> $$\dfrac{\partial \ln L(\beta)}{\partial \beta}=\dfrac{n}{\beta}-\sum_{i=1}^{n}\ln x_i$$
> 令该偏导数为 $0$，解得 $\beta$ 的最大似然估计值为
> $$\hat{\beta}_0=\dfrac{n}{\sum\limits_{i=1}^{n}\ln x_i}$$
> 即最大似然估计量为
> $$\hat{\beta}=\dfrac{n}{\sum\limits_{i=1}^{n}\ln X_i}$$
> > 注意：这里要区分 **最大似然估计值** 和 **最大似然估计量** . 估计值是由随机变量的 **观测值** 计算得到的，观测值一般用小写字母表示. 估计量是随机变量的函数，随机变量一般用大写字母表示.
>
> (2) 当 $\beta=2$ 时，$X$ 在区间 $(\alpha,+\infty)$ 的分布函数为
> $$F(x)=1-\left(\dfrac{\alpha}{x}\right)^2=1-\alpha^2x^{-2}$$
> 求导得 $X$ 的概率密度函数为
> $$f(x)=\dfrac{1}{2}\alpha^2 x^{-3}$$
> 易得 $(-\infty,\alpha]$ 上概率密度恒为 $0$. 似然函数为
> $$L(\alpha)=\prod_{i=1}^{n}\dfrac{1}{2}\alpha^2x^{-3}=\dfrac{1}{2^n}\alpha^{2n}\prod_{i=1}^{n}x_i^{-3}$$
> **注意到** $L(\alpha)$ 是关于 $\alpha$ 的单调增加函数，注意力不够的看下面：
>
> 两边取对数，得到对数似然函数
> $$\ln L(\alpha) = -n\ln 2+2n\ln \alpha-3\sum_{i=1}^{n}x_i$$
> 求关于 $\alpha$ 的偏导数，由于$\alpha>0,n>0$，得
> $$\dfrac{\partial \ln L(\alpha)}{\partial \alpha}=\dfrac{2n}{\alpha}>0$$
> 因此 $L(\alpha)$ 是关于 $\alpha$ 的单调增加函数.
>
> 设 $x_{(1)}=\min(x_1,x_2,\cdots,x_n)$，而所有样本的观测值都在区间 $(\alpha,+\infty)$ 上，$\alpha$ 必定严格小于所有的样本观测值，故有 $0<\alpha < x_{(1)}$，$\alpha$ 的估计值取边界值 $\min(x_1,x_2,\cdots,x_n)$.
>
> 因此，$\alpha$ 的最大似然估计量为 $\hat{\alpha}=\min(X_1,X_2,\cdots,X_n)$.


