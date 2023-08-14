import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Input from '../Input'
import putUserChanges from '../../store/functions/putUserChanges'

const Profile = () => {
  const { user } = useSelector((state) => state.user)
  let username, email, image
  if (user) {
    username = user.username
    email = user.email
    image = user.image
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    reset({
      username,
      email,
      image,
    })
  }, [user])

  function dirtyValues(dirtyFields, allValues) {
    if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
    return Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])])
    )
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (data) => {
    const result = dirtyValues(dirtyFields, data)
    if (Object.keys(result).length === 0) {
      console.log('no changes')
      return
    }
    dispatch(putUserChanges(result))
    history.push('/')
  }

  return (
    <section className="shadow-box account-form">
      <h3 className="form__header">Edit Profile</h3>
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
          label="New password"
          name="password"
          type="password"
          required={false}
          min={[6, 'Minimum 6 characters']}
          max={[40, 'Password length should be up to 40 characters']}
        />

        <Input register={register} error={errors} label="Avatar image (url)" name="image" type="url" required={false} />

        <input type="submit" value="Save" className="form__input form__submit" />
      </form>
    </section>
  )
}

export default Profile
