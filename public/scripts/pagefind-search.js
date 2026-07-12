const root = document.querySelector("[data-pagefind-search]");
const input = root?.querySelector("#full-site-search");
const statusElement = root?.querySelector("[data-search-status]");
const results = root?.querySelector("[data-search-results]");
let pagefind;
let requestId = 0;

const setStatus = (message) => {
  if (statusElement) statusElement.textContent = message;
};

const loadPagefind = async () => {
  if (pagefind) return pagefind;
  const module = await import("/pagefind/pagefind.js");
  await module.init?.();
  pagefind = module;
  return module;
};

input?.addEventListener("input", async () => {
  const query = input.value.trim();
  const currentRequest = ++requestId;
  results?.replaceChildren();

  if (query.length < 2) {
    setStatus("Enter at least 2 characters.");
    return;
  }

  setStatus("Searching...");
  try {
    const index = await loadPagefind();
    const response = await index.search(query);
    const matches = await Promise.all(
      response.results.slice(0, 20).map((result) => result.data()),
    );

    if (currentRequest !== requestId) return;
    if (!matches.length) {
      setStatus("No results found.");
      return;
    }

    const items = matches.map((match) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const excerpt = document.createElement("p");
      link.href = match.url;
      link.textContent = match.meta.title ?? match.url;
      excerpt.textContent = match.excerpt.replace(/<[^>]+>/g, "");
      item.append(link, excerpt);
      return item;
    });

    results?.replaceChildren(...items);
    setStatus(
      `${matches.length} ${matches.length === 1 ? "result" : "results"}.`,
    );
  } catch {
    if (currentRequest === requestId) setStatus("Search index unavailable.");
  }
});
