/** URL canônica de produção — override via NEXT_PUBLIC_SITE_URL se necessário */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://terus-platform-web.vercel.app";

export const OG_IMAGE_PATH = "/logos/terus/terus.jpg";

export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
