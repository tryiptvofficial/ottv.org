import { z } from 'zod';
import { whatsappUrl } from '@/lib/site-config';

export const contactSchema = z.object({
  name: z.string().min(2, 'Enter your name, at least 2 characters.'),
  email: z.string().email('Enter an email address like name@example.com.'),
  message: z.string().min(10, 'Write at least 10 characters so we know what you need.'),
});

export type ContactValues = z.infer<typeof contactSchema>;

export type ContactFormState = {
  message?: string | null;
  // What the visitor typed. React 19 resets a <form action> after each submit, so the
  // inputs use these as defaultValue to keep the text after an error or a cancelled WhatsApp.
  values?: ContactValues;
  errors?: z.inferFlattenedErrors<typeof contactSchema>['fieldErrors'] | null;
};

/** WhatsApp link to the site's number with the visitor's contact details pre-filled. */
export function contactWhatsAppUrl({ name, email, message }: ContactValues) {
  return whatsappUrl(`Hello,\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`);
}
