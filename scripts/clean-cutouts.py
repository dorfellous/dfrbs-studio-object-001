#!/usr/bin/env python3
"""Remove white matte fringes from the transparent product cutouts."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"


def nearest_interior_rgb(rgb: np.ndarray, alpha: np.ndarray, band_px: int) -> np.ndarray:
    visible = alpha > 0
    distance = ndimage.distance_transform_edt(visible)
    interior = (alpha >= 250) & (distance > band_px)
    if not interior.any():
        return rgb

    _, indices = ndimage.distance_transform_edt(~interior, return_indices=True)
    nearest = rgb[indices[0], indices[1]]
    edge = visible & ((distance <= band_px) | (alpha < 250))
    cleaned = rgb.copy()
    cleaned[edge] = nearest[edge]
    return cleaned


def clean_asset(
    filename: str,
    *,
    erode_px: int,
    white_key: bool = False,
    output: str | None = None,
) -> None:
    path = ASSETS / filename
    image = Image.open(path).convert("RGBA")
    rgba = np.asarray(image).copy()
    rgb = rgba[..., :3]
    alpha = rgba[..., 3]

    if white_key:
        channel_max = rgb.max(axis=2).astype(np.float32)
        channel_min = rgb.min(axis=2).astype(np.float32)
        saturation = (channel_max - channel_min) / np.maximum(channel_max, 1)
        candidates = (channel_max >= 190) & (saturation <= 0.28) & (alpha > 48)
        labels, count = ndimage.label(candidates)
        matte = np.zeros_like(candidates)
        for label, bounds in enumerate(ndimage.find_objects(labels), start=1):
            if bounds is None:
                continue
            y_bounds, x_bounds = bounds
            center_x = (x_bounds.start + x_bounds.stop) / 2
            center_y = (y_bounds.start + y_bounds.stop) / 2
            component = labels[bounds] == label
            area = int(component.sum())
            is_frame_opening = (
                area >= 120
                and (center_y < 510 or center_x > 1600)
            )
            if is_frame_opening:
                matte[bounds] |= component
        matte = ndimage.binary_dilation(matte, iterations=2)
        alpha[matte] = 0
        alpha[alpha < 48] = 0

    rgb = nearest_interior_rgb(rgb, alpha, band_px=erode_px + 2)

    alpha_image = Image.fromarray(alpha, mode="L")
    alpha_image = alpha_image.filter(ImageFilter.MinFilter(erode_px * 2 + 1))
    alpha_image = alpha_image.filter(ImageFilter.GaussianBlur(0.55))

    result = np.dstack((rgb, np.asarray(alpha_image)))
    output_path = ASSETS / output if output else path
    Image.fromarray(result, mode="RGBA").save(output_path, optimize=True)


def main() -> None:
    clean_asset("product-black-cutout.png", erode_px=1)
    clean_asset("product-pearl-cutout.png", erode_px=1)
    clean_asset(
        "product-heat-cutout.webp",
        erode_px=2,
        white_key=True,
        output="product-heat-cutout.png",
    )


if __name__ == "__main__":
    main()
