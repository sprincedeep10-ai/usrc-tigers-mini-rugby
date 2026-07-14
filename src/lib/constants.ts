/** Update this with your official GameDay registration URL */
export const GAMEDAY_URL =
  "https://www.mygameday.app/register/PLACEHOLDER_USRC_TIGERS_MINIS";

export const INSTAGRAM_URL = "https://www.instagram.com/usrctigers_minis";

export const CONTACT_EMAIL = "minis@usrctigers.com"; // PLACEHOLDER — update with real email

export const VENUE_NAME = "King's Park Sports Ground";
export const VENUE_COORDINATES = "22.3056° N, 114.1750° E";
export const VENUE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=King's+Park+Sports+Ground+Ho+Man+Tin+Hong+Kong";

export const NAV_HREFS = [
  { key: "instagram" as const, href: "#instagram" },
  { key: "about" as const, href: "#about" },
  { key: "parents" as const, href: "#parents" },
  { key: "schedule" as const, href: "#schedule" },
  { key: "joining" as const, href: "#joining" },
  { key: "mission" as const, href: "#mission" },
];

export const STATS = [
  { value: 150, suffix: "+", key: "miniPlayers" as const },
  { value: 8, suffix: "", key: "ageGroups" as const },
  { value: 20, suffix: "+", key: "parentCoaches" as const },
  { value: 15, suffix: "+", key: "yearsHeritage" as const },
] as const;

export const BENEFIT_ICONS = ["sparkles", "shield", "trophy", "route"] as const;

export const PARENT_ICONS = ["users", "message", "star"] as const;

export const MISSION_ICONS = ["heart", "target", "rocket"] as const;

export const TESTIMONIAL_INITIALS = ["SL", "JC", "PK", "DW"] as const;
