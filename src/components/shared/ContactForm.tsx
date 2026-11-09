
'use client';

import { ContactSubmitButton } from '@/components/shared/ContactSubmitButton';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/hooks/use-contact-form';

interface ContactFormProps {
  /** Keeps ids unique when the form appears twice on a page (the page and the floating sheet). */
  idPrefix?: string;
  onSuccess?: () => void;
}

export function ContactForm({ idPrefix = 'form', onSuccess }: ContactFormProps) {
  const [state, dispatch] = useContactForm(onSuccess);

  return (
    <form action={dispatch} className="space-y-6" noValidate>
      <Field id={`name-${idPrefix}`} label="Name" error={state.errors?.name?.[0]}>
        <Input name="name" placeholder="Your Name" autoComplete="name" defaultValue={state.values?.name} />
      </Field>
      <Field id={`email-${idPrefix}`} label="Email" error={state.errors?.email?.[0]}>
        <Input name="email" type="email" placeholder="your@email.com" autoComplete="email" defaultValue={state.values?.email} />
      </Field>
      <Field id={`message-${idPrefix}`} label="Message" error={state.errors?.message?.[0]}>
        <Textarea name="message" placeholder="How can we help you?" defaultValue={state.values?.message} />
      </Field>
      <ContactSubmitButton />
    </form>
  );
}
