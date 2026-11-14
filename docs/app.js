const GH = "https://github.com/samansalari/Amazon-UK-EU-Skillset";
const PAGES = "https://samansalari.github.io/Amazon-UK-EU-Skillset/";
const PIPELINE = [
  ["1–2", "Discover", "amz-discovery", "Is there demand worth a closer look?", "amazon-skills/amz-discovery/GUIDE.md"],
  ["3", "Validate", "amz-validation", "Can a new listing actually enter?", "amazon-skills/amz-validation/GUIDE.md"],
  ["4", "Source", "amz-sourcing", "Can a supplier make this, like for like?", "amazon-skills/amz-sourcing/GUIDE.md"],
  ["5", "Comply", "amz-compliance", "Is it legal to sell, and whose IP is it?", "amazon-skills/amz-compliance/GUIDE.md"],
  ["6", "Cost", "amz-economics", "What does one shipped unit really make?", "amazon-skills/amz-economics/GUIDE.md"],
  ["7 · 10", "Order", "amz-inventory", "How many units, and when to reorder?", "amazon-skills/amz-inventory/GUIDE.md"],
  ["8", "List", "amz-listing", "Does the listing say what buyers need?", "amazon-skills/amz-listing/GUIDE.md"],
  ["8", "Price", "amz-pricing", "What price still clears the floor?", "amazon-skills/amz-pricing/GUIDE.md"],
  ["9", "Ads", "amz-ads", "What ad spend still makes a profit?", "amazon-skills/amz-ads/GUIDE.md"],
  ["All", "Orchestrate", "amz-orchestrator", "What is the next cheapest question?", "amazon-skills/amz-orchestrator/GUIDE.md"]
];

const EXAMPLE = {
  vat_registered: true, vat_rate: 0.2, postponed_vat_accounting: true, vat_threshold_gbp: 90000,
  order_units: 1000, unit_cost_supplier_ccy: 4, packaging_customisation_supplier_ccy: 0,
  fx_gbp_per_supplier_ccy: 0.8, fx_and_payment_fee_pct: 0,
  freight_insurance_gbp: 500, duty_rate: 0.05, clearance_brokerage_gbp: 100,
  uk_transport_gbp: 100, inspection_gbp: 115, prep_per_unit_gbp: 0,
  unsellable_rate: 0, contingency_pct_of_landed: 0,
  selling_price_gbp: 24, promo_discount_pct: 0, promo_fee_per_unit_gbp: 0,
  referral_rate: 0.15, referral_min_gbp: 0, fulfilment_fee_gbp: 3,
  other_amazon_fees_per_unit_gbp: 0, storage_per_unit_month_gbp: 0, months_in_storage: 0,
  return_rate: 0.1, resellable_return_frac: 0.5, return_cost_per_returned_unit_gbp: 1,
  tacos: 0.1, min_profit_per_unit_gbp: 4, target_margin: 0.15,
  monthly_overheads_gbp: 150, monthly_units: 304, one_off_costs_gbp: 500,
  launch_ad_budget_gbp: 300, cash_reserve_gbp: 0,
  production_days: 30, transit_days: 40, deposit_pct: 0.3, payout_delay_days: 14, safety_days: 10
};
const SCENARIOS = {
  conservative: { selling_price_gbp: 21.99, return_rate: 0.14, tacos: 0.15, freight_insurance_gbp: 650, fx_gbp_per_supplier_ccy: 0.84, monthly_units: 180, target_margin: 0.1 },
  base: {},
  optimistic: { tacos: 0.07, return_rate: 0.07, monthly_units: 400 }
};
const FIELDS = [
  ["Selling", "selling_price_gbp", "List price, inc VAT", "£", "0.01"],
  ["Selling", "promo_discount_pct", "Average discount across all units", "%", "0.1", true],
  ["Selling", "referral_rate", "Referral fee", "%", "0.1", true],
  ["Selling", "referral_min_gbp", "Minimum referral fee", "£", "0.01"],
  ["Selling", "fulfilment_fee_gbp", "Fulfilment fee, ex VAT", "£", "0.01"],
  ["Selling", "other_amazon_fees_per_unit_gbp", "Other Amazon fees / unit", "£", "0.01"],
  ["Selling", "tacos", "TACoS", "%", "0.1", true],
  ["Selling", "return_rate", "Return rate", "%", "0.1", true],
  ["Selling", "resellable_return_frac", "Share of returns resold", "%", "1", true],
  ["Selling", "return_cost_per_returned_unit_gbp", "Handling cost per return", "£", "0.01"],
  ["Selling", "promo_fee_per_unit_gbp", "Promo fee / unit", "£", "0.01"],
  ["Selling", "storage_per_unit_month_gbp", "Storage / unit / month", "£", "0.01"],
  ["Selling", "months_in_storage", "Months in storage", "", "0.1"],
  ["Selling", "min_profit_per_unit_gbp", "Profit floor / unit", "£", "0.01"],
  ["Selling", "target_margin", "Target contribution margin", "%", "0.1", true],
  ["Purchase", "order_units", "Order units", "", "1"],
  ["Purchase", "unit_cost_supplier_ccy", "Unit cost, supplier currency", "", "0.01"],
  ["Purchase", "packaging_customisation_supplier_ccy", "Packaging, supplier currency", "", "0.01"],
  ["Purchase", "fx_gbp_per_supplier_ccy", "GBP per 1 supplier currency", "", "0.001"],
  ["Purchase", "fx_and_payment_fee_pct", "FX and payment fee", "%", "0.1", true],
  ["Import", "freight_insurance_gbp", "Freight and insurance", "£", "1"],
  ["Import", "duty_rate", "Duty rate", "%", "0.1", true],
  ["Import", "clearance_brokerage_gbp", "Clearance and brokerage", "£", "1"],
  ["Import", "uk_transport_gbp", "UK transport", "£", "1"],
  ["Import", "inspection_gbp", "Inspection", "£", "1"],
  ["Import", "prep_per_unit_gbp", "Prep / unit", "£", "0.01"],
  ["Import", "unsellable_rate", "Unsellable rate", "%", "0.1", true],
  ["Import", "contingency_pct_of_landed", "Contingency on landed cost", "%", "0.1", true],
  ["Tax", "vat_registered", "VAT registered", "bool"],
  ["Tax", "vat_rate", "VAT rate", "%", "0.1", true],
  ["Tax", "postponed_vat_accounting", "Postponed VAT accounting", "bool"],
  ["Tax", "vat_threshold_gbp", "VAT threshold", "£", "1"],
  ["Business", "monthly_units", "Units / month", "", "1"],
  ["Business", "monthly_overheads_gbp", "Monthly overheads", "£", "1"],
  ["Business", "one_off_costs_gbp", "One-off costs", "£", "1"],
  ["Business", "launch_ad_budget_gbp", "Launch ad budget", "£", "1"],
  ["Business", "cash_reserve_gbp", "Cash reserve", "£", "1"],
  ["Business", "production_days", "Production days", "d", "1"],
  ["Business", "transit_days", "Transit days", "d", "1"],
  ["Business", "deposit_pct", "Deposit", "%", "1", true],
  ["Business", "payout_delay_days", "Payout delay", "d", "1"],
  ["Business", "safety_days", "Safety days", "d", "1"]
];

const state = { files: {}, scenario: "base", inputs: Object.assign({}, EXAMPLE), reorder: { daily: 10, sdDaily: 4, lead: 70, sdLead: 7, service: 95, onHand: 600, inbound: 0, cover: 60 } };
const main = document.getElementById("main");

function gbp(n) {
  if (n == null || Number.isNaN(n)) return "n/a";
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);
}
function pct(n) {
  if (n == null || Number.isNaN(n)) return "n/a";
  return (n * 100).toFixed(1) + "%";
}
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
function go(hash) { location.hash = "#/" + hash; }
function route() {
  const raw = (location.hash || "#/desk").replace(/^#\/?/, "");
  const [view, ...rest] = raw.split("/");
  const path = rest.join("/");
  document.body.classList.toggle("paper", view === "skills" || view === "workspace");
  document.querySelectorAll("[data-nav]").forEach((b) => b.setAttribute("aria-current", b.dataset.nav === view ? "page" : "false"));
  const views = { desk: renderDesk, skills: () => renderDoc("skills", path || "SKILL.md"), numbers: () => renderNumbers(path || "unit"), workspace: () => renderDoc("workspace", path), install: renderInstall };
  (views[view] || renderDesk)();
  main.focus && main.setAttribute("tabindex", "-1");
}

function renderDesk() {
  main.innerHTML = `
    <p class="kicker">Amazon UK / EU · version 2026-11-14.7</p>
    <h1>A buying decision the evidence supports.</h1>
    <p class="lede">Ten stages for sourcing from China and selling on Amazon UK and Europe. Read the skills. Run the calculators. Install them in your agent.</p>
    <div class="row">
      <button class="cta" type="button" data-go="numbers">Run the numbers</button>
      <button class="ghost" type="button" data-go="skills">Read the skills</button>
    </div>
    <p class="note">Unofficial. Not affiliated with Amazon. Not legal, tax or financial advice. The scripts look nothing up. Example figures are labelled EXAMPLE.</p>
    <div class="pipeline" id="pipe"></div>
    <p class="footer">The published workspace under Workspace is one seller’s research snapshot, included so the suite is readable end to end. Replace it with your own profile before you treat a number as yours.</p>`;
  const pipe = document.getElementById("pipe");
  PIPELINE.forEach(([stage, title, name, blurb, path]) => {
    const b = el(`<button class="card" type="button"><em>Stage ${stage}</em><b>${title}</b><span>${blurb}</span></button>`);
    b.addEventListener("click", () => go("skills/" + path));
    pipe.appendChild(b);
  });
  main.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
}

function fileList(prefix) {
  return Object.keys(state.files).filter((p) => p.startsWith(prefix)).sort();
}
function renderDoc(kind, path) {
  const files = kind === "skills"
    ? ["SKILL.md", "README.md"].concat(PIPELINE.map((x) => x[4])).concat(fileList("amazon-skills/").filter((p) => !p.endsWith("SKILL.md")))
    : fileList("amazon-business/");
  const unique = [...new Set(files)];
  const current = path && state.files[path] != null ? path : unique[0];
  main.innerHTML = `<div class="split"><nav class="side" id="side"></nav><article><div class="doc-head"><div><p class="kicker">${kind}</p><h2 id="doc-title"></h2></div><a id="gh-link" href="#">Open on GitHub</a></div><div class="prose" id="doc"></div></article></div>`;
  const side = document.getElementById("side");
  unique.forEach((p) => {
    const b = el(`<button type="button">${p.replace("amazon-skills/", "").replace("amazon-business/", "")}</button>`);
    if (p === current) b.setAttribute("aria-current", "true");
    b.addEventListener("click", () => go(kind + "/" + p));
    side.appendChild(b);
  });
  document.getElementById("doc-title").textContent = current || "Nothing here";
  document.getElementById("gh-link").href = GH + "/blob/main/amazon/" + current;
  const body = state.files[current] || "File not in the published bundle.";
  const doc = document.getElementById("doc");
  if (current.endsWith(".json")) doc.innerHTML = "<pre><code>" + escapeHtml(JSON.stringify(JSON.parse(body), null, 2)) + "</code></pre>";
  else if (current.endsWith(".py") || current.endsWith(".csv")) doc.innerHTML = "<pre><code>" + escapeHtml(body) + "</code></pre>";
  else if (window.marked) {
    doc.innerHTML = marked.parse(body, { gfm: true });
    doc.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const resolved = resolvePath(current, href.split("#")[0]);
        if (state.files[resolved] != null) go(kind + "/" + resolved);
        else location.href = GH + "/blob/main/amazon/" + resolved;
      });
    });
  } else doc.textContent = body;
}
function resolvePath(base, rel) {
  const parts = base.split("/").slice(0, -1);
  rel.split("/").forEach((p) => {
    if (p === "..") parts.pop();
    else if (p && p !== ".") parts.push(p);
  });
  return parts.join("/");
}
function escapeHtml(s) { return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

function renderNumbers(mode) {
  main.innerHTML = `
    <p class="kicker">Calculators · same arithmetic as the Python scripts</p>
    <h1>Run the numbers.</h1>
    <div class="row" id="modes"></div>
    <div id="calc"></div>
    <p class="footer" id="selftest"></p>`;
  const modes = [["unit", "Unit economics"], ["ceiling", "Cost ceiling"], ["vat", "VAT compare"], ["reorder", "Reorder"]];
  const box = document.getElementById("modes");
  modes.forEach(([id, label]) => {
    const b = el(`<button class="ghost" type="button">${label}</button>`);
    if (id === mode) b.setAttribute("aria-current", "page");
    b.addEventListener("click", () => go("numbers/" + id));
    box.appendChild(b);
  });
  if (mode === "reorder") renderReorder();
  else renderEconomics(mode);
  try {
    AmazonCalc.selftest();
    document.getElementById("selftest").textContent = "Browser calculator matches the published Python self-tests.";
  } catch (err) {
    document.getElementById("selftest").textContent = "Self-test failed: " + err.message;
  }
}

function renderEconomics(mode) {
  const host = document.getElementById("calc");
  host.innerHTML = `<div class="calc-layout"><form id="econ"></form><aside class="results" id="results"></aside></div>`;
  const form = document.getElementById("econ");
  form.appendChild(el(`<div class="row" id="scen"></div>`));
  ["conservative", "base", "optimistic"].forEach((name) => {
    const b = el(`<button class="chip" type="button">${name}</button>`);
    if (state.scenario === name) b.setAttribute("aria-current", "page");
    b.addEventListener("click", () => {
      state.scenario = name;
      state.inputs = Object.assign({}, EXAMPLE, SCENARIOS[name]);
      go("numbers/" + mode);
    });
    form.querySelector("#scen").appendChild(b);
  });
  form.appendChild(el(`<p class="warn">Illustrative example. Not a live fee, duty or quote. Replace every figure and record its source before you use it.</p>`));
  const groups = [...new Set(FIELDS.map((f) => f[0]))];
  groups.forEach((group) => {
    const fs = el(`<fieldset><legend>${group}</legend></fieldset>`);
    FIELDS.filter((f) => f[0] === group).forEach((spec) => {
      const [,, label, unit, step, isPct] = spec;
      const key = spec[1];
      const val = state.inputs[key];
      let control;
      if (unit === "bool") {
        control = `<input type="checkbox" data-key="${key}" ${val ? "checked" : ""}>`;
      } else {
        const shown = isPct ? (Number(val) * 100) : val;
        control = `<input type="number" data-key="${key}" data-pct="${isPct ? "1" : ""}" step="${step}" value="${shown}">`;
      }
      const row = el(`<label class="field">${label}${unit && unit !== "bool" ? " (" + unit + ")" : ""} ${control}</label>`);
      fs.appendChild(row);
    });
    form.appendChild(fs);
  });
  form.addEventListener("input", () => {
    state.scenario = "custom";
    readEconForm();
    paintEcon(mode);
  });
  paintEcon(mode);
}
function readEconForm() {
  document.querySelectorAll("#econ [data-key]").forEach((input) => {
    const key = input.dataset.key;
    if (input.type === "checkbox") state.inputs[key] = input.checked;
    else state.inputs[key] = input.dataset.pct === "1" ? Number(input.value) / 100 : Number(input.value);
  });
}
function paintEcon(mode) {
  const i = Object.assign({}, AmazonCalc.DEFAULTS, state.inputs);
  const box = document.getElementById("results");
  if (!i.order_units || !i.monthly_units || !i.selling_price_gbp) {
    box.innerHTML = `<p class="warn">Need a selling price, order size and monthly units.</p>`;
    return;
  }
  if (mode === "ceiling") {
    const c = AmazonCalc.ceiling(i);
    box.innerHTML = `<span class="meta">${state.scenario} · ceiling</span><div class="big">${gbp(c.max_landed_per_sellable_unit)}</div><p>Most the landed cost may be, and still leave the target margin.</p><div class="metrics"><div><span>Max goods + freight / unit</span><b>${gbp(c.max_goods_freight_per_unit)}</b></div><div><span>Max supplier unit cost</span><b>${c.max_unit_cost_supplier_ccy == null ? "n/a" : c.max_unit_cost_supplier_ccy.toFixed(2)}</b></div></div>`;
    return;
  }
  if (mode === "vat") {
    const v = AmazonCalc.vatCompare(i);
    box.innerHTML = `<span class="meta">${state.scenario} · VAT</span><div class="big">${gbp(v.cost_of_registering_per_unit)}</div><p>Contribution given up per shipped unit if you register, on these inputs. UK service costs entered VAT-inclusive are not re-based.</p><div class="metrics"><div><span>Not registered</span><b>${gbp(v.not_registered)}</b></div><div><span>Registered</span><b>${gbp(v.registered)}</b></div><div><span>Units / year at threshold</span><b>${v.units_per_year_at_threshold == null ? "n/a" : Math.round(v.units_per_year_at_threshold).toLocaleString("en-GB")}</b></div></div>`;
    return;
  }
  const e = AmazonCalc.evaluate(i);
  const post = e.unit.contribution_after_ads;
  box.innerHTML = `<span class="meta">${state.scenario} · after ads</span><div class="big ${post < 0 ? "bad" : "good"}">${gbp(post)}</div><p>Contribution per shipped unit. Returns are netted in. Margin is on net revenue, not a mark-up.</p>
    <div class="metrics">
      <div><span>Landed / sellable unit</span><b>${gbp(e.landed.per_sellable_unit)}</b></div>
      <div><span>Margin</span><b>${pct(e.unit.contribution_margin)}</b></div>
      <div><span>Break-even price</span><b>${gbp(e.breakeven_price)}</b></div>
      <div><span>Price for profit floor</span><b>${gbp(e.price_for_profit_floor)}</b></div>
      <div><span>Break-even ACoS, inc VAT</span><b>${pct(e.unit.breakeven_acos_inc_vat)}</b></div>
      <div><span>Initial cash</span><b>${gbp(e.cash.initial_cash_requirement)}</b></div>
      <div><span>Reorder funding gap</span><b>${gbp(e.cash.reorder_funding_gap)}</b></div>
      <div><span>Inventory ROI / cycle</span><b>${pct(e.cash.inventory_roi_per_cycle)}</b></div>
    </div>`;
  const table = el(`<table><thead><tr><th>Shock</th><th>Low</th><th>High</th></tr></thead><tbody></tbody></table>`);
  AmazonCalc.sensitivity(i).forEach((row) => {
    table.querySelector("tbody").appendChild(el(`<tr><td>${row.key} ±${Math.round(row.shock * 100)}%</td><td>${gbp(row.lo)}</td><td>${gbp(row.hi)}</td></tr>`));
  });
  box.appendChild(table);
}

function renderReorder() {
  const r = state.reorder;
  document.getElementById("calc").innerHTML = `
    <div class="calc-layout"><form id="re" class="panel">
      ${num("daily", "Average units / day", r.daily)}
      ${num("sdDaily", "SD of daily sales", r.sdDaily)}
      ${num("lead", "Lead time, days", r.lead)}
      ${num("sdLead", "SD of lead time", r.sdLead)}
      ${num("service", "Service level, %", r.service, "0.1")}
      ${num("onHand", "On hand", r.onHand)}
      ${num("inbound", "Inbound", r.inbound)}
      ${num("cover", "Cover after arrival, days", r.cover)}
    </form><aside class="results" id="results"></aside></div>`;
  document.getElementById("re").addEventListener("input", () => {
    document.querySelectorAll("#re [data-k]").forEach((input) => { state.reorder[input.dataset.k] = Number(input.value); });
    paintReorder();
  });
  paintReorder();
}
function num(key, label, value, step) {
  return `<label class="field">${label}<input type="number" data-k="${key}" step="${step || "1"}" value="${value}"></label>`;
}
function paintReorder() {
  const r = state.reorder;
  const p = AmazonCalc.plan(r.daily, r.sdDaily, r.lead, r.sdLead, r.service / 100, r.onHand, r.inbound, r.cover);
  document.getElementById("results").innerHTML = `
    <span class="meta">${p.order_now ? "Order now" : "Not yet"}</span>
    <div class="big ${p.order_now ? "bad" : "good"}">${p.order_now ? "Yes" : "No"}</div>
    <div class="metrics">
      <div><span>Safety stock</span><b>${p.safety_stock.toFixed(1)}</b></div>
      <div><span>Reorder point</span><b>${p.reorder_point.toFixed(1)}</b></div>
      <div><span>Order quantity</span><b>${p.order_quantity.toFixed(1)}</b></div>
      <div><span>Days until reorder</span><b>${p.days_until_reorder.toFixed(1)}</b></div>
      <div><span>Days of cover now</span><b>${p.days_of_cover_now.toFixed(1)}</b></div>
      <div><span>z</span><b>${p.z.toFixed(3)}</b></div>
    </div>
    <p>Assumes roughly steady daily demand. For a seasonal peak, use the peak daily rate, not the year average.</p>`;
}

function renderInstall() {
  main.innerHTML = `
    <p class="kicker">Install</p>
    <h1>One folder, named amazon.</h1>
    <p class="lede">Copy the <code>amazon</code> folder into the skills directory your agent already reads. Do not unzip it over a newer local workspace.</p>
    <div class="install"><pre>git clone --depth 1 ${GH}.git
cp -R Amazon-UK-EU-Skillset/amazon ~/.claude/skills/amazon</pre></div>
    <div class="prose"><table>
      <thead><tr><th>Agent</th><th>Put the folder here</th></tr></thead>
      <tbody>
        <tr><td>Claude Code</td><td>~/.claude/skills/amazon</td></tr>
        <tr><td>Claude apps</td><td>Upload <a href="${GH}/raw/main/amazon.zip">amazon.zip</a>. Code execution has to be on.</td></tr>
        <tr><td>Codex</td><td>~/.codex/skills/amazon</td></tr>
        <tr><td>Cursor</td><td>~/.cursor/skills/amazon</td></tr>
        <tr><td>GitHub Copilot</td><td>~/.copilot/skills/amazon</td></tr>
        <tr><td>Gemini / Antigravity</td><td>~/.gemini/config/skills/amazon</td></tr>
      </tbody>
    </table>
    <p>Then type <code>/amazon</code> or <code>$amazon</code>. The entry file routes the request. It does not invent fees.</p></div>`;
}

document.querySelectorAll("[data-nav]").forEach((b) => b.addEventListener("click", () => go(b.dataset.nav)));
window.addEventListener("hashchange", route);
fetch("content.json").then((r) => r.json()).then((data) => {
  state.files = data.files || {};
  route();
}).catch(() => {
  main.innerHTML = "<p class=\"warn\">Could not load the skill bundle. Open this page from the published site, or serve the docs folder over HTTP.</p>";
});
