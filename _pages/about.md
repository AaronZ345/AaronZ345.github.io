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

I am now working on the Audio Research Team at Zhejiang University, under the supervision of [Prof. Zhou Zhao (赵洲)](https://person.zju.edu.cn/zhaozhou). My current research focuses on spatial audio generation based on multi-modal prompts.

I graduated from [Chu Kochen Honors College](http://ckc.zju.edu.cn/ckcen/main.htm), Zhejiang University (浙江大学竺可桢学院), with dual bachelor's degrees in Computer Science and Automation.  
I also worked as a visiting scholar at [University of Massachusetts Amherst](https://www.umass.edu/), collaborating with [Prof. Przemyslaw Grabowicz](https://www.cics.umass.edu/about/directory/przemyslaw-grabowicz).

My research interests primarily focus on **Multi-Modal Generative AI**, specifically in **Singing and Music Synthesis, and Spatial Audio Generation**. I have published first-author papers at top international AI conferences, including NeurIPS, AAAI, and EMNLP.

**I am actively seeking postdoctoral positions and research collaborations. Please feel free to contact me via email at yuzhang34@zju.edu.cn.**

# 🔥 News
<style>
  .scrollable {
    max-height: 260px; /* 设置最大高度 */
    overflow-y: scroll; /* 设置垂直滚动条 */
  }
</style>

<div class="scrollable">
  <ul>
    <li><strong>2024.12</strong>: 🎉 1 paper is accepted by AAAI 2025!</li>
    <li><strong>2024.11</strong>: We released the code of <a href="https://github.com/AaronZ345/TCSinger">TCSinger</a> (Zero-Shot Singing Voice Synthesis with Style Transfer and Multi-Level Style Control)!</li>
    <li><strong>2024.09</strong>: We released the full dataset of <a href="https://huggingface.co/datasets/GTSinger/GTSinger">GTSinger</a> (A Global Multi-Technique Singing Corpus for all singing tasks)!</li>
    <li><strong>2024.09</strong>: 🎉 1 paper is accepted by NeurIPS 2024 (Spotlight)!</li>
    <li><strong>2024.09</strong>: 🎉 1 paper is accepted by EMNLP 2024!</li>
    <li><strong>2024.06</strong>: We released the code of <a href="https://github.com/AaronZ345/GTSinger">GTSinger</a> (A Global Multi-Technique Singing Corpus for all singing tasks)!</li>
    <li><strong>2024.05</strong>: 🎉 1 paper is accepted by ACL 2024!</li>
    <li><strong>2024.05</strong>: We released the code of <a href="https://github.com/AaronZ345/StyleSinger">StyleSinger</a> (Style Transfer for Out-of-Domain Singing Voice Synthesis)!</li>
    <li><strong>2023.12</strong>: 🎉 1 paper is accepted by AAAI 2024!</li>
  </ul>
</div>

# 📝 Publications 

## 🎙 Singing Voice Synthesis

<div class='paper-box'>
    <div class='paper-box-image'>
        <div>
            <div class="badge">NeurIPS 2024 Spotlight</div>
            <img src='../../images/gtsinger.png' alt="sym" width="100%"></div>
        </div>
        <div class='paper-box-text' markdown="1">

[GTSinger: A Global Multi-Technique Singing Corpus with Realistic Music Scores for All Singing Tasks](https://arxiv.org/abs/2409.13832) \\
**Yu Zhang**, Changhao Pan, Wenxinag Guo, et al.

[**Project**](https://aaronz345.github.io/GTSingerDemo/) \| [![](https://img.shields.io/github/stars/AaronZ345/GTSinger?style=social&label=GTSinger+Stars)](https://github.com/AaronZ345/GTSinger) [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue?label=Dataset)](https://huggingface.co/datasets/GTSinger/GTSinger) 

- GTSinger is a large Global, multi-Technique, free-to-use, high-quality singing corpus with realistic music scores, designed for all singing tasks.
- Our work is promoted by multiple media and forums, such as [![weixin](https://img.shields.io/badge/-WeChat@机器之心-000000?logo=wechat&logoColor=07C160)](https://mp.weixin.qq.com/s/B1Iqr-24l57f0MslzYEslA), [![weixin](https://img.shields.io/badge/-WeChat@PaperWeekly-000000?logo=wechat&logoColor=07C160)](https://mp.weixin.qq.com/s/6RLdUzJM5PItklKUTTNz2w), and [![zhihu](https://img.shields.io/badge/-知乎-000000?logo=zhihu&logoColor=0084FF)](https://zhuanlan.zhihu.com/p/993933492).
</div>
</div>

<div class='paper-box'>
    <div class='paper-box-image'>
        <div>
            <div class="badge">EMNLP 2024</div>
            <img src='../../images/tcsinger.png' alt="sym" width="100%"></div>
        </div>
        <div class='paper-box-text' markdown="1">

[TCSinger: Zero-Shot Singing Voice Synthesis with Style Transfer and Multi-Level Style Control](https://arxiv.org/abs/2409.15977) \\
**Yu Zhang**, Ziyue Jiang, Ruiqi Li, et al.

[**Project**](https://aaronz345.github.io/TCSingerDemo/) \| [![](https://img.shields.io/github/stars/AaronZ345/TCSinger?style=social&label=TCSinger+Stars)](https://github.com/AaronZ345/TCSinger) 
- TCSinger is the first zero-shot SVS model for style transfer across cross-lingual speech and singing styles, along with multi-level style control. 
</div>
</div>

<div class='paper-box'>
    <div class='paper-box-image'>
        <div>
            <div class="badge">AAAI 2024</div>
            <img src='../../images/stylesinger.png' alt="sym" width="100%"></div>
        </div>
        <div class='paper-box-text' markdown="1">

[StyleSinger: Style Transfer for Out-of-Domain Singing Voice Synthesis](https://arxiv.org/abs/2312.10741) \\
**Yu Zhang**, Rongjie Huang, Ruiqi Li, et al.

[**Project**](https://aaronz345.github.io/StyleSingerDemo/) \| [![](https://img.shields.io/github/stars/AaronZ345/StyleSinger?style=social&label=StyleSinger+Stars)](https://github.com/AaronZ345/StyleSinger)

- StyleSinger is the first singing voice synthesis model for zero-shot style transfer of out-of-domain reference singing voice samples. 
</div>
</div>

- `AAAI 2025` [TechSinger: Technique Controllable Multilingual Singing Voice Synthesis via Flow Matching](), Wenxiang Guo, **Yu Zhang**, Changhao Pan, et al. \| [**Project**](https://tech-singer.github.io/) 
- `ACL 2024` [Robust Singing Voice Transcription Serves Synthesis](https://arxiv.org/abs/2405.09940), Ruiqi Li, **Yu Zhang**, Yongqi Wang, et al. \| [**Project**](https://rosvot.github.io/) \| [![](https://img.shields.io/github/stars/RickyL-2000/ROSVOT?style=social&label=ROSVOT+Stars)](https://github.com/RickyL-2000/ROSVOT)

# 🎖 Honors and Awards

- *2024.09* Outstanding PhD Student Scholarship of Zhejiang University (Top 10%)
- *2020.06* Outstanding Graduate of Zhejiang University (Undergraduate) (Top 5%)
- *2019.09* First-Class Academic Scholarship of Zhejiang University (Undergraduate) (Top 5%)

# 📖 Educations
- *2020.09 - 2025.06 (Expected)*, PhD, Computer Science, College of Computer Science and Technology, Zhejiang University, Hangzhou, Zhejiang
- *2016.09 - 2020.06*, Undergraduate, Computer Science & Automation, Chu Kochen Honors College, Zhejiang University, Hangzhou, Zhejiang

# 💻 Research and Internships
- *2020.06-2020.09* [Alibaba-Zhejiang University Joint Institute of Frontier Technologies](https://azft.alibaba.com/), working with [Prof. Jianke Zhu](https://person.zju.edu.cn/en/jkzhu)
- *2019.07-2020.01* Visiting Scholar at [University of Massachusetts Amherst](https://www.umass.edu/), working with [Prof. Przemyslaw Grabowicz](https://www.cics.umass.edu/about/directory/przemyslaw-grabowicz).
- *2018.09-2019.06* Research Assistant at [Institute of Cyber-Systems and Control in Zhejiang University](http://www.cse.zju.edu.cn/cseenglish/main.htm), working with [Prof. Chunlin Zhou](https://person.zju.edu.cn/en/c_zhou).
 
# 📚 Academic Services
- Conference Reviewer/Assist to Review: ICLR 2025, EMNLP 2024, NeurIPS 2024, ACL 2024.
