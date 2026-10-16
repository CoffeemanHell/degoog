const t = window.scopedT("core");

export function clearSearchField(input: HTMLInputElement): void {
  input.value = "";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}

export function handleSearchFieldKeydown(event: Event): void {
  if (!(event instanceof KeyboardEvent) || event.key !== "Escape") return;
  const input = event.currentTarget as HTMLInputElement;
  event.preventDefault();
  if (input.value) clearSearchField(input);
  else input.blur();
}

const _clearSibling = (event: Event): void => {
  const input = (event.currentTarget as HTMLElement)
    .closest(".degoog-search-bar")
    ?.querySelector<HTMLInputElement>(".search-input");
  if (input) clearSearchField(input);
};

export const SearchField = ({
  id,
  class: legacyClass,
  placeholder,
  onInput,
}: {
  id?: string;
  class?: string;
  placeholder: string;
  onInput?: (event: Event) => void;
}): JSX.Element => (
  <label
    class={`degoog-search-bar degoog-search-bar--field ${legacyClass ?? ""}`.trim()}
  >
    <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
    <input
      type="search"
      id={id}
      class="search-input"
      placeholder={placeholder}
      aria-label={placeholder}
      autocomplete="off"
      enterkeyhint="search"
      onInput={onInput}
      onKeyDown={handleSearchFieldKeydown}
    />
    <button
      type="button"
      class="degoog-icon-btn degoog-search-bar-clear"
      aria-label={t("settings-page.tab-search.clear")}
      onClick={_clearSibling}
    >
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </label>
);
