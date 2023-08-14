import React from 'react'
// import classNames from 'classnames'

const Input = ({
  register,
  error,
  label,
  name,
  type = 'text',
  required = 'This field is required',
  min,
  max,
  requireValidation,
}) => {
  const isValid = requireValidation ? validationFunc : true

  function validationFunc(value) {
    if (value === requireValidation) return true
    // eslint-disable-next-line quotes
    else return "Passwords don't match"
  }

  let setValueAs
  if (name === 'email') {
    setValueAs = (email) => email.toLowerCase()
  }

  let pattern
  if (name === 'username') {
    pattern = {
      value: /^[a-z][a-z0-9]*$/,
      message: 'You can only use lowercase English letters and numbers',
    }
  }

  // const inputClasses = classNames({
  //   form__input: true,
  //   'form__input--error': error?.[name] ? true : false,
  //   'form__input--h-text': name === 'text' ? true : false,
  // })

  return (
    <label className="form__label">
      {label}
      <input
        className={`form__input ${error?.[name] ? 'form__input--error' : null}`}
        // className={inputClasses}
        {...register(name, {
          required: required,
          minLength: {
            value: min?.[0],
            message: min?.[1],
          },
          maxLength: {
            value: max?.[0],
            message: max?.[1],
          },
          validate: isValid,
          setValueAs,
          pattern,
        })}
        placeholder={label}
        type={type}
      />
      {error?.[name] && <p className="error-message">{error?.[name].message || 'Error'}</p>}
    </label>
  )
}

export default Input
