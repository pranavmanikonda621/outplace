/** Static list — keep in sync when adding files under `public/marquee/`. */

const MARQUEE_PATH = "/marquee/";

function altFromFilename(file: string): string {
  return file
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Same array on server and client — required for SSR hydration of the marquee. */
export const MARQUEE_LOGOS = (
  [
    "aalo.png",
    "airmyne.png",
    "aws.png",
    "cal.png",
    "clio.png",
    "databricks.png",
    "method.png",
    "illinois.png",
  ] as const
).map((file) => ({
  src: MARQUEE_PATH + file,
  alt: altFromFilename(file),
}));
