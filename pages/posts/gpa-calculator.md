---
layout: post
title: 吉林大学绩点计算器
date: 2025-06-20 12:06:14
updated: 2026-05-25 22:57:45
categories: 项目
excerpt: 一个简单的吉林大学绩点计算器，初学Qt时制作。
cover: https://i.ibb.co/zVsn40hB/Chat-GPT-Image-2026-5-29-09-15-23.png
medium_zoom: true
tags:
  - 编程
  - 学习
  - 项目
  - 吉林大学
  - C++
  - Qt
---
# 吉林大学绩点计算器

本质上其实跟您在网页上运行一个油猴脚本差不多，只不过当时学Qt，一时兴起做了这个东西，现在看来挺鸡肋的。

## 下载
[百度网盘](https://pan.baidu.com/s/1OVhEg1mv7Zt_1PS0bfj8Gw?pwd=xvrf)

由于蓝奏云100MB限制，只能提供百度网盘链接，非常抱歉。

## 使用方法

1. 解压，双击打开程序（`gpacalculator.exe`，图标是眼睛的那个）
![步骤1](./figures/gpa-calculator/step1.png)
2. 点击【从教务系统导入】，选Yes，打开内部浏览器窗口
![步骤2](./figures/gpa-calculator/step2.png)
3. 输入教务系统网址，如果在校内就是`https://iedu.jlu.edu.cn`，校外就先输入`https://vpn.jlu.edu.cn`，找到教务系统后，点成绩查询，刷出成绩表格。
![步骤3-1](./figures/gpa-calculator/step3-1.png)
![步骤3-2](./figures/gpa-calculator/step3-2.png)
4. 最好是点全部成绩查询，再把右下角那个条目数拉满，在浏览器上面点【导入】
![步骤4-1](./figures/gpa-calculator/step4-1.png)
![步骤4-2](./figures/gpa-calculator/step4-2.png)
![步骤4-3](./figures/gpa-calculator/step4-3.png)
5. 关闭浏览器窗口，在计算器右侧的表格里面，选中您不需要的课程（比如计算保研绩点需要删除选修课、体育、军训、英语七选一），点【删除选中项】，删除不需要的课程
![步骤5](./figures/gpa-calculator/step5.png)
6. 点击【计算】，左上角显示你的GPA、加权平均分、算术平均分
![步骤6](./figures/gpa-calculator/step6.png)


## 免责声明
- 该程序制作水平较低，计算的绩点数据仅供参考，不作为您留学、推免、评奖、评优的成绩依据。
- 该程序未收集您的个人信息，未对吉林大学教务系统进行逆向，仅在程序运行期间收集了前端可见的数据并进行自动化计算，且不会在本人所有的存储设备上（或使用的网络存储服务账号）存储任何数据。所有代码可在[GitHub](https://github.com/lycatears/jlu/tree/main/Qt%E8%B7%A8%E5%B9%B3%E5%8F%B0%E7%BC%96%E7%A8%8B/%E7%BB%A9%E7%82%B9%E8%AE%A1%E7%AE%97%E5%99%A8)浏览。如您不同意该程序使用上述成绩数据进行计算，请勿使用。
- 封面由GPT Image2 AI生成。
