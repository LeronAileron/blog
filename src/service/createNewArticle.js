import _apiBase from './_apiBase'

const createNewArticle = async function (data) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${_apiBase}articles`, options)
  if (!res.ok) {
    if (res.status == 422 || res.status == 500) {
      const theError = await res.json()

      console.log(theError)

      let message = ''
      Object.entries(theError.errors).map(([key, value]) => {
        message += ` ${key} ${value}`
      })

      throw new Error(message)
    } else {
      throw new Error(`Unable to send register request, status ${res.status}`)
    }
  }

  const newArticle = await res.json()
  console.log(newArticle)
  return newArticle
}

export default createNewArticle
