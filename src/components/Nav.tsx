import { useEffect, useRef, useState } from 'react';
import { nav } from '../data/site';

/** The only React island on the page. It carries the small-screen menu —
    open state, Escape to close, and closing again once the viewport is wide
    enough that the links are visible anyway — and, on wide screens, the rule
    that slides between the links under the pointer. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  /* One rule for the whole row rather than an underline per link, so it can
     travel between them. Width and offset are measured rather than guessed:
     the labels are content, and a CSS-only version would have to assume they
     never change. It keeps its last position when the pointer leaves and
     fades out there, which is why the position and the visibility are
     separate — animating out of a collapsed width reads as a glitch. */
  const row = useRef<HTMLDivElement>(null);
  const [rule, setRule] = useState({ left: 0, width: 0, shown: false });

  const moveTo = (link: HTMLElement) => {
    const track = row.current;
    if (!track) return;
    const bounds = link.getBoundingClientRect();
    setRule({
      left: bounds.left - track.getBoundingClientRect().left,
      width: bounds.width,
      shown: true,
    });
  };

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
        {/* display:contents on small screens, so the links stay direct
            children of the stacked panel and the rule never applies there. */}
        <div
          ref={row}
          className="contents lg:relative lg:flex lg:items-center lg:gap-9"
          onMouseLeave={() => setRule((was) => ({ ...was, shown: false }))}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2 text-label text-white no-underline underline-offset-[6px] hover:underline lg:py-0 lg:hover:no-underline"
              onClick={() => setOpen(false)}
              onMouseEnter={(event) => moveTo(event.currentTarget)}
              onFocus={(event) => moveTo(event.currentTarget)}
              onBlur={() => setRule((was) => ({ ...was, shown: false }))}
            >
              {item.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2 left-0 hidden h-px bg-white transition-[transform,width,opacity] duration-300 ease-out motion-reduce:transition-none lg:block"
            style={{
              transform: `translateX(${rule.left}px)`,
              width: `${rule.width}px`,
              opacity: rule.shown ? 1 : 0,
            }}
          />
        </div>
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
