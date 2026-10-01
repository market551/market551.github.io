/*
 * EASY. — Video configuration (the only file you edit to add videos)
 *
 * HOW TO ADD A VIDEO TO A PAGE
 *  1. Pick the page key = the file name without ".html"
 *     Articles:  what-is-trade, what-is-money, what-is-a-market, how-price-is-formed,
 *                market-participants, liquidity, volatility, risk, financial-assets, exchanges
 *     Markets:   forex, commodities, stocks, bonds, futures, options, crypto
 *     Other:     start
 *  2. Add one line below. Pages with no entry show NO video box.
 *
 *  YouTube  : { platform: "youtube",  id: "dQw4w9WgXcQ", title: "..." }          (the 11 characters after v= or /shorts/)
 *  Rumble   : { platform: "rumble",   id: "v1abcde",     title: "..." }          (the id from the EMBED code, not the page URL)
 *  Facebook : { platform: "facebook", url: "https://www.facebook.com/.../videos/123", title: "..." }
 *
 *  Add  format: "vertical"  for Shorts / Reels (9:16). Default is wide (16:9).
 *  Add  note: "..."  for a one-line description under the video (optional).
 *
 *  Keep videos educational: no profit promises, no signals, no broker links.
 */
window.EASY_VIDEOS = {
  // "liquidity": { platform: "youtube", id: "VIDEO_ID_HERE", title: "What is liquidity?", format: "vertical" },
};

/* Your channel pages (leave "" to hide a link). */
window.EASY_CHANNELS = {
  youtube: "",
  facebook: "",
  rumble: ""
};
