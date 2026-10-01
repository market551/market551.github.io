/*
 * EASY. — Advertising control (the only file you edit for ads)
 *
 * NOW:   enabled: false  -> no ad boxes are shown anywhere.
 * LATER: when an ad network approves the site:
 *   1. Paste the network's ad code (between the backticks) into "inContent" and/or "bottom".
 *   2. Change enabled to true.  Upload this file to GitHub.  Done.
 *
 * Slots:  "inContent" = the box between sections
 *         "bottom"    = the box near the end of the page (pages with a single box use this one)
 * An empty slot is hidden automatically, so you never show an empty box.
 * To switch network: replace the code in the slots. To pause ads: set enabled to false.
 * To remove ads from one page: add its file name (without .html) to excludePages.
 *
 * Keep it light: 1 or 2 ads per page. No popups, no overlays, no ads about brokers or signals.
 */
window.EASY_ADS = {
  enabled: false,
  showPlaceholders: false,   // true = show labelled empty boxes (only to check the layout)
  maxPerPage: 2,
  excludePages: [],          // e.g. ["start", "what-is-money"]
  slots: {
    inContent: ``,
    bottom: ``
  }
};
