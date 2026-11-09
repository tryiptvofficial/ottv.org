import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FieldProps {
  id: string
  label: string
  /** First validation message for this field, if any. */
  error?: string
  help?: string
  className?: string
  /** The control: Input, Textarea or Select trigger. Receives id and the aria wiring. */
  children: React.ReactElement
}

// Label, control, help text and error in one block. The error is announced and linked to the
// control with aria-describedby, and the control gets aria-invalid (which draws the danger edge).
export function Field({ id, label, error, help, className, children }: FieldProps) {
  const helpId = help ? `${id}-help` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Slot id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy}>
        {children}
      </Slot>
      {help && (
        <p id={helpId} className="text-caption text-subtle">
          {help}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-caption text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
