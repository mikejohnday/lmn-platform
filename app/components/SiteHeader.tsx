"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/#radio", label: "Radio" },
  { href: "/submit", label: "Submit", cta: true },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/brand/LMN_STAMP_WHITE.png"
            alt="LMN"
            width={400}
            height={269}
            className={styles.brandLogo}
            priority
          />
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.cta ? styles.navCta : styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobileNav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.visuallyHidden}>
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <span className={styles.menuIcon} aria-hidden="true">
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobileNav" className={styles.navMobile} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.cta ? styles.navCtaMobile : styles.navLinkMobile}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
