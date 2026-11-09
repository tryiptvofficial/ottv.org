import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Reads GEMINI_API_KEY from the environment. The default model applies to every generate()/prompt
// call that doesn't name its own; without it Genkit rejects the call with "Must supply a `model`".
export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  model: googleAI.model('gemini-2.5-flash'),
});
