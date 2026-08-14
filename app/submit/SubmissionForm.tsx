"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./SubmissionForm.module.css";
import { TextField, TextareaField } from "./FormField";
import Step2Mix from "./Step2Mix";
import Step2Demo from "./Step2Demo";
import {
  ERROR_MESSAGES,
  validateConsent,
  validateDemoField,
  validateMixField,
  validateStep1Field,
  type ConsentValues,
  type DemoValues,
  type MixValues,
  type Step1Values,
} from "./validation";

type SubmissionType = "mix" | "demo";

const STEP_2_LABEL: Record<SubmissionType, string> = {
  mix: "Your Mix",
  demo: "Your Demo",
};

const SUBMIT_LABEL: Record<SubmissionType, string> = {
  mix: "Send My Mix →",
  demo: "Submit My Demo →",
};

const FIELD_ORDER: (keyof Step1Values)[] = [
  "artistName",
  "email",
  "country",
  "city",
  "soundcloud",
  "instagram",
  "genre",
  "bio",
];

const MIX_FIELD_ORDER: (keyof MixValues)[] = [
  "mixLink",
  "tracklist",
  "mixNotes",
  "imageLink1",
  "imageLink2",
  "imageLink3",
  "videoLink1",
  "videoLink2",
  "videoLink3",
];

const MIX_REQUIRED_MAP: Record<keyof MixValues, boolean> = {
  mixLink: true,
  tracklist: true,
  mixNotes: false,
  imageLink1: true,
  imageLink2: false,
  imageLink3: false,
  videoLink1: true,
  videoLink2: false,
  videoLink3: false,
};

const DEMO_FIELD_ORDER: (keyof DemoValues)[] = [
  "trackLinks",
  "releaseStatus",
  "demoNotes",
];

const DEMO_REQUIRED_MAP: Record<keyof DemoValues, boolean> = {
  trackLinks: true,
  releaseStatus: false,
  demoNotes: false,
};

const EMPTY_VALUES: Step1Values = {
  artistName: "",
  email: "",
  country: "",
  city: "",
  soundcloud: "",
  instagram: "",
  genre: "",
  bio: "",
};

const EMPTY_MIX_VALUES: MixValues = {
  mixLink: "",
  tracklist: "",
  mixNotes: "",
  imageLink1: "",
  imageLink2: "",
  imageLink3: "",
  videoLink1: "",
  videoLink2: "",
  videoLink3: "",
};

const EMPTY_DEMO_VALUES: DemoValues = {
  trackLinks: "",
  releaseStatus: "",
  demoNotes: "",
};

const EMPTY_CONSENT: ConsentValues = {
  contact: false,
  assets: false,
};

const SOUNDCLOUD_HELPER = (
  <>
    <span className={styles.helperDesktop}>
      Valid URL required (https://soundcloud.com/...)
    </span>
    <span className={styles.helperMobile}>e.g. soundcloud.com/yourname</span>
  </>
);

export default function SubmissionForm() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [submissionType, setSubmissionType] = useState<SubmissionType | null>(
    null,
  );

  // Step 1
  const [values, setValues] = useState<Step1Values>(EMPTY_VALUES);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Step1Values, boolean>>
  >({});
  const [attemptedNext, setAttemptedNext] = useState(false);

  // Step 2 — kept independent per path so switching type never loses data (OQ-14 default: preserve)
  const [mixValues, setMixValues] = useState<MixValues>(EMPTY_MIX_VALUES);
  const [mixTouched, setMixTouched] = useState<
    Partial<Record<keyof MixValues, boolean>>
  >({});
  const [mixAttemptedSubmit, setMixAttemptedSubmit] = useState(false);

  const [demoValues, setDemoValues] = useState<DemoValues>(EMPTY_DEMO_VALUES);
  const [demoTouched, setDemoTouched] = useState<
    Partial<Record<keyof DemoValues, boolean>>
  >({});
  const [demoAttemptedSubmit, setDemoAttemptedSubmit] = useState(false);

  const [consent, setConsent] = useState<ConsentValues>(EMPTY_CONSENT);

  const groupName = useId();
  const typeFieldsetRef = useRef<HTMLFieldSetElement>(null);
  const firstTypeRadioRef = useRef<HTMLInputElement>(null);
  const fieldRefs = useRef<
    Partial<Record<keyof Step1Values, HTMLInputElement | HTMLTextAreaElement>>
  >({});
  const mixFieldRefs = useRef<
    Partial<Record<keyof MixValues, HTMLInputElement | HTMLTextAreaElement>>
  >({});
  const demoFieldRefs = useRef<
    Partial<Record<keyof DemoValues, HTMLTextAreaElement | HTMLSelectElement>>
  >({});
  const consentRefs = useRef<Partial<Record<keyof ConsentValues, HTMLInputElement>>>(
    {},
  );

  // Browser back/forward between Step 1 and Step 2 — see docs/workflows.md §2
  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      const state = event.state as { lmnStep?: number } | null;
      setStep(state?.lmnStep === 2 ? 2 : 1);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Focus moves to the current step's heading after any step transition — AM-05
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const headingId = step === 2 ? "step2Heading" : "step1Heading";
    document.getElementById(headingId)?.focus();
  }, [step]);

  const isMixSelected = submissionType === "mix";
  const requiredMap: Record<keyof Step1Values, boolean> = {
    artistName: true,
    email: true,
    country: isMixSelected,
    city: isMixSelected,
    soundcloud: isMixSelected,
    instagram: false,
    genre: false,
    bio: false,
  };

  const step2Label = submissionType
    ? STEP_2_LABEL[submissionType]
    : "Your Submission";

  const stepAttemptedSubmit =
    submissionType === "mix"
      ? mixAttemptedSubmit
      : submissionType === "demo"
        ? demoAttemptedSubmit
        : false;
  const consentErrors = stepAttemptedSubmit ? validateConsent(consent) : {};

  // --- Step 1 handlers ---

  function handleValueChange(key: keyof Step1Values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof Step1Values) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function fieldError(key: keyof Step1Values): string | undefined {
    if (!touched[key]) return undefined;
    return validateStep1Field(key, values[key], requiredMap[key]);
  }

  function fieldValid(key: keyof Step1Values): boolean {
    return Boolean(touched[key]) && !fieldError(key) && values[key].trim() !== "";
  }

  function handleStep1Submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedNext(true);
    setTouched((prev) => {
      const next = { ...prev };
      FIELD_ORDER.forEach((key) => {
        next[key] = true;
      });
      return next;
    });

    let firstErrorKey: "submissionType" | keyof Step1Values | null = null;
    if (!submissionType) {
      firstErrorKey = "submissionType";
    }
    for (const key of FIELD_ORDER) {
      if (firstErrorKey) break;
      if (validateStep1Field(key, values[key], requiredMap[key])) {
        firstErrorKey = key;
      }
    }

    if (firstErrorKey === "submissionType") {
      typeFieldsetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstTypeRadioRef.current?.focus();
      return;
    }
    if (firstErrorKey) {
      const el = fieldRefs.current[firstErrorKey];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    window.history.pushState({ lmnStep: 2 }, "");
    setStep(2);
  }

  // --- Step 2 handlers ---

  function handleMixChange(key: keyof MixValues, value: string) {
    setMixValues((prev) => ({ ...prev, [key]: value }));
  }
  function handleMixBlur(key: keyof MixValues) {
    setMixTouched((prev) => ({ ...prev, [key]: true }));
  }
  function mixFieldError(key: keyof MixValues): string | undefined {
    if (!mixTouched[key]) return undefined;
    return validateMixField(key, mixValues[key], MIX_REQUIRED_MAP[key]);
  }
  function mixFieldValid(key: keyof MixValues): boolean {
    return (
      Boolean(mixTouched[key]) &&
      !mixFieldError(key) &&
      mixValues[key].trim() !== ""
    );
  }
  function setMixFieldRef(key: keyof MixValues) {
    return (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      mixFieldRefs.current[key] = el ?? undefined;
    };
  }

  function handleDemoChange(key: keyof DemoValues, value: string) {
    setDemoValues((prev) => ({ ...prev, [key]: value }));
  }
  function handleDemoBlur(key: keyof DemoValues) {
    setDemoTouched((prev) => ({ ...prev, [key]: true }));
  }
  function demoFieldError(key: keyof DemoValues): string | undefined {
    if (!demoTouched[key]) return undefined;
    return validateDemoField(key, demoValues[key], DEMO_REQUIRED_MAP[key]);
  }
  function demoFieldValid(key: keyof DemoValues): boolean {
    return (
      Boolean(demoTouched[key]) &&
      !demoFieldError(key) &&
      demoValues[key].trim() !== ""
    );
  }
  function setDemoFieldRef(key: keyof DemoValues) {
    return (el: HTMLTextAreaElement | HTMLSelectElement | null) => {
      demoFieldRefs.current[key] = el ?? undefined;
    };
  }

  function handleConsentChange(key: keyof ConsentValues, checked: boolean) {
    setConsent((prev) => ({ ...prev, [key]: checked }));
  }
  function setConsentRef(key: keyof ConsentValues) {
    return (el: HTMLInputElement | null) => {
      consentRefs.current[key] = el ?? undefined;
    };
  }

  function handleBack() {
    window.history.back();
  }

  function handleStep2Submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submissionType) return;

    if (submissionType === "mix") {
      setMixAttemptedSubmit(true);
      setMixTouched((prev) => {
        const next = { ...prev };
        MIX_FIELD_ORDER.forEach((key) => {
          next[key] = true;
        });
        return next;
      });
    } else {
      setDemoAttemptedSubmit(true);
      setDemoTouched((prev) => {
        const next = { ...prev };
        DEMO_FIELD_ORDER.forEach((key) => {
          next[key] = true;
        });
        return next;
      });
    }

    let firstErrorKey: keyof MixValues | keyof DemoValues | null = null;
    if (submissionType === "mix") {
      for (const key of MIX_FIELD_ORDER) {
        if (firstErrorKey) break;
        if (validateMixField(key, mixValues[key], MIX_REQUIRED_MAP[key])) {
          firstErrorKey = key;
        }
      }
    } else {
      for (const key of DEMO_FIELD_ORDER) {
        if (firstErrorKey) break;
        if (validateDemoField(key, demoValues[key], DEMO_REQUIRED_MAP[key])) {
          firstErrorKey = key;
        }
      }
    }

    const consentValidation = validateConsent(consent);
    let firstConsentError: keyof ConsentValues | null = null;
    if (!firstErrorKey) {
      if (consentValidation.contact) firstConsentError = "contact";
      else if (consentValidation.assets) firstConsentError = "assets";
    }

    if (firstErrorKey) {
      const el =
        submissionType === "mix"
          ? mixFieldRefs.current[firstErrorKey as keyof MixValues]
          : demoFieldRefs.current[firstErrorKey as keyof DemoValues];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }
    if (firstConsentError) {
      const el = consentRefs.current[firstConsentError];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    const payload =
      submissionType === "mix"
        ? { submissionType, ...values, ...mixValues, consent }
        : { submissionType, ...values, ...demoValues, consent };
    console.log("LMN submission payload", payload);
    router.replace("/submit/thank-you");
  }

  return (
    <div className={styles.shell}>
      <ol className={styles.progress} aria-label="Submission progress">
        <li
          className={`${styles.progressStep} ${
            step === 1 ? styles.progressStepActive : ""
          } ${step === 2 ? styles.progressStepComplete : ""}`}
        >
          <span className={styles.progressIndex} aria-hidden="true">
            {step === 2 ? "✔" : "1"}
          </span>
          <span className={styles.progressLabel}>
            About You
            {step === 2 ? (
              <span className={styles.visuallyHidden}> — complete</span>
            ) : null}
          </span>
        </li>
        <li className={styles.progressConnector} aria-hidden="true" />
        <li
          className={`${styles.progressStep} ${
            step === 2 ? styles.progressStepActive : ""
          }`}
        >
          <span className={styles.progressIndex} aria-hidden="true">
            2
          </span>
          <span className={styles.progressLabel}>{step2Label}</span>
        </li>
      </ol>

      {step === 1 ? (
        <form className={styles.form} onSubmit={handleStep1Submit} noValidate>
          <fieldset className={styles.typeFieldset} ref={typeFieldsetRef}>
            <legend className={styles.typeLegend}>
              What are you submitting?
            </legend>
            <div className={styles.typeCards}>
              <label
                className={`${styles.typeCard} ${
                  submissionType === "mix" ? styles.typeCardSelected : ""
                }`}
              >
                <input
                  type="radio"
                  name={groupName}
                  value="mix"
                  checked={submissionType === "mix"}
                  onChange={() => setSubmissionType("mix")}
                  className={styles.typeCardInput}
                  ref={firstTypeRadioRef}
                />
                <span className={styles.typeCardTitle}>Mix Submission</span>
              </label>

              <label
                className={`${styles.typeCard} ${
                  submissionType === "demo" ? styles.typeCardSelected : ""
                }`}
              >
                <input
                  type="radio"
                  name={groupName}
                  value="demo"
                  checked={submissionType === "demo"}
                  onChange={() => setSubmissionType("demo")}
                  className={styles.typeCardInput}
                />
                <span className={styles.typeCardTitle}>
                  Demo / Track Submission
                </span>
              </label>
            </div>
            {attemptedNext && !submissionType ? (
              <p className={styles.fieldError} role="alert">
                {ERROR_MESSAGES.submissionType}
              </p>
            ) : null}
          </fieldset>

          <h2 id="step1Heading" tabIndex={-1} className={styles.sectionHeading}>
            ABOUT YOU
          </h2>

          <div className={styles.fieldsGroup}>
            <div className={styles.fieldRow}>
              <TextField
                id="artistName"
                label="Artist Name"
                required
                helper="Max 50 characters"
                autoComplete="off"
                maxLength={50}
                value={values.artistName}
                error={fieldError("artistName")}
                valid={fieldValid("artistName")}
                counter={{ current: values.artistName.length, max: 50 }}
                onChange={(e) => handleValueChange("artistName", e.target.value)}
                onBlur={() => handleBlur("artistName")}
                ref={(el) => {
                  fieldRefs.current.artistName = el ?? undefined;
                }}
              />
              <TextField
                id="email"
                label="Email Address"
                required
                type="email"
                helper="Valid email required"
                autoComplete="email"
                value={values.email}
                error={fieldError("email")}
                valid={fieldValid("email")}
                onChange={(e) => handleValueChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                ref={(el) => {
                  fieldRefs.current.email = el ?? undefined;
                }}
              />
            </div>

            <TextField
              id="country"
              label="Country"
              required={requiredMap.country}
              helper="Max 50 characters"
              autoComplete="country-name"
              maxLength={50}
              value={values.country}
              error={fieldError("country")}
              valid={fieldValid("country")}
              counter={{ current: values.country.length, max: 50 }}
              onChange={(e) => handleValueChange("country", e.target.value)}
              onBlur={() => handleBlur("country")}
              ref={(el) => {
                fieldRefs.current.country = el ?? undefined;
              }}
            />

            <TextField
              id="city"
              label="City"
              required={requiredMap.city}
              helper="Max 50 characters"
              autoComplete="address-level2"
              maxLength={50}
              value={values.city}
              error={fieldError("city")}
              valid={fieldValid("city")}
              counter={{ current: values.city.length, max: 50 }}
              onChange={(e) => handleValueChange("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              ref={(el) => {
                fieldRefs.current.city = el ?? undefined;
              }}
            />

            <TextField
              id="soundcloud"
              label="SoundCloud Link"
              required={requiredMap.soundcloud}
              type="url"
              helper={SOUNDCLOUD_HELPER}
              autoComplete="off"
              value={values.soundcloud}
              error={fieldError("soundcloud")}
              valid={fieldValid("soundcloud")}
              onChange={(e) => handleValueChange("soundcloud", e.target.value)}
              onBlur={() => handleBlur("soundcloud")}
              ref={(el) => {
                fieldRefs.current.soundcloud = el ?? undefined;
              }}
            />

            <TextField
              id="instagram"
              label="Instagram / Social"
              required={false}
              type="url"
              helper="Valid URL"
              autoComplete="off"
              value={values.instagram}
              error={fieldError("instagram")}
              valid={fieldValid("instagram")}
              onChange={(e) => handleValueChange("instagram", e.target.value)}
              onBlur={() => handleBlur("instagram")}
              ref={(el) => {
                fieldRefs.current.instagram = el ?? undefined;
              }}
            />

            <TextField
              id="genre"
              label="Genre(s)"
              required={false}
              helper="e.g. Techno, House, Minimal"
              autoComplete="off"
              maxLength={20}
              value={values.genre}
              error={fieldError("genre")}
              valid={fieldValid("genre")}
              counter={{ current: values.genre.length, max: 20 }}
              onChange={(e) => handleValueChange("genre", e.target.value)}
              onBlur={() => handleBlur("genre")}
              ref={(el) => {
                fieldRefs.current.genre = el ?? undefined;
              }}
            />

            <TextareaField
              id="bio"
              label="Short Artist Bio"
              required={false}
              helper="Used for promotion and radio introductions."
              maxLength={500}
              rows={4}
              value={values.bio}
              error={fieldError("bio")}
              valid={fieldValid("bio")}
              counter={{ current: values.bio.length, max: 500 }}
              onChange={(e) => handleValueChange("bio", e.target.value)}
              onBlur={() => handleBlur("bio")}
              ref={(el) => {
                fieldRefs.current.bio = el ?? undefined;
              }}
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            Next: Your Submission →
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleStep2Submit} noValidate>
          {submissionType === "mix" ? (
            <Step2Mix
              values={mixValues}
              getError={mixFieldError}
              getValid={mixFieldValid}
              onChange={handleMixChange}
              onBlur={handleMixBlur}
              setFieldRef={setMixFieldRef}
              consent={consent}
              consentErrors={consentErrors}
              onConsentChange={handleConsentChange}
              setConsentRef={setConsentRef}
            />
          ) : (
            <Step2Demo
              values={demoValues}
              getError={demoFieldError}
              getValid={demoFieldValid}
              onChange={handleDemoChange}
              onBlur={handleDemoBlur}
              setFieldRef={setDemoFieldRef}
              consent={consent}
              consentErrors={consentErrors}
              onConsentChange={handleConsentChange}
              setConsentRef={setConsentRef}
            />
          )}

          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
            >
              ← Back
            </button>
            <button type="submit" className={styles.primaryButton}>
              {submissionType ? SUBMIT_LABEL[submissionType] : ""}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
