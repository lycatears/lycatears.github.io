---
layout: post
title: 《概率论与数理统计》复习笔记（下）
date: 2026-07-20 08:57:56
categories: 学习
excerpt: 韶华对半，时光荏苒，盛世繁华奈何年
tags:
  - 数学
  - 学习
  - 吉林大学
  - 概率论
---

## 样本及样本函数的分布
### 总体与样本
- 研究对象的全体是总体，总体中的每个元素是个体，总体中的元素个数称为总体容量，分为有限总体和无限总体两种.
- 研究对象的某一种数值指标，在总体中的分布可以用概率分布表示，则可以用随机变量 $X$ 表示总体的这项数量指标，称为总体 $X$. 可以类比定义总体的分布函数、数字特征、离散型总体、连续型总体等概念.
- 从总体中抽取若干个个体的过程叫做抽样，抽样结果得到的一组数据叫做样本，样本所含个体的数量称为样本容量. 满足随机性、独立性的抽样是简单随机抽样，得到的样本称为简单随机样本. 无限总体、有限总体的放回抽样是简单随机抽样；有限总体容量远大于样本容量时进行不放回抽样，抽样可近似认为是简单随机抽样.
- 从总体中抽取容量为 $n$ 的样本，就是对表示总体的随机变量 $X$ 随机、独立地进行 $n$ 次观测，每次观测的结果都可视为一个随机变量，这些试验的结果就可看成独立同分布的随机变量 $X_1,X_2,\cdots,X_n$.
设总体 $X$ 是具有某一概率分布的随机变量，如果随机变量 $X_1,X_2,\cdots,X_n$ 独立同分布，且与 $X$ 具有相同的概率分布，则称 $X_1,X_2,\cdots,X_n$ 是来自总体 $X$ 的样本，观测得到样本 $X_1,X_2,\cdots,X_n$ 的具体数值 $x_1,x_2,\cdots,x_n$ 称为样本观测值（观测值、样本值）.
- 从总体中抽取到样本的观测值，可以认为是事件 $\{X_1=x_1\},\{X_2=x_2\},\cdots,\{X_n=x_n\}$ 同时发生. 样本容量为 $n$ 的样本可看成 $n$ 维随机变量，类似之前提到的多维随机变量的概念，可以定义样本的分布函数、密度函数（概率分布）等.
### 样本函数及其概率分布
- 统计量：设 $X_1,X_2,\cdots,X_n$ 是来自总体 $X$ 的样本，其观测值为 $x_1,x_2,\cdots,x_n$. 若 $g(t_1,t_2,\cdots,t_n)$ 为 $n$ 元函数，则称 $g(X_1,X_2,\cdots,X_n)$ 为样本函数，它也是一个随机变量，相应地 $g(x_1,x_2,\cdots,x_n)$ 是样本函数的观测值. 如果样本函数不含有未知参数，则称该样本函数为统计量.

以下设来自总体 $X$ 的样本 $X_1,X_2,\cdots,X_n$ 的观测值为 $x_1,x_2,\cdots,x_n$，$X$ 的均值和方差分别为 $\mu,\sigma^2(\sigma>0)$.

- 样本均值：称统计量
  $$\bar{X}=\dfrac{1}{n}\sum\limits_{i=1}^nX_i$$
  为样本均值，其观测值为
  $$\bar{x}=\dfrac{1}{n}\sum\limits_{i=1}^nx_i$$
  样本均值的数学期望为 $\mu$，方差为 $\dfrac{\sigma^2}{n}$.
- 样本方差：统计量
  $$S^2=\dfrac{1}{n-1}\sum\limits_{i=1}^n(X_i-\bar{X})^2=\dfrac{1}{n-1}\left(\sum\limits_{i=1}^nX_i-n\bar{X}^2\right)$$
  为样本方差，其观测值为
  $$s^2=\dfrac{1}{n-1}\sum\limits_{i=1}^n(x_i-\bar{x})^2=\dfrac{1}{n-1}\left(\sum\limits_{i=1}^nx_i-n\bar{x}^2\right)$$
  样本方差的均值为 $\sigma^2$，方差为 $\dfrac{2\sigma^4}{n-1}$.

  正态总体的样本均值和样本方差相互独立.
- 样本标准差：记 $S=\sqrt{S^2}$ 为样本标准差，其观测值记为 $s=\sqrt{s^2}$.
- 样本 $k$ 阶原点矩：记
  $$A_k=\dfrac{1}{n}\sum_{i=1}^nX_i^k,k=1,2,\cdots$$
  为样本 $k$ 阶原点矩，其观测值为
  $$a_k=\dfrac{1}{n}\sum_{i=1}^nx_i^k,k=1,2,\cdots$$
  显然，一阶原点矩是样本均值.
- 样本 $k$ 阶中心矩：记
  $$B_k=\dfrac{1}{n}\sum_{i=1}^n(X_i-\bar{X})^k,k=1,2,\cdots$$
  为样本 $k$ 阶中心矩，其观测值为
  $$b_k=\dfrac{1}{n}\sum_{i=1}^n(x_i-\bar{x})^k,k=1,2,\cdots$$
  显然，一阶中心矩恒为0.
  - 为什么二阶中心矩不等于样本方差？或者说，为什么样本方差前面的系数是 $\dfrac{1}{n-1}$ 而不是 $\dfrac{1}{n}$？我总结出两方面原因：
  - 其一是二阶中心矩确实不是总体方差的无偏估计. 根据样本二阶中心矩的定义有
    $$B_2=\dfrac{1}{n}\sum_{i=1}^n(X_i-\bar{X})^2$$
    展开得
    $$B_2=\dfrac{1}{n}\sum_{i=1}^n(X_i^2-2X_i\bar{X}+\bar{X}^2)=\dfrac{1}{n}\sum_{i=1}^nX_i^2-\dfrac{1}{n}\sum_{i=1}^n2X_i\bar{X}+\dfrac{1}{n}n\bar{X}^2$$
    由于
    $$\dfrac{1}{n}\sum_{i=1}^n2X_i\bar{X}=2\bar{X}\left(\dfrac{X_1+X_2+\cdots+X_n}{n}\right)=2\bar{X}^2$$
    $B_2$ 的展开式可化简为
    $$B_2=\left(\dfrac{1}{n}\sum_{i=1}^nX_i^2\right)-\bar{X}^2=\dfrac{1}{n}\left(\sum_{i=1}^nX_i^2-n\bar{X}^2\right)$$
    因此 $B_2$ 的数学期望为
    $$E(B_2)=\dfrac{1}{n}\sum_{i=1}^nE(X_i^2)-E(\bar{X}^2)$$
    根据方差的计算公式可得
    $$E(X_i^2)=D(X_i)+[E(X_i)]^2=\sigma^2+\mu^2$$
    $$E(\bar{X}^2)=D(\bar{X})+[E(\bar{X})]^2=\dfrac{\sigma^2}{n}+\mu^2$$
    代入可得
    $$E(B_2)=\sigma^2+\mu^2-\dfrac{\sigma^2}{n}-\mu^2=\dfrac{n-1}{n}\sigma^2\neq \sigma^2$$
    所以，样本二阶中心矩不是总体方差的无偏估计，$B_2$ 与 $S^2$的关系是
    $$B_2=\dfrac{n-1}{n}S^2$$
  - 另一方面，样本观测值的均值是根据各次观测结果计算出来的，样本的一阶中心矩恒为0，即
    $$b_1=\dfrac{1}{n}\sum_{i=1}^n(x_i-\bar{x})=0$$
    前 $n-1$ 个偏差被计算出来后，由于上式恒等于0，最后一个样本观测值与样本均值之间的偏差就不能自由变动，而被前面的观测值固定下来，因此缺少一个自由度.
- 样本最大值和最小值：取样本观测值
  $$x_{(n)}=\max(x_1,x_2,\cdots,x_n),x_{(1)}=\min(x_1,x_2,\cdots,x_n)$$
  作为随机变量 $X_{(n)},X_{(1)}$ 的观测值，分别称为样本最大值和样本最小值，即
  $$X_{(n)}=\max(X_1,X_2,\cdots,X_n),X_{(1)}=\min(X_1,X_2,\cdots,X_n)$$
  其分布函数分别为
  $$F_{\max}(x)=[F(x)]^n,F_{\min}(x)=1-[1-F(x)]^n$$
- 设 $X\sim N(\mu,\sigma^2),X_1,X_2,\cdots,X_n$ 是来自总体 $X$ 的样本，$\bar{X}$ 是样本均值，则随机变量
  $$u=\dfrac{\bar{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1)$$
- 设 $X\sim N(\mu_1,\sigma^2_1),Y\sim N(\mu_2,\sigma^2_2)$，分别独立地从总体 $X,Y$ 抽取样本 $X_1,X_2,\cdots,X_{n_1},Y_1,Y_2,\cdots,Y_{n_2}$，样本均值分别为 $\bar{X},\bar{Y}$，则
  $$u=\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{\sqrt{\dfrac{\sigma_1^2}{n_1}+\dfrac{\sigma^2}{n_2}}}\sim N(0,1)$$

### 卡方分布
设 $X_1,X_2,\cdots,X_n$ 是来自标准正态总体 $N(0,1)$ 的样本，则统计量 $\chi^2=X_1^2+X_2^2+\cdots+X_n^2$ 服从自由度为 $n$ 的 $\chi^2$ 分布，记为 $\chi^2\sim\chi^2(n)$.
- 三大分布的概率密度函数的解析式很复杂，个人认为非数学专业的应该用不上，所以也没怎么看。
- 若 $\chi^2\sim\chi^2(n)$，则 $E(\chi^2)=n,D(\chi^2)=2n$.
- $\chi^2$ 分布的可加性：设 $X\sim\chi^2(n_1),Y\sim\chi^2(n_2)$，且 $X,Y$ 相互独立，则 $X+Y\sim\chi^2(n_1+n_2)$.
- 设 $\chi^2\sim\chi^2(n)$，当 $n$ 很大时，$\dfrac{\chi^2-n}{\sqrt{2n}}$ 近似服从标准正态分布.
- 设 $X_1,X_2,\cdots,X_n$ 是来自正态总体 $N(\mu,\sigma^2)$ 的样本，则它们的标准化变量的平方和满足
  $$\dfrac{1}{\sigma^2}\sum_{i=1}^n(X_i-\mu)^2\sim\chi^2(n)$$
- 设 $X_1,X_2,\cdots,X_n$ 是来自正态总体 $X\sim N(\mu,\sigma^2)$ 的样本，则样本方差满足
  $$\dfrac{(n-1)S^2}{\sigma^2}\sim\chi^2(n-1)$$
- $\chi^2(n)$ 分布的**上** $\alpha(0<\alpha<1)$ 分位点记为 $\chi^2_\alpha(n)$，即
  $$P\{\chi^2>\chi^2_\alpha(n)\}=\int_{\chi^2_\alpha(n)}^{+\infty}f(x)\mathrm{d}x$$
  其中 $f(x)$ 是 $\chi^2(n)$ 分布的概率密度函数.

### t 分布
设 $X\sim N(0,1),Y\sim\chi^2(n)$，且 $X,Y$ 相互独立，则随机变量
$$t=\dfrac{X}{\sqrt{Y/n}}$$
服从自由度为 $n$ 的t分布，记为 $t\sim t(n)$.
- t 分布的图像关于纵轴成轴对称.
- 当 $n\to\infty$ 时，$t(n)$ 近似于标准正态分布.
- $t(n)$ 分布的**上** $\alpha(0<\alpha<1)$ 分位点记为 $t_\alpha(n)$，即
  $$P\{t>t_\alpha(n)\}=\int_{t_\alpha(n)}^{+\infty}f(x)\mathrm{d}x$$
  其中 $f(x)$ 是 $t(n)$ 分布的概率密度函数.
- 根据 t 分布的对称性，有 $t_\alpha(n)=-t_{1-\alpha}(n)$
- 设 $X_1,X_2,\cdots,X_n$ 是来自正态总体 $X\sim N(\mu,\sigma^2)$ 的样本，样本均值和样本方差分别为 $\bar{X},S^2$，则随机变量
  $$t=\dfrac{\bar{X}-\mu}{S}\sqrt{n}\sim t(n-1)$$
  简单推导：
  $$\dfrac{\bar{X}-\mu}{S}\sqrt{n}=\dfrac{(\bar{X}-\mu)/(\sigma/\sqrt{n})}{\sqrt\dfrac{S^2(n-1)}{(n-1)\sigma^2}}=\dfrac{u}{\sqrt{\dfrac{\chi^2(n-1)}{n-1}}}$$
- 设 $X_1,X_2,\cdots,X_n,X_{n+1}$ 是来自正态总体 $X\sim N(\mu,\sigma^2)$ 的样本，样本均值和样本方差分别为
  $$\bar{X}_n=\dfrac{1}{n}\sum_{i=1}^nX_i,S^2_n=\dfrac{1}{n-1}\sum_{i=1}^n(X_i-\bar{X})^2$$
  也就是这里的样本均值、方差只考虑前 $n$ 个个体，则统计量
  $$t=\sqrt{\dfrac{n}{n+1}}\cdot\dfrac{X_{n+1}-\bar{X}_n}{S_n}\sim t(n-1)$$
  简单推导：
  $$X_{n+1}-\bar{X}_n\sim N\left(0,\dfrac{n+1}{n}\sigma^2\right)$$
  $$\sqrt{\dfrac{n}{n+1}}\cdot\dfrac{X_{n+1}-\bar{X}_n}{S_n}=\dfrac{(X_{n+1}-\bar{X}_n-0)/\sqrt{\dfrac{n+1}{n}}\sigma}{S_n\sigma}$$
  $$=\dfrac{(X_{n+1}-\bar{X}_n-0)/\sqrt{\dfrac{n+1}{n}}\sigma}{\sqrt\dfrac{S_n^2(n-1)}{(n-1)\sigma^2}}=\dfrac{u}{\sqrt{\chi^2(n-1)/(n-1)}}$$
- 若从两个正态总体 $N(\mu_1,\sigma^2),N(\mu_2,\sigma^2)$（注意这两个正态总体是方差相同、均值不同的）分别独立地抽取样本，样本容量分别为 $n_1,n_2$，样本均值分别为 $\bar{X},\bar{Y}$，样本方差分别为 $S_1^2,S_2^2$，记
  $$S_W=\sqrt{\dfrac{(n_1-1)S_1^2+(n_2-1)S^2}{n_1+n_2-2}}$$
  则随机变量
  $$t=\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{S_W\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t(n_1+n_2-2)$$
  简单推导：
  $$\bar{X}-\bar{Y}\sim N\left(\mu_1-\mu_2,\dfrac{\sigma^2}{n_1}+\dfrac{\sigma^2}{n_2}\right)$$
  因此有
  $$\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{\sigma\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim N(0,1)$$
  两个样本方差满足
  $$\dfrac{(n_1-1)S_1^2}{\sigma^2}\sim\chi^2(n_1-1),\dfrac{(n_2-1)S_2^2}{\sigma^2}\sim\chi^2(n_2-1)$$
  根据 $\chi^2$ 分布的可加性，得到
  $$\dfrac{(n_1-1)S_1^2}{\sigma^2}+\dfrac{(n_2-1)S_2^2}{\sigma^2}\sim\chi^2(n_1+n_2-1)$$
  因此有
  $$t=\dfrac{\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{\sigma\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}}{\dfrac{1}{\sigma}\sqrt{\dfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}}}\sim t(n_1+n_2-2)$$
### F 分布
设 $X\sim\chi^2(n_1),Y\sim\chi^2(n_2)$，且 $X,Y$ 相互独立，则随机变量
$$F=\dfrac{X/n_1}{Y/n_2}$$
服从第一自由度为 $n_1$、第二自由度为 $n_2$ （或者自由度为 $(n_1,n_2)$）的 F 分布，记作 $F\sim F(n_1,n_2)$.
- 若 $F\sim F(n_1,n_2)$，则 $\dfrac{1}{F}\sim F(n_2,n_1)$.
- $F(n_1,n_2)$ 分布的**上** $\alpha(0<\alpha<1)$ 分位点记为 $F_\alpha(n_1,n_2)$，即
  $$P\{F>F_\alpha(n_1,n_2)\}=\int_{F_\alpha(n_1,n_2)}^{+\infty}f(x)\mathrm{d}x$$
  其中 $f(x)$ 是 $F(n_1,n_2)$ 分布的概率密度函数.
- $F_{1-\alpha}(n_1,n_2)=\dfrac{1}{F_\alpha(n_2,n_1)}$
- 设 $X_1,X_2,\cdots,X_{n_1}$ 是来自正态总体 $X\sim N(\mu_1,\sigma_1^2)$ 的样本，$Y_1,Y_2,\cdots,Y_{n_2}$ 是来自正态总体 $N(\mu_2,\sigma^2_2)$ 的样本，且两个样本相互独立，则随机变量
  $$F=\dfrac{n_2}{n_1}\cdot\dfrac{\sigma_2^2}{\sigma_1^2}\cdot\dfrac{\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{\sum\limits_{j=1}^{n_2}(Y_j-\mu_2)^2}\sim F(n_1,n_2)$$
  简单推导：
  $$F=\dfrac{\dfrac{1}{n_1}\sum\limits_{i=1}^{n_1}\dfrac{(X_i-\mu_1)^2}{\sigma_1^2}}{\dfrac{1}{n_2}\sum\limits_{j=1}^{n_2}\dfrac{(Y_j-\mu_2)^2}{\sigma^2_2}}$$
  注意到
  $$\dfrac{X_i-\mu_1}{\sigma_1},\dfrac{Y_i-\mu_2}{\sigma_2}$$
  都是各自样本中个体的标准化变量，因此分子分母都是个体标准化变量的平方和的算术平均数. 记
  $$\chi^2_1=\sum\limits_{i=1}^{n_1}\dfrac{(X_i-\mu_1)^2}{\sigma_1^2},\chi_2^2=\sum\limits_{j=1}^{n_2}\dfrac{(Y_j-\mu_2)^2}{\sigma^2_2}$$
  则有
  $$F=\dfrac{\chi_1^2/{n_1}}{\chi_2^2/{n_2}}\sim F(n_1,n_2)$$
- 设从两个正态总体$N(\mu_1,\sigma_1^2),N(\mu_2,\sigma_2^2)$ 分别独立地各抽取一个样本，它们的样本容量分别为 $n_1,n_2$，样本方差分别为 $S_1^2,S_2^2$，则随机变量
  $$F=\dfrac{\sigma^2_2}{\sigma_1^2}\cdot\dfrac{S_1^2}{S_2^2}\sim F(n_1-1,n_2-2)$$
  简单推导：
  $$F=\dfrac{\ \dfrac{(n_1-1)S_1^2}{(n_1-1)\sigma_1^2}\ }{\dfrac{(n_2-1)S_2^2}{(n_2-2)\sigma_2^2}}=\dfrac{\chi_1^2/(n_1-1)}{\chi^2_2/(n_2-1)}\sim F(n_1,n_2)$$

- 上面提到的几个统计量非常重要，后面参数估计和假设检验会经常用到

## 参数估计
参数估计解决的是总体分布类型已知，但参数未知的情况.
### 参数的点估计
设总体 $X$ 的分布含有未知参数 $\theta$（可以是数值，或者向量 $(\theta_1,\theta_2,\cdots,\theta_r)$），从总体中抽取样本 $X_1,X_2,\cdots,X_n$，其观测值为 $x_1,x_2,\cdots,x_n$，点估计就是构造适当的统计量 $\hat{\theta}(X_1,X_2,\cdots,X_n)$，代入观测值求得未知参数的估计值 $\hat{\theta}$.
- $\hat{\theta}(X_1,X_2,\cdots,X_n)$ 称为点估计**量**.
- $\hat{\theta}(x_1,x_2,\cdots,x_n)$ 称为点估计**值**.
- 未知参数有 $r$ 个时，需要构造 $r$ 个统计量分别作为各个未知参数的点估计量.
- 点估计量和点估计值一般都用符号 $\hat{\theta}$，但是要注意题目问的是什么.
### 矩估计法
设总体 $X$ 的分布含有 $r$ 个未知参数 $\theta_1,\theta_2,\cdots,\theta_r$，总体的 $1,2,\cdots,r$ 阶原点矩都存在，它们都是 $\theta_1,\theta_2,\cdots,\theta_r$ 的函数，即
$$\mu_k=\mu_k(\theta_1,\theta_2,\cdots,\theta_r)=E(X^k),k=1,2,\cdots,r$$
从总体中抽取样本 $X_1,X_2,\cdots,X_n$，根据辛钦定理可得当 $n\to\infty$ 时样本 $k$ 阶原点矩依概率收敛于总体的 $k$ 阶原点矩 $\mu_k$，取样本 $k$ 阶原点矩 $A_k$ 作为总体 $k$ 阶原点矩 $\mu_k$ 的估计，用样本矩的连续函数作为总体矩的同一个连续函数. 令
$$
\begin{equation*}
\begin{cases}
\mu_1(\theta_1,\theta_2,\cdots,\theta_r)=A_1,\\
\mu_2(\theta_1,\theta_2,\cdots,\theta_r)=A_2,\\
\cdots,\\
\mu_r(\theta_1,\theta_2,\cdots,\theta_r)=A_r \\
\end{cases}
\end{equation*}
$$
这是一个关于未知参数 $(\theta_1,\theta_2,\cdots,\theta_r)$ 的方程组，记方程组的解为
$$
\begin{equation*}
\begin{cases}
\hat{\theta_1}=\hat{\theta_1}(A_1,A_2,\cdots,A_r),\\
\hat{\theta_2}=\hat{\theta_2}(A_1,A_2,\cdots,A_r),\\
\cdots,\\
\hat{\theta_r}=\hat{\theta_r}(A_1,A_2,\cdots,A_r),\\
\end{cases}
\end{equation*}
$$
称为未知参数 $\theta_1,\theta_2,\cdots,\theta_r$ 的矩估计量，这种求点估计量的方法叫做矩估计法，代入样本观测值即可得到矩估计量的观测值（估计值）
$$
\begin{equation*}
\begin{cases}
\hat{\theta_1}=\hat{\theta_1}(a_1,a_2,\cdots,a_r),\\
\hat{\theta_2}=\hat{\theta_2}(a_1,a_2,\cdots,a_r),\\
\cdots,\\
\hat{\theta_r}=\hat{\theta_r}(a_1,a_2,\cdots,a_r),\\
\end{cases}
\end{equation*}
$$
其中 $a_k$ 即为各阶样本矩的观测值.

第一次看到这玩意的定义可能一头雾水，可以这样理解：矩估计法就是用样本的 $k$ 阶矩去估计总体的 $k$ 阶矩。样本矩是我们有观测数据的，能直接算出来的，做题的时候写出表达式就行；总体矩是一个理论值，要通过理论推导，我们用要求的未知参数表示出来。这样，在 `总体矩 = 样本矩` 这个方程中，我们就得到了关于未知参数的方程，解出来就是矩估计量，代入具体观测值就是矩估计值，实在不行看一两个例题就明白了。

无论总体服从什么分布，总体均值的矩估计量都是样本均值，总体方差的矩估计量都是样本二阶中心矩. 有多组解表示出某个未知参数时，一般情况下优先使用低阶矩.

### 最大似然估计法
最大似然估计法是利用已知的总体的概率密度（概率分布）和样本，根据概率最大的事件在一次试验中最可能出现的原理，求总体的概率密度（或概率分布）的未知参数的点估计的方法。

对于离散型总体，若只有一个未知参数，设总体 $X$ 为离散型随机变量，其概率分布为 $P\{X=x\}=p(x;\theta)$，其中 $\theta$ 是未知参数. 若样本 $X_1,X_2,\cdots,X_n$ 的观测值为 $x_1,x_2,\cdots,x_n$，由于样本中的各个随机变量之间相互独立，因此相当于 $\{X_1=x_1\},\{X_2=x_2\},\cdots,\{X_n=x_n\}$ 同时发生，其概率为
$$p(x_1;\theta)p(x_2;\theta)\cdots p(x_n;\theta)=\prod_{i=1}^np(x_i;\theta)$$
由于概率分布 $p$、样本观测值 $x_1,x_2,\cdots,x_n$ 都是已知的，上式仅含有唯一的未知参数 $\theta$，即上式是 $\theta$ 的函数，记为
$$L(\theta)=\prod_{i=1}^np(x_i;\theta)$$
并称为样本的似然函数. 选取 $L(\theta)$ 取得最大值的 $\hat{\theta}$ 作为 $\theta$ 的估计，此时样本观测值 $x_1,x_2,\cdots,x_n$ 出现的概率最大. 若在 $\theta$ 的取值范围内恒有 $L(\hat{\theta})\ge L(\theta)$，则称 $\hat{\theta}$ 是 $\theta$ 的最大似然估计值，这样得到的估计量可以根据 $x_1,x_2,\cdots,x_n$ 计算出来. 把样本观测值换成对应的随机变量，就得到最大似然估计量.

求 $L(\theta)$ 的最大值点，要先求出 $L(\theta)$ 的极大值点. 当 $L(\theta)$ 是可导函数时，可以利用导数求出它的极大值点，也就是解方程
$$\dfrac{\mathrm{d}L(\theta)}{\mathrm{d}\theta}=0$$
这个方程叫做似然方程. 如果 $L(\theta)$ 有唯一的驻点 $\hat{\theta}$，则认为它是似然函数的极大值点.

似然方程一般含有大量关于 $\theta$ 的表达式相乘的结构，求导数比较麻烦，由于 $\ln x$ 在定义域上是单调增加函数，$L(\theta),\ln L(\theta)$ 在同一点处取得极大值，可以由方程
$$\dfrac{\mathrm{d}\ln L(\theta)}{\mathrm{d}\theta}=0$$
求得 $\theta$ 的最大似然估计值，该方程称为对数似然方程.

对于连续型随机变量的情形，可以类似取似然函数
$$L(\theta)=\prod_{i=1}^nf(x_i;\theta)$$
并按照上述方法求极大值点，进而得到最大似然估计量和估计值. 这相当于让样本观测值取到 $x_1,x_2,\cdots,x_n$ 邻域内的概率最大.

如果含有多个未知参数，则可按照类似的方法求关于每个未知参数的偏导数，解出各个未知参数的估计量、估计值：
$$\dfrac{\partial L(\theta_1,\theta_2,\cdots,\theta_r)}{\partial\theta_i}=0$$
或者取对数似然方程
$$\dfrac{\partial \ln L(\theta_1,\theta_2,\cdots,\theta_r)}{\partial\theta_i}=0$$

对于未知参数 $\theta$ 的函数 $u(\theta)$，若已知 $\hat{\theta}$ 是最大似然估计值，则 $\hat{u}=u(\hat{\theta})$ 是 $u=u(\theta)$ 的最大似然估计值.

有时候题目里面的似然函数是在定义域上单调的，这时需要考虑样本的边界值，比如最大最小值.

### 估计量的评选标准
- 无偏性：设 $\hat{\theta}=\hat{\theta}(X_1,X_2,\cdots,X_n)$ 是未知参数 $\theta$ 的估计量，若 $E(\hat{\theta})$ 存在，且满足 $E(\hat{\theta})=\theta$，则称 $\hat{\theta}$ 是 $\theta$ 的无偏估计（量），或 $\hat{\theta}$ 作为 $\theta$ 的估计具有无偏性.
- 有效性：设 $\hat{\theta}_1=\hat{\theta}_1(X_1,X_2,\cdots,X_n),\hat{\theta}_2=\hat{\theta}_2(X_1,X_2,\cdots,X_n)$ 是未知参数 $\theta$ 的两个无偏估计量，若 $D(\hat{\theta}_1)<D(\hat{\theta}_2)$，则称 $\hat{\theta}_1$ 比 $\hat{\theta}_2$ 更有效. 在无偏估计中，一般认为以方差更小的为好.
- 一致性：设 $\hat{\theta}_n=\hat{\theta}_n(X_1,X_2,\cdots,X_n)$ 是未知参数 $\theta$ 的估计量序列，若当 $n\to\infty$ 时，$\hat{\theta}\xrightarrow{P}\theta$，则称 $\hat{\theta}_n=\hat{\theta}_n(X_1,X_2,\cdots,X_n)$ 为未知参数 $\theta$ 的一致估计（量）或相合估计（量），也称以 $\hat{\theta}$ 估计 $\theta$ 具有一致性或相合性，即当 $n$ 充分大时 $\hat{\theta}_n$ 稳定在 $\theta$ 的附近. 证明一致性可以使用切比雪夫不等式.

### 双侧区间估计
设总体 $X$ 的分布中含有一个未知参数 $\theta$，$(X_1,X_2,\cdots,X_n)$ 是来自总体 $X$ 的样本. 如果对于给定的概率 $1-\alpha(0<\alpha<1)$，存在两个统计量 $\theta_1=\theta_1(X_1,X_2,\cdots,X_n),\theta_2=\theta_2(X_1,X_2,\cdots,X_n)$，使得 $P\{\theta_1<\theta<\theta_2\}=1-\alpha$，则称 $1-\alpha$ 为置信度或置信水平，称随机区间 $(\theta_1,\theta_2)$ 为未知参数 $\theta$ 的置信水平为 $1-\alpha$ 的置信区间，分别称 $\theta_1,\theta_2$ 为置信水平为 $1-\alpha$ 的双侧置信区间的置信下限和置信上限. 这种估计未知参数的方法叫做区间估计.

置信水平的意义是，置信区间 $(\theta_1,\theta_2)$ 包含未知变量的真值的概率为 $1-\alpha$. 对于同一个未知参数 $\theta$，置信水平为 $1-\alpha$ 的置信区间不唯一. 区间长度越短，估计精确度越高.

计算置信区间的一般步骤：

1. 构造样本函数 $T(X_1,X_2,\cdots,X_n;\theta)$，要求仅包含一个未知参数 $\theta$.
2. 根据给定的置信水平和 $T$ 的分布，找到两个常数 $a,b$ 满足
   $$P\{a<T<b\}=1-\alpha$$
3. 解不等式求出 $\theta$ 的置信区间
---
以下给出一些针对正态总体的区间估计方法. 假设总体 $X\sim N(\mu,\sigma^2)$，从总体中抽取样本 $X_1,X_2,\cdots,X_n$，样本均值和样本方差分别为 $\bar{X},S^2$，置信水平为 $1-\alpha$.
- $\sigma^2$ 已知，求 $\mu$ 的置信区间：标准正态分布 $N(0,1)$

  根据
  $$u=\dfrac{\bar{X}-\mu}{\sigma}\sqrt{n}\sim N(0,1)$$
  利用正态分布的对称性，有 $u_{\frac{\alpha}{2}}=-u_{1-\frac{\alpha}{2}}$，得到
  $$P\left\{-u_{\alpha/2}<\dfrac{\bar{X}-\mu}{\sigma}\sqrt{n}<u_{\alpha/2}\right\}=1-\alpha$$
  由于 $\bar{X},\sigma,n$ 都是已知条件，正态分布查表可得到 $u_{\alpha/2}$ 的数据，中间这一坨服从正态分布，这个概率是天然成立的，因此解不等式
  $$-u_{\alpha/2}<\dfrac{\bar{X}-\mu}{\sigma}\sqrt{n}<u_{\alpha/2}$$
  即可得到 $\mu$ 的置信区间
  $$\left(\bar{X}-u_{\alpha/2}\dfrac{\sigma}{\sqrt{n}},\bar{X}+u_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}\right)$$
  该区间的长度为
  $$l=2u_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}$$
  置信水平一定的情况下，$l$ 与 $\sqrt{n}$ 成反比. 设 $a$ 为正实数，若要使 $l\le a$，则样本容量应当满足
  $$n\ge \left(2u_{\alpha/2}\dfrac{\sigma}{a}\right)^2$$
- $\sigma^2$ 未知，求 $\mu$ 的置信区间：$t(n-1)$ 分布

  根据
  $$t=\dfrac{\bar{X}-\mu}{S}\sqrt{n}\sim t(n-1)$$
  利用 t 分布的对称性，选取 t 分布关于原点对称的区间：
  $$P\left\{-t_{\alpha/2}(n-1)<\dfrac{\bar{X}-\mu}{S}\sqrt{n}<t_{\alpha/2}(n-1)\right\}=1-\alpha$$
  解不等式，得到 $\mu$ 的置信区间为
  $$\left(\bar{X}-\dfrac{S}{\sqrt{n}}t_{\alpha/2}(n-1),\bar{X}+\dfrac{S}{\sqrt{n}}t_{\alpha/2}(n-1)\right)$$
- $\mu$ 已知，求 $\sigma^2$ 的置信区间：$\chi^2(n)$ 分布

  根据
  $$\chi^2=\dfrac{1}{\sigma^2}\sum_{i=1}^n(X_i-\mu)^2\sim\chi^2(n)$$
  可得关于 $\sigma^2$ 的不等式
  $$\chi^2_{1-\frac{\alpha}{2}}(n)<\dfrac{1}{\sigma^2}\sum_{i=1}^n(X_i-\mu)^2<\chi^2_{\frac{\alpha}{2}}(n)$$
  解得置信区间为
  $$\left(\dfrac{\sum\limits_{i=1}^n(X_i-\mu)^2}{\chi^2_{\frac{\alpha}{2}}(n)},\dfrac{\sum\limits_{i=1}^n(X_i-\mu)^2}{\chi^2_{1-\frac{\alpha}{2}}(n)}\right)$$

- $\mu$ 未知，$\sigma^2$ 的置信区间：$\chi^2(n-1)$ 分布
  根据
  $$\chi^2=\dfrac{(n-1)\sigma^2}{\sigma^2}\sim\chi^2(n-1)$$
  仿照上述过程得到关于 $\sigma^2$ 的不等式
  $$\chi^2_{1-\frac{\alpha}{2}}(n-1)<\dfrac{(n-1)S^2}{\sigma^2}<\chi^2_{\frac{\alpha}{2}}(n-1)$$
  解得置信区间为
  $$\left(\dfrac{(n-1)S^2}{\chi^2_{\frac{\alpha}{2}}(n-1)},\dfrac{(n-1)S^2}{\chi^2_{1-\frac{\alpha}{2}}(n-1)}\right)$$

对于两个正态总体 $N(\mu_1,\sigma_1^2),N(\mu_2,\sigma_2^2)$，分别独立地抽取样本 $X_1,X_2,\cdots,X_{n_1}$ 和 $Y_1,Y_2,\cdots,Y_{n_2}$样本均值分别为 $\bar{X},\bar{Y}$，样本方差分别为 $S_1^2,S_2^2$.
- $\sigma_1^2,\sigma_2^2$ 已知，求 $\mu_1-\mu_2$ 的置信区间：标准正态分布 $N(0,1)$

  根据
  $$u=\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{\sqrt{\dfrac{\sigma_1^2}{n_1}+\dfrac{\sigma_2^2}{n_2}}}\sim N(0,1)$$
  得到关于 $\mu_1-\mu_2$ 的不等式
  $$-u_{\frac{\alpha}{2}}<\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{\sqrt{\dfrac{\sigma_1^2}{n_1}+\dfrac{\sigma_2^2}{n_2}}}<u_{\frac{\alpha}{2}}$$
  解得置信区间为
  $$\left(\bar{X}-\bar{Y}-u_{\frac{\alpha}{2}}\sqrt{\dfrac{\sigma^2_1}{n_1}+\dfrac{\sigma_2^2}{n_2}},\bar{X}-\bar{Y}+u_{\frac{\alpha}{2}}\sqrt{\dfrac{\sigma^2_1}{n_1}+\dfrac{\sigma_2^2}{n_2}}\right)$$
  $\mu_1-\mu_2$ 的置信区间可以用来比较两个总体的均值大小. 如果置信区间下界大于0，则以置信水平 $1-\alpha$ 认为 $\mu_1>\mu_2$;若置信区间上界小于0，则以置信水平 $1-\alpha$ 认为 $\mu_1<\mu_2$.

- $\sigma_1^2=\sigma_2^2=\sigma^2$ 未知，求 $\mu_1-\mu_2$ 的置信区间：$t(n_1+n_2-2)$ 分布

  注意这里的两个方差是相等的. 根据
  $$t=\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{S_W\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t(n_1+n_2-2)$$
  其中
  $$S_W=\sqrt{\dfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}}$$
  得到关于 $\mu_1-\mu_2$ 的不等式
  $$-t_{\frac{\alpha}{2}}(n_1+n_2-2)<\dfrac{\bar{X}-\bar{Y}-(\mu_1-\mu_2)}{S_W\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}<t_{\frac{\alpha}{2}}(n_1+n_2-2)$$
  解得置信区间为
  $$\left(\bar{X}-\bar{Y}-t_{\frac{\alpha}{2}}(n_1+n_2-2)S_W\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}},\bar{X}-\bar{Y}+t_{\frac{\alpha}{2}}(n_1+n_2-2)S_W\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}\right)$$

- 已知 $\mu_1,\mu_2$，求 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的置信区间：$F(n_1,n_2)$ 分布

  利用 $F$ 分布解答双侧区间估计问题时，常利用 $F_{1-\alpha}(n_1,n_2)=1/F_{\alpha}(n_2,n_1)$ 这一性质. 根据
  $$F=\dfrac{n_2}{n_1}\cdot\dfrac{\sigma_2^2}{\sigma_1^2}\cdot\dfrac{\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{\sum\limits_{i=1}^{n_2}(Y_i-\mu_1)^2}\sim F(n_1,n_2)$$
  得到关于 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的不等式
  $$F_{1-\frac{\alpha}{2}}(n_1,n_2) < \dfrac{n_2}{n_1}\cdot\dfrac{\sigma_2^2}{\sigma_1^2}\cdot\dfrac{\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{\sum\limits_{i=1}^{n_2}(Y_i-\mu_1)^2} < F_{\frac{\alpha}{2}}(n_1,n_2)$$
  等价于
  $$\dfrac{\sigma_1^2}{\sigma_2^2} < \dfrac{n_2\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{n_1\sum\limits_{i=1}^{n_2}(Y_i-\mu_1)^2}F_{\frac{\alpha}{2}}(n_2,n_1)$$
  $$\dfrac{\sigma_1^2}{\sigma_2^2} > \dfrac{n_2\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{n_1\sum\limits_{i=1}^{n_2}(Y_i-\mu_1)^2}\cdot \dfrac{1}{F_{\frac{\alpha}{2}}(n_1,n_2)}$$
  即其置信区间为
  $$\left(\dfrac{n_2\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{n_1\sum\limits_{i=1}^{n_2}(Y_i-\mu_1)^2}\cdot \dfrac{1}{F_{\frac{\alpha}{2}}(n_1,n_2)},\dfrac{n_2\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{n_1\sum\limits_{i=1}^{n_2}(Y_i-\mu_1)^2}F_{\frac{\alpha}{2}}\textcolor{red}{(n_2,n_1)}\right)$$

- $\mu_1,\mu_2$ 未知，求 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的置信区间：$F(n_1-1,n_2-1)$ 分布

  根据
  $$F=\dfrac{\sigma_2^2}{\sigma_1^2}\cdot\dfrac{S_1^2}{S_2^2}\sim F(n_1-1,n_2-2)$$
  可得关于 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的不等式
  $$F_{1-\frac{\alpha}{2}}(n_1-1,n_2-2)<\dfrac{\sigma_2^2}{\sigma_1^2}\cdot\dfrac{S_1^2}{S_2^2}<F_{\frac{\alpha}{2}}(n_1-1,n_2-2)$$
  解得置信区间为
  $$\left(\dfrac{S_1^2}{S_2^2}\cdot\dfrac{1}{F_{\frac{\alpha}{2}}(n_1-1,n_2-2)},\dfrac{S_1^2}{S_2^2}\cdot F_{\frac{\alpha}{2}}\textcolor{red}{(n_2-1,n_1-2)}\right)$$

- 如果 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的置信区间下限大于1，则以置信水平 $1-\alpha$ 认为 $\sigma_1^2>\sigma_2^2$; 若 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的置信区间上限小于1，则以置信水平 $1-\alpha$ 认为 $\sigma_1^2>\sigma_2^2$.

### 单侧区间估计
需要求得未知参数的上/下限，而不关心另一个边界值时，可以用单侧区间估计来计算所需的边界值. 设总体 $X$ 的分布中含有未知参数 $\theta$，从总体 $X$ 中抽取样本 $X_1,X_2,\cdots,X_n$，对于给定的概率 $1-\alpha(0<\alpha<1)$：
- 如果统计量 $\theta_1=\theta_1(X_1,X_2,\cdots,X_n)$ 满足 $P\{\theta>\theta_1\}=1-\alpha$，则称随机区间 $(\theta_1,+\infty)$ 为置信水平为 $1-\alpha$ 的单侧置信区间，$\theta_1$ 称为 $\theta$ 的置信水平为 $1-\alpha$ 的单侧置信下限.
- 如果统计量 $\theta_2=\theta_2(X_1,X_2,\cdots,X_n)$ 满足 $P\{\theta<\theta_2\}=1-\alpha$，则称随机区间 $(-\infty,\theta_2)$ 为置信水平为 $1-\alpha$ 的单侧置信区间，$\theta_2$ 称为 $\theta$ 的置信水平为 $1-\alpha$ 的单侧置信上限.

实际上还是利用标准正态分布和三大分布的那几个统计量，只不过把需要解的不等式换成单侧的而已. 例如：

设总体 $X\sim N(\mu,\sigma^2)$，$X$ 的均值和方差 $\mu,\sigma^2$ 都存在但未知. 从总体中抽取样本 $X_1,X_2,\cdots,X_n$，对于给定的置信水平 $1-\alpha$：
- 求未知参数 $\mu$ 的置信水平下限. 根据
  $$t=\dfrac{\bar{X}-\mu}{S}\sqrt{n}\sim t(n-1)$$
  可得不等式
  $$\dfrac{\bar{X}-\mu}{S}\sqrt{n}<t_\alpha(n-1)$$
  解得置信区间为
  $$\left(\bar{X}-\dfrac{S}{\sqrt{n}}t_\alpha(n-1),+\infty\right)$$
  即置信区间下限为
  $$\mu_1=\bar{X}-\dfrac{S}{\sqrt{n}}t_\alpha(n-1)$$
- 求未知参数 $\sigma^2$ 的置信水平上限. 根据
  $$\chi^2=\dfrac{(n-1)S^2}{\sigma^2}\sim\chi^2(n-1)$$
  列出不等式
  $$\dfrac{(n-1)S^2}{\sigma^2}>\chi_{1-\alpha}^2(n-1)$$
  解得置信区间为
  $$\left(0,\dfrac{(n-1)S^2}{\chi^2_{1-\alpha}(n-1)}\right)$$
  即所求置信区间上限为
  $$\sigma_2^2=\dfrac{(n-1)S^2}{\chi^2_{1-\alpha}(n-1)}$$

## 假设检验
### 基本概念
假设检验问题分为两类，一种是参数的假设检验，一种是分布的假设检验.
- 原假设（$H_0$）是统计学假设检验中假定总体参数未发生变化、通常表示“无差异”或“无效果”的假设，也叫零假设。
- 备择假设（$H_1$）是与原假设对立的假设，也称对立假设.
- 为了推断原假设 $H_0$ 是否正确，先假定 $H_0$ 成立，利用样本观测值分析实际问题. 如果发生了小概率事件，则表明有证据怀疑原假设 $H_0$ 的正确性，此时应当拒绝原假设 $H_0$，接受备择假设 $H_1$；如果发生了大概率事件，则没有理由拒绝 $H_0$，此时应当接受 $H_0$，拒绝备择假设 $H_1$. 这样的统计推断问题称为假设检验问题.
- 假设检验中小概率值通常记为 $\alpha(0<\alpha<1)$，称为显著性水平，通常取 $0.01,0.05,0.1$ 等值.
- 为了检验假设 $H_0$，需要构建一个关于 $X_1,X_2,\cdots,X_n$ 的统计量，称该统计量为检验统计量.
- 当检验统计量取某个区域 $W$ 中的值时应当拒绝原假设，则该区域 $W$ 称为原假设 $H_0$ 的拒绝域. 如果检验统计量的取值不属于 $W$ 时，则接受原假设 $H_0$.
- 由于样本具有随机性，假设检验的结果可能出现两种错误.
  - 第一类错误（弃真错误）：原假设 $H_0$ 实际上是正确的，但拒绝了 $H_0$. 根据假设检验的定义，仅当发生小概率事件时才拒绝 $H_0$，因此犯第一类错误的概率不超过显著性水平 $\alpha$.
  - 第二类错误（取伪错误）：原假设 $H_0$ 实际上是错误的，但接受了 $H_0$，犯第二类错误的概率记为 $\beta$.
  - 在样本容量一定的情况下，减少犯某一类错误的概率，则另一类错误的概率会相应增大. 做假设检验时一般只控制犯第一类错误的概率，不考虑第二类错误的概率，这样的假设检验问题称为显著性检验.
- 只对原假设中的参数进行检验，称为参数检验. 设需要检验的参数为 $\theta$：
  - 双边检验：$H_0:\theta=\theta_0,H_1:\theta\neq\theta_0$
  - 左边检验：$H_0:\theta=\theta_0(\theta\ge\theta_0),H_1:\theta<\theta_0$
  - 右边检验：$H_0:\theta=\theta_0(\theta\le\theta_0),H_1:\theta>\theta_0$

假设检验的一般步骤：
1. 根据实际问题提出原假设 $H_0$ 和备择假设 $H_1$
2. 给出显著性水平 $\alpha$ 和样本容量 $n$
3. 确定检验统计量 $Z$ 和拒绝域的形式
4. 按照犯第一类错误的概率小于 $\alpha$ 的形式求出拒绝域 $W$
5. 根据样本值计算检验统计量 $Z$ 的观测值 $z$，若 $z\in W$，则拒绝原假设 $H_0$，否则接受原假设.

### 单个正态总体参数的假设检验
- $\sigma^2$ 已知，关于 $\mu$ 的假设检验：$u$ 检验，$H_0:\mu=\mu_0$

  检验统计量：
  $$u=\dfrac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}\sim N(0,1)$$
  - 备择假设：$H_1:\mu>\mu_0$，拒绝域：$u\ge u_\alpha$
  - 备择假设：$H_1:\mu<\mu_0$，拒绝域：$u\le -u_\alpha$
  - 备择假设：$H_1:\mu\neq\mu_0$，拒绝域：$|u| \ge u_{\frac{\alpha}{2}}$
- $\sigma^2$ 未知，关于 $\mu$ 的假设检验：$t$ 检验，$H_0:\mu=\mu_{0}$

  检验统计量：
  $$t=\dfrac{\bar{X}-\mu_0}{S}\sqrt{n}\sim t(n-1)$$
  - 备择假设：$H_1:\mu>\mu_0$，拒绝域：$t\ge t_{\alpha}(n-1)$
  - 备择假设：$H_1:\mu<\mu_0$，拒绝域：$t\le t_{\alpha}(n-1)$
  - 备择假设：$H_1:\mu\neq\mu_0$，拒绝域：$|t| \ge t_{\frac{\alpha}{2}}(n-1)$
- $\mu$ 已知，关于 $\sigma^2$ 的假设检验：$\chi^2$ 检验，$H_0:\sigma^2=\sigma_0^2$

  检验统计量：
  $$\chi^2=\dfrac{1}{\sigma_0^2}\sum_{i=1}^n(X_i-\mu)^2\sim \chi^2(n)$$
  - 备择假设：$H_1:\sigma^2>\sigma_0^2$，拒绝域：$\chi^2\ge \chi^2_{\alpha}(n)$
  - 备择假设：$H_1:\sigma^2<\sigma_0^2$，拒绝域：$\chi^2\le \chi^2_{1-\alpha}(n)$
  - 备择假设：$H_1:\sigma^2\neq\sigma^2_0$，拒绝域：$\chi^2 \ge \chi^2_{\frac{\alpha}{2}}(n) \cup \chi^2 \le \chi^2_{1-\frac{\alpha}{2}}(n)$
- $\mu$ 未知，关于 $\sigma^2$ 的假设检验：$\chi^2$ 检验，$H_0:\sigma^2=\sigma_0^2$

  检验统计量：
  $$\chi^2=\dfrac{(n-1)S^2}{\sigma_0^2}\sim \chi^2(n-1)$$
  - 备择假设：$H_1:\sigma^2>\sigma_0^2$，拒绝域：$\chi^2\ge \chi^2_{\alpha}(n-1)$
  - 备择假设：$H_1:\sigma^2<\sigma_0^2$，拒绝域：$\chi^2\le \chi^2_{1-\alpha}(n-1)$
  - 备择假设：$H_1:\sigma^2\neq\sigma^2_0$，拒绝域：$\chi^2 \ge \chi^2_{\frac{\alpha}{2}}(n-1) \cup \chi^2 \le \chi^2_{1-\frac{\alpha}{2}}(n-1)$
### 两个正态总体参数的假设检验
- $\sigma_1^2,\sigma_2^2$ 已知，关于 $\mu_1-\mu_2$ 的假设检验：$u$ 检验，$H_0:\mu_1-\mu_2=\delta$

  检验统计量：
  $$u=\dfrac{\bar{X}-\bar{Y}-\delta}{\sqrt{\dfrac{\sigma_1^2}{n_1}+\dfrac{\sigma_2^2}{n_2}}}\sim N(0,1)$$
  - 备择假设：$H_1:\mu_1-\mu_2>\delta$，拒绝域：$u\ge u_\alpha$
  - 备择假设：$H_1:\mu_1-\mu_2<\delta$，拒绝域：$u\le -u_\alpha$
  - 备择假设：$H_1:\mu_1-\mu_2\neq\delta$，拒绝域：$|u| \ge u_{\frac{\alpha}{2}}$
- $\sigma_1^2=\sigma_2^2=\sigma^2$ 未知，关于 $\mu_1-\mu_2$ 的假设检验：$t$ 检验，$H_0:\mu_1-\mu_2=\delta$

  检验统计量：
  $$t=\dfrac{\bar{X}-\bar{Y}-\delta}{S_W\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t(n_1+n_2-2)$$
  其中
  $$S_W=\sqrt{\dfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}}$$
  - 备择假设：$H_1:\mu_1-\mu_2>\delta$，拒绝域：$t\ge t_\alpha(n_1+n_2-2)$
  - 备择假设：$H_1:\mu_1-\mu_2<\delta$，拒绝域：$t\le -t_\alpha(n_1+n_2-2)$
  - 备择假设：$H_1:\mu_1-\mu_2\neq\delta$，拒绝域：$|t| \ge t_{\frac{\alpha}{2}}(n_1+n_2-2)$
- $\mu_1,\mu_2$ 已知，关于 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的假设检验：$F$ 检验，$H_0:\sigma_1^2=\sigma_2^2$

  检验统计量：
  $$F=\dfrac{n_2\sum\limits_{i=1}^{n_1}(X_i-\mu_1)^2}{n_1\sum\limits_{j=1}^{n_2}(X_j-\mu_2)^2}\sim F(n_1,n_2)$$
  - 备择假设：$H_1:\sigma_1^2>\sigma_2^2$，拒绝域：$F\ge F_\alpha(n_1,n_2)$
  - 备择假设：$H_1:\sigma_1^2<\sigma_2^2$，拒绝域：$F\le F_\alpha(n_1,n_2)$
  - 备择假设：$H_1:\sigma_1^2\neq\sigma_2^2$，拒绝域：$F \ge F_{\frac{\alpha}{2}}(n_1,n_2) \cup F \le F_{1-\frac{\alpha}{2}}(n_1,n_2)$
- $\mu_1,\mu_2$ 未知，关于 $\dfrac{\sigma_1^2}{\sigma_2^2}$ 的假设检验：$F$ 检验，$H_0:\sigma_1^2=\sigma_2^2$

  检验统计量：
  $$F=\dfrac{S_1^2}{S_2^2}\sim F(n_1-1,n_2-1)$$
  - 备择假设：$H_1:\sigma_1^2>\sigma_2^2$，拒绝域：$F\ge F_\alpha(n_1-1,n_2-1)$
  - 备择假设：$H_1:\sigma_1^2<\sigma_2^2$，拒绝域：$F\le F_\alpha(n_1-1,n_2-1)$
  - 备择假设：$H_1:\sigma_1^2\neq\sigma_2^2$，拒绝域：$F \ge F_{\frac{\alpha}{2}}(n_1-1,n_2-1) \cup F \le F_{1-\frac{\alpha}{2}}(n_1-1,n_2-1)$
### 分布拟合检验
在总体分布未知的情况下，需要凭借经验或者对样本的观察作出对总体分布的假设，并检验该假设是否合理. 待检验的假设为 $H_0:F(x)=F_0(x),H_1:F(x)\neq F_0(x)$，在分布拟合检验中，备择假设一般可以不写出.对于离散型随机变量：
$$H_0:P\{X=x_i\}=p_i,i=1,2,3\cdots$$
对于连续型随机变量：
$$H_0:f(x)=f_0(x)$$
分布拟合检验的步骤：
- 分组：将随机变量 $X$ 所有可能的取值分为 $k$ 个两两不相交的子集 $A_1,A_2,\cdots,A_k$
- 计算实际频数：数出来自总体的样本观测值 $x_1,x_2,\cdots,x_n$ 落入每个分类 $A_i$ 的个数 $n_i$，这称为实际频数，落入各个分类的频率为 $f_i=\dfrac{n_i}{n}$.
- 计算理论频数：如果 $H_0$ 是成立的，则可以根据假设的概率分布/密度函数计算 $X$ 落入 $A_i$ 的概率 $p_i=\{X\in A_i\}$，理论频数为 $np_i$.
- 计算皮尔逊统计量：当 $n$ 较大时，若 $H_0$ 成立，则 $\left(\dfrac{n_i}{n}-p_i\right)^2$ 应当较小，比值
  $$\dfrac{\left(\dfrac{n_i}{n}-p_i\right)^2}{\dfrac{p_i}{n_i}}=\dfrac{(n_i-np_i)^2}{np_i}$$
  也应当较小，称
  $$\chi^2=\sum_{i=1}^n\dfrac{(n_i-np_i)^2}{np_i}$$
  为皮尔逊统计量，当 $\chi^2$ 过大时应当拒绝 $H_0$. 在假设 $H_0$ 成立的条件下，不论 $F_0(x)$ 是怎样的分布函数，当 $n$ 充分大时，$\chi^2$ 近似服从 $\chi^2(k-1)$ 分布.如果 $F_0(x)$ 含有 $r$ 个未知参数，则应当先使用最大似然估计法求出这些未知参数的估计值，再计算 $\chi^2$，此时分布的自由度为 $k-r-1$.

  一般应保证 $n\ge 50$，且对于每个分类有 $np_i\ge 5$，若某些子集太小数量不足，应当适当的合并相邻的子集，直到所有的 $np_i\ge 5$，注意要减少自由度，此时的分类个数 $k$ 是合并后的.

