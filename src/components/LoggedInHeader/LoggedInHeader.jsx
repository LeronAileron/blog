import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Button'
import { logOutUser } from '../../store/slices/userSlice'

const LoggedInHeader = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { username, image } = user

  const backupUrl =
    'https://kartinki.pibig.info/uploads/posts/2023-04/1682016591_kartinki-pibig-info-p-kartinka-kotik-za-kompyuterom-arti-instagr-3.jpg'
  const avatar = image || backupUrl

  function logOut() {
    localStorage.removeItem('token')
    dispatch(logOutUser())
  }

  return (
    <div>
      <Button classes={['button--small', 'button--success']} linkTo="/new-article">
        Create article
      </Button>

      <Button classes={['button--naked']} linkTo="/profile">
        <div className="button button--div h6 button--naked">{username}</div>
        <img src={avatar} className="avatar" />
      </Button>

      <Button classes={['button--neutral', 'button--m-left', 'h6']} linkTo="/sign-in" onClick={logOut}>
        Log Out
      </Button>
    </div>
  )
}

export default LoggedInHeader
