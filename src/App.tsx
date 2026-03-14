import { useEffect, useState } from 'react';
import { JsonInput } from './components/JsonInput';
import { JsonOutput } from './components/JsonOutput';
import { ThemeToggle } from './components/ThemeToggle';
import { useJsonParser } from './hooks/useJsonParser';
import { useTheme } from './hooks/useTheme';

const sampleJson = `{"creator":"Datenflieger","stack":["React","Vite","Tailwind"],"ready":true}`;

function App() {
  const [input, setInput] = useState(sampleJson);
  const [copyLabel, setCopyLabel] = useState('Copy');
  const { theme, toggleTheme } = useTheme();
  const { error, formatted, highlighted, isValid, isTyping } = useJsonParser(input);

  useEffect(() => {
    if (copyLabel === 'Copy') return;
    const timer = window.setTimeout(() => setCopyLabel('Copy'), 1800);
    return () => window.clearTimeout(timer);
  }, [copyLabel]);

  const handleApply = () => {
    if (!formatted) return;
    setInput(formatted);
  };

  const handleCopy = async () => {
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopyLabel('Copied!');
    } catch {
      setCopyLabel('Clipboard blocked');
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">
            JsonZap
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92]">
            Fix busted JSON fast.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Format it, validate it, and get back to shipping before your tabs hit double
            digits.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <div className="rounded-full border border-line px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-muted">
            {isValid ? 'Good to go' : 'Needs a fix'}
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <JsonInput value={input} onChange={setInput} onFormat={handleApply} isTyping={isTyping} />
        <JsonOutput
          highlighted={highlighted}
          error={error}
          isValid={isValid}
          canCopy={Boolean(formatted)}
          copyLabel={copyLabel}
          onCopy={handleCopy}
        />
      </section>
    </main>
  );
}

export default App;
