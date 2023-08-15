import _apiBase from './_apiBase'

const createNewUser = async function (data) {
  const { username, email, password } = data
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  }

  const res = await fetch(`${_apiBase}users`, options)
  if (!res.ok) {
    if (res.status == 422) {
      const theError = await res.json()
      let message = ''
      message += theError.errors.username ? `Username ${theError.errors.username} ` : ''
      message += theError.errors.email ? `Email ${theError.errors.email}` : ''
      throw new Error(`Server error 422: ${message}`)
    } else {
      throw new Error(`Unable to send register request, status ${res.status}`)
    }
  }

  const newUser = await res.json()
  return newUser
}

export default createNewUser
