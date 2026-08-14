export const ERROR_MESSAGES = {
  required: "This field is required.",
  email: "Please enter a valid email address.",
  url: "Please enter a valid URL starting with http:// or https://",
  artistNameLength: "Artist name must be 50 characters or fewer.",
  genreLength: "Genre must be 20 characters or fewer.",
  bioLength: "Bio must be 500 characters or fewer.",
  notesLength: "Notes must be 500 characters or fewer.",
  invalidLinks:
    "One or more links does not appear to be a valid URL. Please check each link is correct.",
  consentContact: "Please confirm that LMN may contact you.",
  consentAssets: "Please give permission for LMN to use your submitted assets.",
  submissionType: "Please select a submission type.",
} as const;

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidUrl(value: string): boolean {
  return /^https?:\/\/\S+$/i.test(value);
}

export type Step1Values = {
  artistName: string;
  email: string;
  country: string;
  city: string;
  soundcloud: string;
  instagram: string;
  genre: string;
  bio: string;
};

export function validateStep1Field(
  key: keyof Step1Values,
  value: string,
  required: boolean,
): string | undefined {
  if (required && value.trim() === "") {
    return ERROR_MESSAGES.required;
  }
  if (value.trim() === "") {
    return undefined;
  }
  switch (key) {
    case "email":
      return isValidEmail(value) ? undefined : ERROR_MESSAGES.email;
    case "soundcloud":
    case "instagram":
      return isValidUrl(value) ? undefined : ERROR_MESSAGES.url;
    case "artistName":
      return value.length > 50 ? ERROR_MESSAGES.artistNameLength : undefined;
    case "genre":
      return value.length > 20 ? ERROR_MESSAGES.genreLength : undefined;
    case "bio":
      return value.length > 500 ? ERROR_MESSAGES.bioLength : undefined;
    default:
      return undefined;
  }
}

// --- Step 2: Mix ---

export type MixValues = {
  mixLink: string;
  tracklist: string;
  mixNotes: string;
  imageLink1: string;
  imageLink2: string;
  imageLink3: string;
  videoLink1: string;
  videoLink2: string;
  videoLink3: string;
};

const MIX_URL_FIELDS = new Set<keyof MixValues>([
  "mixLink",
  "imageLink1",
  "imageLink2",
  "imageLink3",
  "videoLink1",
  "videoLink2",
  "videoLink3",
]);

export function validateMixField(
  key: keyof MixValues,
  value: string,
  required: boolean,
): string | undefined {
  if (required && value.trim() === "") {
    return ERROR_MESSAGES.required;
  }
  if (value.trim() === "") {
    return undefined;
  }
  if (MIX_URL_FIELDS.has(key)) {
    return isValidUrl(value) ? undefined : ERROR_MESSAGES.url;
  }
  if (key === "mixNotes") {
    return value.length > 500 ? ERROR_MESSAGES.notesLength : undefined;
  }
  return undefined;
}

// --- Step 2: Demo / Track ---

export type ReleaseStatus = "" | "Unreleased" | "Forthcoming" | "Self-released";

export const RELEASE_STATUS_OPTIONS: ReleaseStatus[] = [
  "Unreleased",
  "Forthcoming",
  "Self-released",
];

export type DemoValues = {
  trackLinks: string;
  releaseStatus: ReleaseStatus;
  demoNotes: string;
};

export function validateTrackLinks(
  value: string,
  required: boolean,
): string | undefined {
  if (required && value.trim() === "") {
    return ERROR_MESSAGES.required;
  }
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
  if (lines.length === 0) {
    return undefined;
  }
  return lines.every((line) => isValidUrl(line))
    ? undefined
    : ERROR_MESSAGES.invalidLinks;
}

export function validateDemoField(
  key: keyof DemoValues,
  value: string,
  required: boolean,
): string | undefined {
  if (key === "trackLinks") {
    return validateTrackLinks(value, required);
  }
  if (required && value.trim() === "") {
    return ERROR_MESSAGES.required;
  }
  if (value.trim() === "") {
    return undefined;
  }
  if (key === "demoNotes") {
    return value.length > 500 ? ERROR_MESSAGES.notesLength : undefined;
  }
  return undefined;
}

// --- Consent (shared) ---

export type ConsentValues = {
  contact: boolean;
  assets: boolean;
};

export function validateConsent(consent: ConsentValues): {
  contact?: string;
  assets?: string;
} {
  return {
    contact: consent.contact ? undefined : ERROR_MESSAGES.consentContact,
    assets: consent.assets ? undefined : ERROR_MESSAGES.consentAssets,
  };
}
