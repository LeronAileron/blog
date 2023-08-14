import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import createNewUser from '../../service/createNewUser'
import Input from '../Input'
import Alert from '../Alert'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onChange',
  })

  const history = useHistory()

  const [error, setError] = useState(null)

  const onSubmit = (data) => {
    console.log(data)
    createNewUser(data).then(
      () => {
        history.push('/sign-in')
      },
      (e) => {
        setError(e.message)
      }
    )
  }

  return (
    <>
      {error && <Alert description={error} />}
      <section className="shadow-box account-form">
        <h3 className="form__header">Create new account</h3>
        <form name="sign-up" className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            error={errors}
            label="Username"
            name="username"
            min={[3, 'Username should be 3 to 20 characters long']}
            max={[20, 'Username should be 3 to 20 characters long']}
          />

          <Input register={register} error={errors} label="Email address" name="email" type="email" />

          <Input
            register={register}
            error={errors}
            label="Password"
            name="password"
            type="password"
            required="Enter the password"
            min={[6, 'Minimum 6 characters']}
            max={[40, 'Password length should be up to 40 characters']}
          />

          <Input
            register={register}
            error={errors}
            label="Repeat Password"
            name="repeat-password"
            type="password"
            required="Repeat the password"
            requireValidation={getValues('password')}
          />

          <hr className="form__divider" />

          <input
            id="terms-check"
            {...register('accept-terms', { required: 'Required' })}
            className="form__terms-check"
            type="checkbox"
          />
          <label htmlFor="terms-check" className="form__terms-label">
            I agree to the processing of my personal information
            {errors?.['accept-terms'] && (
              <p className="error-message">{errors?.['accept-terms']?.message || 'Error'}</p>
            )}
          </label>

          <input type="submit" value="Create" className="form__input form__submit" />
        </form>

        <p className="account-form__p">
          Already have an account?{' '}
          <span className="span-primary-color">
            <Link to="/sign-in">Sign In</Link>
          </span>
          .
        </p>
      </section>
    </>
  )
}

export default SignUp
