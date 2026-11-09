import * as React from 'react';

import {cn} from '@/lib/utils';
import {fieldClasses} from '@/components/ui/input';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn('flex min-h-32 py-3', fieldClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
