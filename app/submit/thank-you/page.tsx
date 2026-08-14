import type { Metadata } from "next";
import Image from "next/image";
import submitStyles from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Submission Received — LMN",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className={submitStyles.page}>
      <div className={submitStyles.container}>
        <div className={submitStyles.intro}>
          <div className={submitStyles.logoGlow}>
            <Image
              src="/brand/LMN_STAMP_WHITE.png"
              alt="LMN"
              width={400}
              height={269}
              priority
              className={submitStyles.logo}
            />
          </div>

          <span className={styles.checkIcon} aria-hidden="true">
            ✔
          </span>

          <h1 className={submitStyles.title}>Thank you for your submission.</h1>

          <p>
            We have received your submission and our team will review it
            personally.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>What happens next</h2>
            <ul className={styles.list}>
              <li>
                Our team reviews every submission manually — nothing is
                auto-rejected.
              </li>
              <li>We aim to respond within 4 weeks.</li>
              <li>
                If your submission is a good fit for LMN, we will be in touch
                via the email address you provided.
              </li>
              <li>
                Please do not send a follow-up email. If you have not heard
                from us within 4 weeks, your submission was not the right fit
                for us at this time — but we appreciate you reaching out.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Stay connected</h2>
            <p className={styles.connectedText}>
              Follow LMN on Instagram and SoundCloud to stay up to date with
              our events, releases, mixes, and radio shows.
            </p>
            <div className={styles.socialRow}>
              <a
                href="https://www.instagram.com/lmnuk_/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                Follow us on Instagram
              </a>
              <a
                href="https://soundcloud.com/lmnuk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                Follow us on SoundCloud
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
