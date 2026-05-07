const CUSTOM_STICKERS_KEY = "customStickers";

export function getCustomStickers() {
  try {
    const storedStickers = JSON.parse(localStorage.getItem(CUSTOM_STICKERS_KEY));
    return Array.isArray(storedStickers) ? storedStickers : [];
  } catch (error) {
    console.error("Failed to read custom stickers from localStorage", error);
    return [];
  }
}

function isSameCustomSticker(storedSticker, nextSticker) {
  return (
    Boolean(storedSticker?.imageUrl) &&
    Boolean(nextSticker?.imageUrl) &&
    storedSticker.imageUrl === nextSticker.imageUrl
  );
}

export function isCustomStickerInCart(sticker) {
  if (!sticker?.imageUrl) {
    return false;
  }

  return getCustomStickers().some((storedSticker) =>
    isSameCustomSticker(storedSticker, sticker)
  );
}

export function addCustomStickerToCart(sticker) {
  if (!sticker?.imageUrl) {
    return false;
  }

  const stickers = getCustomStickers();

  if (stickers.some((storedSticker) => isSameCustomSticker(storedSticker, sticker))) {
    return false;
  }

  stickers.push(sticker);
  localStorage.setItem(CUSTOM_STICKERS_KEY, JSON.stringify(stickers));
  return true;
}
