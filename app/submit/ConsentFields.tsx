"use client";

import { CheckboxField } from "./FormField";
import styles from "./SubmissionForm.module.css";
import type { ConsentValues } from "./validation";

type ConsentFieldsProps = {
  consent: ConsentValues;
  errors: { contact?: string; assets?: string };
  onChange: (key: keyof ConsentValues, checked: boolean) => void;
  contactRef?: (el: HTMLInputElement | null) => void;
  assetsRef?: (el: HTMLInputElement | null) => void;
};

export default function ConsentFields({
  consent,
  errors,
  onChange,
  contactRef,
  assetsRef,
}: ConsentFieldsProps) {
  return (
    <div className={styles.consentGroup}>
      <CheckboxField
        id="consentContact"
        checked={consent.contact}
        error={errors.contact}
        onChange={(e) => onChange("contact", e.target.checked)}
        ref={contactRef}
        label="I confirm that LMN may contact me about this submission via the email address provided."
      />
      <CheckboxField
        id="consentAssets"
        checked={consent.assets}
        error={errors.assets}
        onChange={(e) => onChange("assets", e.target.checked)}
        ref={assetsRef}
        label="I give LMN permission to use my submitted bio, images, videos, and music links for promotional purposes including social media, website, and radio."
      />
    </div>
  );
}
