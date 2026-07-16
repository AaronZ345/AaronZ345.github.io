import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import {
  awards,
  education,
  experience,
  navItems,
  news,
  profile,
  projects,
  publicationGroups,
  publications,
  services,
  siteMeta
} from "./content/index.js";
import {
  fallbackTitleIcon,
  getActionIcon,
  newsIconMap,
  profileIconMap,
  publicationGroupIconMap,
  sectionIconMap,
  serviceIconMap,
  venueIcon
} from "./icons.js";

const githubStatsSources = [publications, projects];
const githubStatsCacheTtl = 1000 * 60 * 5;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const githubStats = useGithubRepoStats(githubStatsSources);

  useEffect(() => {
    document.title = siteMeta.title;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#about" aria-label={`${profile.name} homepage`}>
          {profile.name}
        </a>
        <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-button"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
          >
            <i className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true" />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="page-shell">
        <aside className="profile-sidebar" aria-label="Profile">
          <SidebarProfile />
        </aside>

        <main className="content-main">
          <section className="section about-section" id="about">
            <SectionTitle title="About Me" />
            <div className="intro-copy">
              <p>
                I am <strong>{profile.name} ({profile.nativeName})</strong>. Now, I am a {profile.role} at{" "}
                <a href={profile.organizationUrl} target="_blank" rel="noreferrer">{profile.organization}</a>.{" "}
                {profile.collaboration}{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
              <p>
                I earned my PhD in{" "}
                <a href="http://www.en.cs.zju.edu.cn/" target="_blank" rel="noreferrer">
                  the College of Computer Science and Technology
                </a>
                ,{" "}
                <a href="https://www.zju.edu.cn/english/" target="_blank" rel="noreferrer">
                  Zhejiang University
                </a>{" "}
                (浙江大学计算机科学与技术学院), under the supervision of{" "}
                <a href="https://person.zju.edu.cn/zhaozhou" target="_blank" rel="noreferrer">
                  Prof. Zhou Zhao (赵洲)
                </a>
                . Previously, I graduated from{" "}
                <a href="http://ckc.zju.edu.cn/ckcen/main.htm" target="_blank" rel="noreferrer">
                  Chu Kochen Honors College
                </a>
                , Zhejiang University (浙江大学竺可桢学院), with dual bachelor's degrees in Computer Science and
                Automation. I have also served as a visiting scholar at{" "}
                <a href="https://www.rochester.edu/" target="_blank" rel="noreferrer">
                  University of Rochester
                </a>{" "}
                with{" "}
                <a href="https://www.hajim.rochester.edu/ece/people/faculty/duan_zhiyao" target="_blank" rel="noreferrer">
                  Prof. Zhiyao Duan
                </a>{" "}
                and{" "}
                <a href="https://www.umass.edu/" target="_blank" rel="noreferrer">
                  University of Massachusetts Amherst
                </a>{" "}
                with{" "}
                <a href="https://www.cics.umass.edu/about/directory/przemyslaw-grabowicz" target="_blank" rel="noreferrer">
                  Prof. Przemyslaw Grabowicz
                </a>
                .
              </p>
              <p>
                {profile.summary} I have published <strong>10+</strong> {profile.publicationSummarySuffix}
              </p>
            </div>
          </section>

          <section className="section" id="news">
            <SectionTitle title="News" />
            <div className="news-list">
              {news.map((item) => (
                <a className="news-row" href={item.href} key={`${item.date}-${item.text}`} target="_blank" rel="noreferrer">
                  <time>{item.date}</time>
                  <span className="news-icon" aria-hidden="true">
                    <SemanticIcon icon={newsIconMap[item.icon] ?? newsIconMap.accepted} />
                  </span>
                  <span className="news-text">{item.text}</span>
                  <i className="news-external fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <section className="section" id="publications">
            <SectionTitle title="Publications" note="* denotes co-first authors." />
            {publicationGroups.map((group) => (
              <PublicationGroup
                key={group}
                title={group}
                papers={publications.filter((paper) => paper.group === group)}
                githubStats={githubStats}
              />
            ))}
          </section>

          <section className="section" id="education">
            <SectionTitle title="Education" />
            <Timeline items={education} />
          </section>

          <section className="section" id="experience">
            <SectionTitle title="Experience" />
            <Timeline items={experience} />
          </section>

          <section className="section" id="honors">
            <SectionTitle title="Honors" />
            <HonorsList items={awards} />
          </section>

          <section className="section" id="service">
            <SectionTitle title="Academic Service" />
            <ServiceList items={services} />
          </section>

          <section className="section" id="projects">
            <SectionTitle title="Projects" />
            <ProjectList projects={projects} githubStats={githubStats} />
          </section>
        </main>
      </div>

      <footer className="site-footer">
        <div className="section footer-inner">
          <span>{profile.name} ({profile.nativeName})</span>
          <div className="footer-links">
            {siteMeta.repositoryUrl ? (
              <a href={siteMeta.repositoryUrl} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github" aria-hidden="true" />
                <span>Built with Athena</span>
              </a>
            ) : null}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function ProjectList({ projects, githubStats }) {
  return (
    <div className="project-grid" role="region" aria-label="Projects" tabIndex={0}>
      {projects.map((project) => (
        <article className="project-card" key={project.name}>
          <div className="project-card-header">
            <div>
              <h3>{project.name}</h3>
              <span>{project.role}</span>
            </div>
          </div>
          <p>{project.description}</p>
          <div className="project-tags" aria-label={`${project.name} tags`}>
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ActionLinks links={project.links} githubStats={githubStats} />
        </article>
      ))}
    </div>
  );
}

function PublicationGroup({ title, papers, githubStats }) {
  const highlighted = papers.filter((paper) => paper.featured && paper.image);
  const compact = papers.filter((paper) => !(paper.featured && paper.image));

  return (
    <section className="publication-group" aria-labelledby={`group-${slugify(title)}`}>
      <h3 id={`group-${slugify(title)}`}>
        <TitleIcon icon={publicationGroupIconMap[title] ?? fallbackTitleIcon} compact />
        <span>{title}</span>
      </h3>
      {highlighted.length ? (
        <div className="highlight-list">
          {highlighted.map((paper) => (
            <FeaturedPaper key={paper.title} paper={paper} githubStats={githubStats} />
          ))}
        </div>
      ) : null}
      {compact.length ? (
        <div className="compact-paper-list">
          {compact.map((paper) => (
            <CompactPaper key={paper.title} paper={paper} githubStats={githubStats} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SidebarProfile() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="sidebar-card">
      <div className="sidebar-avatar-frame">
        <picture className="sidebar-avatar-media">
          <source
            type="image/webp"
            srcSet="/images/avatar-192.webp 192w, /images/avatar-384.webp 384w, /images/avatar-512.webp 512w"
            sizes="156px"
          />
          <img
            className="sidebar-avatar"
            src="/images/android-chrome-192x192.png"
            width="192"
            height="192"
            decoding="async"
            fetchPriority="high"
            alt={profile.name}
          />
        </picture>
      </div>
      <div className="sidebar-identity">
        <h1>{profile.name}</h1>
        <p>{profile.nativeName}</p>
        <span>{profile.role} at {profile.organization}</span>
      </div>
      <div className="sidebar-meta">
        <span>
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          {profile.location}
        </span>
        <a href={`mailto:${profile.email}`}>
          <i className="fa-solid fa-envelope" aria-hidden="true" />
          {profile.email}
        </a>
      </div>
      <ProfileLinks />

      <button
        className="sidebar-toggle"
        type="button"
        aria-controls="profile-details"
        aria-expanded={detailsOpen}
        onClick={() => setDetailsOpen((value) => !value)}
      >
        <span>Profile Details</span>
        <i className={`fa-solid fa-chevron-${detailsOpen ? "up" : "down"}`} aria-hidden="true" />
      </button>

      <div id="profile-details" className={`sidebar-collapsible${detailsOpen ? " is-open" : ""}`}>
        <div className="sidebar-block">
          <h2>Research Focus</h2>
          <div className="focus-row" aria-label="Research focus">
            {profile.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="sidebar-block">
          <h2>Recent News</h2>
          <div className="sidebar-news">
            {news.slice(0, 4).map((item) => (
              <a href={item.href} key={`${item.date}-${item.text}`} target="_blank" rel="noreferrer">
                <time>{item.date}</time>
                <span className="sidebar-news-text">
                  <span className="sidebar-news-icon" aria-hidden="true">
                    <SemanticIcon icon={newsIconMap[item.icon] ?? newsIconMap.accepted} />
                  </span>
                  <span>{item.text}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedPaper({ paper, githubStats }) {
  return (
    <article className="featured-paper">
      <div className="paper-figure">
        <picture>
          <source srcSet={toWebpPath(paper.image)} type="image/webp" />
          <img src={paper.image} alt={`${paper.title} paper figure`} loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="featured-paper-copy">
        <div className="paper-venue-line">
          <SemanticIcon icon={venueIcon} />
          <span>{paper.venue}</span>
        </div>
        <h4>{paper.title}</h4>
        <p className="authors">{highlightName(paper.authors)}</p>
        {paper.summary ? <p>{paper.summary}</p> : null}
        <ActionLinks links={paper.links} githubStats={githubStats} />
      </div>
    </article>
  );
}

function toWebpPath(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function CompactPaper({ paper, githubStats }) {
  return (
    <article className="compact-paper-row">
      <span className="compact-venue">
        <SemanticIcon icon={venueIcon} />
        {paper.venue}
      </span>
      <div className="compact-main">
        <h4>{paper.title}</h4>
        <p className="authors">{highlightName(paper.authors)}</p>
      </div>
      <ActionLinks links={paper.links} githubStats={githubStats} />
    </article>
  );
}

function ProfileLinks() {
  return (
    <div className="profile-links">
      {profile.links.map((link) => {
        return (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
            <i className={profileIconMap[link.icon]} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function SectionTitle({ title, note }) {
  return (
    <div className="section-title">
      <h2>
        <TitleIcon icon={sectionIconMap[title] ?? fallbackTitleIcon} />
        <span>{title}</span>
      </h2>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function TitleIcon({ icon, compact = false }) {
  return (
    <span className={compact ? "title-icon title-icon-compact" : "title-icon"} aria-hidden="true">
      <SemanticIcon icon={icon} />
    </span>
  );
}

function SemanticIcon({ icon }) {
  return <Icon className="semantic-icon" icon={icon} aria-hidden="true" />;
}

function ActionLinks({ links, githubStats }) {
  if (!links?.length) return null;

  return (
    <div className="action-links">
      {links.map((link) => {
        const githubRepo = getGithubRepo(link.href);
        const showStats = Boolean(githubRepo && shouldShowGithubStats(link));
        const stats = showStats
          ? mergeGithubStats(githubStats[githubRepo], getGithubStatsFallback(githubRepo, link))
          : null;

        return (
          <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
            <i className={getActionIcon(link)} aria-hidden="true" />
            <span>{link.label}</span>
            {showStats ? <GithubRepoStats stats={stats} /> : null}
          </a>
        );
      })}
    </div>
  );
}

function GithubRepoStats({ stats }) {
  if (!stats || typeof stats.stars !== "number") return null;

  return (
    <span className="repo-stats">
      <span className="repo-stat" title={`${stats.stars.toLocaleString()} GitHub stars`}>
        <i className="fa-solid fa-star" aria-hidden="true" />
        {formatGithubCount(stats.stars)}
      </span>
    </span>
  );
}

const githubStatsFallbacks = {
  "AaronZ345/ISDrama": { stars: 237 },
  "dieKarotte/ASAudio": { stars: 54 },
  "MRSAudio/MRSAudio_Main": { stars: 40 },
  "AaronZ345/VersBand": { stars: 225 },
  "AaronZ345/GTSinger": { stars: 371 },
  "AaronZ345/TCSinger2": { stars: 181 },
  "AaronZ345/TCSinger": { stars: 381 },
  "AaronZ345/StyleSinger": { stars: 419 },
  "gwx314/STARS": { stars: 84 },
  "gwx314/TechSinger": { stars: 100 },
  "RickyL-2000/ROSVOT": { stars: 121 },
  "DaViD-Pigeon/SyntheticSingers": { stars: 8 },
  "User-tian/Conan": { stars: 27 },
  "bytedance/MegaTTS3": { stars: 6086 },
  "Ruiyuan-Zhang/Zero-Shot-Assembly": { stars: 4 },
  "chenhg5/cc-connect": { stars: 12700 },
  "AaronZ345/Athena-personal-academic-page": { stars: 59 },
  "AaronZ345/codebase-argus": { stars: 57 }
};

function useGithubRepoStats(collections) {
  const repos = useMemo(() => {
    const found = new Set();
    collections.forEach((items) => {
      items.forEach((item) => {
        item.links?.forEach((link) => {
          const repo = getGithubRepo(link.href);
          if (repo && shouldShowGithubStats(link)) {
            found.add(repo);
          }
        });
      });
    });
    return Array.from(found);
  }, [collections]);
  const [repoStats, setRepoStats] = useState({});

  useEffect(() => {
    if (!repos.length) {
      setRepoStats({});
      return undefined;
    }

    let cancelled = false;
    const now = Date.now();
    const cachedByRepo = Object.fromEntries(
      repos.map((repo) => [repo, readGithubStatsCache(repo)])
    );

    const cachedEntries = repos.flatMap((repo) => {
      const cached = cachedByRepo[repo];
      return cached ? [[repo, cached]] : [];
    });

    if (cachedEntries.length) {
      setRepoStats(Object.fromEntries(cachedEntries));
    }

    const reposToRefresh = repos.filter((repo) => {
      const cached = cachedByRepo[repo];
      return !cached || now - cached.checkedAt >= githubStatsCacheTtl;
    });

    if (!reposToRefresh.length) return undefined;

    const loadStats = async () => {
      const entries = await Promise.all(
        reposToRefresh.map(async (repo) => {
          const controller = new AbortController();
          const timeout = window.setTimeout(() => controller.abort(), 3500);
          try {
            const response = await fetch(`https://api.github.com/repos/${repo}`, {
              headers: { Accept: "application/vnd.github+json" },
              signal: controller.signal
            });
            if (!response.ok) {
              markGithubStatsCacheChecked(repo, cachedByRepo[repo]);
              return null;
            }
            const data = await response.json();
            const stats = normalizeGithubStats({ stars: data.stargazers_count });
            if (!stats) return null;
            writeGithubStatsCache(repo, stats);
            return [repo, stats];
          } catch {
            markGithubStatsCacheChecked(repo, cachedByRepo[repo]);
            return null;
          } finally {
            window.clearTimeout(timeout);
          }
        })
      );

      const liveEntries = entries.filter(Boolean);
      if (!cancelled && liveEntries.length) {
        setRepoStats((currentStats) => ({
          ...currentStats,
          ...Object.fromEntries(liveEntries)
        }));
      }
    };

    let cleanupIdle = () => {};
    const cleanupLoad = runAfterInitialLoad(() => {
      cleanupIdle = runWhenIdle(loadStats, 1200);
    });

    return () => {
      cancelled = true;
      cleanupLoad();
      cleanupIdle();
    };
  }, [repos]);

  return repoStats;
}

function readGithubStatsCache(repo) {
  const key = getGithubStatsCacheKey(repo);
  return readGithubStatsCacheStorage("localStorage", key)
    ?? readGithubStatsCacheStorage("sessionStorage", key);
}

function writeGithubStatsCache(repo, stats) {
  const now = Date.now();
  writeGithubStatsCacheEntry(repo, { ...stats, updatedAt: now, checkedAt: now });
}

function markGithubStatsCacheChecked(repo, cached) {
  if (!cached) return;
  writeGithubStatsCacheEntry(repo, { ...cached, checkedAt: Date.now() });
}

function writeGithubStatsCacheEntry(repo, entry) {
  const key = getGithubStatsCacheKey(repo);
  if (writeGithubStatsCacheStorage("localStorage", key, entry)) return;
  if (!writeGithubStatsCacheStorage("sessionStorage", key, entry)) {
    // Ignore cache failures; the live count can still render.
  }
}

function readGithubStatsCacheStorage(storageName, key) {
  try {
    const storage = window[storageName];
    const cached = JSON.parse(storage.getItem(key));
    const stats = normalizeGithubStats({ stars: cached?.stars ?? cached?.count });
    const updatedAt = Number(cached?.updatedAt ?? cached?.timestamp);
    const checkedAt = Number(cached?.checkedAt ?? updatedAt);
    if (!stats || !Number.isFinite(updatedAt) || !Number.isFinite(checkedAt)) return null;
    return { ...stats, updatedAt, checkedAt };
  } catch {
    return null;
  }
}

function writeGithubStatsCacheStorage(storageName, key, entry) {
  try {
    window[storageName].setItem(key, JSON.stringify(entry));
    return true;
  } catch {
    return false;
  }
}

function getGithubStatsCacheKey(repo) {
  return `github-repo-stats:${repo}`;
}

function shouldShowGithubStats(link) {
  if (link.showGithubStats === false || link.stats === false) return false;
  if (link.showGithubStats === true || link.stats === true) return true;
  return link.label.toLowerCase() === "code";
}

function getGithubStatsFallback(repo, link) {
  const repoFallback = githubStatsFallbacks[repo];
  return normalizeGithubStats({
    stars: typeof link.stars === "number" ? link.stars : repoFallback?.stars
  });
}

function mergeGithubStats(liveStats, fallbackStats) {
  return normalizeGithubStats({ stars: liveStats?.stars ?? fallbackStats?.stars });
}

function normalizeGithubStats(stats) {
  const stars = Number(stats?.stars);
  return Number.isFinite(stars) ? { stars } : null;
}

function getGithubRepo(href) {
  try {
    const url = new URL(href);
    if (url.hostname !== "github.com") return null;
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;
    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
}

function formatGithubCount(value) {
  if (value >= 1000) {
    const rounded = Math.round((value / 1000) * 10) / 10;
    return `${rounded.toString().replace(/\.0$/, "")}k`;
  }
  return value.toString();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div className="timeline-item" key={`${item.period}-${item.title}-${index}`}>
          <div className="timeline-main">
            <strong>{item.title}</strong>
            {item.href ? (
              <a className="timeline-place" href={item.href} target="_blank" rel="noreferrer">
                {item.place}
              </a>
            ) : (
              <span className="timeline-place">{item.place}</span>
            )}
            {item.detail ? <p>{renderLinkedText(item.detail)}</p> : null}
          </div>
          <time>{item.period}</time>
        </div>
      ))}
    </div>
  );
}

function renderLinkedText(content) {
  if (!Array.isArray(content)) return content;

  return content.map((part, index) => {
    if (typeof part === "string") return part;

    return (
      <a key={`${part.href}-${index}`} href={part.href} target="_blank" rel="noreferrer">
        {part.text}
      </a>
    );
  });
}

function HonorsList({ items }) {
  return (
    <div className="honor-list">
      {items.map((item) => {
        const { title, year } = splitTrailingYear(item);

        return (
          <div className="honor-row" key={item}>
            <span>{title}</span>
            {year ? <time>{year}</time> : null}
          </div>
        );
      })}
    </div>
  );
}

function ServiceList({ items }) {
  return (
    <div className="service-groups">
      {items.map((group) => (
        <section className="service-group" key={group.category}>
          <h3>
            <TitleIcon icon={serviceIconMap[group.category] ?? fallbackTitleIcon} compact />
            <span>{group.category}</span>
          </h3>
          <div className="service-chip-grid">
            {group.items.map((item) => {
              const { title, year } = splitServiceYears(item);

              return (
                <span className="service-chip" key={item}>
                  <span>{title}</span>
                  {year ? <time>{year}</time> : null}
                </span>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function splitTrailingYear(value) {
  const match = value.match(/^(.*),\s*(\d{4})$/);
  if (!match) return { title: value, year: "" };
  return { title: match[1], year: match[2] };
}

function splitServiceYears(value) {
  const match = value.match(/^(.+?)\s((?:\d{4}(?:,\s*)?)+)$/);
  if (!match) return { title: value, year: "" };
  return { title: match[1], year: match[2].replace(/,\s*/g, " / ") };
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function runAfterInitialLoad(callback) {
  let timeoutId = 0;

  const run = () => {
    timeoutId = window.setTimeout(callback, 0);
  };

  if (document.readyState === "complete") {
    run();
    return () => window.clearTimeout(timeoutId);
  }

  window.addEventListener("load", run, { once: true });
  return () => {
    window.removeEventListener("load", run);
    window.clearTimeout(timeoutId);
  };
}

function runWhenIdle(callback, timeout = 1000) {
  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(callback, timeout);
  return () => window.clearTimeout(timeoutId);
}

function highlightName(authors) {
  const parts = authors.split(profile.name);
  if (parts.length === 1) return authors;

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 ? <strong>{profile.name}</strong> : null}
        </span>
      ))}
    </>
  );
}

export default App;
