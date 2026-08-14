import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import SubmissionForm from "./SubmissionForm";

export const metadata: Metadata = {
  title: "Submit Your Music",
};

export default function SubmitPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.logoGlow}>
            <Image
              src="/brand/LMN_STAMP_WHITE.png"
              alt="LMN"
              width={400}
              height={269}
              priority
              className={styles.logo}
            />
          </div>
          <h1 className={styles.title}>Submit Your Music</h1>
          <p>
            LMN is an independent electronic music brand based in the UK. We run
            LMN Radio, events, and artist releases. Our team personally listens
            to every submission.
          </p>
          <p>
            We accept mix submissions for LMN Radio and demos / tracks for A&R
            consideration.
          </p>
          <p>Complete the form below — it takes under 5 minutes.</p>
        </div>

        <SubmissionForm />
      </div>
    </main>
  );
}
