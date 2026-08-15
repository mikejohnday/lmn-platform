import Link from "next/link";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <span className={styles.brandMark}>LMN</span>
          <p className={styles.tagline}>
            Independent electronic music — radio, events, and artist
            releases.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/#radio" className={styles.navLink}>
            Radio
          </Link>
          <Link href="/submit" className={styles.navLink}>
            Submit
          </Link>
        </nav>

        <div className={styles.socialGroup}>
          <span className={styles.socialLabel}>Stay connected</span>
          <div className={styles.social}>
            <a
              href="https://www.instagram.com/lmnuk_/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              Instagram
            </a>
            <a
              href="https://soundcloud.com/lmnuk"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              SoundCloud
            </a>
            <a
              href="https://linktr.ee/LMNUK"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              All links
            </a>
          </div>
        </div>

        <p className={styles.copyright}>© {new Date().getFullYear()} LMN</p>
      </div>
    </footer>
  );
}
