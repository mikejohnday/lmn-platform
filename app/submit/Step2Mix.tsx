"use client";

import { TextField, TextareaField } from "./FormField";
import ConsentFields from "./ConsentFields";
import styles from "./SubmissionForm.module.css";
import type { ConsentValues, MixValues } from "./validation";

type FieldRef = HTMLInputElement | HTMLTextAreaElement | null;

type Step2MixProps = {
  values: MixValues;
  getError: (key: keyof MixValues) => string | undefined;
  getValid: (key: keyof MixValues) => boolean;
  onChange: (key: keyof MixValues, value: string) => void;
  onBlur: (key: keyof MixValues) => void;
  setFieldRef: (key: keyof MixValues) => (el: FieldRef) => void;
  consent: ConsentValues;
  consentErrors: { contact?: string; assets?: string };
  onConsentChange: (key: keyof ConsentValues, checked: boolean) => void;
  setConsentRef: (
    key: keyof ConsentValues,
  ) => (el: HTMLInputElement | null) => void;
};

const ASSET_HELPER = "Accepted: Valid URLs. Links preferred over uploads.";

export default function Step2Mix({
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
}: Step2MixProps) {
  return (
    <>
      <h2 id="step2Heading" tabIndex={-1} className={styles.sectionHeading}>
        YOUR MIX
      </h2>

      <div className={styles.fieldsGroup}>
        <TextField
          id="mixLink"
          label="Mix Link"
          required
          type="url"
          helper="Accepted: SoundCloud, Mixcloud, Dropbox, Google Drive, WeTransfer. Valid URL required."
          value={values.mixLink}
          error={getError("mixLink")}
          valid={getValid("mixLink")}
          onChange={(e) => onChange("mixLink", e.target.value)}
          onBlur={() => onBlur("mixLink")}
          ref={setFieldRef("mixLink")}
        />

        <TextareaField
          id="tracklist"
          label="Tracklist"
          required
          rows={4}
          helper="Paste your full tracklist here. No character limit."
          value={values.tracklist}
          error={getError("tracklist")}
          valid={getValid("tracklist")}
          onChange={(e) => onChange("tracklist", e.target.value)}
          onBlur={() => onBlur("tracklist")}
          ref={setFieldRef("tracklist")}
        />

        <TextareaField
          id="mixNotes"
          label="Mix Notes"
          required={false}
          rows={3}
          maxLength={500}
          helper="Style, concept, or release context."
          counter={{ current: values.mixNotes.length, max: 500 }}
          value={values.mixNotes}
          error={getError("mixNotes")}
          valid={getValid("mixNotes")}
          onChange={(e) => onChange("mixNotes", e.target.value)}
          onBlur={() => onBlur("mixNotes")}
          ref={setFieldRef("mixNotes")}
        />
      </div>

      <h3 className={styles.sectionHeading}>IMAGES &amp; VIDEO</h3>

      <div className={styles.fieldsGroup}>
        <TextField
          id="imageLink1"
          label="Image Link 1"
          required
          type="url"
          helper={ASSET_HELPER}
          value={values.imageLink1}
          error={getError("imageLink1")}
          valid={getValid("imageLink1")}
          onChange={(e) => onChange("imageLink1", e.target.value)}
          onBlur={() => onBlur("imageLink1")}
          ref={setFieldRef("imageLink1")}
        />
        <TextField
          id="imageLink2"
          label="Image Link 2"
          required={false}
          type="url"
          helper={ASSET_HELPER}
          value={values.imageLink2}
          error={getError("imageLink2")}
          valid={getValid("imageLink2")}
          onChange={(e) => onChange("imageLink2", e.target.value)}
          onBlur={() => onBlur("imageLink2")}
          ref={setFieldRef("imageLink2")}
        />
        <TextField
          id="imageLink3"
          label="Image Link 3"
          required={false}
          type="url"
          helper={ASSET_HELPER}
          value={values.imageLink3}
          error={getError("imageLink3")}
          valid={getValid("imageLink3")}
          onChange={(e) => onChange("imageLink3", e.target.value)}
          onBlur={() => onBlur("imageLink3")}
          ref={setFieldRef("imageLink3")}
        />
        <TextField
          id="videoLink1"
          label="Video Link 1"
          required
          type="url"
          helper={ASSET_HELPER}
          value={values.videoLink1}
          error={getError("videoLink1")}
          valid={getValid("videoLink1")}
          onChange={(e) => onChange("videoLink1", e.target.value)}
          onBlur={() => onBlur("videoLink1")}
          ref={setFieldRef("videoLink1")}
        />
        <TextField
          id="videoLink2"
          label="Video Link 2"
          required={false}
          type="url"
          helper={ASSET_HELPER}
          value={values.videoLink2}
          error={getError("videoLink2")}
          valid={getValid("videoLink2")}
          onChange={(e) => onChange("videoLink2", e.target.value)}
          onBlur={() => onBlur("videoLink2")}
          ref={setFieldRef("videoLink2")}
        />
        <TextField
          id="videoLink3"
          label="Video Link 3"
          required={false}
          type="url"
          helper={ASSET_HELPER}
          value={values.videoLink3}
          error={getError("videoLink3")}
          valid={getValid("videoLink3")}
          onChange={(e) => onChange("videoLink3", e.target.value)}
          onBlur={() => onBlur("videoLink3")}
          ref={setFieldRef("videoLink3")}
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
