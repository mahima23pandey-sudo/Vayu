"use strict";


const LANG_CONFIG = {
  garhwali: {
    label: "Garhwali",
    key: "garhwali",
    files: ["garhwali.json", "garwali.json"] 
  },
  pahari: {
    label: "Kumaoni",
    key: "kumaoni",
    files: ["kumaoni.json",] 
  }
};

const els = {
  langSelect: document.getElementById("languageSelect"),
  langLabel: document.getElementById("langLabel"),
  input: document.getElementById("englishInput"),
  out: document.getElementById("outputText"),
  suggestions: document.getElementById("suggestions"),
  status: document.getElementById("status"),
  btnTranslate: document.getElementById("btnTranslate"),
  btnSpeak: document.getElementById("btnSpeak")
};

let currentLanguage = "garhwali";
let translations = [];         
let normalizedIndex = [];      
let lastTranslation = "";


const normalize = (txt) => txt.toLowerCase().replace(/[?.!,]/g, "").replace(/\s+/g, " ").trim();
const setStatus = (msg) => (els.status.textContent = msg);
const setLabel = (lang) => (els.langLabel.textContent = LANG_CONFIG[lang]?.label || lang);

function buildIndex(langKey) {
  const key = LANG_CONFIG[langKey].key;
  normalizedIndex = translations
    .filter((row) => typeof row.en === "string" && typeof row[key] === "string")
    .map((row) => ({
      norm: normalize(row.en),
      raw: row.en,
      val: row[key]
    }));
}


async function loadLanguage(lang) {
  const cfg = LANG_CONFIG[lang];
  if (!cfg) {
    setStatus(`Unknown language: ${lang}`);
    return;
  }
  setLabel(lang);
  els.btnTranslate.disabled = true;
  els.btnSpeak.disabled = true;
  setStatus("Loading translations…");

  for (const file of cfg.files) {
    try {
      const res = await fetch(file, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("JSON root must be an array");

      translations = data;
      currentLanguage = lang;
      buildIndex(lang);

      setStatus(`Loaded ${normalizedIndex.length} entries from “${file}”.`);
      console.log(`Loaded ${file}:`, translations);
      els.btnTranslate.disabled = false;
      return; 
    } catch (err) {
      console.warn(`Failed to load ${file}: ${err.message}`);
    }
  }

  translations = [];
  normalizedIndex = [];
  setStatus(`Could not load ${cfg.label} translations. Make sure the JSON file is in the same folder (tried: ${cfg.files.join(", ")})`);
  els.btnTranslate.disabled = true;
}


function translateOnce() {
  const input = normalize(els.input.value);
  els.suggestions.textContent = "";
  els.out.textContent = "";
  lastTranslation = "";
  els.btnSpeak.disabled = true;

  if (!input) return;

  if (!normalizedIndex.length) {
    setStatus("No data loaded yet.");
    return;
  }
  const exact = normalizedIndex.find((row) => row.norm === input);
  if (exact) {
    els.out.textContent = exact.val;
    lastTranslation = exact.val;
    els.btnSpeak.disabled = false;
    return;
  }


  const first = input.split(" ")[0] || "";
  const suggs = normalizedIndex
    .filter((row) =>
      
      row.norm.startsWith(first))
    .slice(0, 6)
    .map((row) => row.raw);

  els.out.textContent = `❌ Translation not found for “${input}”.`;
  if (suggs.length) {
    els.suggestions.textContent = "Did you mean: " + suggs.join(", ");
  }
}

els.btnTranslate.addEventListener("click", translateOnce);
els.input.addEventListener("keydown", (e) => { if (e.key === "Enter") translateOnce(); });
els.btnSpeak.addEventListener("click", () => {
  if (!lastTranslation) {
    alert("No translation to speak!");
    return;
  }
  const u = new SpeechSynthesisUtterance(lastTranslation);
  u.lang = "hi-IN"; 
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
});

els.langSelect.addEventListener("change", (e) => loadLanguage(e.target.value));

loadLanguage(currentLanguage);
