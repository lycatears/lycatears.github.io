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
  $$=\dfrac{(X_{n+1}-\bar{X}_n-0)/\sqrt{\dfrac{n+1}{n}}\sigma}{\sqrt\dfrac{{S_n^2(n-1)}}{(n-1)\sigma^2}}=\dfrac{u}{\sqrt{\chi^2(n-1)/(n-1)}}$$
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
从总体中抽取样本 $X_1,X_2,\cdots,X_n$，根据辛钦定理可得当 $n\to\infty$ 时样本 $k$ 阶原点矩依概率收敛于总体的 $k$ 阶原点矩 $\mu_k$，取样本 $k$ 阶原点矩 $A_k$ 作为总体 $k$ 阶原点矩 $\mu_k$ 的估计，用样本矩的连续函数作为总体矩的同一个连续函数
