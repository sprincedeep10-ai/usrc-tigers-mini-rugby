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
      "test save works",
    date: "Apr 16",
    likes: 187,
    comments: 14,
    postUrl: "",
  },
];

export function formatEngagement(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}
