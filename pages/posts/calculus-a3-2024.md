---
layout: post
title: 微积分A3 2024年试题解析
date: 2024-06-30 00:10:24
categories: 学习
hide: true
excerpt: 难度较前几年相对较低的一套试卷
tags:
  - 数学
  - 学习
  - 考试
  - 吉林大学
  - 微积分
---
# 微积分A3 2024年试题解析
- 考试时间2024年1月5日。
- 我猜你是来突击的。基础题能拿到的分数一定拿到，难题分值小。
- 没做这套卷之前建议别看，因为题目后面就是解析。
- 虽然这套卷难度比较低，但A3终究还是A3，难度不容小觑。
- 据说A3最难的时候挂掉了三分之一的同学……
- NOTE：虽然原卷里面各个大题都是单独放到三、四……这样的大题号里面，不过我还是用1-19这样的顺序编号，方便后面总结分析。
## 选择题
1. 设有一条质量分布均匀的物质曲线$L$， $L$ 是以点$O(0,0),A(1,0),B(0,1)$ 为顶点的直角三角形，曲线$L$的线密度 $\rho \equiv 1$，则曲线$L$ 的质量为

    A. $2$

    B. $2+\sqrt{2}$

    C. $\dfrac{1}{2}$

    D. $3$

> 送分题。根据题意可知该曲线的密度处处为$1$，长度为$1+1+\sqrt{2}=2+\sqrt{2}$，则$\oint_L \rho \mathrm{d}s=s=2+\sqrt{2}$.故选B.
2. 下列关于级数性质叙述不正确的是

    A. 在一个级数前面去掉有限项，级数的敛散性不变

    B. 若$\lim \limits_{n\to +\infty} u_n \neq 0$，则级数$\sum \limits_{n=1}^{\infty}u_n$必发散

    C. 若级数$\sum \limits_{n=1}^{\infty}u_{2n-1}$ 和 $\sum \limits_{n=1}^{\infty}u_{2n}$都收敛，则级数$\sum \limits_{n=1}^{\infty}u_{n}$一定收敛

    D. 若级数$\sum \limits_{n=1}^{\infty}\left| u_{n} \right|$发散，则级数$\sum \limits_{n=1}^{\infty}u_{n}$发散

3. 设函数$f(x)=x^2,x\in \left[ 0, \pi \right]$的余弦级数为$\dfrac{a_0}{2}+\sum \limits_{n=1}^{\infty}a_n\cos nx$，则系数$a_0$等于

    A. $\dfrac{\pi^2}{3}$

    B. $\dfrac{\pi^2}{6}$

    C. $\dfrac{2\pi^2}{3}$

    D. $\dfrac{\pi^2}{2}$

4. 下列关于常微分方程的表述正确的是

    A. $y=y'^2+2xy'+x^2$是一阶线性微分方程

    B. $\left( x^2+1\right)y^2\mathrm{d}x+xy\mathrm{d}y=0$是变量可分离方程

    C. $xy\mathrm{d}x+\left(x^2+y\right)\mathrm{d}y=0$是全微分方程

    D. $y''+y=\sec x$是二阶齐次线性微分方程

5. 微分方程$\left(x+2\right)y''-\left(2x+5\right)y'+2y=0$的通解为

    A. $C_1xe^{2x}+C_2\left(2x+5\right)$

    B. $Cxe^{2x}+\dfrac{1}{4}\left(2x+5\right)$

    C. $C_1e^{2x}+C_2\left(2x+5\right)$

    D. $C\left(e^{2x}+\dfrac{1}{4}\left(2x+5\right)\right)$

6. 设曲面$\Sigma$是球面$x^2+y^2=a^2$（$a\gt 0$，取外侧）含在柱面$x^2+y^2=ax$内部的部分，则下列结论不正确的是

    A. $\iint\limits_{\Sigma}z\mathrm{d}S=0$

    B. $\iint\limits_{\Sigma}z^2\mathrm{d}S=0$

    C. $\iint\limits_{\Sigma}z^2\mathrm{d}x\mathrm{d}y=0$

    D. $\iint\limits_{\Sigma}x\mathrm{d}x\mathrm{d}y=0$
## 填空题
7. 平面曲线$L$的方程为$x^2+y^2=1,x\ge 0$，则$\int _L \left| y \right|\mathrm{d}s=\underline{\hspace{4em}}$.
8. 曲线$L$为平面区域$4x^2+y^2\lt 4,x\ge 0,y\ge 0$的正向边界，则$\oint_Lx\mathrm{d}y=\underline{\hspace{4em}}$.
9. 设$\Sigma$是球面$x^2+y^2+z^2=4$，则曲面积分$\oiint\limits_\Sigma\dfrac{1}{x^2+y^2+z^2}\mathrm{d}S=\underline{\hspace{4em}}$.
10. 正项级数$\sum\limits_{n=1}^{\infty}\dfrac{2}{n\left(n+2 \right)}$的和$s=\underline{\hspace{4em}}$.
11. 微分方程$y'=-y+1+x^2$的通解$y(x)=\underline{\hspace{4em}}$.
12. 设$M$为向量场$\boldsymbol{A}=\left(P(x,y,z),Q(x,y,z),R(x,y,z)\right)$中任意一点，其中函数$P,Q,R$具有二阶连续偏导数，则$\text{div}\left(\mathbf{rot}\boldsymbol{A}(M)\right)=\underline{\hspace{4em}}$.
## 解答题
13. （10分）判别级数$\sum\limits_{n=1}^{\infty}2^n\sin\dfrac{\pi}{3^n}$的敛散性.
14. （10分）计算$I=\int_\varGamma x^2\mathrm{d}x+y^2\mathrm{d}y$，其中$\varGamma$为曲线$y=\dfrac{x}{\sin x}$从点$(0,1)$到$\left(\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$的那一段.
15. （10分）计算$\oint_\varGamma y\mathrm{d}x+z\mathrm{d}y+x\mathrm{d}z$，其中$\varGamma$为球面$x^2+y^2+z^2=a^2(a\gt 0)$与平面$x+y+z=0$的交线，若从$x$轴的正向看去，圆周是逆时针方向.
16. （10分）计算$I=\int\limits_{\varGamma}x\mathrm{d}y\mathrm{d}z$，其中$\varSigma$为半球面$x^2+y^2+z^2=1,z\ge 0$的下侧.
17. （10分）求幂级数$\sum\limits_{n=0}^{\infty}\dfrac{2n+1}{n!}x^{2n}$的收敛域及和函数.
18. （8分）求微分方程$y''+4y=2\cos^2x$的通解.
19. （6分）设数列$\left\{nu_n\right\}$收敛，级数$\sum\limits_{n=1}^{\infty}n(u_{n+1}-u_n)$收敛，试证明级数$\sum\limits_{n=1}^{\infty}u_n$收敛.
