import { forwardRef, useState } from 'react';
import { HiTrash } from 'react-icons/hi2';

import styles from './Autocomplete.module.css';
import clsx from 'clsx';
import { useFieldArray } from 'react-hook-form';

export const Autocomplete = forwardRef(
  ({ options, name, control, register }, ref) => {
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const { fields, append, remove } = useFieldArray({ name, control });

    function handleSelectOption(e) {
      const option = options.find((o) => o.label === e.target.value);
      if (option) {
        if (!fields.find((f) => f.label === option.label)) {
          append(option);
        }
        e.target.value = '';
        //   setSelectedOptions((oldOptions) => {
        //     if (!oldOptions.includes(option)) {
        //       return [...oldOptions, option];
        //     }
        //     return oldOptions;
        //   });
        //   e.target.value = '';
      }
    }

    function handleRemoveOption(index) {
      // setSelectedOptions((oldOptions) => oldOptions.filter((o) => o !== option));
      remove(index);
    }

    return (
      <div className={styles.autoComplete}>
        {fields.map((field, index) => (
          <input
            type="hidden"
            {...register(`${name}.${index}.${field.value}`)}
            key={field.id}
          />
        ))}

        <input
          type="text"
          id={name}
          list={`${name}_list`}
          ref={ref}
          onChange={handleSelectOption}
        />
        <datalist id={`${name}_list`}>
          {options?.map((o) => (
            <option key={o.value} value={o.label}></option>
          ))}
        </datalist>
        {fields.map((field, index) => (
          <button
            key={field.id}
            type="button"
            onClick={() => handleRemoveOption(index)}
            className={clsx('btn', styles.label)}
          >
            {field.label} <HiTrash />
          </button>
        ))}
      </div>
    );
  }
);
