export enum gridSelector {
  ROW = 'tr, [role="row"]',
  CELL = 'th, td, [role="gridcell"]',
  SCROLL_ROW = 'tr:not([data-fixed]), [role="row"]',
  SORT_HEADER = 'th[aria-sort]',
  TABBABLE = '[tabindex="0"]',
};