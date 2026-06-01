import briefcaseIcon from "@iconify-icons/twemoji/briefcase";
import booksIcon from "@iconify-icons/twemoji/books";
import bookmarkTabsIcon from "@iconify-icons/twemoji/bookmark-tabs";
import cardFileBoxIcon from "@iconify-icons/twemoji/card-file-box";
import classicalBuildingIcon from "@iconify-icons/twemoji/classical-building";
import clipboardIcon from "@iconify-icons/twemoji/clipboard";
import graduationCapIcon from "@iconify-icons/twemoji/graduation-cap";
import identificationCardIcon from "@iconify-icons/twemoji/identification-card";
import ledgerIcon from "@iconify-icons/twemoji/ledger";
import musicalNotesIcon from "@iconify-icons/twemoji/musical-notes";
import newspaperIcon from "@iconify-icons/twemoji/newspaper";
import openBookIcon from "@iconify-icons/twemoji/open-book";
import rocketIcon from "@iconify-icons/twemoji/rocket";
import schoolIcon from "@iconify-icons/twemoji/school";
import speechBalloonIcon from "@iconify-icons/twemoji/speech-balloon";
import speakerHighVolumeIcon from "@iconify-icons/twemoji/speaker-high-volume";
import studioMicrophoneIcon from "@iconify-icons/twemoji/studio-microphone";
import swanIcon from "@iconify-icons/twemoji/swan";
import trophyIcon from "@iconify-icons/twemoji/trophy";

export const profileIconMap = {
  Email: "fa-solid fa-envelope",
  Scholar: "ai ai-google-scholar",
  GitHub: "fa-brands fa-github",
  HuggingFace: "fa-brands fa-hugging-face",
  LinkedIn: "fa-brands fa-linkedin-in",
  Zhihu: "fa-brands fa-zhihu",
  DBLP: "ai ai-dblp",
  ORCID: "ai ai-orcid"
};

export const fallbackTitleIcon = openBookIcon;

export const venueIcon = bookmarkTabsIcon;

export const sectionIconMap = {
  "About Me": identificationCardIcon,
  News: newspaperIcon,
  Publications: booksIcon,
  Education: graduationCapIcon,
  Experience: briefcaseIcon,
  Honors: trophyIcon,
  "Academic Service": clipboardIcon
};

export const publicationGroupIconMap = {
  "Swan Series": swanIcon,
  "Spatial Audio": speakerHighVolumeIcon,
  Music: musicalNotesIcon,
  "Singing Voice": studioMicrophoneIcon,
  Speech: speechBalloonIcon,
  Others: cardFileBoxIcon
};

export const serviceIconMap = {
  "Conference Reviewer": classicalBuildingIcon,
  "Journal Reviewer": ledgerIcon
};

export const newsIconMap = {
  release: rocketIcon,
  accepted: bookmarkTabsIcon,
  career: briefcaseIcon,
  degree: graduationCapIcon,
  visit: schoolIcon
};

export function getActionIcon(link) {
  const label = link.label.toLowerCase();
  const href = link.href.toLowerCase();

  if (href.includes("github.com")) return "fa-brands fa-github";
  if (href.includes("huggingface.co")) return "fa-brands fa-hugging-face";
  if (href.includes("zhihu.com") || label.includes("zhihu")) return "fa-brands fa-zhihu";
  if (href.includes("weixin.qq.com") || label.includes("wechat")) return "fa-brands fa-weixin";
  if (label.includes("paper")) return "fa-solid fa-file-lines";
  if (label.includes("demo")) return "fa-solid fa-play";
  if (label.includes("dataset")) return "fa-solid fa-database";
  if (label.includes("code")) return "fa-solid fa-code";
  return "fa-solid fa-arrow-up-right-from-square";
}
