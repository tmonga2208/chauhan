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
