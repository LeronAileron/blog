import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Input from '../Input'
import postSignIn from '../../store/functions/postSignIn'
import { toggleLoggedIn } from '../../store/slices/userSlice'
import Alert from '../Alert'
import Spinner from '../Spinner'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  })

  const history = useHistory()
  const dispatch = useDispatch()
  const { status, error, user } = useSelector((state) => state.user)

  useEffect(() => {
    if (status === 'resolved') {
      localStorage.setItem('token', user.token)
      dispatch(toggleLoggedIn())
      history.push('/')
    }
  }, [status])

  const onSubmit = (data) => {
    dispatch(postSignIn(data))
  }

  return (
    <>
      {status === 'loading' && <Spinner />}
      {error && <Alert description={error} />}
      <section className="shadow-box account-form">
        <h3 className="form__header">Sign In</h3>
        <form name="sign-up" className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            error={errors}
            label="Email address"
            name="email"
            type="email"
            required="Enter your email"
          />
          <Input
            register={register}
            error={errors}
            label="Password"
            name="password"
            type="password"
            required="Enter the password"
            min={[6, 'Password should be 6 to 40 characters long']}
            max={[40, 'Password should be 6 to 40 characters long']}
          />

          <input type="submit" value="Login" className="form__input form__submit" />
        </form>

        <p className="account-form__p">
          Don’t have an account?
          <span className="span-primary-color">
            <Link to="/sign-up"> Sign Up</Link>
          </span>
          .
        </p>
      </section>
    </>
  )
}

export default SignIn
