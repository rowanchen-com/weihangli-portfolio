"use client";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "./form-field";
import { FormSubmitButton } from "./form-button";
import { FormStatusOverlay } from "./form-status";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormState>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");

  const onSubmit = async (data: FormState) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={clsx(
          "space-y-2 sm:space-y-4 transition-opacity duration-300",
          status === "success" || status === "error"
            ? "opacity-0 pointer-events-none"
            : "opacity-100",
        )}
      >
        <FormField
          placeholder="Your name"
          {...register("name", { required: "Please enter your name" })}
          error={errors.name?.message}
        />

        <FormField
          type="email"
          placeholder="Your email address"
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          error={errors.email?.message}
        />

        <FormField
          placeholder="Tell me about your business or project"
          textarea
          {...register("message", {
            required: "Please describe your project",
          })}
          error={errors.message?.message}
        />

        <FormSubmitButton loading={isSubmitting} />
      </form>

      {(status === "success" || status === "error") && (
        <FormStatusOverlay
          status={status}
          onReset={() => {
            setStatus("idle");
            reset();
          }}
        />
      )}
    </div>
  );
}
