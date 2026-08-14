"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import styles from "./SubmissionForm.module.css";

type Counter = { current: number; max: number };

type ChromeProps = {
  id: string;
  label: string;
  required: boolean;
  helper?: ReactNode;
  error?: string;
  valid?: boolean;
  counter?: Counter;
  children: ReactNode;
};

function counterState(counter?: Counter): "" | "amber" | "red" {
  if (!counter || counter.max <= 0) return "";
  const ratio = counter.current / counter.max;
  if (ratio >= 1) return "red";
  if (ratio >= 0.8) return "amber";
  return "";
}

function FieldChrome({
  id,
  label,
  required,
  helper,
  error,
  valid,
  counter,
  children,
}: ChromeProps) {
  const state = counterState(counter);

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
        {required ? (
          <span className={styles.requiredMark} aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className={styles.optionalMark}> (optional)</span>
        )}
      </label>

      <div className={styles.fieldInputWrap}>
        {children}
        {valid && !error ? (
          <span className={styles.fieldTick} aria-hidden="true">
            ✔
          </span>
        ) : null}
      </div>

      <div className={styles.fieldMeta}>
        <span id={`${id}-helper`} className={styles.fieldHelper}>
          {helper}
        </span>
        {counter ? (
          <span
            className={`${styles.fieldCounter} ${
              state === "amber" ? styles.fieldCounterAmber : ""
            } ${state === "red" ? styles.fieldCounterRed : ""}`}
          >
            {counter.current} / {counter.max} characters
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hasHelper: boolean, hasError: boolean) {
  const ids: string[] = [];
  if (hasHelper) ids.push(`${id}-helper`);
  if (hasError) ids.push(`${id}-error`);
  return ids.length ? ids.join(" ") : undefined;
}

type TextFieldProps = Omit<ChromeProps, "children"> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "children">;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { id, label, required, helper, error, valid, counter, className, ...inputProps },
    ref,
  ) => (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      helper={helper}
      error={error}
      valid={valid}
      counter={counter}
    >
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(helper), Boolean(error))}
        className={`${styles.fieldInput} ${error ? styles.fieldInputError : ""} ${
          valid && !error ? styles.fieldInputValid : ""
        } ${className ?? ""}`}
        {...inputProps}
      />
    </FieldChrome>
  ),
);
TextField.displayName = "TextField";

type TextareaFieldProps = Omit<ChromeProps, "children"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "children">;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    { id, label, required, helper, error, valid, counter, className, ...textareaProps },
    ref,
  ) => (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      helper={helper}
      error={error}
      valid={valid}
      counter={counter}
    >
      <textarea
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(helper), Boolean(error))}
        className={`${styles.fieldTextarea} ${error ? styles.fieldInputError : ""} ${
          valid && !error ? styles.fieldInputValid : ""
        } ${className ?? ""}`}
        {...textareaProps}
      />
    </FieldChrome>
  ),
);
TextareaField.displayName = "TextareaField";

type SelectOption = { value: string; label: string };

type SelectFieldProps = Omit<ChromeProps, "children"> &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> & {
    options: SelectOption[];
    placeholder: string;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      label,
      required,
      helper,
      error,
      valid,
      counter,
      className,
      options,
      placeholder,
      ...selectProps
    },
    ref,
  ) => (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      helper={helper}
      error={error}
      valid={valid}
      counter={counter}
    >
      <select
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, Boolean(helper), Boolean(error))}
        className={`${styles.fieldSelect} ${error ? styles.fieldInputError : ""} ${
          valid && !error ? styles.fieldInputValid : ""
        } ${className ?? ""}`}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldChrome>
  ),
);
SelectField.displayName = "SelectField";

type CheckboxFieldProps = {
  id: string;
  label: ReactNode;
  checked: boolean;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "checked">;

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ id, label, checked, error, className, ...inputProps }, ref) => (
    <div className={styles.checkboxField}>
      <label htmlFor={id} className={styles.checkboxLabel}>
        <input
          id={id}
          ref={ref}
          type="checkbox"
          checked={checked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${styles.checkboxInput} ${className ?? ""}`}
          {...inputProps}
        />
        <span className={styles.checkboxText}>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  ),
);
CheckboxField.displayName = "CheckboxField";
