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

{% include_relative includes/intro.md %}

{% include_relative includes/new.md %}

{% include_relative includes/pub.md %}

{% include_relative includes/exper.md %}

{% include_relative includes/edu.md %}

{% include_relative includes/award.md %}

{% include_relative includes/other.md %}

<div id="clustrmaps-container" style="width: 200px; height: 200px; margin: 20px auto; overflow: hidden;">
  <script type="text/javascript" id="clstr_globe" src="https://clustrmaps.com/globe.js?d=1S35OY4EW-icFHp1QQQkUQj6qQja0TJHaHBF_3opuyk"></script>
</div>
