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

const githubStarSources = [publications, projects];
const githubStarsCacheTtl = 1000 * 60 * 5;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const githubStars = useGithubStars(githubStarSources);

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
                I am <strong>{profile.name} ({profile.nativeName})</strong>, a {profile.role} at{" "}
                <a href={profile.organizationUrl} target="_blank" rel="noreferrer">{profile.organization}</a>.{" "}
                {profile.collaboration}{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
              <p>{profile.education}</p>
              <p>{profile.summary} {profile.publicationSummary}</p>
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
                githubStars={githubStars}
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
            <ProjectList projects={projects} githubStars={githubStars} />
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

function ProjectList({ projects, githubStars }) {
  return (
    <div className="project-grid">
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
          <ActionLinks links={project.links} githubStars={githubStars} />
        </article>
      ))}
    </div>
  );
}

function PublicationGroup({ title, papers, githubStars }) {
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
            <FeaturedPaper key={paper.title} paper={paper} githubStars={githubStars} />
          ))}
        </div>
      ) : null}
      {compact.length ? (
        <div className="compact-paper-list">
          {compact.map((paper) => (
            <CompactPaper key={paper.title} paper={paper} githubStars={githubStars} />
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

function FeaturedPaper({ paper, githubStars }) {
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
        <ActionLinks links={paper.links} githubStars={githubStars} />
      </div>
    </article>
  );
}

function toWebpPath(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function CompactPaper({ paper, githubStars }) {
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
      <ActionLinks links={paper.links} githubStars={githubStars} />
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

function ActionLinks({ links, githubStars }) {
  if (!links?.length) return null;

  return (
    <div className="action-links">
      {links.map((link) => {
        const githubRepo = getGithubRepo(link.href);
        const liveStars = githubRepo ? githubStars[githubRepo] : undefined;
        const fallbackStars = typeof link.stars === "number"
          ? link.stars
          : githubRepo
            ? githubStarFallbacks[githubRepo]
            : undefined;
        const stars = liveStars ?? fallbackStars;

        return (
          <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
            <i className={getActionIcon(link)} aria-hidden="true" />
            <span>{link.label}</span>
            {githubRepo ? <GithubStars repo={githubRepo} stars={stars} /> : null}
          </a>
        );
      })}
    </div>
  );
}

function GithubStars({ stars }) {
  if (typeof stars !== "number") return null;

  return (
    <span className="star-count" title={`${stars.toLocaleString()} GitHub stars`}>
      <i className="fa-solid fa-star" aria-hidden="true" />
      {formatStars(stars)}
    </span>
  );
}

const githubStarFallbacks = {
  "AaronZ345/ISDrama": 237,
  "dieKarotte/ASAudio": 54,
  "MRSAudio/MRSAudio_Main": 40,
  "AaronZ345/VersBand": 225,
  "AaronZ345/GTSinger": 371,
  "AaronZ345/TCSinger2": 180,
  "AaronZ345/TCSinger": 381,
  "AaronZ345/StyleSinger": 419,
  "gwx314/STARS": 83,
  "gwx314/TechSinger": 100,
  "RickyL-2000/ROSVOT": 121,
  "DaViD-Pigeon/SyntheticSingers": 8,
  "User-tian/Conan": 27,
  "bytedance/MegaTTS3": 6084,
  "Ruiyuan-Zhang/Zero-Shot-Assembly": 4
};

function useGithubStars(collections) {
  const repos = useMemo(() => {
    const found = new Set();
    collections.forEach((items) => {
      items.forEach((item) => {
        item.links?.forEach((link) => {
          const repo = getGithubRepo(link.href);
          if (repo) {
            found.add(repo);
          }
        });
      });
    });
    return Array.from(found);
  }, [collections]);
  const [stars, setStars] = useState({});

  useEffect(() => {
    if (!repos.length) {
      setStars({});
      return undefined;
    }

    let cancelled = false;
    const now = Date.now();
    const cachedByRepo = Object.fromEntries(
      repos.map((repo) => [repo, readGithubStarsCache(repo)])
    );

    const cachedEntries = repos.flatMap((repo) => {
      const cached = cachedByRepo[repo];
      return cached ? [[repo, cached.count]] : [];
    });

    if (cachedEntries.length) {
      setStars(Object.fromEntries(cachedEntries));
    }

    const reposToRefresh = repos.filter((repo) => {
      const cached = cachedByRepo[repo];
      return !cached || now - cached.timestamp >= githubStarsCacheTtl;
    });

    if (!reposToRefresh.length) return undefined;

    const loadStars = async () => {
      const entries = await Promise.all(
        reposToRefresh.map(async (repo) => {
          const controller = new AbortController();
          const timeout = window.setTimeout(() => controller.abort(), 3500);
          try {
            const response = await fetch(`https://api.github.com/repos/${repo}`, {
              headers: { Accept: "application/vnd.github+json" },
              signal: controller.signal
            });
            if (!response.ok) return null;
            const data = await response.json();
            const count = Number(data.stargazers_count);
            if (!Number.isFinite(count)) return null;
            writeGithubStarsCache(repo, count);
            return [repo, count];
          } catch {
            return null;
          } finally {
            window.clearTimeout(timeout);
          }
        })
      );

      const liveEntries = entries.filter(Boolean);
      if (!cancelled && liveEntries.length) {
        setStars((currentStars) => ({
          ...currentStars,
          ...Object.fromEntries(liveEntries)
        }));
      }
    };

    let cleanupIdle = () => {};
    const cleanupLoad = runAfterInitialLoad(() => {
      cleanupIdle = runWhenIdle(loadStars, 1200);
    });

    return () => {
      cancelled = true;
      cleanupLoad();
      cleanupIdle();
    };
  }, [repos]);

  return stars;
}

function readGithubStarsCache(repo) {
  try {
    const cached = JSON.parse(window.sessionStorage.getItem(`github-stars:${repo}`));
    const count = Number(cached?.count);
    const timestamp = Number(cached?.timestamp);
    if (!Number.isFinite(count) || !Number.isFinite(timestamp)) return null;
    return { count, timestamp };
  } catch {
    return null;
  }
}

function writeGithubStarsCache(repo, count) {
  try {
    window.sessionStorage.setItem(`github-stars:${repo}`, JSON.stringify({ count, timestamp: Date.now() }));
  } catch {
    // Ignore cache failures; the live count can still render.
  }
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

function formatStars(value) {
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
