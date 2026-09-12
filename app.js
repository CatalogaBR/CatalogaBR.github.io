const translations = {
  pt: {
    pageTitle: "CatalogaBR — dados do Brasil, prontos para construir",
    pageDescription: "CatalogaBR — dados brasileiros, organizados para quem constrói.",
    status: "Em desenvolvimento",
    eyebrow: "Feita no Brasil · para quem constrói",
    heroTitle: "Dados brasileiros.<br><em>Prontos para construir.</em>",
    heroLead: "Uma API simples para consultar e catalogar os dados que movem o Brasil — começando por CEPs e códigos de barras.",
    discover: "Conheça o projeto",
    comingNote: "Documentação e acesso em breve",
    barcode: "Código de barras",
    purposeKicker: "Nosso propósito",
    purposeTitle: "Menos tempo procurando.<br><span>Mais tempo criando.</span>",
    purposeBody: "Dados públicos e comerciais ainda vivem espalhados, em formatos diferentes e difíceis de integrar. A CatalogaBR nasce para transformar essa complexidade em consultas claras, rápidas e consistentes.",
    purposeSmall: "Uma base feita para produtos, automações e ideias que entendem o Brasil.",
    firstKicker: "Os primeiros catálogos",
    firstTitle: "Começando pelo essencial.",
    firstIntro: "Do endereço na entrega ao produto na prateleira: dados presentes em milhões de operações todos os dias.",
    cepText: "Endereços brasileiros estruturados para cadastros, entregas e validações mais inteligentes.",
    barcodeText: "Informações de produtos a partir de códigos GTIN/EAN, organizadas em uma consulta direta.",
    product: "produto",
    brand: "marca",
    nextKicker: "Próximo passo",
    soonTitle: "Estamos catalogando.<br><span>Em breve, você estará construindo.</span>",
    soonBody: "A API está em desenvolvimento. Estamos preparando os dados, a documentação e uma experiência que respeite o seu tempo.",
    progress: "Preparando a primeira versão",
    footer: "Dados do Brasil, prontos para construir.",
    themeDark: "Ativar tema escuro",
    themeLight: "Ativar tema claro",
    error404Eyebrow: "Erro 404 · rota não encontrada",
    error404Title: "Essa rota ainda não foi catalogada.",
    error404Body: "O endereço pode ter mudado ou nunca ter existido. Volte ao início e continue explorando por lá.",
    error500Eyebrow: "Erro 500 · falha no servidor",
    error500Title: "Algo saiu do catálogo.",
    error500Body: "Encontramos uma falha inesperada. Tente novamente em alguns instantes ou volte ao início.",
    backHome: "Voltar ao início"
  },
  en: {
    pageTitle: "CatalogaBR — Brazilian data, ready to build",
    pageDescription: "CatalogaBR — Brazilian data, organized for builders.",
    status: "In development",
    eyebrow: "Made in Brazil · built for builders",
    heroTitle: "Brazilian data.<br><em>Ready to build.</em>",
    heroLead: "A simple API to query and catalog the data that powers Brazil — starting with postal codes and barcodes.",
    discover: "Discover the project",
    comingNote: "Documentation and access coming soon",
    barcode: "Barcode",
    purposeKicker: "Our purpose",
    purposeTitle: "Less time searching.<br><span>More time building.</span>",
    purposeBody: "Public and commercial data still lives across scattered sources, inconsistent formats and difficult integrations. CatalogaBR turns that complexity into clear, fast and reliable queries.",
    purposeSmall: "A foundation for products, automations and ideas that understand Brazil.",
    firstKicker: "The first catalogs",
    firstTitle: "Starting with the essentials.",
    firstIntro: "From the address on a delivery to the product on a shelf: data behind millions of daily operations.",
    cepText: "Structured Brazilian addresses for smarter registration, deliveries and validation.",
    barcodeText: "Product information from GTIN/EAN codes, organized into one direct query.",
    product: "product",
    brand: "brand",
    nextKicker: "What comes next",
    soonTitle: "We’re cataloging.<br><span>Soon, you’ll be building.</span>",
    soonBody: "The API is under development. We’re preparing the data, documentation and an experience that respects your time.",
    progress: "Preparing the first release",
    footer: "Brazilian data, ready to build.",
    themeDark: "Switch to dark theme",
    themeLight: "Switch to light theme",
    error404Eyebrow: "Error 404 · route not found",
    error404Title: "This route hasn’t been cataloged yet.",
    error404Body: "The address may have moved or never existed. Return home and keep exploring from there.",
    error500Eyebrow: "Error 500 · server failure",
    error500Title: "Something slipped out of the catalog.",
    error500Body: "We found an unexpected issue. Try again in a moment or return to the home page.",
    backHome: "Back to home"
  }
};

function preferredLanguage() {
  const saved = localStorage.getItem("catalogabr-language");
  if (saved === "pt" || saved === "en") return saved;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  return languages.some(language => language.toLowerCase().split("-")[0] === "pt") ? "pt" : "en";
}

function setLanguage(language, persist = false) {
  const lang = language === "pt" ? "pt" : "en";
  const copy = translations[lang];
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const value = copy[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    const value = copy[element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });
  const page = document.documentElement.dataset.page;
  if (page === "404") document.title = `404 — ${copy.error404Title} | CatalogaBR`;
  else if (page === "500") document.title = `500 — ${copy.error500Title} | CatalogaBR`;
  else document.title = copy.pageTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = copy.pageDescription;
  updateThemeControl(lang);
  if (persist) localStorage.setItem("catalogabr-language", lang);
}

function activeTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeControl(language) {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  const isDark = activeTheme() === "dark";
  const copy = translations[language || (document.documentElement.lang.startsWith("pt") ? "pt" : "en")];
  button.setAttribute("aria-pressed", String(isDark));
  button.setAttribute("aria-label", isDark ? copy.themeLight : copy.themeDark);
  button.title = isDark ? copy.themeLight : copy.themeDark;
}

function setTheme(theme, persist = false) {
  const selected = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selected;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = selected === "dark" ? "#071a13" : "#0d5c3d";
  updateThemeControl();
  if (persist) localStorage.setItem("catalogabr-theme", selected);
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang, true));
});

const themeButton = document.querySelector(".theme-toggle");
if (themeButton) {
  themeButton.addEventListener("click", () => setTheme(activeTheme() === "dark" ? "light" : "dark", true));
}

const systemTheme = matchMedia("(prefers-color-scheme: dark)");
systemTheme.addEventListener?.("change", event => {
  if (!localStorage.getItem("catalogabr-theme")) setTheme(event.matches ? "dark" : "light");
});

setTheme(activeTheme());
setLanguage(preferredLanguage());
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".manifesto-grid, .section-heading, .feature-card, .soon-section h2, .soon-section > p, .progress-wrap");
revealTargets.forEach(target => target.dataset.reveal = "");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealTargets.forEach(target => observer.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add("visible"));
}
