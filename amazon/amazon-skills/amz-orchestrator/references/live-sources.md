# Live sources: where each figure lives and how to read it

Method notes only — no rates are stored here, because they change. Everything below worked on
2026-11-14; if a page has moved, find it again from the parent page rather than guessing a number.

## Official figures

| Need | Where | How to read it | Known snags |
|---|---|---|---|
| Selling plan fee, storage rates, surcharge notices | `sell.amazon.co.uk/pricing` | Plain fetch works. Read the dated notes ("Starting <date>, the ... surcharge ...") as well as the tables | The referral table on this page does not render to text; use the rate card |
| FBA fulfilment fees by size tier; Low-Price FBA; referral fee schedule | The "Rate Card" PDF linked from the pricing page under "Downloadable rate cards" (hosted on `m.media-amazon.com`; the file name changes with each edition) | Download, convert to text, then read the UK column. Fulfilment tables are near the front, referral fees near the back. Record the "Effective as of" date printed in the footer | Fetch tools return the PDF as binary. If `pdftotext` is missing on macOS, use PDFKit (snippet below). The first referral column is read as UK — confirm in Seller Central |
| Which size tier a product falls in | The tier definitions printed above each block of the rate card | Sort packaged dimensions longest to shortest; check both unit weight and dimensional weight where the footnote says the greater applies; note the category exceptions in the footnotes | A few millimetres or grams change the tier. Use Amazon's own Revenue Calculator as the authority once the user has a seller account |
| Fees Amazon actually charges, VAT on fees | The user's Seller Central (fee preview, tax invoices) | Ask for an export or screenshot | Seller Central help pages usually return only navigation to fetch tools |
| Duty, import VAT, trade remedies | `trade-tariff.service.gov.uk/commodities/<10-digit code>?country=CN` | Open in a browser. Read "Third country duty", the VAT row, and look for anti-dumping, countervailing, additional duties and import controls | Plain fetchers get HTTP 403. The code itself is a classification judgement: label it `ASSUMED` until a broker confirms |
| VAT registration threshold | `gov.uk/register-for-vat` | Plain fetch works | Threshold is on rolling 12-month taxable turnover, not profit |
| EORI | `gov.uk/eori` | Plain fetch works | — |

PDF to text on macOS without poppler:

```swift
// swift pdf2txt.swift <in.pdf> <out.txt>
import Foundation
import PDFKit
let a = CommandLine.arguments
guard let d = PDFDocument(url: URL(fileURLWithPath: a[1])) else { exit(1) }
var out = ""
for i in 0..<d.pageCount { out += "\n=== PAGE \(i+1) ===\n" + (d.page(at: i)?.string ?? "") }
try out.write(toFile: a[2], atomically: true, encoding: .utf8)
```

## Marketplace observation (amazon.co.uk; same paths on other marketplaces)

| Page | Path | Gives |
|---|---|---|
| Best Sellers / New Releases / Movers and Shakers | `/gp/bestsellers/<dept>`, `/gp/new-releases/<dept>`, `/gp/movers-and-shakers/<dept>` (e.g. `outdoors`, `kitchen`, `pet-supplies`, `diy`, `sports`, `automotive`) | Seeds only. Top-level lists are dominated by consumables, national brands and whatever is in season |
| Search, page one | `/s?k=<phrase with + for spaces>` | Price, rating, review count, sponsored flag, badge, "N+ bought in past month" |
| Product page | `/dp/<ASIN>` | Title, brand, and the "Customers say" summary of review themes. Rank, dimensions and weight load late and are often missing from a simple text read — scroll to the details block or ask the user |
| Google Trends | `trends.google.com/trends/explore?date=today%205-y&geo=GB&q=<up to 5 terms, comma-separated>` | Shape and relative size only. Reading months off the chart is unreliable; use the CSV download or a history tool for months |

Read these in the user's own browser, one page at a time, as a visitor. Keep a run to a few dozen
page loads, do not paginate through results, and stop and ask the user for an export if a robot
check appears. Record the date: every one of these is a snapshot.

Search page — one compact row per result (run in the page; returns an array of strings):

```js
[...document.querySelectorAll('div[data-component-type="s-search-result"][data-asin]')]
  .filter(e => e.dataset.asin).slice(0, 24).map(e => {
    const q = s => e.querySelector(s), t = e.innerText;
    return [e.dataset.asin,
      /Sponsored/.test(t) ? 'S' : '',
      /Best Seller/.test(t) ? 'BS' : (/Amazon.s Choice/.test(t) ? 'AC' : ''),
      (q('h2')?.innerText || '').trim().slice(0, 50),
      q('.a-price .a-offscreen')?.innerText || '',
      (q('.a-icon-alt')?.innerText || '').split(' ')[0],
      (t.match(/\(([\d.,]+K?)\)/) || [])[1] || '',
      (t.match(/([\dK+]+)\s+bought in past month/) || [])[1] || ''].join('|');
  })
```

Best Sellers style lists — rank, title, rating, reviews, price:

```js
const t = document.querySelector('#zg').innerText.replace(/\n{2,}/g, '\n');
const p = t.split(/\n#(\d+)\n/).slice(1), rows = [];
for (let i = 0; i < p.length; i += 2) {
  const L = p[i + 1].split('\n').map(s => s.trim()).filter(Boolean);
  const r = L.findIndex(s => /out of 5/.test(s));
  rows.push([p[i], L[0].slice(0, 58), r >= 0 ? L[r].replace(' out of 5 stars', '') : '',
             r >= 0 ? L[r + 1] : '', L.find(s => /^£/.test(s)) || ''].join('|'));
}
rows
```

Both depend on Amazon's page markup, which changes without notice. Check the first row against the
visible page before trusting a batch; if a column comes back empty, fix the selector or read the
page as text instead. The same listing can appear twice on a page (sponsored and organic): count
distinct ASINs when summarising.
