export const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const EYEWEAR_COLORWAYS = {
  black: {
    label: "BLACK",
    number: "01",
    product: asset("product-black-four-lens-v3.png"),
    fallback: asset("black-product-original.jpg"),
    campaign: asset("campaign-mirror-black.jpg"),
    description: "Gloss black. Dense, reflective and deliberately severe.",
  },
  pearl: {
    label: "PEARL",
    number: "02",
    product: asset("product-pearl-four-lens-v3.png"),
    fallback: asset("product-pearl-white.jpg"),
    campaign: asset("campaign-pearl.jpg"),
    description: "A translucent pearl finish that reveals the printed topology.",
  },
  heat: {
    label: "HEAT",
    number: "03",
    product: asset("product-heat-four-lens-v3.png"),
    fallback: asset("product-heat-white.jpg"),
    campaign: asset("campaign-heat.jpg"),
    description: "Safety orange shifting into saturated hot pink.",
  },
};

const LIGHTER_COLORWAYS = {
  black: {
    label: "BLACK",
    number: "01",
    product: asset("lighter-black.webp"),
    campaign: asset("lighter-campaign-black.webp"),
    description: "Smoke-black PETG with four polished organic lenses.",
  },
  pearl: {
    label: "PEARL",
    number: "02",
    product: asset("lighter-pearl.webp"),
    campaign: asset("lighter-campaign-pearl.webp"),
    description: "Icy translucent PETG with pale blue convex lenses.",
  },
  heat: {
    label: "HEAT",
    number: "03",
    product: asset("lighter-heat.webp"),
    campaign: asset("lighter-campaign-heat.webp"),
    description: "Orange dissolving into hot pink around four warm lenses.",
  },
};

export const OBJECTS = {
  eyewear: {
    code: "001",
    name: "Eyewear",
    subtitle: "Liquid monolith",
    navLabel: "EYEWEAR",
    title: "OBJECT 001",
    eyebrow: "LIQUID MONOLITH",
    hero: asset("campaign-mirror-black.jpg"),
    heroAlt: "Model wearing black Object 001 eyewear beside a chrome mirror",
    intro: "BIOMORPHIC EYEWEAR 3D PRINTED IN LIMITED NUMBERS.",
    subintro: "AN EXPERIMENT IN FORM, MATERIAL AND PRESENCE.",
    mutation: "WEAR THE\nMUTATION",
    story: "OBJECT 001 — A BIOMORPHIC SHIFT\nFOR THOSE WHO MOVE DIFFERENT.",
    productType: "3D-PRINTED 4-LENS ORGANIC EYEWEAR.",
    price: "$1,500",
    colorways: EYEWEAR_COLORWAYS,
  },
  lighter: {
    code: "002",
    name: "Clipper sleeve",
    subtitle: "Liquid ignition",
    navLabel: "CLIPPER SLEEVE",
    title: "OBJECT 002",
    eyebrow: "LIQUID IGNITION",
    hero: asset("lighter-hero-mirror.webp"),
    heroMobile: asset("lighter-hero-mobile.webp"),
    heroAlt: "Black, pearl and heat Object 002 Clipper sleeves on a liquid chrome mirror",
    intro: "3D-PRINTED ORGANIC SLEEVE FOR THE ICONIC CLIPPER LIGHTER.",
    subintro: "A POCKET-SCALE EXPERIMENT IN FORM, GRIP AND COLOR.",
    mutation: "HOLD THE\nMUTATION",
    story: "OBJECT 002 — A BIOMORPHIC CLIPPER SLEEVE\nFOR OBJECTS THAT MOVE WITH YOU.",
    productType: "3D PRINTED LIGHTER CASE.",
    price: "$420",
    colorways: LIGHTER_COLORWAYS,
  },
};

export const PAGES = {
  studio: { code: "000", navLabel: "OUR STUDIO" },
  eyewear: OBJECTS.eyewear,
  lighter: OBJECTS.lighter,
};

export function objectFromLocation(location = window.location) {
  const code = new URLSearchParams(location.search).get("object");
  if (code === "000") return "studio";
  if (code === "001") return "eyewear";
  if (code === "002") return "lighter";
  return "landing";
}
