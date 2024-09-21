---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I am a PhD student at [the College of Computer Science and Technology](http://www.en.cs.zju.edu.cn/), [Zhejiang University](https://www.zju.edu.cn/english/) (浙江大学计算机学院).

I am now working on the Audio Research Team at Zhejiang University, under the supervision of [Prof. Zhou Zhao (赵洲)](https://person.zju.edu.cn/zhaozhou). My current research focuses on multi-task music large language model with style control and music generation for spatial audio.

I graduated from [Chu Kochen Honors College](http://ckc.zju.edu.cn/ckcen/main.htm), Zhejiang University (浙江大学竺可桢学院), with dual bachelor's degrees in Computer Science and Automation.  
I also worked as a visiting scholar at [University of Massachusetts Amherst](https://www.umass.edu/), collaborating with [Prof. Przemyslaw Grabowicz](https://www.cics.umass.edu/about/directory/przemyslaw-grabowicz).

My research interests include **Singing Voice Synthesis, Music Generation, and Natural Language Processing**. I have published 4 papers at top international AI conferences, including NeurIPS, AAAI, ACL, and EMNLP.

**I am actively seeking postdoctoral positions and research collaborations. Please feel free to contact me via email at yuzhang34@zju.edu.cn.**

# 🔥 News
- *2024.09*: 🎉 1 paper is accepted by EMNLP 2024!
- *2024.06*: We released the code and dataset of [GTSinger](https://github.com/GTSinger/GTSinger) (A Global Multi-Technique Singing Corpus for all singing tasks)!
- *2024.05*: 🎉 1 paper is accepted by ACL 2024!
- *2024.05*: We released the code of [StyleSinger](https://github.com/AaronZ345/StyleSinger) (Style Transfer for Out-of-Domain Singing Voice Synthesis)!
- *2023.12*: 🎉 1 paper is accepted by AAAI 2024!

# 📝 Publications 

## 🎙 Singing Voice Synthesis
<div class='paper-box'>
    <div class='paper-box-image'>
        <div>
            <div class="badge">AAAI 2024</div>
            <img src='../../images/stylesinger.png' alt="sym" width="100%"></div>
        </div>
        <div class='paper-box-text' markdown="1">

[StyleSinger: Style Transfer for Out-of-Domain Singing Voice Synthesis](https://ojs.aaai.org/index.php/AAAI/article/view/29932) \\
**Yu Zhang**, Rongjie Huang, Ruiqi Li, et al.

[**Project**](https://stylesinger.github.io) \| [![](https://img.shields.io/github/stars/AaronZ345/StyleSinger?style=social&label=StyleSinger+Stars)](https://github.com/AaronZ345/StyleSinger)

- StyleSinger is the first singing voice synthesis model for zero-shot style transfer of out-of-domain reference singing voice samples. 
</div>
</div>

<div class='paper-box'>
    <div class='paper-box-image'>
        <div>
            <div class="badge">NIPS 2024</div>
            <img src='../../images/gtsinger.png' alt="sym" width="100%"></div>
        </div>
        <div class='paper-box-text' markdown="1">

[GTSinger: A Global Multi-Technique Singing Corpus with Realistic Music Scores for All Singing Tasks]() \\
**Yu Zhang**, Changhao Pan, Wenxinag Guo, et al.

[**Project**](https://gtsinger.github.io) \| [![](https://img.shields.io/github/stars/GTSinger/GTSinger?style=social&label=GTSinger+Stars)](https://github.com/GTSinger/GTSinger) [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue?label=Dataset)](https://huggingface.co/datasets/GTSinger/GTSinger) 

- GTSinger is a large Global, multi-Technique, free-to-use, high-quality singing corpus with realistic music scores, designed for all singing tasks.
</div>
</div>

<div class='paper-box'>
    <div class='paper-box-image'>
        <div>
            <div class="badge">EMNLP 2024</div>
            <img src='../../images/stylesinger2.png' alt="sym" width="100%"></div>
        </div>
        <div class='paper-box-text' markdown="1">

[StyleSinger 2: Zero-Shot Singing Voice Synthesis with Style Transfer and Multi-Level Style Control]() \\
**Yu Zhang**, Ziyue Jiang, Ruiqi Li, et al.

[**Project**](https://stylesinger2.github.io) \| 
[![](https://img.shields.io/github/stars/AaronZ345/StyleSinger2?style=social&label=StyleSinger+Stars)](https://github.com/AaronZ345/StyleSinger2) 
- StyleSinger 2 is the first zero-shot SVS model for style transfer across cross-lingual speech and singing styles, along with multi-level style control. 
</div>
</div>

- `ACL 2024`[Robust Singing Voice Transcription Serves Synthesis](https://arxiv.org/abs/2405.09940), Ruiqi Li, **Yu Zhang**, Yongqi Wang, et al. [![](https://img.shields.io/github/stars/RickyL-2000/ROSVOT?style=social&label=ROSVOT+Stars)](https://github.com/RickyL-2000/ROSVOT)

## 🎼 Music Generation 

# 📖 Educations
- *2020.09 - 2025.06 (Expected)*, PhD, Computer Science, College of Computer Science and Technology, Zhejiang University, Hangzhou, Zhejiang
- *2016.09 - 2020.06*, Undergraduate, Computer Science & Automation, Chu Kochen Honors College, Zhejiang University, Hangzhou, Zhejiang

# 💻 Research & Internships
- *2019.07-2020.01* Visiting Scholar at [University of Massachusetts Amherst](https://www.umass.edu/), working with [Prof. Przemyslaw Grabowicz](https://www.cics.umass.edu/about/directory/przemyslaw-grabowicz).
- *2020.06-2020.09* [Alibaba-Zhejiang University Joint Institute of Frontier Technologies](https://azft.alibaba.com/), working with [Prof. Jianke Zhu](https://person.zju.edu.cn/en/jkzhu)
