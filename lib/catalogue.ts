import type { ProductProps } from "@/types/product";

/* The CMS is hand-edited, so the same department has been saved as
   "airrifle", "air rifles" and "Air Rifle". Everything that groups
   products by department goes through here. */
export function departmentOf(slug: string | undefined | null): string {
  const s = (slug ?? "").toLowerCase().replace(/[\s_-]+/g, "");
  if (s.startsWith("airrifle")) return "airrifle";
  if (s.startsWith("airpistol")) return "airpistol";
  return s;
}

export type Fit = "Rifle" | "Pistol";

/* Accessory tags arrive as "Accessories rifle", "Accessories,Rifle" or
   ["Accessories", "Air Rifle"] — all meaning the same thing. */
export function fitsOf(product: Pick<ProductProps, "categories">): Fit[] {
  const tags = (product.categories ?? []).join(" ").toLowerCase();
  const fits: Fit[] = [];
  if (tags.includes("rifle")) fits.push("Rifle");
  if (tags.includes("pistol")) fits.push("Pistol");
  return fits;
}

export const DEPARTMENT_NAMES: Record<string, string> = {
  airpistol: "Air pistols",
  airrifle: "Air rifles",
  pellets: "Pellets",
  accessories: "Accessories",
};

export type Trigger = "mechanical" | "electronic";

/* The saved type when there is one, otherwise read from the Walther name:
   the first standalone E (electronic) or M / MANUAL (mechanical) —
   "LG500 E ITEC", "LP500-E XP", "LP500 XP BASIC MANUAL". An M straight after the hand code ("RE M") is not the
   trigger, so "LG500 Expert RE M" stays unknown rather than guessed. */
export function triggerOf(
  product: Pick<ProductProps, "title"> & { type?: string }
): Trigger | null {
  const saved = product.type?.toLowerCase();
  if (saved === "mechanical" || saved === "electronic") return saved;

  const tokens = product.title.toUpperCase().split(/[\s+-]+/);
  for (let i = 0; i < tokens.length; i++) {
    const after = tokens[i - 1];
    if (after === "RE" || after === "LI") continue;
    if (tokens[i] === "E") return "electronic";
    if (tokens[i] === "M" || tokens[i] === "MANUAL") return "mechanical";
  }
  return null;
}

/* Walther's own spellings and brand initials. Anything with a digit
   (LG500, R2, 8.18gr) is left exactly as typed; single letters (E, M) are
   capitals. */
const KEEP_UPPER = new Set([
  "ITEC", "XP", "RE", "LI", "MEC", "ISSF", "LG", "LP", "QYS", "AHG",
]);
const LOWER_WORDS = new Set(["and", "or", "for", "with", "of", "the", "in"]);
const UNITS = new Set(["BAR", "MM", "GR", "CM", "CT", "CAL"]);

/* The CMS holds names typed both as "WALTHER LG500 M ITEC" and
   "LG500 itec Anatomic M". Shown names are set in one style: brand and
   line names in title case, model codes in capitals. */
export function displayTitle(raw: string): string {
  const title = raw.replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").trim();
  const letters = title.replace(/[^A-Za-z]/g, "");
  const shouting = letters.length > 0 &&
    letters.replace(/[^A-Z]/g, "").length / letters.length > 0.7;

  return title
    .split(" ")
    .map((word, i) => {
      const bare = word.replace(/[^A-Za-z0-9]/g, "");
      const upper = bare.toUpperCase();
      if (KEEP_UPPER.has(upper)) return word.replace(bare, upper);
      if (/\d/.test(bare)) return word;
      if (bare.length === 1) return word.toUpperCase();
      if (!shouting) return word;
      if (UNITS.has(upper) && i > 0) return word.toLowerCase();
      const lower = word.toLowerCase();
      if (i > 0 && LOWER_WORDS.has(lower)) return lower;
      return lower.replace(/[a-z]/, (c) => c.toUpperCase());
    })
    .join(" ");
}

/** Whole rupees, Indian grouping: 29290.97 → "29,291". */
export function formatINR(value: number): string {
  return Math.round(Number(value) || 0).toLocaleString("en-IN");
}

/* The description arrives as escaped HTML from the CMS. */
export function cleanHTML(html: unknown): string {
  if (!html) return "";
  if (typeof html !== "string") return String(html);
  return html
    .replace(/\\"/g, '"')
    .replace(/\\\//g, "/")
    .replace(/\\u[\dA-F]{4}/gi, (m) =>
      String.fromCharCode(parseInt(m.replace(/\\u/g, ""), 16))
    );
}

/** Plain text from the CMS description, for page descriptions. */
export function stripHTML(html: unknown): string {
  return cleanHTML(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Each department's page heading and one-line description. */
export const DEPARTMENT_COPY: Record<string, { title: string; lede: string }> = {
  airpistol: {
    title: "Air pistols",
    lede: "10m match pistols, mechanical and electronic trigger.",
  },
  airrifle: {
    title: "Air rifles",
    lede: "10m match rifles with adjustable stocks and sights.",
  },
  pellets: {
    title: "Pellets",
    lede: "Match-grade 4.5mm pellets, sorted by head size.",
  },
  accessories: {
    title: "Accessories",
    lede: "Sights, grips, cylinders, cases and range kit.",
  },
};

/** The home page's department tiles, in display order. */
export const DEPARTMENT_TILES: { title: string; header: string }[] = [
  { title: "Air Pistol", header: "/pistol.jpg" },
  { title: "Air Rifle", header: "/rifle.jpg" },
  { title: "Pellets", header: "/pellets.jpg" },
  { title: "Accessories", header: "/img2.png" },
];
