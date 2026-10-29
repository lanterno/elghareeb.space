import {
  $,
  component$,
  type JSXOutput,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

import { type NavItem, site } from "~/platform/seo";
import { Button, CloseIcon, MenuIcon } from "~/platform/ui";

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
 * reach. The menu closes on navigation, on Escape and on a click elsewhere.
 */
export const Navbar = component$(() => {
  const location = useLocation();
  const menuOpen = useSignal(false);
  const menuButton = useSignal<HTMLButtonElement>();
  const nav = useSignal<HTMLElement>();

  useTask$(({ track }) => {
    track(() => location.url.pathname);
    menuOpen.value = false;
  });

  useOnDocument(
    "click",
    $((event: Event) => {
      if (!menuOpen.value || !(event.target instanceof Node)) return;
      if (nav.value?.contains(event.target) === false) menuOpen.value = false;
    })
  );

  return (
    <nav
      ref={nav}
      aria-label="Main"
      onKeyDown$={(event) => {
        if (event.key !== "Escape" || !menuOpen.value) return;
        menuOpen.value = false;
        menuButton.value?.focus();
      }}
      class="relative mx-auto max-w-[720px]"
    >
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
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen.value ? "true" : "false"}
            aria-controls="site-menu"
            aria-label={menuOpen.value ? "Close menu" : "Open menu"}
            onClick$={() => {
              menuOpen.value = !menuOpen.value;
            }}
            class="grid h-11 w-11 place-items-center rounded-full bg-wash/16 text-ink md:hidden"
          >
            {menuOpen.value ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <ul
        id="site-menu"
        hidden={!menuOpen.value}
        class="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-card bg-panel p-2 shadow-raised md:hidden"
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
