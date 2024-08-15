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

I am a PhD student majoring in Computer Science at [Zhejiang University](https://www.zju.edu.cn/english/). 

I am now working on the Audio Research Team at Zhejiang University, under the supervision of [Prof. Zhou Zhao](https://person.zju.edu.cn/zhaozhou). 

I graduated from [Chu Kochen Honors College](http://ckc.zju.edu.cn/ckcen/main.htm), Zhejiang University (浙江大学竺可桢学院), with dual bachelor's degrees in Computer Science and Automation.

My research interest includes **Singing voice Synthesis and Music Generation**. Now I focus on the Controllable Music Large Language Model. 

**I am actively seeking postdoctoral positions and research collaborations. Please feel free to contact me via email at yuzhang34@zju.edu.cn**


# 🔥 News
- *2024.06*: We released [GTSinger](https://github.com/GTSinger/GTSinger) (A Global Multi-Technique Singing Corpus for all singing tasks)!
- *2024.05*: 🎉 1 paper is accepted by ACL 2024!
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

[![](https://img.shields.io/github/stars/AaronZ345/StyleSinger?style=social&label=StyleSinger+Stars)](https://github.com/AaronZ345/StyleSinger) | [**Demo**](https://stylesinger.github.io) | <strong><span class='show_paper_citations' data='DkA9A6LsAAAAJ:u5HHmVD_uO8C'></span></strong>

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

[![](https://img.shields.io/github/stars/GTSinger/GTSinger?style=social&label=GTSinger+Stars)](https://github.com/GTSinger/GTSinger) [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue?label=Dataset)](https://huggingface.co/datasets/GTSinger/GTSinger) | [**Demo**](https://gtsinger.github.io) 

- GTSinger is a large Global, multi-Technique, free-to-use, high-quality singing corpus with realistic music scores, designed for all singing tasks.
</div>
</div>

- `ACL 2024`[Robust Singing Voice Transcription Serves Synthesis](https://arxiv.org/abs/2405.09940), Ruiqi Li, **Yu Zhang**, Yongqi Wang, et al. [![](https://img.shields.io/github/stars/RickyL-2000/ROSVOT?style=social&label=ROSVOT+Stars)](https://github.com/RickyL-2000/ROSVOT)

## 🎼 Music Generation 

# 📖 Educations
- *2020.09 - 2025.06 (Expected)*, PhD, Computer Science, College of Computer Science and Technology, Zhejiang University, Hangzhou, Zhejiang
- *2016.09 - 2020.06*, Undergraduate, Computer Science & Automation, Chu Kochen Honors College, Zhejiang University, Hangzhou, Zhejiang
