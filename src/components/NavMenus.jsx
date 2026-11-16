"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useHydrated } from "@/lib/use-hydrated";
import { OpenStatus } from "@/components/OpenStatus";
import { ThemeSwitch } from "@/components/ThemeControls";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

const TEL = `tel:${site.phone.e164}`;

function useCurrent() {
  const pathname = usePathname();
  return (href) => (pathname === href ? "page" : undefined);
}

const closeOnLink = (close) => (e) => {
  if (e.target.closest("a")) close();
};

// `serviceLinks` ({ href, label } for each service) comes from the server Nav, so the service copy stays out of client JS.
export function MainLinks({ serviceLinks }) {
  const current = useCurrent();
  const live = useHydrated();
  const [open, setOpen] = useState(false);
  const item = useRef(null);
  const button = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (item.current.contains(document.activeElement)) button.current.focus();
      setOpen(false);
    };
    const onClick = (e) => {
      if (!item.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  // Keyboard focus leaving the Services item closes the list.
  const onBlur = (e) => {
    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  };

  return (
    <ul className="nav__links">
      <li>
        <Link href="/" aria-current={current("/")}>Home</Link>
      </li>
      <li ref={item} className={["has-menu", live && "is-live", open && "is-open"].filter(Boolean).join(" ")} onBlur={onBlur}>
        <button ref={button} type="button" aria-expanded={open} aria-controls="services-menu" onClick={() => setOpen(!open)}>
          Services
        </button>
        <div className="menu" id="services-menu" onClick={closeOnLink(() => setOpen(false))}>
          <Link href="/services" aria-current={current("/services")}>All Services</Link>
          {serviceLinks.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={current(href)}>{label}</Link>
          ))}
        </div>
      </li>
      <li>
        <Link href="/team" aria-current={current("/team")}>Team</Link>
      </li>
      <li>
        <Link href="/about" aria-current={current("/about")}>About</Link>
      </li>
      <li>
        <Link href="/contact" aria-current={current("/contact")}>Contact</Link>
      </li>
    </ul>
  );
}

// `logo` is the rendered <Logo />, passed in by the server Nav so the outlines stay out of client JS; `serviceLinks` as for MainLinks.
export function MobileMenu({ logo, serviceLinks }) {
  const pathname = usePathname();
  const current = useCurrent();
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);
  const burger = useRef(null);
  const dialog = useRef(null);
  const closer = useRef(null);

  // A route change closes the menu.
  if (openPath !== pathname) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    const menuButton = burger.current;
    const page = document.body.style;
    const overflow = page.overflow;
    page.overflow = "hidden";
    closer.current.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = dialog.current.querySelectorAll("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      const inside = dialog.current.contains(document.activeElement);
      if (e.shiftKey && (!inside || document.activeElement === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || document.activeElement === last)) {
        e.preventDefault();
        first.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 1040px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      page.overflow = overflow;
      menuButton.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={burger}
        type="button"
        className="nav__burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>
      <div
        ref={dialog}
        className={open ? "mm inverse is-open" : "mm inverse"}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={closeOnLink(() => setOpen(false))}
      >
        <div className="mm__top">
          <Link className="logo" href="/" aria-label="Infyta, home">{logo}</Link>
          <button ref={closer} type="button" className="nav__burger" aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile">
          <Link href="/" aria-current={current("/")}>Home</Link>
          <Link href="/services" aria-current={current("/services")}>Services</Link>
          <div className="sub">
            {serviceLinks.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={current(href)}>{label}</Link>
            ))}
          </div>
          <Link href="/team" aria-current={current("/team")}>Team</Link>
          <Link href="/about" aria-current={current("/about")}>About</Link>
          <Link href="/contact" aria-current={current("/contact")}>Contact</Link>
        </nav>
        <div className="mm__cta">
          <OpenStatus />
          <ThemeSwitch />
          <a className="btn btn--icon" href={TEL}>
            <PhoneIcon />
            Call {site.phone.display}
          </a>
          <a className="btn btn--ghost btn--icon" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
