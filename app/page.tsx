import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "LMN — Independent Electronic Music",
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow}>
          <Image
            src="/brand/LMN_STAMP_WHITE.png"
            alt="LMN"
            width={400}
            height={269}
            priority
            className={styles.heroLogo}
          />
        </div>
        <h1 className={styles.heroTitle}>LMN</h1>
        <p className={styles.heroText}>
          LMN is an independent electronic music brand based in the UK. We
          run LMN Radio, events, and artist releases.
        </p>
        <div className={styles.heroActions}>
          <Link href="/submit" className={styles.primaryButton}>
            Submit your music →
          </Link>
          <a
            href="https://soundcloud.com/lmnuk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            Listen on SoundCloud
          </a>
        </div>
      </section>

      <section id="radio" className={styles.radioSection}>
        <h2 className={styles.sectionHeading}>LMN RADIO</h2>
        <p className={styles.sectionText}>
          Our ongoing mix series — new episodes across house, garage, and
          electronic, updated regularly.
        </p>
        <div className={styles.radioEmbedWrap}>
          <iframe
            title="LMN — latest tracks on SoundCloud"
            className={styles.radioEmbed}
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lmnuk&color=%23f5f0e3&auto_play=false&show_user=true&visual=false"
            loading="lazy"
          />
        </div>
      </section>

      <section className={styles.submitSection}>
        <h2 className={styles.sectionHeading}>SUBMIT YOUR MUSIC</h2>
        <p className={styles.sectionText}>
          We accept mix submissions for LMN Radio and demos / tracks for A&amp;R
          consideration. Our team personally listens to every submission.
        </p>
        <Link href="/submit" className={styles.primaryButton}>
          Start your submission →
        </Link>
      </section>

      <section className={styles.connectSection}>
        <h2 className={styles.sectionHeading}>STAY CONNECTED</h2>
        <p className={styles.sectionText}>
          Follow LMN on Instagram and SoundCloud for events, releases, mixes,
          and radio shows.
        </p>
        <div className={styles.socialRow}>
          <a
            href="https://www.instagram.com/lmnuk_/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            Instagram
          </a>
          <a
            href="https://soundcloud.com/lmnuk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            SoundCloud
          </a>
          <a
            href="https://linktr.ee/LMNUK"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            All links
          </a>
        </div>
      </section>
    </main>
  );
}
