---
layout: post
title: 如何生成服从正态分布的随机数
date: 2024-06-05 23:44:01
categories: 学习
excerpt: 在没有randn()的情况下手撕正态分布的随机数生成
tags:
  - 编程
  - 学习
  - 数学
  - 概率论
---
## 经典回顾
- 分布函数(Cumulative Distribution Function, CDF)

  设$X$为随机变量，对于任意实数$x$，令
  $$F(x)=P\{X\leq x\}, x\in \R$$
  称$F(x)$为随机变量$X$的分布函数。分布函数满足如下性质：
  - $0\leq F(x) \leq 1$
  - $F(x)$是关于$x$的单调不减函数
  - $\lim \limits_{x\to -\infty} F(x) = 0, \lim \limits_{x\to +\infty} F(x) = 1$
  - $F(x)$是右连续的
  - $P\{a\leq X \leq b\} = F(b) - F(a), a\lt b$
- 连续型随机变量的概率密度函数(Probability Density Function, PDF)

  对于随机变量$X$的分布函数$F(x)$，如果存在非负函数$f(x)$，使得对任意$x$都有
  $$F(x)=\int_{-\infty}^x f(t)dt$$
  则称随机变量$X$是连续型随机变量，其中$f(x)$叫做$X$的概率密度函数，简称为概率密度，记为$X\sim f(x)$.概率密度函数具有以下性质：
  - $f(x)\geq 0$
  - $\int_{-\infty}^{+\infty} f(t)dt=1$
  - $P\{a\lt X \leq b\} = F(b) - F(a) = \int_a^b f(x)dx, a\lt b$
  - 若$F(x)$在$x$处连续，则$F'(x)=f(x)$
- 正态分布(Normal Distribution)

  若随机变量$X$具有概率密度函数
  $$f(x)=\dfrac{1}{\sqrt{2\pi \sigma}}\mathrm{e}^{-\frac{(x-\mu)^2}{2\sigma^2}}, -\infty \lt x \lt +\infty$$
  其中$\mu,\sigma(\sigma \gt 0)$为常数，则称$X$服从参数为$\mu, \sigma$的正态分布，记作$X\sim N(\mu, \sigma^2)$.$X$的分布函数为
  $$F(x)=\dfrac{1}{\sqrt{2\pi \sigma}}\int_{-\infty}^{x}\mathrm{e}^{-\frac{(t-\mu)^2}{2\sigma^2}}dt, -\infty \lt x \lt +\infty$$
  ~~为什么不写成初等函数的形式呢？是不喜欢吗？~~
## Box-Muller方法
- 万流归一定理：设$X$为连续型随机变量，其分布函数为$F_X(x)$，则随机变量$Y=F_X(X)$服从(0,1)上的均匀分布。

  证明：根据分布函数的定义可知
  $$F_Y(y)=P\{Y\le y\}=P\{F_X(X)\le y\}$$
  由于累积分布函数在其定义域上是单调不减函数，有
  $$P\{F_X(X)\le y\} = P\{X \le F^{-1}_X(y)\}$$
  因此，$Y$的累计分布函数为
  $$F_Y(y)=F_X(F^{-1}_X(y))=y$$
  概率密度函数为
  $$f_Y(y)=1$$
- 逆变换定理：设$X$为$(a,b)$上的连续型随机变量，且$X$的分布函数为$F(x)$，随机变量$U\sim U(0,1)$，则随机变量$Y=F^{-1}_X(U)$服从与$X$相同的分布.

  证明：$Y$的累积分布函数为
  $$\mathrm{CDF}(F^{-1}_X(U))=P\{F^{-1}_X(U)\leq u\}$$
  由于累积分布函数在其定义域上是单调不减函数，且$U$服从$(0,1)$上的均匀分布，有
  $$P\{F^{-1}_X(U)\leq u\} = P\{U\leq F_X(u)\}=F_X(u)$$
- 根据逆变换定理，我们可以从均匀分布中采样，然后通过反函数进行映射，得到服从目标分布的随机变量。但是，正态分布的累计分布函数无法表达为初等函数的形式，直接得到其反函数较为困难。Box-Muller变换是设置两个相互独立的正态分布的随机变量，得到二元分布函数，再进行极坐标变换，得到初等函数形式的分布函数。

  假定$X,Y$是两个相互独立的随机变量，且均服从标准正态分布，则其概率密度函数为
  $$f_X(x)=\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{-\frac{x^2}{2}}, f_Y(y)=\dfrac{1}{\sqrt{2\pi}}\mathrm{e}^{-\frac{y^2}{2}}$$
  由于二者相互独立，因此$X,Y$的联合概率密度函数为
  $$f(x,y)=\dfrac{1}{2\pi}\mathrm{e}^{-\frac{x^2+y^2}{2}}$$
  根据极坐标变换公式$X=R\cos \Theta, Y=R\sin \Theta$，有
  $$f(r,\theta)=\dfrac{r}{2\pi}\mathrm{e}^{-\frac{r^2}{2}}$$
  因此，$R,\Theta$的分布函数为
  $$F_R(r)=P\{R\leq r\}=\int_0^r \int_0^{2\pi}\dfrac{R}{2\pi}\mathrm{e}^{-\frac{R^2}{2}}d\Theta dR=1-\mathrm{e}^{\frac{r^2}{2}}$$
  $$F_\Theta(\theta)=P\{\Theta \leq \theta \}=\int_0^\theta \int _0^{+\infty} \dfrac{R}{2\pi}\mathrm{e}^{-\frac{R^2}{2}}d\Theta dR=\dfrac{\theta}{2\pi}$$
  设$U_1,U_2$相互独立，且均服从$(0,1)$上的均匀分布，经过反函数$F_R^{-1}$映射为
  $$F_R^{-1}(U_1)=\sqrt{-2\ln(1-U_1)}$$
  由于$U_1 \sim U(0,1)$，上式等价于
  $$F_R^{-1}(U_1)=\sqrt{-2\ln U_1}$$
  反函数$F_{\Theta}^{-1}$映射为
  $$F_{\Theta}^{-1}(U_2)=2\pi U_2$$
  因此，最终采样得到的$X,Y$为
  $$X=\sqrt{-2\ln U_1} \cos(2\pi U_2)$$
  $$Y=\sqrt{-2\ln U_1} \sin(2\pi U_2)$$
## 代码实现
实现起来并不复杂，以下用JavaScript示例。
```js:line-numbers
function randn(mean, std, count) {
  const arr = []
  for (let i = 0; i < count; i++) {
    const u1 = Math.random()
    const u2 = Math.random()
    const standard = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    arr.push(standard * std + mean);
  }
  return arr
}
```
