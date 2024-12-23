import React from 'react';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputOtp } from 'primereact/inputotp';
import { Message } from 'primereact/message';

const MzOtpInput = ({
  control,
  name,
  disabled,
  rules,
  labelClassName,
  label,
  errorMsg,
  isError,
  wrapperClass,
  placeholder,
  length,
  integerOnly
}) => {
  const getLabelClassName = () => {
    return classNames({
      'p-error': isError,
      [labelClassName]: labelClassName,
    });
  };

  return (
    <div className="field" style={{ textAlign: 'start' }}>
      <label htmlFor={name} className={getLabelClassName()}>
        {label}
        {rules?.required && <span className="p-error">*</span>}
      </label>
      <span className={wrapperClass}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <InputOtp
              id={name}
              name={name}
              value={field.value ?? ''}
              length={length}
              onChange={(e) => field.onChange(e.value)}
              onBlur={field.onBlur}
              disabled={disabled}
              placeholder={placeholder}
              className={classNames({ 'p-invalid': fieldState.invalid })}
              style={{ width: '100%' }}
              integerOnly={integerOnly}
            />
          )}
        />
      </span>
      {errorMsg && (
        <Message
          className="mt-1 flex"
          style={{
            borderWidth: '0 0 0 2px',
          }}
          severity="error"
          content={errorMsg}
        />
      )}
    </div>
  );
};

export default MzOtpInput;
