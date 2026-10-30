# Content Editing Guide

Edit these files for homepage content:

- `site.js`: page title, SEO text, navigation labels, and publication group order.
- `profile.js`: name, role, affiliation, location, email, profile links, research focus, about text.
- `news.js`: news rows.
- `projects.js`: project cards, roles, descriptions, tags, and links.
- `publications.js`: publication entries, featured paper images, paper/demo/code/dataset/media links.
- `education.js`: education timeline.
- `experience.js`: industry and research experience timeline.
- `awards.js`: honors list.
- `services.js`: reviewer service list.

Service items accept a plain string or `{ label, href }`. Use the conference's permanent website or its society's conference page for `href`. Trailing years in `label` are displayed separately from the linked name.

Images stay in `public/images/`.
