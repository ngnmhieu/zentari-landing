import { useEffect, useState } from 'react';
import { nav } from '../data/site';

/** The only React island on the page. It exists for the small-screen menu:
    open state, Escape to close, and closing again once the viewport is wide
    enough that the links are visible anyway. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  /* The bar starts transparent, so an open menu would otherwise hang a solid
     dark panel off a clear strip. The bar is not this island's markup, so the
     state is handed over as an attribute it styles itself from. */
  useEffect(() => {
    document.querySelector('header')?.toggleAttribute('data-menu-open', open);
  }, [open]);

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
        className="text-label text-white lg:hidden"
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
        } absolute inset-x-0 top-full flex-col gap-1 border-b border-white/10 bg-ink px-gutter pb-6 lg:static lg:flex lg:flex-row lg:items-center lg:gap-9 lg:border-0 lg:bg-transparent lg:px-0 lg:pb-0`}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="py-2 text-label text-white no-underline hover:underline lg:py-0"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#quote"
          className="mt-3 rounded-edge bg-primary px-6 py-3 text-center text-label font-medium text-white no-underline transition-colors hover:bg-primary/90 lg:mt-0"
          onClick={() => setOpen(false)}
        >
          Request a quote
        </a>
      </nav>
    </>
  );
}
