type ThemeToggleProps = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={`Aktiviere ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
  >
    <span className="font-display text-base">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    <span className="text-xs uppercase tracking-[0.3em] text-muted">Mode</span>
  </button>
);
