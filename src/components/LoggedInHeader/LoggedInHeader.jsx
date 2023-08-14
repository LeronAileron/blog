import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <button className="button button--small button--success">
        <Link to="/create-article">Create article</Link>
      </button>

      <button className="button button--naked">
        <Link to="/profile">
          <div className="button button--div h6 button--naked">{username}</div>
          <img src={avatar} className="avatar" />
        </Link>
      </button>
      <button className="button button--neutral h6 button--m-left" onClick={logOut}>
        <Link to="/sign-in">Log Out</Link>
      </button>
    </div>
  )
}

export default LoggedInHeader
