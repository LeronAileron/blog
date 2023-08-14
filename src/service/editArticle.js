import _apiBase from './_apiBase'

const editArticle = async function (data, slug) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${_apiBase}articles/${slug}`, options)
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
      throw new Error(`Unable to send edit request, status ${res.status}`)
    }
  }

  const editedArticle = await res.json()
  console.log(editedArticle)
  return editedArticle
}

export default editArticle
