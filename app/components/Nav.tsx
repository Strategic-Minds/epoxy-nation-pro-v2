"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Color Charts",      href: "/#colors",                    s: "Main" },
  { label: "Gallery",           href: "/gallery",                    s: "Main" },
  { label: "Design Center",     href: "/design",                     s: "Main" },
  { label: "About",             href: "/about",                      s: "Main" },
  { label: "Contact",           href: "/contact",                    s: "Main" },
  { label: "Start Digital Bid", href: "/digital-bid",                s: "Start" },
  { label: "My Dashboard",      href: "/customer-portal/dashboard",  s: "Start" },
  { label: "Admin",             href: "/admin",                      s: "Ops" },
  { label: "Owner",             href: "/owner",                      s: "Ops" },
  { label: "Crew",              href: "/crew",                       s: "Ops" },
  { label: "Installer",         href: "/installer",                  s: "Ops" },
  { label: "Ops",               href: "/ops",                        s: "Ops" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="enp-nav">
        <a href="/" className="enp-logo">
          EPOXY <span>NATION PRO</span>
          <small>Powered by Xtreme Polishing Systems</small>
        </a>
        <ul className="enp-links">
          <li><a href="/#colors">Color Charts</a></li>
          <li><a href="/design">Design Center</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/customer-portal/dashboard">My Dashboard</a></li>
          <li><a href="/digital-bid" className="enp-cta">GET QUOTE</a></li>
        </ul>
        <button
          className={"enp-ham" + (open ? " is-open" : "")}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={"enp-backdrop" + (open ? " is-open" : "")} onClick={() => setOpen(false)} aria-hidden="true" />

      <div className={"enp-drawer" + (open ? " is-open" : "")} role="dialog" aria-label="Navigation">
        <div className="enp-dhead">
          <div className="enp-logo" style={{ fontSize: 16 }}>EPOXY <span>NATION PRO</span></div>
          <button className="enp-dclose" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>
        {["Main","Start","Ops"].map(section => (
          <div key={section}>
            <p className="enp-dsec">{section === "Main" ? "Navigate" : section === "Start" ? "Get Started" : "Operations"}</p>
            {LINKS.filter(l => l.s === section).map(link => (
              <a key={link.href} href={link.href}
                className={"enp-dlink" + (pathname === link.href ? " active" : "")}
                onClick={() => setOpen(false)}
              >{link.label}</a>
            ))}
          </div>
        ))}
        <div className="enp-dfoot">
          <a className="enp-dbid" href="/digital-bid" onClick={() => setOpen(false)}>Start Digital Bid →</a>
          <a className="enp-dwa" href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
        </div>
      </div>
    </>
  );
}