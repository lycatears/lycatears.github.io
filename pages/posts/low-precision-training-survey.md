---
layout: post
title: Low-Precision Training of Large Language Models
date: 2026-11-09 16:00:36
categories: 科研
excerpt: 低精度训练综述文章
tags:
  - 科研
  - AI
---
:::warning
自用翻译版本，不代表原文作者观点。原文 [arxiv](https://arxiv.org/pdf/2505.01043)
:::
## Low-Precision Training of Large Language Models: Methods, Challenges, and Opportunities
大语言模型的低精度训练：方法、挑战和机遇

### Abstract
摘要

> Large language models (LLMs) have achieved impressive performance across various domains. However, the substantial hardware resources required for their training present a significant barrier to efficiency and scalability. To mitigate this challenge, low-precision training techniques have been widely adopted, leading to notable advancements in training efficiency. Despite these gains, low-precision training involves several components, such as weights, activations, and gradients, each of which can be represented in different numerical formats. The resulting diversity has created a fragmented landscape in low-precision training research, making it difficult for researchers to gain a unified overview of the field. This survey provides a comprehensive review of existing low-precision training methods. To systematically organize these approaches, we categorize them into three primary groups based on their underlying numerical formats, which is a key factor influencing hardware compatibility, computational efficiency, and ease of reference for readers. The categories are (1) fixed-point and integer-based methods, (2) floating-point-based methods, and (3) customized format-based methods. Additionally, we discuss quantization-aware training approaches, which share key similarities with low-precision training during forward propagation. Beyond efficiency, we examine robustness and deployment reliability under low precision. Finally, we highlight several promising research directions to advance this field. A collection of papers discussed in this survey is provided in [Awesome-Low-Precision-Training](https://github.com/Hao840/Awesome-Low-Precision-Training).

LLM 在多个领域都表现出了令人瞩目的性能。但是，LLM 训练所需的大量硬件资源对它们的效率和可扩展性构成了显著的障碍。为缓解这一挑战，低精度训练技术已被广泛应用，并显著提升了 LLM 的训练效率。尽管低精度训练带来了一定的收益，但低精度训练涉及到的多种组件，例如权重、激活、梯度等，它们都可以用不同的数值格式表示，由此产生的多样性造成低精度训练领域呈现碎片化格局，使得研究者对该领域难以掌握统一的概览。本综述全面回顾了现有的低精度训练方法。为系统地组织这些方法，我们基于它们采用的数值格式，将这些方法分为三大类，而数值格式是影响硬件兼容性、计算效率和读者查阅便利性的关键要素。这三个类别分别是：（1）基于定点数和整数的方法；（2）基于浮点数的方法；（3）基于定制格式的方法。另外，我们也讨论了量化感知训练的方法，它们在前向传播过程中与低精度训练有着关键的相似性。除效率之外，我们还考察了低精度下的鲁棒性与部署可靠性。最后，我们强调了多种有前景的研究方向以推进该领域的研究。本综述中讨论到的论文集合请见 [Awesome-Low-Precision-Training](https://github.com/Hao840/Awesome-Low-Precision-Training)。

> Index Terms—large language models; low-precision training; quantization

关键词：大语言模型 低精度训练 量化

### I. Introduction
1. 引言

> LARGE Language Models (LLMs) have emerged as a foundational technology in modern artificial intelligence, driving breakthroughs in natural language processing, code generation, and multimodal reasoning [1]–[4]. Their capacity to model complex patterns across massive datasets has enabled a diverse array of applications, ranging from conversational agents to tools that accelerate scientific discovery. Despite their transformative potential, training LLMs remains prohibitively expensive, demanding extensive computational resources and incurring significant energy costs [5]–[8]. For instance, GPT-3 required roughly 355 V100 GPU-years of training compute, and recent analyses indicate that the cost of frontier-model training has continued to rise rapidly [8], [9].

大型语言模型（LLMs）已成为现代人工智能领域的基础性技术，推动了自然语言处理、代码生成和多模态推理等方面的突破性进展[1]–[4]。其在大规模数据集上建模复杂模式的能力，使得从对话智能体到加速科学发现的工具等多种应用得以实现。尽管 LLM 具有变革性潜力，大型语言模型的训练成本仍然极为高昂，需要大量计算资源并产生显著的能源开销[5]–[8]。例如，GPT-3的训练大约需要355个V100 GPU年的计算量，且近期分析表明前沿模型的训练成本仍在快速攀升[8], [9]。

> To address these challenges, low-precision training has emerged as a promising solution. By reducing the numerical precision of weights, gradients, and activations during training, such as switching from 32-bit floating-point (FP32) precision to 16-bit (FP16/BF16) or even 8-bit formats, researchers can significantly lower memory usage, communication overhead, and computational costs, while maintaining competitive model performance [3], [10]–[13].

为应对这一挑战，低精度训练已成为一种有前景的解决方案。通过在训练过程中降低权重、梯度、激活的精度，比如从 32 位浮点数（FP32）切换到 16 位浮点数（FP16 或者 BF16）甚至 8 位的格式，研究者可以在保持有竞争力的模型性能的同时显著降低存储空间占用、通信开销和计算成本。

> Low-precision training is attractive for large or resource-constrained models because it reduces memory use, data movement, and communication volume across parameters, activations, gradients, optimizer states, and exchanged tensors. For example, switching from FP32 to FP16 halves storage for the affected tensors, while low-bit optimizers further shrink stateful training overhead [10], [13], [14]. Modern accelerators also expose faster execution paths for FP16/BF16, FP8, and related formats, and distributed recipes use gradient quantization, sign compression, and error feedback to reduce synchronization cost [11], [12], [15]–[18]. These advantages make low precision central to scalable and resource-conscious LLM training.

低精度训练对大型模型或者资源受限的模型具有吸引力，因为它减少了参数、激活、梯度、优化器状态以及交换张量上的内存使用、数据移动和通信量。例如，从 FP32 格式切换到 FP16 格式可将受影响张量占用的存储减半，而低比特优化器还能进一步减少有状态的训练开销。现代加速器也为 FP16/BF16、 FP8 等相关格式提供了更快的执行路径，分布式训练配方则使用梯度量化、符号压缩和误差反馈来降低同步成本。这些优势使得低精度成为可扩展且资源敏感的 LLM 训练的核心。

> In parallel, GPU architectures have evolved to better support low-precision computation. Table I uses NVIDIA GPUs as one representative example. Hardware acceleration has rapidly shifted from the FP32-only Pascal generation to half-precision in Volta and Ampere, and recently to ultra-low precisions with native FP8, FP6, and FP4 support in Hopper and Blackwell Tensor Cores. Low-precision training support is not limited to CUDA-based systems. AMD Instinct accelerators and the ROCm software stack have become increasingly relevant for large-scale training infrastructure. For example, CDNA 3-based MI300X-class accelerators expose high-throughput BF16, FP16, INT8, and FP8 matrix paths, with ROCm support for native FP8 FNUZ E4M3/E5M2 on CDNA 3 hardware. Similar trends toward richer low-precision support appear in other non-NVIDIA ecosystems, such as TPU-oriented TensorFlow/JAX stacks and Ascend-oriented formats including HiFloat8. Recent MX data types such as MXFP8/MXFP4 further extend the design space through tighter hardware-software co-design [11], [12], [15], [19]–[22].

与此同时，GPU 架构也在逐步演化以更好地支持低精度计算。表 I 使用 NVIDIA 系列 GPU 作为代表性示例。硬件加速已迅速从仅支持 FP32 的 Pascal 代际，转向 Volta 和 Ampere 中的半精度，并于近期转向 Hopper 和 Blackwell Tensor Cores 中具备原生 FP8、FP6 和 FP4 支持的超低精度。对低精度训练的支持并不仅限于基于 CUDA 的系统。AMD Instinct 加速器和 POCm 软件栈在大规模训练基础设施中正变得越来越重要。例如，基于 CDNA 3 的 MI300X 级加速器提供高吞吐的 BF16、FP16、INT8 和 FP8 矩阵路径，ROCm 在 CDNA 3 硬件上支持原生 FP8 FNUZ E4M3/E5M2。其他非 NVIDIA 生态系统中也出现了类似的、更丰富的低精度支持趋势，例如面向 TPU 的 TensorFlow/JAX 软件栈，以及面向 Ascend 的格式（包括 HiFloat8）。近期的 MX 数据类型（如 MXFP8/MXFP4）通过更紧密的软硬件协同设计进一步扩展了设计空间。

> Despite its promise, low-precision training remains difficult to survey because methods are fragmented across value representations, targeted training components, and training scenarios. Recent surveys provide valuable context on distributed LLM infrastructure or low-bit LLM quantization [23], [24], but low-precision training is not their central scope. System-oriented surveys emphasize parallelism, scheduling, memory management, and communication infrastructure, whereas low-bit LLM surveys often place training beside inference-time compression and deployment. In contrast, training-time low precision must also account for gradients, optimizer states, activation storage, and stability mechanisms that have no direct inference-only counterpart. This gap motivates a survey that treats low precision as both a representation and optimization-pipeline problem.

尽管低精度训练有一定前景，但由于相关方法在数值表示、目标训练组件和训练场景等方面的碎片化，低精度训练仍然难以综述。近期的一些综述为分布式大型语言模型（LLM）基础设施或低比特大型语言模型量化提供了宝贵的背景信息，但低精度训练并非其核心关注点。面向系统的综述强调并行性、调度、内存管理和通信基础设施，而低比特大型语言模型综述则往往将训练与推理时的压缩和部署并列。相比之下，训练时的低精度还必须考虑梯度、优化器状态、激活存储和稳定性机制，这些在纯推理阶段并无直接对应。这一空白促使我们开展一项综述，将低精度视为表示和优化管道两方面的问题。

> TABLE I
>
> COMPARISON OF SUPPORTED PRECISIONS ACROSS NVIDIA GPUS.

表1：不同 NVIDIA GPU 支持的精度对比

| GPU                   |   P4   | V100  |  A100  |  H100  |   B100    |
| :-------------------- | :----: | :---: | :----: | :----: | :-------: |
| Architecture          | Pascal | Volta | Ampere | Hopper | Blackwell |
| CUDA Core — FP32      |   ✓    |   ✓   |   ✓    |   ✓    |     ✓     |
| CUDA Core — FP16      |   ✗    |   ✓   |   ✓    |   ✓    |     ✓     |
| CUDA Core — BF16      |   ✗    |   ✗   |   ✓    |   ✓    |     ✓     |
| CUDA Core — FP8       |   ✗    |   ✗   |   ✗    |   ✗    |     ✗     |
| CUDA Core — FP6/FP4   |   ✗    |   ✗   |   ✗    |   ✗    |     ✗     |
| Tensor Core — FP32    |   ✗    |   ✗   |   ✗    |   ✗    |     ✗     |
| Tensor Core — FP16    |   ✗    |   ✓   |   ✓    |   ✓    |     ✓     |
| Tensor Core — BF16    |   ✗    |   ✗   |   ✓    |   ✓    |     ✓     |
| Tensor Core — FP8     |   ✗    |   ✗   |   ✗    |   ✓    |     ✓     |
| Tensor Core — FP6/FP4 |   ✗    |   ✗   |   ✗    |   ✗    |     ✓     |

> In this survey, we focus on low-precision training of models and provide a comprehensive, structured review of recent advances in the field. We organize the literature primarily by value representation formats, which shape hardware design, computational performance, and the way readers navigate the field. To avoid a purely format-based list, we also use four recurring challenges as a reading guide: (1) dynamic-range mismatch and outlier handling, (2) accumulation and update-fidelity protection, (3) precision allocation across tensors, layers, operators, and training stages, and (4) system/dataflow co-design for efficient execution and communication. These challenges help explain why methods with different encodings often converge to similar remedies, such as finer-grained scaling, selective high-precision paths, protected optimizer states, or cast-aware kernels. This cross-cutting view supports family-level efficiency–accuracy comparison, controlled benchmarking, and discussion of robustness and model-reliability implications. In addition, we also cover Quantization-Aware Training (QAT) techniques and system-level solutions that enable efficient low-precision training. Specifically, the topics covered in this survey are organized as follows:

在本综述中，我们聚焦模型的低精度训练，并对该领域的近期进展提供全面、结构化的回顾。我们主要按数值表示格式组织文献，因为这些格式塑造硬件设计、计算性能以及读者浏览该领域的方式。为避免形成纯粹基于格式的罗列，我们还以四个反复出现的挑战作为阅读指南：（1）动态范围不匹配与离群值处理；（2）累加与更新保真度保护；（3）跨张量、层、算子与训练阶段的精度分配；（4）面向高效执行与通信的系统/数据流协同设计。这些挑战有助于解释为什么采用不同编码的方法常常收敛到相似的补救措施，例如更细粒度的缩放、选择性高精度路径、受保护的优化器状态或感知类型转换的 kernel。这种跨切面视角支持家族层面的效率–精度比较、受控基准测试，以及对鲁棒性和模型可靠性影响的讨论。此外，我们还涵盖量化感知训练（Quantization-Aware Training, QAT）技术以及能够实现高效低精度训练的系统级解决方案。具体而言，本综述涵盖的主题组织如下：

> - **Fixed-point and integer-based methods.** Fixed-point and integer representations are the most widely adopted numerical formats in low-precision training. Early works primarily relied on fixed-point quantization with global scaling factors. More recent studies have shifted toward integer quantization with finer-grained scalers to better handle outliers and improve precision.
>
> - **Floating-point-based methods.** Floating-point formats represent another mainstream approach in low-precision training. While they share a similar quantization process with fixed-point methods, recent advances in hardware support have led to increased interest in leveraging low-precision floating-point numbers, enabling both flexibility and improved performance.
>
> - **Customized format-based methods.** Beyond standard numerical formats, various customized representations have been proposed to further optimize performance. These formats are often derived from standard types.
>
> - **Quantization-aware training methods.** Unlike general low-precision training, which applies quantization to weights, activations, and gradients, QAT focuses primarily on simulating quantization effects during the forward pass. Some methods rely on fake quantization to mimic quantization noise without improving training efficiency, while others incorporate real quantization, offering partial gains in training efficiency.
>
> - **System support.** The practical adoption of low-precision training heavily depends on system-level support. This section discusses infrastructures that enable or accelerate low-precision training workflows.


- **基于定点数和整数的方法。** 定点和整数表示是低精度训练中采用最广泛的数值格式。早期工作主要依赖带全局缩放因子的定点量化。较新的研究已转向带更细粒度缩放器的整数量化，以更好地处理离群值并提高精度。

- **基于浮点数的方法。** 浮点格式是低精度训练中的另一条主流路线。虽然它们与定点方法共享类似的量化过程，但近期硬件支持的进展使人们对利用低精度浮点数产生了更大兴趣，从而兼具灵活性和更好的性能。

- **基于定制格式的方法。** 除标准数值格式外，人们还提出了各种定制表示以进一步优化性能。这些格式通常由标准类型派生而来。

- **量化感知训练方法。** 与对权重、激活和梯度施加量化的一般低精度训练不同，QAT 主要关注在前向传播中模拟量化效应。一些方法依赖伪量化来模拟量化噪声而不提升训练效率，另一些方法则采用真实量化，从而带来部分训练效率收益。
系统支持。 低精度训练的实际采用在很大程度上依赖系统级支持。本节讨论能够支持或加速低精度训练工作流的基础设施。

- **系统支持。** 低精度训练的实际采用在很大程度上依赖系统级支持。本节讨论能够支持或加速低精度训练工作流的基础设施。

> We also identify key open challenges and highlight promising directions for future research. Overall, this survey aims to offer a clear and comprehensive understanding of the field, laying the groundwork for more efficient and scalable training practices in the era of large language models. Figure 1 compares the papers reviewed in this survey with different low-precision representations up to 2024, revealing a clear upward trend in integer-based methods over the past decade, alongside a recent rise in floating-point methods. In contrast, fixed-point representations have experienced a steady decline, while customized formats have consistently garnered minimal interest. Moreover, Figure 2 summarizes how low-precision training has evolved across the three main numerical-format families discussed in this survey. It highlights representative milestones and stage-wise shifts in technical emphasis.

我们还指出了关键的开放挑战，并强调了有前景的未来研究方向。总体而言，本综述旨在提供对该领域清晰而全面的理解，为 LLM 时代更高效、更可扩展的训练实践奠定基础。图 1 比较了本综述所评述的、截至 2024 年采用不同低精度表示的论文，揭示了过去十年基于整数的方法呈明显上升趋势，同时浮点方法近期也有所上升。相比之下，定点表示持续下降，而定制格式的兴趣始终很低。此外，图 2 总结了低精度训练在本综述讨论的三个主要数值格式家族中的演进过程。它突出了代表性里程碑以及技术重心的阶段性转变。

> The main contributions of this survey are as follows:
>
> - We provide a detailed classification of low-precision training techniques, organized by numerical formats, including fixed-point, integer, floating-point, and customized representations. Different from prior surveys that treat low precision as part of broader efficient-training, low-bit LLM, or deployment-oriented compression landscapes, this work takes training-time low-precision methods as the central scope.
> - Beyond categorization, we synthesize recurring challenges across format families, including range management, update fidelity, precision allocation, and system/dataflow co-design. We also summarize representative methods in tabular form, compare family-level efficiency–accuracy trade-offs with qualitative synthesis and controlled benchmarking, and discuss robustness and model-reliability implications.
> - We examine QAT techniques that closely resemble low-precision training and provide an overview of typical works that apply QAT in the context of LLM training. Moreover, system supports that enable efficient low-precision training are also introduced.
> - We outline key challenges in the field and discuss promising directions for future research aimed at developing more efficient and environmentally sustainable training practices for large models.

本文的核心贡献如下：

- 我们按数值格式对低精度训练技术进行了详细分类，包括定点、整数、浮点数和自定义表示。与以往将低精度视为更广泛的高效训练、低比特大型语言模型（LLM）或面向部署的压缩领域的一部分的综述不同，本研究以训练时的低精度方法为核心范围。
- 除了分类之外，我们还综合了不同格式系列中反复出现的挑战，包括范围管理、更新保真度、精度分配以及系统/数据流的协同设计。我们还以表格形式总结了代表性方法，通过定性综合和受控基准测试比较了系列层面的效率-精度权衡，并讨论了鲁棒性和模型可靠性影响。
- 我们研究了与低精度训练极为相似的量化感知训练（QAT）技术，并概述了在大型语言模型（LLM）训练背景下应用QAT的典型工作。此外，还介绍了支持高效低精度训练的系统支持技术。
- 我们概述了该领域的主要挑战，并探讨了未来研究的有前景的方向，旨在为大型模型开发更高效、更环保的训练实践。

> The survey is organized as follows. As shown in Figure 3, Section II provides background on low-precision training, including value representation formats and affected components during training. Section III discusses techniques based on fixed-point and integer formats, while Section IV covers floating-point approaches. Section V presents customized low-precision formats. Section VI then revisits the literature from cross-cutting perspectives, making a family-level comparison of memory, speed, and accuracy as well as robustness and model-reliability implications. Section VII discusses QAT methods, and Section VIII introduces system-level support strategies. Section IX outlines open problems and research opportunities, and Section X concludes the survey.

本综述的组织结构如下：如图3所示，第2节介绍了低精度训练的背景信息，包括数值表示格式以及训练过程中受影响的组件。第3节讨论了基于定点和整数格式的技术，而第4节则涵盖了浮点方法。第5节介绍了定制的低精度格式。第6节则从交叉视角回顾了文献，对内存、速度、准确性以及鲁棒性和模型可靠性进行了家族层面的比较。第7节讨论了量化训练（QAT）方法，第8节介绍了系统级支持策略。第9节概述了未解决的问题和研究机会，而第10节则对本综述进行了总结。

### II. Basic Knowledge
2. 基础知识

> This section introduces the value representation formats used throughout the survey and the training components commonly targeted by low-precision methods. Figure 4 visualizes representative fixed-point, integer, and floating-point formats.

本节介绍了在本综述中用到的数值表示格式，以及低精度训练方法通常针对的训练组件。图4展示了具有代表性的定点数、整数和浮点数格式。

#### A. Value Representation Formats
A. 数值表示格式

> **Fixed-Point and Integer Formats.** Fixed-point representation assigns fixed bit counts to the integer and fractional parts of a value. Without fractional bits, it reduces to conventional integer representation. A signed fixed-point scalar $a$ with bit-width $B$ and binary representation $R = (a_0, a_1, \dots, a_{B-1}) \in \{0, 1\}^B$ can be written as Sakr *et al.* [25]:
>
> $$a = r \left( -a_0 + \sum_{i=1}^{B-1} 2^{-i} a_i \right), \tag{1}$$
> where $r$ denotes the predefined dynamic range and is often restricted to a power of two for hardware simplicity. When $r = 2^{B-1}$, the expression becomes the standard two's-complement integer representation:
>
> $$a = -2^{B-1}a_0 + \sum_{i=1}^{B-1} 2^{B-1-i}a_i. \tag{2}$$
>
> In this case, the fractional component vanishes and the result lies in $[-2^{B-1}, 2^{B-1}-1]$. Fixed-point arithmetic is hardware-efficient, but its static precision requires careful control of overflow and underflow.

**定点数和整数格式。** 定点数表示格式将固定的位数分配给整数部分和小数部分。如果没有小数部分的比特位，它就退化为传统的整数表示。一个具有位宽 $B$ 和二进制表示 $R = (a_0, a_1, \dots, a_{B-1}) \in \{0, 1\}^B$ 的定点数标量可被写成 Sakr 等人提出的形式：
$$a = r \left( -a_0 + \sum_{i=1}^{B-1} 2^{-i} a_i \right), \tag{1}$$
其中 $r$ 表示预定义的动态范围，为简化硬件实现的需要，通常限制为 2 的幂次。当 $r = 2^{B-1}$ 时，该表达式变为标准的二进制补码整数表示：
$$a = -2^{B-1}a_0 + \sum_{i=1}^{B-1} 2^{B-1-i}a_i. \tag{2}$$
在这种情况下，定点数的小数部分消失，结果位于 $[-2^{B-1}, 2^{B-1}-1]$ 之间。定点数的算术具有硬件高效性，但由于它采用静态精度，需要仔细控制，以避免上溢和下溢。

> **Floating-Point Formats.** Floating-point representations are widely used because they support a much larger dynamic range. A floating-point number contains a sign bit $s$, an exponent $e$ that controls range, and a mantissa $m$ that controls precision. Its general form is:
>
> $$x = (-1)^s \times m \times 2^{e-b}, \tag{3}$$
>
> where $b$ denotes the exponent bias.
>
> The IEEE 754 standard [26] defines widely used formats such as FP32 single precision (E8M23)$^1$ and FP16 half precision (E5M10). Deep learning has also introduced specialized formats such as BF16 (E8M7) and FP8 (E4M3, E5M2), which offer favorable trade-offs between precision, range, and computational efficiency and now underpin many mixed-precision training recipes [10]–[12]. In pursuit of even more compact representations, recent hardware and software stacks are also exploring ultra-low-precision formats such as FP4 and microscaling-based datatypes to further reduce memory traffic and arithmetic cost [21], [22].

**浮点数格式。** 由于浮点数提供了大得多的动态范围，浮点数表示格式得到了更加广泛的应用。一个浮点数包含一个符号位 $s$，一个用来控制范围的指数 $e$，以及负责控制精度的尾数 $m$。它的一般形式为：
$$x = (-1)^s \times m \times 2^{e-b}, \tag{3}$$
其中 $b$ 表示指数的偏置项。

IEEE 754 标准定义了广泛使用的格式，例如 FP32 单精度（E8M23）$^1$和 FP16 半精度（E5M10）。深度学习还引入了专门格式，例如 BF16（E8M7）和 FP8（E4M3、E5M2），它们在精度、范围和计算效率之间提供了有利的权衡，并且现在支撑着许多混合精度训练配方。为了追求更紧凑的表示，近期硬件和软件栈还在探索超低精度格式，例如 FP4 和基于 microscaling 的数据类型，以进一步减少内存流量和算术成本。

*注1：FP32 表示 32 位浮点数，其中 8 位分配给指数 $e$ ，23 位分配给尾数 $m$。*

> **Customized Formats.** Beyond standard fixed-point and floating-point representations, there also exist customized numerical formats specifically designed for deep learning applications, such as Microscaling [21]. These specialized formats will be introduced in context as we discuss the corresponding works in Section V.

除标准的定点和浮点表示外，还存在专为深度学习应用设计的定制数值格式，例如 Microscaling。这些专门格式将在第 5 节讨论相应工作时结合上下文介绍。

#### B. Different Low-Precision Components
B. 不同的低精度组件

> Several training components can be optimized with low-precision arithmetic. We summarize the training dynamics as:
> $$\theta_t = \theta_{t-1} - \eta \cdot s_t,$$
> $$s_t = \mathcal{S}(s_{t-1}, g_t), \quad \text{(State update)} \tag{4}$$
> $$g_t = \nabla_\theta \mathcal{L}(f_\theta(x), y), \quad \text{(Gradient computation)}$$
> where $\theta_t$ denotes the model parameters at iteration $t$, $\eta$ is the learning rate, and $s_t$ denotes optimizer state such as momentum or adaptive estimates in Adam. The function $\mathcal{S}$ defines the optimizer update, and $g_t$ is the loss gradient $\mathcal{L}$ over a mini-batch $(x, y)$. Figure 5 visualizes this abstraction.
>
> Prior work has primarily focused on applying low-precision optimization to one or more components of the training process. A straightforward approach involves quantizing the model weights $\theta_t$, activations used in the forward pass $f_\theta(x)$, and gradients $g_t$ computed during backpropagation. In addition, some studies aim to further reduce the memory footprint by representing stored activations and optimizer state $s_t$ in low precision.

有些训练组件可以用低精度运算进行优化。我们将训练动态总结为：
$$\theta_t = \theta_{t-1} - \eta \cdot s_t,$$
$$s_t = \mathcal{S}(s_{t-1}, g_t), \quad \text{(状态更新)} \tag{4}$$
$$g_t = \nabla_\theta \mathcal{L}(f_\theta(x), y), \quad \text{(梯度计算)}$$
先前的工作主要聚焦于在训练过程中将低精度优化应用于一种或多种组件。一种直接的方法涉及对模型权重 $\theta_t$、前向传播 $f_\theta(x)$ 中使用的激活，以及反向传播中计算的梯度 $g_t$ 进行量化。另外，一些研究旨在通过用低精度表示存储的激活和优化器状态 $s_t$，以更进一步地减少存储占用。

### III. Low-precision Fixed-point and Integer Training
3. 低精度定点数与整数训练

> In this section, we review low-precision training methods based on fixed-point and integer quantization. Earlier work often used these terms interchangeably. Here we use fixed-point when the scaling factor $\Delta$ is constant and integer quantization when it is data-dependent. For a $B$-bit representation with $k$ fractional bits ($k < B$), the quantized value $q$ of input $x$ is:
>
> $$q = \mathrm{clip}\left(\mathrm{round}\left(\frac{x}{\Delta}\right), -2^{B-1}, 2^{B-1}-1\right), \tag{5}$$
> $$\Delta = 2^{-k}.$$

本节回顾基于定点数和整数量化的低精度训练方法。早期工作通常将这两个术语互换。在本文中我们将缩放因子 $\Delta$ 为常数的称为定点数，而将缩放因子依赖于数据的称为整数量化。对于具有 $k$ 位小数部分位数的 $B$ 位二进制表示（其中 $k<B$），输入值 $x$ 被量化后的值 $q$ 为：
$$q = \mathrm{clip}\left(\mathrm{round}\left(\frac{x}{\Delta}\right), -2^{B-1}, 2^{B-1}-1\right), \tag{5}$$
$$\Delta = 2^{-k}.$$

> This representation is hardware-efficient but limited in dynamic range. As accelerator support for integer arithmetic improved, research shifted toward integer quantization. A common choice is symmetric uniform quantization [29], where the scaling factor $\Delta$ is data-dependent. Given an input range $(l, u)$, the quantized value is computed as:
> $$q = \mathrm{round}\left(\frac{\mathrm{clip}(x, -c, c)}{\Delta}\right), \tag{6}$$
> $$\Delta = \frac{c}{2^{B-1}-1},$$
> $$c = \max(|l|, |u|).$$

这种表示方法具有硬件高效性，但在动态范围上有限。随着加速器对整数算术的改进，研究转向了整数量化。一种常见的选择是对称均匀量化，其中的缩放因子 $\Delta$ 依赖于数据。给定输入范围 $(l,u)$，量化后的值为：
$$q = \mathrm{round}\left(\frac{\mathrm{clip}(x, -c, c)}{\Delta}\right), \tag{6}$$
$$\Delta = \frac{c}{2^{B-1}-1},$$
$$c = \max(|l|, |u|).$$

> In both quantization formats, the original input is approximated by reconstructing the value $\hat{x}$ as:
>$$\hat{x} = q \cdot \Delta. \tag{7}$$

这两种量化格式中的原始输入都可以通过重建值 $\hat{x}$ 近似估计：
$$\hat{x} = q \cdot \Delta. \tag{7}$$

> Apart from the reduced precision of values, training largely follows the full-precision forward and backward passes. The main exception is 1-bit training, which commonly uses the **Straight-Through Estimator (STE)** to approximate gradients through the non-differentiable quantizer.

除了数值精度降低外，训练在很大程度上遵循全精度前向和反向传播。*译者注：意思是低精度的训练和全精度的原理、流程基本一致，只是精度变低* 主要例外是 1-bit 训练，它通常使用 Straight-Through Estimator（STE）来通过不可微量化器近似梯度。

> Rather than following the chronology of individual papers, we organize this section around the design axes that shaped fixed-point and integer training. Fixed-point methods are discussed through the trade-off between arithmetic simplicity, range limitation, rounding, and adaptive scaling. Integer methods are grouped by end-to-end integerization, range and outlier control, update fidelity, sensitive components, optimizer-state compression, and communication limits.

与按每一篇论文的时间顺序展开不同，我们围绕塑造定点训练与整数训练的设计轴线来组织本节。定点方法通过算术简单性、范围限制、舍入与自适应缩放之间的权衡来讨论。整数方法则按端到端整数化、范围与离群值控制、更新保真度、敏感组件、优化器状态压缩以及通信限制来分组。

#### A. Fixed-Point Training
A. 定点数训练

> Fixed-point training is best understood as a trade-off between simple arithmetic and limited dynamic range. Its storage and arithmetic are attractive for hardware, but a static or coarse scale must cover tensors whose magnitudes vary across layers, operators, and training stages. The representative fixed-point methods covered in this section are summarized in Table II.

定点训练最好被理解为简单算术与有限动态范围之间的权衡。其存储和算术对硬件很有吸引力，但静态或粗糙的缩放必须覆盖那些在不同层、算子与训练阶段中量级各异的张量。本节涵盖的代表性定点方法总结于表 II。

**TABLE II REPRESENTATIVE FIXED-POINT TRAINING METHODS.**

表2：代表性的定点训练方法

| Paper                     | Family | Model   | Metrics | Weights   | Activations | Gradients    | Optim.  | Comm. | Grouping |
| ------------------------- | ------ | ------- | ------- | --------- | ----------- | ------------ | ------- | ----- | -------- |
| Gupta *et al.* [30]       | FX     | MLP/CNN | Acc     | fixed16   | fixed16     | fixed16      | -       | -     | -        |
| Xia *et al.* [31]         | FX     | MLP     | Acc     | fixed16   | -           | fixed16      | -       | -     | -        |
| FxpNet [32]               | FX     | CNN     | Acc     | fixed12   | binary      | fixed12      | fixed12 | -     | -        |
| Courbariaux *et al.* [33] | FX     | Maxout  | Acc     | fixed10   | fixed10     | fixed12      | -       | -     | -        |
| Zhang *et al.* [34]       | FX     | CNN/RNN | Acc/PPL | fixed8    | fixed8      | fixed8/16/24 | -       | -     | -        |
| MuPPET [35]               | FX     | CNN     | Acc     | fixed16   | fixed16     | fixed16      | -       | -     | -        |
| QFX [36]                  | FX     | CNN/BNN | Acc     | learnable | learnable   | learnable    | -       | -     | -        |

> **Range and rounding.** Coarse fixed-point quantization can erase small optimization signals. When the quantization step is too large, weak gradients or parameter updates may be rounded to zero, making the optimizer insensitive to accumulated learning signals. Stochastic rounding addresses this problem by making the rounded value unbiased in expectation:
> $$
> R(x) = \begin{cases}
> \lfloor x \rfloor & \text{with probability } p(x), \\
> \lfloor x \rfloor + \delta & \text{with probability } 1 - p(x),
> \end{cases} \tag{8}
> $$
>
> with $p(x) = 1 - \frac{x - \lfloor x \rfloor}{\delta}$. Because this rule satisfies $\mathcal{E}(R(x)) = x$, it can preserve weak gradient signals that nearest rounding would remove [30]. Later variants simplify the stochastic rule to reduce implementation cost while retaining the same goal of protecting sub-step updates [31]. This line of work shows that fixed-point training is not determined only by bit-width; the rounding rule also controls whether small but consequential updates survive.

**范围与舍入。** 粗糙的定点量化可能会消除问微小的优化信号。当量化后的步长太大时，微小的梯度和参数更新会被舍入为0，使优化器对累积的学习信号不敏感。随机舍入通过使舍入值在期望上无偏来解决这一问题：
$$
R(x) = \begin{cases}
\lfloor x \rfloor & \text{以概率 } p(x), \\
\lfloor x \rfloor + \delta & \text{以概率 } 1 - p(x),
\end{cases} \tag{8}
$$
其中 $p(x) = 1 - \dfrac{x - \lfloor x \rfloor}{\delta}$。由于该规则满足 $\mathcal{E}(R(x)) = x$ *译者注：期望*，它可以保留最近舍入会移除的弱梯度信号。后来的变体简化了随机规则以降低实现成本，同时保留保护小于步长的更新这一相同目标。这一系列工作表明，定点训练并不只由位宽决定；舍入规则也控制着微小但重要的更新能否存活。

> **Adaptive scaling.** Range adaptation becomes necessary because a single fixed scale cannot simultaneously represent large activations, small gradients, and layer-wise distribution shifts. Fixed-point methods therefore evolved from ordinary shared-scale formats toward adaptive layer-wise scaling, range tracking, trainable binary-point placement, and precision schedules [32], [34]–[36]. Related designs reduce memory pressure through low-precision SGD, compressed activation storage, or averaging-based optimization while limiting the instability caused by coarse quantization [25], [28], [37]. Dynamic fixed-point methods further relax the static-scale assumption by using multiple adjustable scaling factors, often combined with clipping, batch-size scaling, or architecture-specific recipes for larger workloads [33], [38]–[40].

**自适应缩放。** 因为单一固定缩放无法同时表示大幅激活、小梯度和逐层分布偏移，范围自适应变得必要。因此，定点方法从普通的共享缩放格式，演变为自适应逐层缩放、范围跟踪、可训练的二进制点位置以及精度调度[32], [34]–[36]。相关设计通过低精度 SGD、压缩激活存储或基于平均的优化来降低内存压力，同时限制粗糙量化引起的不稳定性[25], [28], [37]。动态定点方法通过使用多个可调缩放因子进一步放宽静态缩放假设，并且常常结合裁剪、批量大小缩放或面向更大工作负载的特定架构配方[33], [38]–[40]。

> These techniques differ in implementation, but they share the same design logic: keep the arithmetic close to fixed-point while allowing the scale to follow the tensor distribution. The benefit is that the hardware path remains simpler than full floating-point arithmetic. The cost is that scale selection becomes another control problem, and incorrect updates can still produce overflow, underflow, or excessive rounding error.

这些技术在实现上不同，但共享同一设计逻辑：让算术保持接近定点，同时允许缩放跟随张量分布。其收益是硬件路径仍比完整浮点算术更简单。其代价是缩放选择成为另一个控制问题，而错误的更新仍可能产生 overflow、underflow 或过度的舍入误差。

> Overall, fixed-point studies established the feasibility of low-precision training under simple arithmetic, but they also revealed the cost of shared-scale rigidity. Fixed-point formats remain attractive when hardware simplicity and low storage overhead dominate, yet are fragile under outliers, layer-wise distribution shifts, and heterogeneous tensor statistics. This helps explain why later work increasingly moved toward finergrained integer, floating-point, or custom-format designs

总体而言，定点研究确立了在简单算术下进行低精度训练的可行性，但也揭示了共享缩放刚性的代价。当硬件简单性和低存储开销占主导时，定点格式仍然有吸引力，但它们在离群值、逐层分布偏移和异构张量统计下较为脆弱。这有助于解释为什么后续工作越来越多地转向更细粒度的整数、浮点数或者定制格式的设计。

#### B. Integer Training
B. 整数训练

> Integer training generalizes the fixed-point motivation but shifts the central question from whether a simple scale can work to which tensors, operators, states, and communication paths require distinct scaling or protection. This framing keeps the discussion format-specific while making the analytical progression explicit. Representative methods are summarized in Table III.

整数训练推广了定点训练的动机，但将核心问题从一个简单的量化是否可行，转移到了哪些张量、算子、状态以及通信路径需要不同的缩放或保护。这个框架保持了讨论的格式特性，同时明确了分析的进展。代表性方法总结在表 III 中。

**TABLE III REPRESENTATIVE INTEGER AND MULTI-BIT TRAINING METHODS, INCLUDING BINARY AND 1-BIT VARIANTS.**

表3：代表性的整数与多比特训练方法，包括二进制和单比特的变种。

| Paper                   | Family       | Model           | Metrics | Weights   | Activations | Gradients | Optim. | Comm.   | Grouping |
| ----------------------- | ------------ | --------------- | ------- | --------- | ----------- | --------- | ------ | ------- | -------- |
| Das et al. [40]         | Integer      | CNN             | Acc     | INT16     | INT16       | INT16     | -      | -       | -        |
| WAGE [41]               | Integer      | DNN             | Acc     | INT2      | INT8        | INT8      | -      | -       | -        |
| WAGEUBN [42]            | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | INT8   | -       | -        |
| NITI [43]               | Integer      | DNN             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| SWALP [37]              | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | INT8   | -       | -        |
| Banner et al. [44]      | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| Zhao et al. [45]        | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| In-hindsight [46]       | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| Zhu et al. [47]         | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| AMPA [48]               | Integer      | CNN             | Acc     | INT4-8    | INT4-8      | INT4-8    | -      | -       | -        |
| Shen et al. [49]        | Integer      | CNN             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| FracTrain [50]          | Integer      | CNN             | Acc     | INT4-8    | INT4-8      | INT6-12   | -      | -       | -        |
| CPT [51]                | Integer      | CNN/LSTM        | Acc/PPL | INT3-8    | INT3-8      | -         | -      | -       | -        |
| Chen et al. [52]        | Integer      | CNN             | Acc     | INT5      | INT5        | INT5      | -      | -       | block    |
| Park et al. [53]        | Act. Comp.   | CNN             | Acc     | -         | INT3        | -         | -      | -       | -        |
| Xi et al. [54]          | Integer      | Transformer     | PPL/Acc | INT4      | INT4        | INT4      | -      | -       | -        |
| Zhang et al. [55]       | Integer      | LLM             | PPL/Acc | INT8      | INT8        | INT8      | -      | -       | block    |
| Jetfire [56]            | Integer      | LLM             | PPL/Acc | INT8      | INT8        | INT8      | -      | -       | block    |
| Chitsaz et al. [57]     | Integer      | LLM             | PPL/Acc | INT4/INT8 | INT4/8      | INT4/8    | INT4/8 | -       | -        |
| SwitchBack [58]         | Integer      | VLM             | Acc     | INT8      | INT8        | INT8      | -      | -       | -        |
| Guo et al. [59]         | Integer      | CNN/Transformer | Acc/PPL | INT4/INT6 | INT4/6      | INT4/6    | -      | -       | -        |
| HDQT [60]               | Integer      | CNN             | Acc     | INT4      | INT4        | INT4      | -      | -       | -        |
| Yang et al. [61]        | Integer      | CNN             | mIoU    | INT8      | INT8        | INT8      | -      | -       | -        |
| DQT [62]                | Integer      | LLM             | PPL/Acc | INT8      | -           | -         | -      | -       | -        |
| Q-GaLore [63]           | Optim. Comp. | LLM             | PPL/Acc | INT8      | -           | INT4      | -      | -       | layer    |
| QFT [64]                | Optim. Comp. | LLM             | Acc     | -         | -           | -         | INT8   | -       | channel  |
| Dettmers et al. [65]    | Optim. Comp. | CNN/Transformer | Acc/PPL | -         | -           | -         | INT8   | -       | block    |
| Wang et al. [66]        | Optim. Comp. | CNN/Transformer | Acc/PPL | -         | -           | -         | INT4   | -       | -        |
| Li et al. [67]          | Optim. Comp. | CNN/ViT         | Acc     | -         | -           | -         | INT4   | -       | -        |
| Li et al. [68]          | Optim. Comp. | CNN/Transformer | Acc/PPL | -         | -           | -         | INT4   | -       | row/col. |
| Chakrabarti et al. [28] | Act. Comp.   | CNN             | Acc     | -         | INT4        | -         | -      | -       | -        |
| ActNN [69]              | Act. Comp.   | CNN             | Acc     | -         | INT2        | -         | -      | -       | -        |
| GACT [70]               | Act. Comp.   | CNN/Transformer | Acc/PPL | -         | INT1-7      | -         | -      | -       | tensor   |
| Novikov et al. [71]     | Act. Comp.   | CNN             | Acc     | -         | -           | INT1-3    | -      | -       | -        |
| EXACT [72]              | Act. Comp.   | GNN             | Acc/F1  | -         | INT2        | -         | -      | -       | -        |
| Eliassen et al. [73]    | Act. Comp.   | GNN             | Acc/F1  | -         | INT2        | -         | -      | -       | block    |
| HLQ [74]                | Act. Comp.   | CNN/Transformer | Acc/PPL | -         | -           | INT4      | -      | -       | -        |
| Dettmers et al. [75]    | Comm. Comp.  | CNN             | Acc     | -         | -           | -         | -      | W8A8    | -        |
| QSGD [17]               | Comm. Comp.  | DNN/CNN         | Acc/WER | -         | -           | -         | -      | G4/G8   | -        |
| LIEC-SGD [76]           | Comm. Comp.  | DNN             | Acc     | -         | -           | -         | -      | G comp. | -        |
| ZeRO++ [77]             | Comm. Comp.  | LLM             | PPL     | -         | -           | -         | -      | W8G8    | block    |
| SDP4Bit [78]            | Comm. Comp.  | LLM             | PPL     | -         | -           | -         | -      | W4/G4   | -        |
| QSDP [79]               | Comm. Comp.  | CNN/Transformer | Acc/PPL | -         | -           | -         | -      | W4/G4   | -        |
| BinaryConnect [80]      | Binary       | MLP/CNN         | Acc     | binary    | -           | -         | -      | -       | -        |
| QNN [81]                | Binary       | MLP/CNN         | Acc     | binary    | INT2        | INT6      | -      | -       | -        |
| XNOR-Net [82]           | Binary       | CNN             | Acc     | binary    | binary      | -         | -      | -       | -        |
| DoReFa-Net [83]         | Binary       | CNN             | Acc     | binary    | INT2        | INT6      | -      | -       | -        |
| Wang et al. [84]        | Binary       | CNN             | Acc     | binary    | binary      | binary    | -      | -       | -        |
| 1-Bit FQT [85]          | Binary       | CNN             | Acc     | binary    | binary      | binary    | -      | -       | -        |
| Seide et al. [16]       | Comm. Comp.  | DNN             | WER     | -         | -           | -         | -      | 1-bit   | -        |
| EF-SGD [18]             | Comm. Comp.  | CNN             | Acc     | -         | -           | -         | -      | 1-bit   | -        |
| 1-bit Adam [86]         | Comm. Comp.  | CNN/Transformer | Acc/F1  | -         | -           | -         | -      | 1-bit   | -        |
| 0/1 Adam [87]           | Comm. Comp.  | CNN/LLM         | Acc/PPL | -         | -           | -         | -      | 1-bit   | -        |
| 1-bit LAMB [88]         | Comm. Comp.  | Transformer     | Acc/F1  | -         | -           | -         | -      | 1-bit   | -        |
| Wu et al. [89]          | Comm. Comp.  | CNN             | Acc     | -         | -           | -         | -      | 1-bit   | -        |
| Birder [90]             | Comm. Comp.  | CNN/Transformer | Acc/PPL | -         | -           | -         | -      | 1-bit   | -        |

> **End-to-end integerization.** End-to-end integerization asks whether the main training path can use integer values rather than restricting quantization to inference. Early integer-training frameworks demonstrated that weights, activations, and parameter gradients can all be quantized during training, opening the way to bit-level acceleration [41], [83]. Fully quantized extensions broadened this idea to more of the pipeline, including optimizer-related quantities [42]. More recent studies show that low-bit integer training can remain viable, but usually only when outliers, master-weight storage, or fragile tensors are handled explicitly

端到端整数化。端到端整数化探讨了主要的训练路径是否可以使用整数值，而不是仅仅把量化限制在推理阶段。早期的整数训练框架表明，权重、激活值和参数梯度都可以在训练过程中量化，从而为比特级加速铺平道路 [41]，[83]。完全量化的扩展将这一想法推广到更多的流程，包括与优化器相关的量 [42]。最新的研究表明，低位整数训练仍然可行，但通常只有在显式处理异常值、主权重存储、量化级别或脆弱张量时才行。

> Together, these studies shift the question from whether integer training is possible to where scaling, compensation, or high-precision exceptions are needed. Thus, integer methods should be compared not only by how many tensors they quantize, but also by which parts of the pipeline remain numerically protected for stable, efficient training.

这些研究共同将问题从“整数训练是否可行”转变为“在哪里需要缩放、补偿或高精度例外”。因此，整型方法不应仅按它们量化了多少张量来比较，还应按训练流水线中哪些部分仍被数值上保护以维持稳定、高效训练来比较。

> **Range and granularity.** Range and outlier control addresses tensors with highly non-uniform distributions. A few large activations or gradients can determine the scale for many smaller values, causing either outlier clipping or loss of resolution. One family of methods redesigns the quantizer through logarithmic quantization, variance-aware or history-based range adaptation, and gradient-specific schemes aligned with channel-wise or projected structure [45], [46], [63], [91], [92]. Another family transforms the data before quantization: Hadamard-domain and related structured representations suppress activation outliers and reduce backward-pass cost in low-bit transformer or continual-learning settings [54], [60], [74].

**范围与粒度。** 范围与离群值控制处理分布高度不均匀的张量。少数大激活或大梯度可能决定许多较小值的缩放，从而导致离群值裁剪或分辨率损失。一类方法通过对数量化、方差感知或基于历史的范围自适应，以及针对逐通道或投影结构对齐的梯度专用方案来重新设计量化器 [45], [46], [63], [91], [92]。另一类方法在量化前变换数据：Hadamard 域及相关结构化表示可抑制激活离群值，并在低比特 Transformer 或持续学习设置中降低反向传播成本 [54], [60], [74]。

> As integer training matured, precision also became a resource to allocate rather than a uniform setting. Layer-aware precision adaptation, per-layer dynamic-range control, dynamic bit allocation, and block-wise or capacity-aware schemes match scales and bit-widths to heterogeneous tensor sensitivity [34], [43], [48]–[50], [56]. The common trade-off is clear: global scaling is simple but fragile, whereas fine-grained scaling improves accuracy at the cost of metadata, casting, and kernel-design overhead.

随着整数训练逐渐成熟，精度也成为一种需要分配的资源，而不是统一设置。层感知的精度自适应、逐层动态范围控制、动态比特分配，以及块级或容量感知方案，使缩放和位宽匹配异构的张量敏感性 [34], [43], [48]–[50], [56]。共同权衡很明确：全局缩放简单但脆弱，而细粒度缩放以元数据、类型转换和 kernel 设计开销为代价提高准确性。

> **Update fidelity.** Update fidelity determines whether the optimization trajectory is preserved after discretization. Small updates can disappear once they fall below the quantization step, and repeated rounding can distort gradients even when forward activations remain accurate. Some methods preserve selected operations in elevated precision, whereas others use auxiliary accumulation buffers to recover updates that would otherwise be lost [44], [93]. These studies point to a common failure mode: once updates become smaller than the quantization step, naive low-precision arithmetic can silently erase them. Figure 6 abstracts this recurring issue. When a true update falls between adjacent quantization levels, deterministic rounding maps it back to the original low-precision value, whereas stochastic rounding or an auxiliary high-precision buffer preserves the update either in expectation or through delayed accumulation.

**更新保真度。** 更新保真度决定离散化后优化轨迹是否得以保留。一旦小更新低于量化步长，它们就可能消失；即使前向激活仍然准确，重复舍入也可能扭曲梯度。一些方法将选定操作保留在更高精度，另一些方法使用辅助累加缓冲区来恢复原本会丢失的更新 [44], [93]。这些研究指向一个共同失效模式：一旦更新小于量化步长，朴素的低精度算术就可能悄无声息地将其抹去。图 6 抽象了这一反复出现的问题。当真实更新落在相邻量化级之间时，确定性舍入会将其映射回原始低精度值，而随机舍入或辅助高精度缓冲区则通过期望或延迟累积来保留该更新。

> Later methods reduce gradient quantization error through improved grouping, clipping, and error modeling [47], [59]. A related strategy is to vary precision over training time: early stages can often tolerate coarser precision, whereas later stages require more accurate updates near convergence [50], [51].

后续方法通过改进分组、裁剪和误差建模来降低梯度量化误差 [47], [59]。一个相关策略是在训练时间上变化精度：早期阶段通常可以容忍更粗的精度，而后期阶段在收敛附近需要更准确的更新 [50], [51]。

> Theoretical work complements these empirical recipes by explaining when integer training can remain reliable. Existing analyses show that training is often more quantization-robust than naive worst-case reasoning suggests, while distinguishing convex from non-convex settings, dimension-dependent from dimension-free bounds, and naive from statistically designed fully quantized training [44], [47], [52], [95]–[97].

理论工作通过解释整数训练何时能够保持可靠，补充了这些经验配方。现有分析表明，训练通常比朴素的 worst-case 推理所暗示的更具量化鲁棒性，同时区分凸与非凸设置、依赖维数与不依赖维数的界，以及朴素全量化训练与统计设计全量化训练 [44], [47], [52], [95]–[97]。

> **Optimizer and communication compression.** Optimizer states and communication paths are auxiliary to arithmetic kernels but can dominate training cost. For adaptive optimizers such as Adam [27], first- and second-order statistics can require 2-3$\times$ the memory of SGD. Block-wise schemes and range adaptation can reduce Adam moments to 16-bit or 8-bit, but more aggressive compression must handle rare outliers, zero-point effects, and error accumulation [57], [65], [68], [98], [99]. Beyond Adam, integer compression has been explored for optimizers such as Lion and Shampoo through structure-aware state quantization and low-bit representations for second-order preconditioners or their decomposed forms [64], [66], [67]. Optimizer compression is therefore constrained less by average precision than by rare but consequential state outliers.

**优化器与通信压缩。** 优化器状态和通信路径虽然对算术 kernel 而言是辅助性的，却可能主导训练成本。对于 Adam [27] 等自适应优化器，一阶和二阶统计量可能需要 SGD 的 2–3 倍内存。块级方案和范围自适应可将 Adam 矩降为 16-bit 或 8-bit，但更激进的压缩必须处理稀有离群值、零点效应和误差累积 [57], [65], [68], [98], [99]。除 Adam 之外，还通过结构感知状态量化，以及二阶预条件器或其分解形式的低比特表示，探索了 Lion 和 Shampoo 等优化器的整数压缩 [64], [66], [67]。因此，优化器压缩与其说受平均精度约束，不如说受稀有但重要的状态离群值约束。

> Activation storage and dataflow overhead form another bottleneck. Activation-compression methods reduce backward-pass memory by exploiting narrow activation ranges with sparse outliers, adaptive per-group compression, runtime control, and nonlinear backward approximations [53], [69]–[73]. For transformer training, repeated quantize-compute-dequantize conversion can also weaken practical speedups. Systems such as Jetfire redesign operators to support more direct INT8 data flow, while methods addressing latent full-precision weight paths reduce memory that would otherwise remain outside the quantized arithmetic path [56], [100].

激活存储和数据流开销构成另一个瓶颈。激活压缩方法利用带稀疏离群值的狭窄激活范围、自适应逐组压缩、运行时控制和非线性反向近似，降低反向传播内存 [53], [69]–[73]。对于 Transformer 训练，重复的量化—计算—反量化转换也可能削弱实际加速。Jetfire 等系统重新设计算子以支持更直接的 INT8 数据流，而处理潜在全精度权重路径的方法则减少原本会留在量化算术路径之外的内存 [56], [100]。

> At large scale, communication rather than arithmetic can dominate training cost. Communication-oriented integer methods compress values exchanged across devices while controlling compression bias. Early frameworks such as QSGD established convergence guarantees for quantized communication [17], [75]. Later methods reduce bias through error feedback, bidirectional compensation, immediate local error compensation, adaptive quantizers, joint quantization-and-sparsification, and preprocessing that avoids decompression overhead [76], [101]–[107]. Modern large-model systems further incorporate block quantization into optimizer sharding, pipeline parallelism, ShardedDP, and FSDP [77]–[79], [108]. Here, the main contribution is often a better match between quantization and the actual memory or communication bottleneck rather than a new integer format alone.

在大规模场景下，主导训练成本的可能是通信成本而非算术成本。面向通信的整数方法在控制压缩偏差的同时，压缩设备间交换的值。早期的框架（如QSGD）为量化通信建立了收敛保证[17]、[75]。后续方法通过误差反馈、双向补偿、即时局部误差补偿、自适应量化器、联合量化和稀疏化以及避免解压开销的预处理来减少偏差[76]、[101]–[107]。现代大型模型系统进一步将块量化融入到优化器分片、流水线并行、ShardedDP和FSDP中[77]–[79]、[108]。在此背景下，主要贡献往往在于使量化和实际内存或通信瓶颈之间更好地匹配，而不仅仅是引入一种新的整数格式。

> Overall, integer training has progressed from uniform low-bit quantization toward selective schemes that protect outliers, sensitive layers, optimizer states, and expensive data movement. Practical fully quantized training rarely comes from quantizing everything identically; it comes from matching scale granularity, update protection, high-precision exceptions, and system dataflow to tensor statistics and operator roles.

总体而言，整数训练已从统一的低位量化发展到选择性方案，这些方案能够保护离群值、敏感层、优化器状态以及开销较大的数据移动。实际的完全量化训练很少是通过将所有内容同等量化来实现的；而是通过匹配规模粒度、更新保护、高精度例外情况以及系统数据流与张量统计和算子角色来实现的。

> **Binary and 1-Bit training.** Binary training represents the extreme limit of the integer family. Binary neural networks (BNNs) quantize weights and activations to $\pm 1$, replacing multiply-accumulate operations with simpler arithmetic. The core difficulty is training discrete weights while still accumulating meaningful updates, so a common solution keeps full-precision latent weights for gradient accumulation while using binary values during propagation [80]. Its binarization can be implemented either deterministically with the sign function,
> $$q = \mathrm{sign}(x) = \begin{cases} +1 & \text{if } x \geq 0, \\ -1 & \text{otherwise,} \end{cases} \tag{9}$$
> or stochastically as
> $$q = \begin{cases} +1 & \text{with probability } \sigma(x), \\ -1 & \text{with probability } 1 - \sigma(x), \end{cases} \tag{10}$$
> where $\sigma(x)$ denotes the hard sigmoid function [80]. Related binary architectures further binarize layer inputs and introduce scaling-factor approximations, showing that aggressive binarization can deliver large memory and convolution-cost savings [82]. Subsequent work quantizes gradients, stores activations directly in binary form, and analyzes how gradient variance affects fully quantized 1-bit training [83]–[85].

**二值与 1-Bit 训练。** 二值训练代表整数家族的极端极限。二值神经网络（Binary Neural Networks, BNNs）将权重和激活量化为 $\pm 1$，用更简单的算术替代乘累加操作。核心困难在于训练离散权重的同时仍累积有意义的更新，因此一种常见解决方案是在梯度累积时保留全精度潜在权重，而在传播时使用二值值 [80]。其二值化既可以确定性地通过 sign 函数实现：
$$q = \mathrm{sign}(x) = \begin{cases} +1 & \text{if } x \geq 0, \\ -1 & \text{otherwise,} \end{cases} \tag{9}$$
或者随机化实现为
$$q = \begin{cases} +1 & \text{以概率 } \sigma(x), \\ -1 & \text{以概率 } 1 - \sigma(x), \end{cases} \tag{10}$$
其中 $\sigma(x)$ 表示 hard sigmoid 函数 [80]。相关二值架构进一步二值化层输入并引入缩放因子近似，表明激进的二值化可以带来大量内存和卷积成本节省 [82]。后续工作量化梯度、直接以二值形式存储激活，并分析梯度方差如何影响全量化 1-bit 训练 [83]–[85]。

> A parallel line uses 1-bit quantization for communication-efficient distributed optimization rather than full binary network training. Error feedback preserves residual information lost at each compression step and can make compressed training approach full-precision SGD behavior [16], [18]. Later methods extend this principle to adaptive optimizers and large-batch training through staged strategies, frozen or partially frozen preconditioners, compressed momentum updates, and sign-based communication frameworks for practical distributed settings [86]–[90]. Recent theory also analyzes sign-based nonconvex acceleration under weaker smoothness assumptions and compressed distributed protocols [109].

一条平行研究路线将 1-bit 量化用于通信高效的分布式优化，而不是完整的二值网络训练。误差反馈保留每个压缩步骤中丢失的残差信息，可使压缩训练接近全精度 SGD 的行为 [16], [18]。后续方法通过分阶段策略、冻结或部分冻结的预条件器、压缩动量更新，以及面向实际分布式设置的基于符号的通信框架，将该原理扩展到自适应优化器和大批量训练 [86]–[90]。近期理论还在更弱的平滑性假设和压缩分布式协议下分析基于符号的非凸加速 [109]。

> It is therefore useful to distinguish binary network training from 1-bit communication. The former changes the representational capacity of the model, whereas the latter primarily compresses exchanged optimization signals. Both mark the efficiency frontier, but they require hidden high-precision paths, residual compensation, staged optimization, or selective exceptions to protect optimization-critical information.

因此，有必要区分二值网络训练与 1-bit 通信。前者改变模型的表示能力，而后者主要压缩交换的优化信号。两者都标志着效率前沿，但它们需要隐藏的高精度路径、残差补偿、分阶段优化或选择性例外，以保护对优化至关重要的信息。

### IV. LOW-PRECISION FLOATING-POINT TRAINING
4. 低精度浮点数训练

In this section, we present low-precision training techniques based on floating-point quantization. Unlike integer quantization, converting a high-precision floating-point number to a lower-precision one involves a different process. Specifically, for converting a high-precision floating-point value $(EeMm)$ to a lower-precision representation $(Ee'Mm')$, we begin by copying the lower $e'$ exponent bits from the source to the target. The mantissa is then truncated to $m'$ bits by rounding to the nearest value. To better preserve information during quantization, a scaling factor $\Delta$ is typically applied to the source value prior to conversion. If an overflow occurs, the result is clipped directly to the maximum or minimum representable value. In the case of underflow, the value is divided by the smallest subnormal number in the low-precision format, rounded to the nearest integer, and then multiplied back by the same smallest subnormal number. Unlike binarized training, low-precision floating-point training does not require specialized backward propagation techniques. Instead, it simply mirrors the process used in full-precision training, with the key difference being the reduced numerical precision.

在本节中，我们介绍了基于浮点量化的低精度训练技术。与整数量化不同，将高精度浮点数转换为低精度浮点数的过程有所不同。具体而言，要将高精度浮点值 $(EeMm)$ 转换为低精度表示 $(Ee'Mm')$，我们首先将源值的低 $e'$ 指数位复制到目标值。然后，通过四舍五入到最接近的值，将尾数截断为$m'$位。为了在量化过程中更好地保留信息，通常在转换前对源值应用一个缩放因子$\Delta$。如果发生上溢，结果将直接被限制为可表示的最大值或最小值。在下溢的情况下，将值除以低精度格式中的最小次正规数，四舍五入到最接近的整数，然后再乘以相同的最大次正规数。与二值化训练不同，低精度浮点训练不需要专门的反向传播技术。相反，它只是模仿全精度训练中的过程，关键区别在于数值精度的降低。

> Following the order from higher to lower precision, we begin with widely used 16-bit floating-point training techniques and then turn to emerging 8-bit and 4-bit approaches. Representative methods are summarized in Table IV.

按照精度从高到低的顺序，我们先介绍广泛应用的 16 位浮点训练技术，然后介绍新出现的 8 位和 4 位方法。代表性方法总结在表 IV 中。

**TABLE IV REPRESENTATIVE FLOATING-POINT TRAINING METHODS.**
表4：代表性的浮点数训练方法

| Paper                    | Family       | Model               | Metrics          | Weights  | Activations | Gradients | Optim. | Comm. | Grouping     |
| ------------------------ | ------------ | ------------------- | ---------------- | -------- | ----------- | --------- | ------ | ----- | ------------ |
| Micikevicius et al. [10] | FP           | CNN/RNN/GAN         | Acc/BLEU/PPL     | FP16     | FP16        | FP16      | -      | -     | -            |
| Kalamkar et al. [11]     | FP           | CNN/RNN/GAN/RecSys  | Acc/WER/PPL/AUC  | BF16     | BF16        | BF16      | -      | -     | -            |
| Wang et al. [110]        | FP           | CNN                 | Acc              | FP8      | FP8         | FP8       | -      | -     | -            |
| Mellempudi et al. [111]  | FP           | CNN/RNN/Transformer | Acc/BLEU         | FP8      | FP8         | FP8       | -      | -     | -            |
| HFP8 [112]               | FP           | CNN/RNN/Transformer | Acc/mAP/BLEU/WER | FP8      | FP8         | FP8       | -      | -     | -            |
| DeepSeek-V3 [3]          | FP           | LLM                 | Acc/PPL          | FP8      | FP8         | FP8       | BF16   | FP8   | block/tile   |
| HBFP [113]               | FP           | CNN/RNN/Transformer | Acc/BLEU/PPL     | BFP      | BFP         | -         | -      | -     | block        |
| Zhao et al. [114]        | FP           | CNN                 | Acc              | FP16     | FP16        | FP16      | -      | -     | layer        |
| Chmiel et al. [115]      | FP           | CNN                 | Acc              | -        | -           | FP6       | -      | -     | -            |
| Noune et al. [116]       | FP           | CNN/Transformer     | Acc/BLEU         | FP8      | FP8         | FP8       | -      | -     | -            |
| Micikevicius et al. [12] | FP           | CNN/RNN/LLM         | Acc/PPL          | FP8      | FP8         | FP8       | -      | -     | tensor       |
| S2FP8 [117]              | FP           | CNN/Transformer     | Acc/BLEU         | FP8      | FP8         | FP8       | -      | -     | -            |
| Blake et al. [118]       | FP           | LLM                 | Acc/PPL          | FP16     | FP16        | FP16      | -      | -     | -            |
| Perez et al. [119]       | FP           | LLM                 | Acc/PPL          | FP8      | FP8         | FP8       | -      | -     | tensor       |
| Scalify [120]            | FP           | LLM                 | PPL              | FP8      | FP8         | FP8       | FP16   | -     | -            |
| Luo et al. [15]          | FP           | CNN/LLM             | Acc/PPL          | HiFloat8 | HiFloat8    | HiFloat8  | -      | -     | tensor       |
| GradScale [121]          | FP           | CNN/RNN/Transformer | Acc/BLEU/PPL/WER | FP4      | FP4/INT4    | FP4       | -      | -     | layer        |
| Wang et al. [122]        | FP           | LLM                 | PPL              | FP4      | FP4         | FP4       | -      | -     | vector       |
| Zhou et al. [123]        | FP           | LLM                 | Acc/PPL          | FP4      | FP4         | FP4       | -      | -     | block        |
| FP8-LM [13]              | Optim. Comp. | LLM                 | Acc/PPL          | FP8      | FP8         | FP8       | FP8/16 | FP8   | tensor       |
| Fishman et al. [124]     | Optim. Comp. | LLM                 | Acc/PPL          | FP8      | FP8         | FP8       | FP8    | -     | -            |
| COAT [125]               | Act. Comp.   | LLM/VLM             | Acc/PPL          | -        | FP8         | -         | FP8    | -     | tensor/group |
| APS [126]                | Comm. Comp.  | CNN/RNN/Transformer | Acc              | -        | -           | -         | -      | FP8   | -            |

> Compared with integer training, floating-point methods are driven more directly by range management. As precision drops from 16-bit to 8-bit and 4-bit, progress depends less on the nominal format alone than on how scaling, accumulation, and selective high-precision exceptions are coordinated.

与整数训练相比，浮点方法更直接地受范围管理的影响。随着精度从16位下降到8位和4位，进展更多地取决于如何协调缩放、累加和选择性的高精度异常处理，而不仅仅是名义上的格式。

#### A. 16-Bit Floating-Point Training
A. 16 位浮点数训练

> The adoption of 16-bit floating-point formats for deep learning training has gained widespread popularity, driven by their computational efficiency and memory savings. Modern deep learning frameworks support these formats extensively, with FP16 and BF16 emerging as the most prominent choices.

深度学习训练中采用的 16 位浮点格式因其计算效率高且节省内存而广受欢迎。现代深度学习框架广泛支持这些格式，其中FP16和BF16成为最受欢迎的选择。

> Early work by Micikevicius *et al.* [10] established the standard mixed-precision FP16 recipe, which keeps FP32 master weights, applies loss scaling to avoid gradient underflow, and uses higher-precision accumulation for partial products. This combination made FP16 training practical without sacrificing FP32-level accuracy. Follow-up work refined this basic recipe through dynamic gradient scaling, graph-level placement to reduce casting overhead, and BF16 as a more stable 16-bit alternative because it preserves the dynamic range of FP32 [11], [114], [127].

Micikevicius等人[10]的早期工作确立了标准的混合精度FP16方案，该方案保留FP32主权重，应用损失缩放以避免梯度下溢，并对部分乘积使用更高精度的累加。这种组合使得FP16训练在不牺牲FP32级精度的前提下变得可行。后续工作通过动态梯度缩放、图级放置以减少转换开销，以及使用BF16作为更稳定的16位替代方案（因为它保留了FP32的动态范围）[11]、[114]、[127]，对这一基本方案进行了改进。

> As a result, BF16 has gradually replaced FP16 as the default format for 16-bit training. Nevertheless, with the advancement of modern GPUs, researchers are now exploring even more efficient training methods that leverage floating-point formats with lower precisions.

因此，BF16已逐渐取代FP16，成为16位训练的默认格式。然而，随着现代GPU的进步，研究人员现在正在探索更高效的训练方法，这些方法利用了精度更低的浮点格式。

#### B. Sub-8-Bit Floating-Point Training
B. 亚 8 位的浮点数训练

> **Overall design.** Early FP8 studies showed that directly lowering precision causes substantial degradation because forwardand backward passes often require different numerical trade-offs. A representative solution is the hybrid-format design of HFP8, which uses E4M3 in the forward pass and E5M2 in the backward pass [112]. In subsequent work broadened this direction through empirical format searches, stability analyses for large language models, communication-oriented FP8 schemes, and hardware support for exact or efficient low-bit accumulation [15], [116], [126], [128]–[130].

**总体设计。** 早期关于FP8的研究表明，直接降低精度会导致性能大幅下降，因为前向和反向传递通常需要不同的数值权衡。一种具有代表性的解决方案是HFP8的混合格式设计，该设计在前向传播中使用E4M3，在反向传播中使用E5M2[112]。在后续工作中，通过经验性格式搜索、面向大型语言模型的稳定性分析、面向通信的FP8方案以及精确或高效低位累加的硬件支持，这一方向得到了拓展[15]、[116]、[126]、[128]–[130]。

> As precision moved further down to FP4, the literature increasingly relied on explicit compensation mechanisms rather than the nominal format alone. Representative examples include specialized rounding and phase-splitting schemes, differentiable estimators with outlier compensation, and mixed-precision recipes that reserve FP8 for the most sensitive transformer components [121]–[123]. At scale, this culminates in system-level FP8 training recipes such as Micikevicius et al. [12], FP8-LM [13], and DeepSeek-V3 [3], which show that sub-16-bit floating-point training can work in large models when scaling, caching, communication, and selective high-precision exceptions are co-designed.

随着精度进一步下探到 FP4，文献越来越依赖显式补偿机制，而不是仅依赖名义格式。代表性例子包括专门的舍入与相位拆分方案、带离群值补偿的可微估计器，以及将 FP8 保留给最敏感 Transformer 组件的混合精度配方 [121]–[123]。在大规模场景下，这最终体现为系统级 FP8 训练配方，例如 Micikevicius et al. [12]、FP8-LM [13] 和 DeepSeek-V3 [3]；这些工作表明，当缩放、缓存、通信和选择性高精度例外被协同设计时，亚 16-bit 浮点训练可以在大模型中奏效。

> **Value scaling.** The DeepSeek-V3 example above reflects a broader pattern in low-precision floating-point training. Once precision drops to FP8 or FP4, successful recipes depend critically on how values are scaled before quantization. Earlier studies therefore devoted substantial effort to designing scaling strategies that balance dynamic range against effective resolution. Figure 7 summarizes the core trade-off behind this line of work. With one shared low-precision scale, covering an outlier wastes resolution on the bulk of the tensor, whereas fitting the bulk clips the outlier. Much of the subsequent literature can be viewed as different ways of relaxing this trade-off through finer-grained scaling or explicit outlier handling.

**数值缩放。** 上文的 DeepSeek-V3 例子反映了低精度浮点训练中的一个更广泛模式。一旦精度降到 FP8 或 FP4，成功的配方就关键取决于量化前如何对数值进行缩放。因此，早期研究投入了大量精力来设计缩放策略，以在动态范围与有效分辨率之间取得平衡。图 7 总结了这一研究方向背后的核心权衡。使用一个共享的低精度缩放时，覆盖一个离群值会把分辨率浪费在张量的主体上，而拟合主体则会裁剪离群值。后续文献的很大一部分都可以被视为通过更细粒度缩放或显式离群值处理来放宽这一权衡的不同方式。

> Against this backdrop, existing methods differ mainly in how broadly the scale is shared, how dynamically it is updated,and whether outliers are handled implicitly or explicitly. Early work mainly focused on loss or gradient scaling, either by adapting the update frequency of a global scale or by learning per-layer gradient scales during training [111], [121]. Later methods shifted toward more automated and finer-grained scale control, including tensor-wise rescaling, format search for gradient scaling, initialization-based unit scaling, global coordination across distributed GPUs, dynamic per-tensor scaling for LLMs, and explicit scale propagation through computational graphs [13], [115], [117]–[120].

在这一背景下，现有方法的主要差异在于：缩放共享的范围有多广、缩放更新有多动态，以及离群值是隐式处理还是显式处理。早期工作主要关注损失缩放或梯度缩放，要么调整全局缩放的更新频率，要么在训练中学习逐层梯度缩放 [111], [121]。后来的方法转向更自动化、更细粒度的缩放控制，包括逐张量重缩放、面向梯度缩放的格式搜索、基于初始化的单位缩放、跨分布式 GPU 的全局协调、面向 LLM 的动态逐张量缩放，以及通过计算图显式传播缩放 [13], [115], [117]–[120]。

> **Result accumulation.** Another recurring issue is that low-precision inputs do not automatically imply low-precision-safe accumulation. Representative work therefore studies how to preserve gradient fidelity through chunk-based accumulation, stochastic rounding, reduced-precision master weights, statistical analyses of the precision needed for long accumulations, and dedicated FP8 MAC designs [110], [111], [131], [132]. The shared lesson is that accumulation precision often becomes the real bottleneck once input formats are pushed to FP8 or FP4.

**结果累加。** 另一个反复出现的问题是，低精度输入并不自动意味着低精度安全的累加。因此，代表性工作研究了如何通过分块累加、随机舍入、降低精度的主权重、对长累加所需精度的统计分析，以及专用 FP8 MAC 设计来保持梯度保真度 [110], [111], [131], [132]。共同教训是，一旦输入格式被推向 FP8 或 FP4，累加精度往往成为真正的瓶颈。

> **Optimizer states.** Compared with activations and weights, optimizer states were incorporated later into floating-point compression recipes. Initial efforts showed that mixed FP8/FP16 optimizer designs can substantially reduce memory while preserving stability [13], [124]. More recent work argues that naive FP8 state quantization under-utilizes the available range, motivating co-designed solutions that expand optimizer-state ranges before quantization and jointly optimize state and activation compression granularity [125].

**优化器状态。** 与激活和权重相比，优化器状态较晚才被纳入浮点压缩配方。早期努力表明，FP8/FP16 混合优化器设计可以在保持稳定性的同时大幅减少内存 [13], [124]。更近期的工作认为，朴素的 FP8 状态量化未充分利用可用范围，这促使了协同设计的解决方案：在量化前扩展优化器状态范围，并联合优化状态与激活压缩粒度 [125]。

> **Block floating-point.** Besides standard low-bit floating point, block floating point (BFP) offers an alternative that shares exponents across blocks while retaining much of floating point's dynamic-range advantage. Representative work includes HBFP, which uses BFP for dot products while keeping other operations in standard floating point, and later studies showing that relatively short mantissas can still recover FP32-level accuracy when the format is used consistently [113], [133].

**块浮点。** 除标准低比特浮点外，块浮点（block floating point, BFP）提供了一种替代方案：它在块之间共享指数，同时保留浮点的大部分动态范围优势。代表性工作包括 HBFP，它对点积使用 BFP，而其他操作仍保持标准浮点；后续研究表明，当该格式被一致使用时，相对较短的尾数仍可恢复 FP32 级精度 [113], [133]。

> Overall, sub-8-bit floating-point training has evolved from format exploration to full-stack co-design. The frontier is no longer whether FP8 or FP4 arithmetic can be used at all, but how much of the pipeline can be pushed down while retaining fine-grained scaling, protected states, and efficient kernels.

总体而言，亚 8-bit 浮点训练已从格式探索演进为全栈协同设计。前沿问题不再在于 FP8 或 FP4 算术究竟能否使用，而在于在保留细粒度缩放、受保护状态和高效 kernel 的前提下，流水线中有多少部分可以被下推。

### V. CUSTOM NUMERICAL FORMATS
5. 定制数值格式

> Besides commonly used fixed-point and floating-point representations, some works propose customized numerical formats for low-precision training. It is important to note that certain customized formats, such as NormalFloat [139], are specifically designed for pretrained fixed parameters, which only participate in the forward inference stage during training. As such, we exclude these works from consideration, as they do not directly contribute to low-precision training. Although the encodings differ, most of these formats explore the same design space by determining how much exponent information should be shared, where scaling should be attached, and how hardware simplicity should be traded against adaptability to nonuniform tensor statistics. Representative methods are summarized in Table V.

除了常用的定点和浮点表示之外，一些工作为低精度训练提出了定制数值格式。需要指出的是，某些定制格式，例如 NormalFloat [139]，是专门为预训练的固定参数设计的，这些参数在训练期间只参与前向推理阶段。因此，我们将这些工作排除在考虑之外，因为它们并不直接贡献于低精度训练。尽管编码方式不同，这些格式大多探索相同的设计空间：决定应共享多少指数信息、缩放应附加在何处，以及硬件简单性应如何与对非均匀张量统计的适应性进行权衡。代表性方法总结于表 V。

**TABLE V REPRESENTATIVE CUSTOM-FORMAT TRAINING METHODS.**

表5：代表性的定制数值格式训练方法

| Paper               | Family | Model   | Metrics    | Weights    | Activations | Gradients  | Optim. | Comm. | Grouping |
| ------------------- | ------ | ------- | ---------- | ---------- | ----------- | ---------- | ------ | ----- | -------- |
| Lu et al. [134]     | Custom | DNN     | Acc/PPL    | posit(8,1) | posit(8,1)  | posit(8,1) | -      | -     | tensor   |
| FloatSD [135]       | Custom | CNN     | Acc        | FloatSD    | FP8         | FP8        | -      | -     | -        |
| Flexpoint [136]     | Custom | CNN/GAN | Acc/FID    | flex16+5   | flex16+5    | flex16+5   | -      | -     | tensor   |
| MLS [137]           | Custom | CNN     | Acc/Energy | MLS(2,1)   | MLS(2,1)    | MLS(2,1)   | -      | -     | group    |
| Rouhani et al. [21] | Custom | LLM     | Acc/PPL    | MXFP6      | MXFP6       | MXFP6      | -      | -     | block    |
| Tseng et al. [22]   | Custom | LLM     | PPL        | MXFP4      | MXFP4       | MXFP4      | -      | -     | block    |
| Chen et al. [138]   | Custom | ViT     | Acc        | MXFP4      | MXFP4       | MXFP4      | -      | -     | block    |

> Custom numerical formats can largely be understood as alternative operating points between fixed-point and floating-point design. Posit reallocates bits dynamically among sign, regime, exponent, and fraction fields to improve dynamic range and accuracy under a fixed bit budget [134], [140], [141]. Flexpoint instead shares a dynamically adjusted exponent across each tensor, preserving much of fixed-point efficiency while adapting to changing ranges [136]. FloatSD modifies the value representation itself through signed-digit encoding to simplify multiply-heavy computation, whereas MLS combines element-wise and group-wise scaling to balance representational flexibility with efficient low-overhead accumulation [135], [137]. More recent microscaling methods push this idea further by assigning shared scaling factors to small blocks rather than whole tensors, which better matches local value distributions and has enabled near-lossless FP4-style training when paired with suitable rounding, transforms, and stabilization strategies [21], [22], [138], [142].

定制数值格式在很大程度上可以被理解为定点与浮点设计之间的替代工作点。Posit 在符号、regime、指数和小数字段之间动态重新分配比特，以在固定比特预算下改善动态范围和精度 [134], [140], [141]。Flexpoint 则在每个张量上共享一个动态调整的指数，在适应变化范围的同时保留定点的大部分效率 [136]。FloatSD 通过有符号数字编码修改数值表示本身，以简化乘法密集型计算；而 MLS 结合逐元素和逐组缩放，在表示灵活性与高效低开销累加之间取得平衡 [135], [137]。更近期的 microscaling 方法通过将共享缩放因子分配给小块而非整个张量，进一步推进了这一思路；这更好地匹配局部数值分布，并且在与合适的舍入、变换和稳定化策略配合时，已使近乎无损的 FP4 风格训练成为可能 [21], [22], [138], [142]。

> Overall, custom formats are best viewed as targeted operating points between fixed-point and floating-point extremes rather than a disconnected set of tricks. Their strongest results appear when the encoding is paired with matching scaling rules and hardware or dataflow assumptions, as illustrated most clearly by recent microscaling-based FP4 training.

总体而言，定制格式最好被视为定点与浮点两个极端之间有针对性选择的工作点，而不是一组互不相关的技巧。当编码与匹配的缩放规则以及硬件或数据流假设相结合时，它们会出现最强的结果；近期的基于 microscaling 的 FP4 训练最清楚地说明了这一点。

### VI. CROSS-CUTTING PERSPECTIVES AND INSIGHTS
VI. 跨切面视角与洞见

> After reviewing low-precision training methods by numerical format, we revisit the literature from two complementary cross-cutting perspectives. We first summarize the shared numerical bottlenecks that recur across different format families, and then discuss how these bottlenecks relate to robustness and model reliability in practical LLM pipelines.

在按数值格式回顾低精度训练方法之后，我们从两个互补的跨切面视角重新审视文献。我们首先总结在不同格式家族中反复出现的共享数值瓶颈，然后讨论这些瓶颈与实际 LLM 流水线中的鲁棒性和模型可靠性之间的关系。

#### A. A Problem-Centric View Across Formats
A. 跨格式的以问题为中心的视角

> The format-driven taxonomy is useful for locating methods by representation and hardware affinity. Yet many methods using different formats address the same numerical bottlenecks. A complementary problem-centric view therefore helps reveal common structure across fixed-point, integer, floating-point, and customized formats. In most cases, gains do not come from a datatype change alone, but from coordinating range management, update-fidelity protection, precision allocation, and system/dataflow co-design. This perspective explains why methods built on different encodings often converge to similar design choices.


按格式驱动的分类法有助于根据表示和硬件亲和性定位方法。然而，许多使用不同格式的方法处理的是相同的数值瓶颈。因此，一个互补的、以问题为中心的视角有助于揭示定点、整数、浮点和定制格式之间的共同结构。在大多数情况下，收益并非仅来自数据类型改变，而是来自协调范围管理、更新保真度保护、精度分配，以及系统/数据流协同设计。这一视角解释了为什么建立在不同编码之上的方法常常收敛到相似的设计选择。

> Figure 8 summarizes the recurring issues shared across the literature and the representative remedies developed for them. One branch concerns *dynamic range mismatch and outlier handling*, where a few large activations, tiny gradients, or block-wise distribution shifts can induce overflow, underflow, or excessive clipping after precision reduction. A second branch concerns *accumulation and state fidelity*, since repeated rounding may erase small but important updates or distort optimizer statistics even when forward values remain representable. A third branch captures *precision allocation*, reflecting the fact that layers, operators, and training stages exhibit markedly different sensitivity to low precision. A fourth branch concerns *execution and communication*, because arithmetic compression alone brings limited benefit when cast overhead, activation storage, or distributed synchronization still dominate runtime and memory.

图 8 总结了文献中反复出现的共性问题，以及为这些问题发展出的代表性补救措施。一个分支涉及*动态范围不匹配与离群值处理*：在精度降低后，少数大激活、微小梯度或块级分布偏移可能引发 overflow、underflow 或过度裁剪。第二个分支涉及*累加与状态保真度*：即使前向数值仍然可表示，重复舍入也可能抹去微小但重要的更新，或扭曲优化器统计量。第三个分支刻画*精度分配*，反映了层、算子和训练阶段对低精度的敏感性存在显著差异这一事实。第四个分支涉及*执行与通信*：当类型转换开销、激活存储或分布式同步仍然主导运行时和内存时，仅靠算术压缩带来的收益有限。

> These issues are tightly coupled. Better scaling reduces accumulator pressure, protected updates make aggressive precision schedules more viable, and system support determines whether fine-grained scaling or selective high-precision exceptions remain affordable in practice. This interdependence explains why methods from different format families often arrive at analogous solutions.

这些问题紧密耦合。更好的缩放可降低累加器压力，受保护的更新使激进的精度调度更可行，而系统支持则决定细粒度缩放或选择性高精度例外在实践中是否仍然可负担。这种相互依赖性解释了为什么来自不同格式家族的方法常常得出类似解决方案。

> The practical implication is that moving from 16-bit training to 8-bit or 4-bit training usually requires simultaneous progress along several branches in Figure 8. FP16/BF16 training became robust only after range management and update protection were established. Recent FP8, FP4, and MXFP4 results push further by combining finer-grained scaling, protected optimizer states or accumulators, selective high-precision exceptions, and cast-aware kernels or communication compression. New numerical formats therefore shift the operating point, whereas stability and efficiency still depend on how well these shared design levers are coordinated. This trend suggests that future progress is likely to come less from a single universally optimal format than from better coordination between format choice, scaling granularity, optimizer design, and system support.

其实际含义是：从 16-bit 训练转向 8-bit 或 4-bit 训练，通常需要同时推进图 8 中的多个分支。FP16/BF16 训练只有在范围管理和更新保护建立之后才变得稳健。近期 FP8、FP4 和 MXFP4 的结果通过结合更细粒度缩放、受保护的优化器状态或累加器、选择性高精度例外，以及感知类型转换的 kernel 或通信压缩，进一步推进了这一方向。因此，新的数值格式改变的是工作点，而稳定性和效率仍取决于这些共享设计杠杆之间的协调程度。这一趋势表明，未来进展更可能来自格式选择、缩放粒度、优化器设计与系统支持之间更好的协调，而不是来自某个单一且普遍最优的格式。

A comparable optimization paradigm extends to broader LLM-powered applications. Because many VLMs inherit the underlying transformer backbone and distributed training infrastructure, the previously identified precision strategies remain highly relevant in multimodal contexts. For instance, Wortsman *et al.* [58] stabilize large-scale VLM training by keeping sensitive updates in 16-bit while quantizing the forward pass and input gradients to 8-bit integers, reflecting the same update-fidelity principle used in LLM training. Meanwhile, MM1 [143] shows that multimodal quality is especially sensitive to factors such as the image encoder, image resolution, and image token count, which suggests that these levers should be applied in a component-aware rather than uniform way. Low-precision recipes are therefore not confined to text-only LLMs, but their extension to VLMs and related empowered applications requires modality-aware precision allocation and evaluation.

一种可比的优化范式还扩展到更广泛的由 LLM 驱动的应用中。由于许多 VLM 继承了底层的 Transformer 骨干和分布式训练基础设施，前面识别出的精度策略在多模态语境中仍然高度相关。例如，Wortsman et al. [58] 通过将敏感更新保持在 16-bit，同时将前向传播和输入梯度量化为 8-bit 整数，来稳定大规模 VLM 训练；这反映了 LLM 训练中使用的同一更新保真度原则。与此同时，MM1 [143] 表明，多模态质量对图像编码器、图像分辨率和图像 token 数等因素尤其敏感；这提示这些杠杆应以组件感知而非统一的方式应用。因此，低精度配方并不局限于纯文本 LLM，但将其扩展到 VLM 及相关赋能应用，需要模态感知的精度分配与评估。

#### B. Performance Trade-offs Across Families
B. 不同家族之间的性能权衡

> Directly comparing the empirical results of published low-precision training methods is confounded by heavily misaligned experimental setups across the literature, encompassing disparate models, datasets, hardware platforms, and stabilization recipes. Because quantitative metrics cannot be strictly aligned, we first synthesize existing results into a coarse-grained categorical comparison that captures the typical operating region of each method family. To complement this broad synthesis with a more fine-grained analysis, we subsequently conduct a controlled benchmark under a strictly unified setup.

直接比较已发表低精度训练方法的经验结果，会受到文献中严重不一致的实验设置干扰，这些设置涵盖不同的模型、数据集、硬件平台和稳定化配方。由于定量指标无法严格对齐，我们首先将现有结果综合为一个粗粒度的类别比较，以刻画每个方法家族的典型运行区域。为了用更细粒度的分析补充这一宽泛综合，我们随后在严格统一的设置下进行受控基准测试。

> Table VI presents this qualitative synthesis. By abstracting away misaligned experimental details, we derive broad performance tiers rather than a potentially misleading direct ranking. This macroscopic view reveals a consistent paradigm. Integer and binary methods maximize compression along the primary training path. Reduced floating-point and custom formats offer the most robust balance between efficiency and numerical stability. Meanwhile, specialized techniques that compress optimizer states, activations, or communications serve as bottleneck-specific optimizations rather than complete alternatives to full low-precision numerical formats.

表 VI 给出了这一质性综合。通过抽象掉不一致的实验细节，我们得出宽泛的性能层级，而不是可能具有误导性的直接排名。这一宏观视角揭示了一致的范式。整数和二值方法在主训练路径上最大化压缩。低精度浮点和定制格式在效率与数值稳定性之间提供最稳健的平衡。与此同时，压缩优化器状态、激活或通信的专门技术，充当针对特定瓶颈的优化，而不是完整低精度数值格式的完全替代方案。

**TABLE VI FAMILY-LEVEL COMPARISON OF REPRESENTATIVE LOW-PRECISION TRAINING STRATEGIES. RELATIVE BENEFITS ARE DENOTED CATEGORICALLY AS H (HIGH), M (MEDIUM), AND L (LOW). RATINGS REFLECT THE TYPICAL DEGREE OF REDUCTION IN TRAINING MEMORY, THE IMPACT ON THE MAIN COMPUTE OR COMMUNICATION BOTTLENECKS, AND THE ABILITY TO REMAIN CLOSE TO HIGH-PRECISION BASELINES UNDER REPRESENTATIVE RECIPES; INTERVAL RATINGS INDICATE THE TYPICAL VARIANCE WITHIN A FAMILY.**

表 6：代表性低精度训练策略的家族级比较。相对优势以H（高）、M（中）和L（低）三个等级表示。评级反映了在代表性方案下训练内存减少的典型程度、对主要计算或通信瓶颈的影响，以及保持接近高精度基线的能力；区间评级表示家族内的典型差异。

| Family      | Representative formats / methods   | Typical target                             | Memory efficiency | Speed benefit | Accuracy retention |
| ----------- | ---------------------------------- | ------------------------------------------ | ----------------- | ------------- | ------------------ |
| FX          | fixed16, dynamic fixed-point       | weights, activations, gradients            | M                 | M             | M-H                |
| INT         | INT8, INT4                         | weights, activations, gradients            | H                 | M-H           | M                  |
| FP          | FP16, BF16, FP8, FP4               | weights, activations, gradients            | M-H               | M-H           | M-H                |
| Custom      | posit, Flexpoint, FloatSD, MLS, MX | custom low-precision tensors               | M                 | M-H           | M-H                |
| Binary      | 0/1, 1/-1                          | weights, activations, gradients            | H                 | H             | L                  |
| Opt. comp.  | 8-bit Optimizer, 4-bit Shampoo     | moments, momentum, preconditioners         | H                 | M             | H                  |
| Act. comp.  | ActNN, GACT, COAT                  | stored activations, backward signals       | H                 | M             | H                  |
| Comm. comp. | QSGD, ZeRO++, 1-bit Adam           | communicated gradients or optimizer states | L                 | H             | H                  |

> To ground the broad family-level tiers with a precise empirical comparison, Table VII reports a unified DistilBERT [144] fine-tuning benchmark on AG News [145] and IMDB [146]. Both tasks use a shared AdamW-based single-seed protocol, with AG News trained on a 50k-sample subset for 5 epochs and IMDB for 4 epochs. Native FP32, BF16, FP16, and FP8 are evaluated on an NVIDIA RTX PRO 6000 GPU, while simulated FP4 and INT8 are included only to assess accuracy degradation at extreme low precisions. The setup fixes the model, task family, and training protocol, but it intentionally remains much smaller than foundation-model pre-training or alignment workloads.

为了用精确的经验比较为宽泛的家族级层级提供依据，表 VII 报告了在 AG News [145] 和 IMDB [146] 上统一的 DistilBERT [144] 微调基准。两个任务都使用共享的基于 AdamW 的单种子协议，其中 AG News 在 50k 样本子集上训练 5 个 epoch，IMDB 训练 4 个 epoch。原生 FP32、BF16、FP16 和 FP8 在 NVIDIA RTX PRO 6000 GPU 上评估，而模拟的 FP4 和 INT8 仅用于评估在极低精度下的准确性下降情况。该设置固定了模型、任务类型和训练协议，但其规模有意保持远小于基础模型预训练或对齐工作负载。

**TABLE VII CONTROLLED BENCHMARKING OF DISTILBERT FINE-TUNING ON AG NEWS AND IMDB. EMPIRICAL THROUGHPUT AND PEAK MEMORY ARE REPORTED FOR NATIVE HARDWARE FORMATS, WHEREAS SIMULATED FP4 AND INT8 ARE INCLUDED SOLELY TO EVALUATE ACCURACY DEGRADATION AT EXTREME LOW PRECISIONS WITHOUT CORRESPONDING HARDWARE EFFICIENCY METRICS. HIGHER IS BETTER FOR ACCURACY AND SPEED, WHEREAS LOWER IS BETTER FOR MEMORY.**

表7：在农业新闻（AG NEWS）和互联网电影数据库（IMDB）上对DistilBERT微调进行受控基准测试。报告了原生硬件格式下的经验吞吐量和峰值内存，而模拟的FP4和INT8仅用于评估在极低精度下的准确性下降情况，不包含相应的硬件效率指标。对于准确性和速度而言，数值越高越好；而对于内存而言，数值越低越好。

| Recipe | Impl.  | AG News: Acc. (%) | AG News: Speed (data/s) | AG News: Memory (GB) | IMDB: Acc. (%) | IMDB: Speed (data/s) | IMDB: Memory (GB) |
| ------ | ------ | ----------------- | ----------------------- | -------------------- | -------------- | -------------------- | ----------------- |
| FP32   | Native | 93.45             | 1263.3                  | 3.28                 | 91.18          | 476.2                | 2.06              |
| BF16   | Native | 93.49             | 2944.8                  | 2.46                 | 91.47          | 1005.3               | 1.71              |
| FP16   | Native | 93.41             | 2998.0                  | 2.46                 | 91.50          | 1030.5               | 1.71              |
| FP8    | Native | 93.58             | 3205.0                  | 2.24                 | 91.38          | 928.7                | 1.58              |
| FP4    | Sim.   | 89.80             | –                       | –                    | 80.44          | –                    | –                 |
| INT8   | Sim.   | 91.36             | –                       | –                    | 89.19          | –                    | –                 |

（说明：原表为两级表头，"AG News" 与 "IMDB" 各跨三列，此处已按行列含义拆分为独立列；无合并单元格信息丢失。）

> Within this limited DistilBERT fine-tuning setting, BF16, FP16, and FP8 achieve accuracy close to FP32 on both AG News and IMDB, whereas INT8 and especially FP4 show larger degradation. These results suggest that sufficient numerical range remains important even in compact-model fine-tuning, while aggressive precision reduction requires stronger stabilization recipes before it can be generalized to larger or more demanding training regimes. The modest FP8 gains in throughput and memory also reflect practical overheads from higher-precision optimizer states, auxiliary tensors, casting, normalization, and memory movement.

在这一有限的 DistilBERT 微调设置中，BF16、FP16 和 FP8 在 AG News 与 IMDB 上都取得了接近 FP32 的准确度，而 INT8，尤其是 FP4，则表现出更大的退化。这些结果表明，即使在紧凑模型微调中，足够的数值范围仍然重要；而激进的精度降低需要更强的稳定化配方，之后才能推广到更大或更苛刻的训练范式。FP8 在吞吐和内存上的有限增益，也反映了来自更高精度优化器状态、辅助张量、类型转换、归一化和内存移动的实际开销。

> Importantly, this benchmark is a lightweight diagnostic, not a substitute for foundation-model-scale pre-training or instruction-tuning evaluation. Its scope is limited to a compact encoder, two text-classification datasets, one hardware platform, and simulated extreme-low-precision formats without corresponding efficiency measurements. It complements the survey-level synthesis by showing how representative formats behave under one controlled fine-tuning setup.

重要的是，这一基准只是一个轻量级诊断，不能替代基础模型规模的预训练或指令微调评估。其范围限于一个紧凑编码器、两个文本分类数据集、一个硬件平台，以及没有对应效率测量的模拟极端低精度格式。它通过展示代表性格式在一个受控微调设置下的表现，补充了综述层面的综合。

#### C. Robustness and Model Reliability
C. 鲁棒性与模型可靠性

> While efficiency metrics (*e.g.*, memory footprint, throughput, and accuracy) are critical, they insufficiently capture the reliability of low-precision recipes in modern foundation-model pipelines. Across representative low-precision papers, evaluation is still dominated by loss or perplexity, downstream task accuracy, memory, and throughput, leaving a much thinner evidence base on reasoning, alignment, and execution stability. Table VIII summarizes several robustness-related dimensions that can complement conventional efficiency-oriented evaluations.

尽管效率指标（例如内存占用、吞吐和准确度）至关重要，但它们不足以刻画低精度配方在现代基础模型流水线中的可靠性。在代表性的低精度论文中，评估仍以损失或困惑度、下游任务精度、内存和吞吐为主，而在推理、对齐和执行稳定性方面留下的证据基础要薄弱得多。表 VIII 总结了几个可与传统面向效率的评估形成补充的鲁棒性相关维度。

**TABLE VIII ROBUSTNESS-RELATED EVALUATION DIMENSIONS THAT ARE OFTEN UNDERREPRESENTED IN LOW-PRECISION TRAINING STUDIES.**

表8：在低精度训练研究中通常被忽视的鲁棒性相关评估维度

| Dimension             | Evaluation focus                                           | Low-precision concern                                    |
| --------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| Capability robustness | reasoning; math; coding; long-context tasks                | fragile capability loss hidden by average accuracy       |
| Alignment robustness  | refusal consistency; preference alignment; safety behavior | safety-relevant behavior shift despite stable perplexity |
| Tool-use reliability  | API selection; JSON validity; argument exactness           | local token errors breaking structured execution         |

> Recent results nevertheless point to concrete reliability risks rather than a purely hypothetical concern. DeepSeek-V3 shows that stable FP8 training still requires sensitive modules and update paths to remain in higher precision [3]. Beyond optimization instability, low-precision artifacts can disproportionately degrade complex cognitive tasks long before headline perplexity or general language quality collapses [147]. More broadly, reasoning robustness benchmarks show that LLM reasoning can be sensitive to instruction changes, numerical perturbations, and missing information, while low-bit mathematical-reasoning analyses further locate degradation in step-level reasoning failures [147], [148]. These observations suggest that aggregate loss or average accuracy can overestimate the true capability retained under aggressive precision reduction.

不过，近期结果指向的是具体的可靠性风险，而非纯属假设的担忧。DeepSeek-V3 表明，稳定的 FP8 训练仍然需要敏感模块和更新路径保持更高精度 [3]。除优化不稳定性之外，低精度伪影还可能在总体困惑度或一般语言质量崩塌之前，就过早地不成比例地损害复杂认知任务 [147]。更广泛地说，推理鲁棒性基准表明，LLM 推理可能对指令变化、数值扰动和缺失信息敏感，而低比特数学推理分析进一步将退化定位到步骤级推理失败 [147], [148]。这些观察表明，聚合损失或平均精度可能高估激进精度降低下保留的真实能力。

> A second critical concern is whether precision recipes validated during pre-training remain reliable during post-training alignment. Existing evidence is still limited but not absent. Frameworks like Dettmers *et al.* [139] and Peng *et al.* [13] demonstrate the feasibility of instruction tuning and RLHF on low-precision backbones, yet they do not provide broad stress tests of safety-sensitive behaviors. Recent trustworthiness and safety-focused evaluations of compressed or quantized LLMs further suggest that compression choices can alter safety, reliability, fairness, and human-evaluated behavior across benchmarks [149]–[151]. Low-precision feasibility during SFT, DPO, or RLHF should therefore not be conflated with verified alignment robustness [152].

第二个关键担忧是：在预训练期间验证过的精度配方，在后训练对齐期间是否仍然可靠。现有证据仍然有限，但并非不存在。Dettmers et al. [139] 和 Peng et al. [13] 等框架展示了在低精度骨干上进行指令微调和 RLHF 的可行性，但它们没有提供对安全敏感行为进行广泛的压力测试。最近对压缩或量化的LLM（大型语言模型）进行的可信度和安全性评估进一步表明，压缩选择可能会改变基准测试中的安全性、可靠性、公平性和人类评估行为[149]–[151]。因此，在SFT（安全强化训练）、DPO（对抗性训练）或RLHF（人类反馈强化学习）期间，低精度可行性不应与经过验证的对齐鲁棒性混为一谈[152]。

> Moreover, tool-augmented LLMs impose a zero-tolerance policy for localized token errors. As formalized by benchmarks like API-Bank [153] and ToolLLM [154], successful tool invocation relies on accurate API retrieval and exact JSON argument formatting. Yet tool-use proficiency is largely overlooked in low-precision training evaluations. While a minor quantization-induced deviation may be harmless in free-form text, it can irreparably corrupt a structured payload and crash an execution pipeline. This remains a clear gap between current low-precision evaluation practice and deployment-oriented reliability requirements.

此外，工具增强型 LLM 对局部 token 错误实行零容忍策略。正如 API-Bank [153] 和 ToolLLM [154] 等基准所形式化的那样，成功的工具调用依赖准确的 API 检索和精确的 JSON 参数格式。然而，工具使用能力在低精度训练评估中很大程度上被忽视了。虽然量化引起的微小偏差在自由文本中可能无害，但它可能不可修复地破坏结构化负载，并使执行流水线崩溃。这仍然是当前低精度评估实践与面向部署的可靠性要求之间的明显差距。

### VII. QUANTIZATION-AWARE TRAINING TECHNIQUES
7. 量化感知训练技术

> In addition to low-precision training, the deployment of LLMs with low precision during inference has also been extensively studied. While low-precision training aims to reduce the precision of both the forward and backward passes during the training process, low-precision inference focuses solely on reducing the precision of weights and activations during the forward pass. This typically involves the application of quantization techniques.

除低精度训练之外，在推理阶段以低精度部署 LLM 也已得到广泛研究。低精度训练旨在降低训练过程中前向和反向传播的精度，而低精度推理仅关注降低前向传播中权重和激活的精度。这通常涉及量化技术的应用。

> Works in this domain can be broadly divided into Post-Training Quantization (PTQ) and QAT. PTQ methods typically quantize a pre-trained model without further training and rely on heuristics or optimization strategies to adapt the model to lower precision. In contrast, QAT incorporates quantization into the training process, often via fake-quantization operators or learned quantization parameters, allowing the model to adapt to deployment-time low-precision arithmetic during optimization [29], [155], [156]. Although there is a large body of work on PTQ techniques for LLMs [157]–[164], these methods are beyond the scope of this survey, and thus will not be covered here. QAT methods share some similarities with low-precision training, so the remainder of this section briefly reviews representative QAT studies.

该领域的工作可大致分为训练后量化（Post-Training Quantization, PTQ）和 QAT。PTQ 方法通常对预训练模型进行量化而无需进一步训练，并依赖启发式方法或优化策略使模型适应较低精度。相比之下，QAT 将量化纳入训练过程，通常通过伪量化算子或可学习量化参数，使模型在优化过程中适应部署时的低精度算术 [29], [155], [156]。尽管已有大量关于 LLM 的 PTQ 技术工作 [157]–[164]，但这些方法超出本综述范围，因此不在此处涵盖。QAT 方法与低精度训练存在一些相似性，因此本节余下部分简要回顾代表性 QAT 研究。

> **Binary and ternary QAT.** Extreme low-bit QAT for LLMs is represented by the BitNet line of work. BitNet [165] established the feasibility of 1-bit Transformers by combining binary weights, 8-bit activations, and STE-based training while retaining higher-precision gradients. BitNet b1.58 [166] extended this idea from binary to ternary parameters through absmean quantization:
> $$W_q = \max\left(-1, \min\left(1, \mathrm{round}\left(\frac{W}{\gamma + \epsilon}\right)\right)\right), \qquad (11)$$
> where $\gamma = \frac{1}{nm}\sum_{ij} |W_{ij}|$ indicates absolute value of all elements in $w$. More recent work further improves stability through progressive schedules that transition from higher-precision pretraining to 1.58-bit quantization, reducing the disruption caused by immediate extreme quantization [167].

**二值与三值 QAT。** 面向 LLM 的极端低比特 QAT 以 BitNet 系列工作为代表。BitNet [165] 通过结合二值权重、8-bit 激活和基于 STE 的训练，同时保留较高精度梯度，确立了 1-bit Transformer 的可行性。BitNet b1.58 [166] 通过 absmean 量化，将这一思想从二值参数扩展到三值参数：
$$W_q = \max\left(-1, \min\left(1, \mathrm{round}\left(\frac{W}{\gamma + \epsilon}\right)\right)\right), \qquad (11)$$
其中 $\gamma = \dfrac{1}{nm}\sum_{ij} |W_{ij}|$表示 $w$ 中所有元素的绝对值。更近期的工作通过渐进式计划进一步提高稳定性：从较高精度预训练过渡到 1.58-bit 量化，从而减少立即进行极端量化造成的扰动 [167]。

> **QAT with KD.** Another line of work combines QAT with knowledge distillation so that a low-bit student can better match a stronger full-precision or pretrained teacher. Representative examples include data-free distillation for 4-bit LLaMA quantization and teacher-guided sub-4-bit training with quantization-aware clipping and asymmetric quantizers [168], [169].

结合知识蒸馏（KD）的 QAT。 另一条工作路线将 QAT 与知识蒸馏相结合，使低比特学生模型能更好地匹配更强的全精度教师或预训练教师。代表性例子包括面向 4-bit LLaMA 量化的无数据蒸馏，以及教师引导的、带量化感知裁剪和非对称量化器的亚 4-bit 训练 [168], [169]。

> **Other QAT methods.** Beyond these representative directions, recent work has focused on improving the efficiency and stability of QAT itself. This includes reducing QAT memory overhead through staged optimization of model and quantization parameters, improving 1-bit training with Hadamard normalization and more reliable gradient estimation, and explaining QAT instability through loss-landscape sharpness, which motivates feature perturbation as an implicit regularizer [170]–[172].

其他 QAT 方法。 除这些代表性方向外，近期工作还聚焦于提升 QAT 本身的效率与稳定性。这包括通过对模型和量化参数进行分阶段优化来降低 QAT 内存开销，通过 Hadamard 归一化和更可靠的梯度估计改进 1-bit 训练，以及通过损失景观锐度解释 QAT 不稳定性，进而推动将特征扰动作为隐式正则化器 [170]–[172]。

### VIII. SYSTEM SUPPORT FOR LOW-PRECISION TRAINING
8. 对低精度训练的系统支持

> Low-precision training techniques offer significant benefits for model training, primarily by reducing memory footprint, decreasing memory bandwidth requirements, and potentially accelerating computations on compatible hardware. However, effectively leveraging these advantages requires sophisticated system-level support. Software frameworks and specialized libraries play a pivotal role in managing the complexities of low-precision formats, such as ensuring numerical stability, performing efficient data type conversions, and optimizing hardware utilization. This section provides an overview of the software frameworks and libraries that offer essential system support for enabling and facilitating low-precision DNN training. Table IX provides a summary of introduced frameworks and libraries.

低精度训练技术为模型训练带来显著收益，主要通过降低内存占用、减少内存带宽需求，并可能在兼容硬件上加速计算。然而，要有效利用这些优势，需要复杂的系统级支持。软件框架和专用库在管理低精度格式的复杂性方面发挥关键作用，例如确保数值稳定性、执行高效数据类型转换，以及优化硬件利用率。本节概述为支持并促进低精度 DNN 训练提供必要系统支持的软件框架和库。表 IX 总结了所介绍的框架和库。

**TABLE IX SUMMARY OF SOFTWARE FRAMEWORKS AND LIBRARIES FOR LOW-PRECISION TRAINING SUPPORT**

表9：软件框架与库的低精度训练支持摘要

| Framework/Library  | Key Low-Precision Features                                         | Primary Focus / Notes                           |
| ------------------ | ------------------------------------------------------------------ | ----------------------------------------------- |
| PyTorch            | Native AMP, GradScaler                                             | General-purpose deep learning                   |
| TensorFlow         | Native Mixed Precision, Auto loss scaling                          | General-purpose deep learning                   |
| JAX                | Explicit precision control                                         | General-purpose deep learning                   |
| PaddlePaddle       | AMP with automatic operator casting (FP16 focus)                   | General-purpose deep learning                   |
| DeepSpeed          | Enhanced AMP, ZeRO integration, Exp. 4/8-bit QAT, 1-bit optimizers | Large-scale model training (extends PyTorch)    |
| Megatron-LM/Core   | Optimized kernels, FP8 support (Hopper), Parallelism APIs          | LLM training (PyTorch-based)                    |
| bitsandbytes       | 8-bit optimizers, 4/8-bit quantization functions                   | Lightweight CUDA wrappers, LLM memory reduction |
| TorchAO            | PyTorch-native float8/QAT/quantization workflows                   | Training-to-serving model optimization          |
| MS-AMP             | Automatic mixed precision with FP8 support                         | Large-scale mixed-precision training            |
| Colossal-AI        | Simplified AMP (FP16/BF16 planned), Exp. FP8 linear/communication  | Simplifying large model training                |
| Transformer Engine | FP8 Transformer layers and scaling utilities                       | Optimized FP8 Transformer kernels               |
| NVIDIA Apex        | Early AMP & distributed tools                                      | Historical PyTorch extension                    |

> **Mainstream frameworks.** Several widely adopted deep learning frameworks support low-precision training through built-in tools and abstractions. PyTorch [173], known for its flexible design, includes native Automatic Mixed Precision (AMP), which automatically casts operations between FP32 and lower-precision formats (typically FP16 or BF16). AMP handles gradient scaling internally to preserve numerical stability, requiring minimal user intervention. TensorFlow [19] provides similar mixed-precision capabilities, automatically applying loss scaling and optimization routines for efficient execution on accelerators like GPUs and TPUs. JAX [20], a high-performance numerical library, allows precise control over data types, enabling researchers to experiment with precision settings at the operation or module level. PaddlePaddle [174] integrates AMP functionality as well, enabling efficient FP16 computation while preserving critical operations in FP32 to maintain accuracy.

**主流框架。** 若干广泛采用的深度学习框架通过内置工具和抽象支持低精度训练。PyTorch [173] 以其灵活设计著称，包含原生自动混合精度（Automatic Mixed Precision, AMP），可自动在 FP32 与较低精度格式（通常为 FP16 或 BF16）之间转换操作。AMP 在内部处理梯度缩放以保持数值稳定性，几乎不需要用户干预。TensorFlow [19] 提供类似的混合精度能力，自动应用损失缩放和优化例程，以便在 GPU 和 TPU 等加速器上高效执行。JAX [20] 是一个高性能数值库，允许对数据类型进行精确控制，使研究者能够在算子或模块级别试验精度设置。PaddlePaddle [174] 也集成了 AMP 功能，在实现高效 FP16 计算的同时，将关键操作保留在 FP32 以保持准确率。

> **Frameworks for LLMs.** Training large-scale models, especially transformers, requires frameworks that blend low-precision arithmetic with memory and parallelization optimizations. DeepSpeed [175] extends PyTorch for efficient large-model training, combining memory-saving strategies like ZeRO [176] with optimized mixed-precision support. It also supports quantization-aware optimizers and low-precision (4-bit, 8-bit) training, including gradient compression for scalable distributed training. Megatron-LM, now formalized as Megatron-Core, is a modular PyTorch-based framework for LLM training. It incorporates tensor, pipeline, and sequence parallelism, with support for FP8 precision on hardware such as NVIDIA Hopper GPUs.

**面向 LLM 的框架。** 训练大规模模型，尤其是 Transformer，需要将低精度算术与内存和并行化优化相结合的框架。DeepSpeed [175] 扩展 PyTorch 以支持高效大模型训练，将 ZeRO [176] 等节省内存的策略与优化的混合精度支持相结合。它还支持量化感知优化器和低精度（4-bit、8-bit）训练，包括面向可扩展分布式训练的梯度压缩。Megatron-LM，现已被正式化为 Megatron-Core，是一个基于 PyTorch 的模块化 LLM 训练框架。它融合了张量并行、流水线并行和序列并行，并支持在 NVIDIA Hopper GPU 等硬件上使用 FP8 精度。

> **Specialized libraries and extensions.** A growing ecosystem of libraries offers targeted support for low-precision computation, quantized inference, and hardware acceleration. bitsandbytes provides memory-efficient 8-bit optimizers [14] and matrix multiplication kernels [177], supporting both inference and training. TorchAO [178] extends the PyTorch ecosystem with native float8 training, quantization-aware training, and low-bit quantization workflows, helping bridge research prototypes and deployment-oriented optimization. MS-AMP [13] is a Microsoft mixed-precision library that emphasizes automated FP8-enabled training workflows for large-scale models. Colossal-AI [179] simplifies the use of advanced training strategies, including AMP and experimental FP8 features, along with FP8-based communication compression for efficient distributed training. Transformer Engine focuses on FP8 transformer kernels and scaling utilities on recent NVIDIA GPUs, while Apex [180] mainly remains useful as a historical precursor to native PyTorch AMP.

**专用库与扩展。** 不断增长的库生态为低精度计算、量化推理和硬件加速提供有针对性的支持。bitsandbytes 提供内存高效的 8-bit 优化器 [14] 和矩阵乘法 kernel [177]，同时支持推理和训练。TorchAO [178] 以原生 float8 训练、量化感知训练和低比特量化工作流扩展 PyTorch 生态，帮助衔接研究原型与面向部署的优化。MS-AMP [13] 是 Microsoft 的混合精度库，强调面向大规模模型的自动化 FP8 训练工作流。Colossal-AI [179] 简化先进训练策略的使用，包括 AMP 和实验性 FP8 特性，以及面向高效分布式训练的基于 FP8 的通信压缩。Transformer Engine 聚焦于近期 NVIDIA GPU 上的 FP8 Transformer kernel 和缩放工具，而 Apex [180] 主要仍作为原生 PyTorch AMP 的历史前身而有用。

> **Hardware-platform portability.** The practical deployment of low-precision training also depends on whether the target accelerator exposes matching datatype, kernel, compiler, and communication support. Although many early large-scale recipes were developed in CUDA-centered environments, AMD GPUs and the ROCm ecosystem now provide an important non-NVIDIA training ecosystem. ROCm supports PyTorch-oriented training workflows on AMD Instinct accelerators, and ROCm's precision documentation reports matrix-core support for FP8 E4M3/E5M2 on CDNA3-class GPUs. ROCm TransformerEngine further provides transformer-oriented FP8 components and GEMM tuning paths for AMD platforms [181]. These capabilities make BF16-, FP16-, INT8-, and FP8-oriented recipes relevant beyond NVIDIA hardware. At the same time, portability is not automatic. Methods relying on CUDA-specific custom kernels, NVIDIA Transformer Engine APIs, native FP4/NVFP4 execution, or a particular Tensor Core dataflow may require ROCm-specific kernel implementations, format conversion, and renewed empirical validation. Thus, practical low-precision training should be treated as a hardware-software co-design problem rather than only a numerical-format choice.

**硬件平台可移植性。** 低精度训练的实际部署还取决于目标加速器是否提供匹配的数据类型、kernel、编译器和通信支持。尽管许多早期大规模配方是在以 CUDA 为中心的环境中开发的，但 AMD GPU 和 ROCm 生态现在提供了重要的非 NVIDIA 训练生态。ROCm 在 AMD Instinct 加速器上支持面向 PyTorch 的训练工作流，ROCm 的精度文档报告称，CDNA3 级 GPU 上的 matrix-core 支持 FP8 E4M3/E5M2。ROCm TransformerEngine 进一步为 AMD 平台提供面向 Transformer 的 FP8 组件和 GEMM 调优路径 [181]。这些能力使面向 BF16、FP16、INT8 和 FP8 的配方在 NVIDIA 硬件之外也具有相关性。同时，可移植性并非自动实现。依赖 CUDA 专用自定义 kernel、NVIDIA Transformer Engine API、原生 FP4/NVFP4 执行或特定 Tensor Core 数据流的方法，可能需要 ROCm 专用 kernel 实现、格式转换和重新进行经验验证。因此，实际低精度训练应被视为软硬件协同设计问题，而不仅是数值格式选择。

**IX. FUTURE DIRECTIONS**
9. 未来方向

> Despite impressive progress, low-precision training of foundation models still faces several open challenges. Addressing these issues is crucial for further scaling while preserving both performance and training stability. Below, we outline key challenges along with promising directions for future research.

尽管取得了显著进展，基础模型的低精度训练仍面临若干开放挑战。解决这些问题对于进一步扩展规模，同时保持性能和训练稳定性至关重要。下面，我们概述关键挑战以及有前景的未来研究方向。

> **Advanced quantization methods.** Linear quantization is widely used due to its simplicity and hardware compatibility but struggles to capture the diverse statistics of weights, activations, and gradients. Future work should explore non-linear methods like logarithmic or learned quantization, which offer better dynamic range and adaptability. These approaches are promising for low-precision training, especially when linear quantization falls short.

**先进量化方法。** 线性量化因其简单性和硬件兼容性而被广泛使用，但难以捕捉权重、激活和梯度的多样统计特性。未来工作应探索对数量化或可学习量化等非线性方法，它们提供更好的动态范围和适应性。这些方法对低精度训练很有前景，尤其在线性量化不足时。

> **Ultra low-precision training.** While 8-bit precision performs well, lower bit-widths (e.g., 4-bit or 2-bit) offer greater efficiency. Achieving competitive performance at such extremes requires deeper theoretical understanding, particularly of convergence, generalization, quantization noise, and gradient-spike control [182]. Strengthening these foundations will be key to making ultra low-precision training practical and scalable.

**超低精度训练。** 尽管 8-bit 精度表现良好，但更低比特宽度（例如 4-bit 或 2-bit）提供更高效率。在如此极端的精度下取得有竞争力的性能，需要对收敛、泛化、量化噪声和梯度尖峰控制有更深入的理论理解 [182]。夯实这些基础将是使超低精度训练实用且可扩展的关键。

> **Fine-grained scaling strategies.** Lower precision increases the prevalence of outliers in weight and activation distributions, harming stability and accuracy. Per-channel or per-token scaling helps but is often insufficient. More adaptive or learnable scaling methods can improve robustness but add memory overhead. A careful balance between granularity and efficiency is needed.

**细粒度缩放策略。** 更低精度会增加权重和激活分布中离群值的普遍性，损害稳定性和准确率。逐通道或逐 token 缩放有帮助，但往往不足。更具适应性或可学习的缩放方法可以提高鲁棒性，但会增加内存开销。需要在粒度与效率之间仔细平衡。

> **Optimizer state compression.** Optimizer states, often kept in high precision, are a major memory bottleneck, especially in large models, where they can exceed parameter size. Compressing or quantizing these states, particularly sensitive components like second-order statistics, is crucial. Research into compression techniques and optimizers inherently suited for low precision is a promising direction.

**优化器状态压缩。** 优化器状态通常以高精度保存，是主要的内存瓶颈，尤其在大模型中，其规模可能超过参数规模。压缩或量化这些状态，尤其是二阶统计量等敏感组件，至关重要。研究压缩技术以及天然适合低精度的优化器，是一个有前景的方向。

> **Unified training frameworks for low-precision training.** There is a lack of modular, scalable frameworks for full-stack low-precision training. This limits reproducibility and adoption. Future toolkits should be hardware-aware, support dynamic precision scheduling, flexible quantization, and enable deployment simulation.

**面向低精度训练的统一训练框架。** 目前缺乏面向全栈低精度训练的模块化、可扩展框架。这限制了可复现性和采用。未来工具包应具备硬件感知能力，支持动态精度调度、灵活量化，并支持部署模拟。

> **Standardized Benchmarks and Evaluation Protocols.** The field lacks consistent benchmarks, making cross-method comparison difficult. Standardized suites covering various models, datasets, and precision levels are needed to enable fair, reproducible evaluations and better understand trade-offs.

**标准化基准与评估协议。** 该领域缺乏一致的基准，使跨方法比较困难。需要覆盖各种模型、数据集和精度级别的标准化套件，以实现公平、可复现的评估，并更好地理解权衡。

> **Robustness- and safety-aware evaluation.** Existing studies mainly report training loss, downstream accuracy, memory, and throughput. As low-precision training is increasingly used in instruction tuning, preference alignment, and agentic workflows, future protocols should additionally measure reasoning retention, alignment retention, refusal consistency, tool-call validity, and multi-step tool-use stability. Without such evaluations, it is difficult to judge which low-precision recipes are sufficiently reliable for real deployments.

**面向鲁棒性与安全性的评估。** 现有研究主要报告训练损失、下游准确率、内存和吞吐。随着低精度训练越来越多地用于指令微调、偏好对齐和智能体工作流，未来协议还应测量推理保持度、对齐保持度、拒答一致性、工具调用有效性和多步工具使用稳定性。没有此类评估，就难以判断哪些低精度配方对于真实部署足够可靠。

> **Extending to broader architectures.** Low-precision training has mostly focused on LLMs, with other foundation models like VLMs, diffusion models, and speech transformers underexplored. These architectures may have different quantization behaviors, offering new challenges and opportunities.

**面向鲁棒性与安全性的评估。** 现有研究主要报告训练损失、下游准确率、内存和吞吐。随着低精度训练越来越多地用于指令微调、偏好对齐和智能体工作流，未来协议还应测量推理保持度、对齐保持度、拒答一致性、工具调用有效性和多步工具使用稳定性。没有此类评估，就难以判断哪些低精度配方对于真实部署足够可靠。

> **Integration with other efficient training paradigms.** Quantization is often studied in isolation, missing potential synergies with methods like pruning or low-rank approximation. Combining these can further reduce resource demands. Jointly optimizing such techniques could yield more efficient training without sacrificing performance.

**与其他高效训练范式的集成。** 量化常常被孤立研究，忽略了与剪枝或低秩近似等方法之间的潜在协同。将这些方法结合可进一步降低资源需求。联合优化此类技术，可能在不牺牲性能的情况下实现更高效的训练。

### X. CONCLUSION
10. 总结

> This survey provides an in-depth summarization of existing low-precision training works for LLMs. We begin with preliminaries about different numerical formats, followed by different low-precision components during training and the benefits of low-precision training. Then, categorized by different numerical formats, we introduce existing works with fixed-point and integer numbers, floating-point numbers, and customized formats. We further revisit the literature from cross-cutting perspectives, highlighting both shared numerical challenges and their implications for model reliability. Following this, we briefly introduce QAT approaches, which share some similarities with low-precision training methods to some extent. Lastly, we provide several potential future research directions.

本综述对面向 LLM 的现有低精度训练工作进行了深入总结。我们首先介绍不同数值格式的基础知识，然后讨论训练期间不同的低精度组件以及低精度训练的收益。随后，按不同数值格式分类，我们介绍使用定点与整数、浮点数以及定制格式的现有工作。我们进一步从跨切面视角重新审视文献，强调共享的数值挑战及其对模型可靠性的影响。接着，我们简要介绍 QAT 方法，它们在一定程度上与低精度训练方法具有一些相似性。最后，我们提供若干潜在未来研究方向。

> Overall, low-precision training has emerged as a critical technique for reducing the computational and memory costs of training LLMs while often preserving competitive performance under carefully designed recipes. As both hardware and algorithmic support continue to evolve, we anticipate low-precision training will become an integral part of mainstream LLM development. Future research may focus on advancing quantization techniques, improving training stability at ultra low precision, and developing unified frameworks that support diverse model architectures. Additionally, efforts toward standard benchmarks and integration with other efficient training paradigms will be crucial for broader adoption and fair evaluation. Beyond efficiency, the field also needs a clearer understanding of how low-precision training affects model reliability in safety-critical settings. We hope this survey serves as a valuable reference for researchers and practitioners working toward scalable and efficient training of next-generation LLMs.

总体而言，低精度训练已成为降低 LLM 训练计算和内存成本的关键技术，同时在精心设计的配方下通常能保持有竞争力的性能。随着硬件和算法支持持续演进，我们预计低精度训练将成为主流 LLM 开发中不可或缺的一部分。未来研究可能聚焦于推进量化技术、改善超低精度下的训练稳定性，以及开发支持多样模型架构的统一框架。此外，面向标准基准的努力以及与其他高效训练范式的集成，对于更广泛采用和公平评估至关重要。除效率之外，该领域还需要更清楚地理解低精度训练如何影响模型在安全关键场景中的可靠性。我们希望本综述能为致力于可扩展且高效训练下一代 LLM 的研究者和从业者提供有价值的参考。

## 术语表

| 缩写/术语      | 全称                                                   | 论文中出现位置                        | 通俗讲解                         | 严格定义                                                                    | 文中作用                         |
| -------------- | ------------------------------------------------------ | ------------------------------------- | -------------------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| LLM            | Large Language Model                                   | 摘要、§I [PDF p.1]                    | 大语言模型                       | 指大规模语言模型                                                            | 综述对象                         |
| FX             | Fixed-point                                            | 表 II、§III-A [PDF p.5]               | 定点数                           | 整数位与小数位固定；本文以 $\Delta$ 常数区分 fixed-point                    | 第一类数值格式                   |
| INT            | Integer quantization                                   | 表 III、§III-B [PDF p.6]              | 整数量化                         | 本文以 $\Delta$ 数据依赖区分 integer quantization                           | 第二类数值格式                   |
| FP             | Floating-point                                         | 表 IV、§IV [PDF p.9]                  | 浮点数                           | sign + exponent + mantissa；动态范围由 exponent 控制                        | 主流低精度格式                   |
| FP32           | 32-bit floating point (E8M23)                          | §II-A、脚注 [PDF p.4]                 | 单精度浮点                       | 8-bit exponent + 23-bit mantissa                                            | 高精度基线/master weights        |
| FP16           | 16-bit floating point (E5M10)                          | §II-A、§IV-A [PDF p.4] [PDF p.8]      | 半精度浮点                       | 5-bit exponent + 10-bit mantissa                                            | 16-bit 训练代表                  |
| BF16           | BFloat16 (E8M7)                                        | §II-A、§IV-A [PDF p.4] [PDF p.8]      | 保留 FP32 动态范围的 16-bit 格式 | 8-bit exponent + 7-bit mantissa                                             | 稳定 16-bit 替代                 |
| FP8            | 8-bit floating point                                   | 表 IV、§IV-B [PDF p.9]                | 8 位浮点                         | 文中提 E4M3/E5M2；不同硬件/方法可变体                                       | 亚 16-bit 训练核心               |
| FP4            | 4-bit floating point                                   | 表 IV、§IV-B [PDF p.9]                | 4 位浮点                         | 论文未给统一编码；p.28 提 Radix-4 FP4 (E3M0) 为实例                         | 极端低精度探索                   |
| QAT            | Quantization-Aware Training                            | §VII [PDF p.13]                       | 量化感知训练                     | 将量化纳入训练，常用 fake quantization 或学习量化参数，使模型适应部署低精度 | 与低精度训练相似但重点在前向模拟 |
| PTQ            | Post-Training Quantization                             | §VII [PDF p.13]                       | 训练后量化                       | 对预训练模型不再训练，依赖校准/启发式                                       | 被排除在综述范围外               |
| STE            | Straight-Through Estimator                             | §III、Appendix A [PDF p.4] [PDF p.21] | 直通估计器                       | 对不可微量化器，反向传播时近似梯度为恒等/直通                               | 1-bit/二值训练常用               |
| BFP            | Block Floating Point                                   | §IV-B [PDF p.10]                      | 块浮点                           | 块内共享 exponent，保留部分浮点动态范围                                     | 低比特点积替代                   |
| MX/MXFP        | Microscaling / MX floating point                       | §V、Appendix C [PDF p.10] [PDF p.30]  | 微缩放格式                       | 小块共享 scaling factor（常 E8M0）+ 低精度元素（FP8/FP6/FP4/INT8）          | 自定义格式代表                   |
| DDP            | Distributed Data Parallel                              | Appendix A [PDF p.26]                 | 分布式数据并行                   | 各节点处理数据子集并同步更新                                                | 通信压缩场景                     |
| FSDP/ShardedDP | Fully Sharded Data Parallel / Sharded Data Parallelism | Appendix A [PDF p.26]                 | 分片数据并行                     | 参数/梯度/优化器状态分片                                                    | 通信压缩与系统协同               |
| AMP            | Automatic Mixed Precision                              | §VIII、表 IX [PDF p.13] [PDF p.14]    | 自动混合精度                     | 框架自动在 FP32 与低精度间 cast，并处理 grad scaling                        | 系统支持                         |
| KD             | Knowledge Distillation                                 | §VII [PDF p.13] [PDF p.31]            | 知识蒸馏                         | 用教师模型指导低比特学生                                                    | QAT 稳定化                       |
| GEMM           | General Matrix Multiplication                          | Appendix B [PDF p.29]                 | 通用矩阵乘                       | 矩阵乘法核心算子                                                            | FP8/FP4 执行路径                 |
| EMA            | Exponential Moving Average                             | Appendix A [PDF p.25]                 | 指数滑动平均                     | 对历史量做指数加权平均                                                      | 优化器状态/量化稳定              |

## 附录
