"use client";

import { useEffect, useRef } from "react";

interface OTPInputProps {
  value?: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export default function OTPInput({
  value = "",
  onChange,
  length = 4,
  disabled,
}: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const otp = value.split("").slice(0, length);

  useEffect(() => {
    while (otp.length < length) otp.push("");
  }, [value]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d?$/.test(inputValue)) return;

    const newOtp = [...otp];
    newOtp[index] = inputValue;
    onChange(newOtp.join(""));

    if (inputValue && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        onChange(newOtp.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newOtp = pasted.split("");
    while (newOtp.length < length) newOtp.push("");

    onChange(newOtp.join(""));

    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={otp[index]}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          maxLength={1}
          inputMode="numeric"
          className="h-12 w-12 rounded-lg border border-outline-variant text-center text-lg font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      ))}
    </div>
  );
}