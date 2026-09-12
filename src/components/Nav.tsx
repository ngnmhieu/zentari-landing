import { useEffect, useState } from 'react';
import { nav } from '../data/site';

/** The only React island on the page. It exists for the small-screen menu:
    open state, Escape to close, and closing again once the viewport is wide
    enough that the links are visible anyway. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const wide = window.matchMedia('(min-width: 64rem)');
    const onWiden = () => wide.matches && setOpen(false);

    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWiden);
    return () => {
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWiden);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="text-label text-ink lg:hidden"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((was) => !was)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav
        id="site-nav"
        aria-label="Main"
        className={`${
          open ? 'flex' : 'hidden'
        } absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-white px-gutter pb-6 lg:static lg:flex lg:flex-row lg:items-center lg:gap-9 lg:border-0 lg:px-0 lg:pb-0`}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="py-2 text-label text-body no-underline transition-colors hover:text-ink lg:py-0"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#quote"
          className="mt-3 rounded-edge bg-accent px-6 py-3 text-center text-label font-medium text-ink no-underline transition-colors hover:bg-accent/85 lg:mt-0"
          onClick={() => setOpen(false)}
        >
          Request a quote
        </a>
      </nav>
    </>
  );
}
