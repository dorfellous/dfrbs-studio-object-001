#!/usr/bin/env python3
"""Convert the generated chroma-key product renders into clean RGBA assets."""

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
GENERATED = ROOT.parent / "generated_images"
ASSETS = ROOT / "public" / "assets"

SOURCES = {
    "black": GENERATED / "exec-04f01696-98ee-4ca7-96c9-6fe627d56408.png",
    "pearl": GENERATED / "exec-563d6316-ce33-4c13-9c82-5d1451fa98d5.png",
    "heat": GENERATED / "exec-d4a31521-1f2c-4dd0-be8f-faa19ba394fe.png",
}


def key_green(source: Path, destination: Path) -> None:
    rgb = np.asarray(Image.open(source).convert("RGB")).astype(np.float32)
    red, green, blue = np.moveaxis(rgb, 2, 0)
    green_dominance = green - np.maximum(red, blue)

    # Generated background is near-pure green. Keep a short transition only
    # across antialiased edge pixels, then replace their contaminated RGB with
    # the nearest fully opaque product color.
    alpha = np.clip((150.0 - green_dominance) / 90.0, 0.0, 1.0)
    alpha[(green > 190) & (green_dominance > 125)] = 0.0
    alpha[green_dominance < 42] = 1.0

    opaque = alpha >= 0.995
    _, indices = ndimage.distance_transform_edt(~opaque, return_indices=True)
    nearest = rgb[indices[0], indices[1]]
    edge = (alpha > 0) & (alpha < 0.995)
    rgb[edge] = nearest[edge]

    # Remove any residual chroma spill from pixels that the antialiasing pass
    # considered opaque. None of the three approved materials contains green.
    red, green, blue = np.moveaxis(rgb, 2, 0)
    spill = (alpha > 0) & (green > np.maximum(red, blue) + 3)
    rgb[..., 1][spill] = np.maximum(red, blue)[spill]

    rgba = np.dstack((np.clip(rgb, 0, 255).astype(np.uint8), (alpha * 255).astype(np.uint8)))
    Image.fromarray(rgba, mode="RGBA").save(destination, optimize=True)


def main() -> None:
    for color, source in SOURCES.items():
        key_green(source, ASSETS / f"product-{color}-cutout-v4.png")


if __name__ == "__main__":
    main()
