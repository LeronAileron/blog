import _apiBase from './_apiBase'

const toggleFavoriteArticle = async function (action, slug) {
  const options = {
    method: action,
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
  }

  const res = await fetch(`${_apiBase}articles/${slug}/favorite`, options)
  if (!res.ok) {
    if (res.status == 422) {
      const theError = await res.json()

      let message = ''
      Object.entries(theError.errors).map(([key, value]) => {
        message += ` ${key} ${value}`
      })

      throw new Error(message)
    } else {
      throw new Error(`Unable to toggle like, status ${res.status}`)
    }
  }

  const like = await res.json()
  return like
}

export default toggleFavoriteArticle
