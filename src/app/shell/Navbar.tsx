import { component$, type JSXOutput, useSignal, useTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { isBrowser } from "@builder.io/qwik/build";

import { type NavItem, site } from "~/platform/seo";
import { Button, CloseIcon, MenuIcon, ThemeSwitch } from "~/platform/ui";

interface NavLinkProps {
  page: NavItem;
  current: boolean;
  /** The phone menu's rows are taller */
  variant: "bar" | "menu";
}

const NavLink = ({ page, current, variant }: NavLinkProps): JSXOutput => (
  <Link
    href={page.href}
    aria-current={current ? "page" : undefined}
    class={[
      variant === "bar"
        ? "block rounded-full px-4 py-2.5 text-sm text-ink transition-colors"
        : "flex min-h-12 items-center rounded-full px-5 text-base text-ink",
      current ? "bg-wash/28 font-bold" : "hover:bg-wash/16",
    ]}
  >
    {page.label}
  </Link>
);

/**
 * The floating nav pill. On a phone the page links fold into a menu, while "Let’s talk" stays in
 * reach. The menu is a popover: the browser opens and closes it, closes it on Escape and on a
 * click elsewhere, and swaps the button's icon through CSS, so no script runs until a page
 * changes under an open menu. It hangs below the pill through CSS anchor positioning; where that
 * is missing it still opens, centred on the screen.
 */
export const Navbar = component$(() => {
  const location = useLocation();
  const menu = useSignal<HTMLElement>();

  useTask$(({ track }) => {
    track(() => location.url.pathname);
    if (isBrowser && menu.value?.matches(":popover-open") === true) menu.value.hidePopover();
  });

  return (
    <nav aria-label="Main" class="relative mx-auto max-w-[720px] [anchor-name:--site-nav]">
      <div class="flex items-center justify-between gap-3 rounded-full bg-panel/94 py-2 pl-3 pr-2 shadow-raised">
        <Link href="/" class="flex items-center gap-2.5 rounded-full text-ink">
          <span
            aria-hidden="true"
            class="grid h-9 w-9 place-items-center rounded-[12px] bg-ink font-display text-lg font-extrabold text-panel"
          >
            A
          </span>
          <span class="text-[15px] font-bold">
            Ahmed<span class="hidden sm:inline"> Elghareeb</span>
          </span>
        </Link>

        <ul class="hidden items-center gap-0.5 md:flex">
          {site.nav.map((page) => (
            <li key={page.href}>
              <NavLink page={page} current={location.url.pathname === page.href} variant="bar" />
            </li>
          ))}
        </ul>

        <div class="flex items-center gap-1.5">
          <Button href="#talk" variant="ink-compact">
            Let’s talk
          </Button>
          <ThemeSwitch />
          <button
            type="button"
            popovertarget="site-menu"
            aria-label="Menu"
            class="grid h-11 w-11 place-items-center rounded-full bg-wash/16 text-ink md:hidden"
          >
            <span class="[nav:has(:popover-open)_&]:hidden">
              <MenuIcon />
            </span>
            <span class="hidden [nav:has(:popover-open)_&]:block">
              <CloseIcon />
            </span>
          </button>
        </div>
      </div>

      {/* A popover sits in the top layer, so it is placed against the pill by anchor, not by flow */}
      <ul
        id="site-menu"
        ref={menu}
        popover="auto"
        class="m-0 flex-col gap-1 rounded-card border-0 bg-panel p-2 text-ink shadow-raised [position-anchor:--site-nav] open:flex md:hidden [&:popover-open]:flex [@supports(anchor-name:--a)]:[inset:auto] [@supports(anchor-name:--a)]:left-[anchor(left)] [@supports(anchor-name:--a)]:top-[calc(anchor(bottom)+8px)] [@supports(anchor-name:--a)]:w-[anchor-size(width)]"
      >
        {site.nav.map((page) => (
          <li key={page.href}>
            <NavLink page={page} current={location.url.pathname === page.href} variant="menu" />
          </li>
        ))}
      </ul>
    </nav>
  );
});
