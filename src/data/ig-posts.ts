/**
 * Instagram post data for @usrctigers_minis
 * Images downloaded from https://www.instagram.com/usrctigers_minis/
 * Update captions/likes when syncing from Instagram.
 */

export const IG_HANDLE = "usrctigers_minis";
export const IG_PROFILE_URL = "https://www.instagram.com/usrctigers_minis/";

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  postUrl?: string;
}

export const IG_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    image: "/images/ig-posts/post-1.jpg",
    caption:
      "USRC Tigers Mini Rugby community moments 🐯🏉 Follow @usrctigers_minis for training days, festivals, and registration updates from King's Park.",
    date: "Apr 16",
    likes: 187,
    comments: 14,
    postUrl: "https://www.instagram.com/p/DXMIHWcibh1/",
  },
  {
    id: "post-2",
    image: "/images/ig-posts/post-2.jpg",
    caption:
      "Black and yellow pride — USRC Tigers RFC 🖤💛 Our minis family showing up strong. #JoinTigersMiniRugby #USRCTigers",
    date: "Apr 16",
    likes: 143,
    comments: 9,
    postUrl: "https://www.instagram.com/p/DXMIEAwCW9n/",
  },
  {
    id: "post-3",
    image: "/images/ig-posts/post-3.jpg",
    caption:
      "Team spirit at USRC Tigers Mini Rugby 🤝 Parent-coaches, players, and families — this community is what makes us special.",
    date: "Apr 16",
    likes: 264,
    comments: 22,
    postUrl: "https://www.instagram.com/p/DXMIAoYCRfa/",
  },
  {
    id: "post-4",
    image: "/images/ig-posts/post-4.jpg",
    caption:
      "Sunday rugby at King's Park 🏉 Safe, fun sessions for ages 4–12. First trial session is free — link in bio to register.",
    date: "Apr 16",
    likes: 198,
    comments: 11,
    postUrl: "https://www.instagram.com/p/DXMHs0diQZ4/",
  },
  {
    id: "post-5",
    image: "/images/ig-posts/post-5.jpg",
    caption:
      "Tigers on the pitch 🐯 Building confidence, teamwork, and friendships one session at a time.",
    date: "Apr 16",
    likes: 156,
    comments: 8,
    postUrl: "https://www.instagram.com/p/DXMHo7KidEB/",
  },
  {
    id: "post-6",
    image: "/images/ig-posts/post-6.jpg",
    caption:
      "Mini rugby memories from USRC Tigers 🙌 Thank you to every parent-coach who makes Sunday mornings possible.",
    date: "Apr 16",
    likes: 221,
    comments: 31,
    postUrl: "https://www.instagram.com/p/DXMHT_oCf-6/",
  },
  {
    id: "post-7",
    image: "/images/ig-posts/post-7.jpg",
    caption:
      "Kit day vibes 🖤💛 New season registration open — includes playing shirt, shorts & socks. Register via GameDay.",
    date: "Apr 16",
    likes: 312,
    comments: 18,
    postUrl: "https://www.instagram.com/p/DXMGeZrCV4S/",
  },
  {
    id: "post-8",
    image: "/images/ig-posts/post-8.jpg",
    caption:
      "From minis to youth to senior — the Tiger pathway starts here 🐯 Come try a free session at King's Park.",
    date: "Apr 16",
    likes: 174,
    comments: 12,
    postUrl: "https://www.instagram.com/p/DXMGY1UidcW/",
  },
];

export function formatEngagement(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}
