"use client";

import { SelectField, TextareaField } from "./FormField";
import ConsentFields from "./ConsentFields";
import styles from "./SubmissionForm.module.css";
import {
  RELEASE_STATUS_OPTIONS,
  type ConsentValues,
  type DemoValues,
} from "./validation";

type FieldRef = HTMLTextAreaElement | HTMLSelectElement | null;

type Step2DemoProps = {
  values: DemoValues;
  getError: (key: keyof DemoValues) => string | undefined;
  getValid: (key: keyof DemoValues) => boolean;
  onChange: (key: keyof DemoValues, value: string) => void;
  onBlur: (key: keyof DemoValues) => void;
  setFieldRef: (key: keyof DemoValues) => (el: FieldRef) => void;
  consent: ConsentValues;
  consentErrors: { contact?: string; assets?: string };
  onConsentChange: (key: keyof ConsentValues, checked: boolean) => void;
  setConsentRef: (
    key: keyof ConsentValues,
  ) => (el: HTMLInputElement | null) => void;
};

export default function Step2Demo({
  values,
  getError,
  getValid,
  onChange,
  onBlur,
  setFieldRef,
  consent,
  consentErrors,
  onConsentChange,
  setConsentRef,
}: Step2DemoProps) {
  return (
    <>
      <h2 id="step2Heading" tabIndex={-1} className={styles.sectionHeading}>
        YOUR DEMO / TRACKS
      </h2>

      <div className={styles.fieldsGroup}>
        <TextareaField
          id="trackLinks"
          label="Track / Demo Links"
          required
          rows={4}
          helper="One link per line. Accepted: SoundCloud, Dropbox, Google Drive, WeTransfer, private links."
          value={values.trackLinks}
          error={getError("trackLinks")}
          valid={getValid("trackLinks")}
          onChange={(e) => onChange("trackLinks", e.target.value)}
          onBlur={() => onBlur("trackLinks")}
          ref={setFieldRef("trackLinks") as (el: HTMLTextAreaElement | null) => void}
        />

        <SelectField
          id="releaseStatus"
          label="Release Status"
          required={false}
          placeholder="Select"
          options={RELEASE_STATUS_OPTIONS.map((status) => ({
            value: status,
            label: status,
          }))}
          value={values.releaseStatus}
          error={getError("releaseStatus")}
          onChange={(e) => onChange("releaseStatus", e.target.value)}
          onBlur={() => onBlur("releaseStatus")}
          ref={setFieldRef("releaseStatus") as (el: HTMLSelectElement | null) => void}
        />

        <TextareaField
          id="demoNotes"
          label="Demo Notes"
          required={false}
          rows={3}
          maxLength={500}
          helper="Any context about the music."
          counter={{ current: values.demoNotes.length, max: 500 }}
          value={values.demoNotes}
          error={getError("demoNotes")}
          valid={getValid("demoNotes")}
          onChange={(e) => onChange("demoNotes", e.target.value)}
          onBlur={() => onBlur("demoNotes")}
          ref={setFieldRef("demoNotes") as (el: HTMLTextAreaElement | null) => void}
        />
      </div>

      <ConsentFields
        consent={consent}
        errors={consentErrors}
        onChange={onConsentChange}
        contactRef={setConsentRef("contact")}
        assetsRef={setConsentRef("assets")}
      />
    </>
  );
}
