import _apiBase from './_apiBase'

const deleteArticle = async function (slug) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  }

  const res = await fetch(`${_apiBase}articles/${slug}`, options)
  if (!res.ok) {
    if (res.status == 422) {
      const theError = await res.json()

      let message = ''
      Object.entries(theError.errors).map(([key, value]) => {
        message += ` ${key} ${value}`
      })

      throw new Error(message)
    } else {
      throw new Error(`Unable to delete, status ${res.status}`)
    }
  }
}

export default deleteArticle
