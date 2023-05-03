import clsx from 'clsx';
import { forwardRef } from 'react';

export const Input = forwardRef(
  ({ name, errors, label, className, ...props }, ref) => {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          {...props}
          id={name}
          name={name}
          ref={ref}
          className={clsx(className, { isInvalid: errors[name] })}
        />
        {errors?.[name] && <p className="inputError">{errors[name].message}</p>}
      </>
    );
  }
);
