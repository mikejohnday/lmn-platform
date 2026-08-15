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
        <Image
          src="/brand/images/IMG_4430.jpg"
          alt="The LMN sign glowing above a crowd at a night event"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          style={{ objectPosition: "54% 40%" }}
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <Image
            src="/brand/LMN_STAMP_WHITE.png"
            alt="LMN"
            width={400}
            height={269}
            priority
            className={styles.heroLogo}
          />
          <p className={styles.heroText}>
            LMN is an independent electronic music brand based in the UK. We
            run LMN Radio, events, and artist releases.
          </p>
          <div className={styles.heroActions}>
            <Link href="/submit" className={styles.linkCta}>
              Submit your music <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://soundcloud.com/lmnuk"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkCta}
            >
              Listen on SoundCloud <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="radio" className={styles.radioSection}>
        <Image
          src="/brand/images/CNV000022.jpg"
          alt="A crowd with hands raised in front of the LMN Radio DJ booth"
          fill
          sizes="100vw"
          loading="lazy"
          className={styles.radioImage}
          style={{ objectPosition: "50% 40%" }}
        />
        <div className={styles.radioScrim} />
        <div className={styles.radioContent}>
          <h2 className={styles.sectionHeading}>LMN Radio</h2>
          <p className={styles.sectionText}>
            Our ongoing mix series — new episodes across house, garage, and
            electronic, updated regularly.
          </p>
          <div className={styles.radioFrame}>
            <iframe
              title="LMN — latest tracks on SoundCloud"
              className={styles.radioEmbed}
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lmnuk&color=%23f5f0e3&auto_play=false&show_user=true&visual=false"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className={styles.atmosphere} aria-hidden="true">
        <Image
          src="/brand/images/IMG_4305.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className={styles.atmosphereImage}
        />
      </section>

      <section className={styles.submitSection}>
        <div className={styles.submitImageWrap}>
          <Image
            src="/brand/images/CNV00016.JPG"
            alt="Two people at an LMN event smiling for the camera"
            fill
            sizes="(min-width: 700px) 50vw, 100vw"
            loading="lazy"
            className={styles.submitImage}
            style={{ objectPosition: "50% 25%" }}
          />
        </div>
        <div className={styles.submitContent}>
          <h2 className={styles.sectionHeading}>Submit your music</h2>
          <p className={styles.sectionText}>
            We accept mix submissions for LMN Radio and demos / tracks for
            A&amp;R consideration. Our team personally listens to every
            submission.
          </p>
          <Link href="/submit" className={styles.linkCta}>
            Start your submission <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
