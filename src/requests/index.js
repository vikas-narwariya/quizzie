import Cookies from "js-cookie";

export const server = location.href.includes("localhost")
  ? "https://quizzie-backend.vercel.app"
  : "https://quizzie-backend.vercel.app";

export function config() {
  const token = Cookies.get("token");
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}
