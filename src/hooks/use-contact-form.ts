'use client';

import { useActionState, useEffect, useEffectEvent } from 'react';
import { contactSchema, contactWhatsAppUrl, type ContactFormState } from '@/lib/contact-form';
import { useToast } from '@/hooks/use-toast';

const initialState: ContactFormState = { message: null, errors: null };

// Validates the form and hands the message to WhatsApp. Nothing is stored or sent from the site,
// so the result only says WhatsApp is opening: the visitor still has to press send there.
function openInWhatsApp(_prevState: ContactFormState, formData: FormData): ContactFormState {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
  };
  const validatedFields = contactSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Some fields need a fix. Each one says what to enter.',
      values,
    };
  }

  // Runs synchronously inside the submit, so browsers treat the new tab as user-initiated.
  const url = contactWhatsAppUrl(validatedFields.data);
  const whatsappTab = window.open(url, '_blank');
  if (whatsappTab) {
    whatsappTab.opener = null;
  } else {
    // Pop-up blocked: open WhatsApp in this tab instead.
    window.location.href = url;
  }

  return { message: 'Send the pre-filled message in WhatsApp to reach us.', errors: null, values };
}

// Wires a contact form to WhatsApp and shows a toast for each result.
export function useContactForm(onSuccess?: () => void) {
  const { toast } = useToast();
  const [state, dispatch] = useActionState(openInWhatsApp, initialState);

  // An Effect Event, so an inline callback doesn't re-run the effect and repeat the toast.
  const handleSuccess = useEffectEvent(() => onSuccess?.());

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: 'Opening WhatsApp…',
        description: state.message,
      });
      handleSuccess();
    } else if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Check the form',
        description: state.message,
      });
    }
  }, [state, toast]);

  return [state, dispatch] as const;
}
