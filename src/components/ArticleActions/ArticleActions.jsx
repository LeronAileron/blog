import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ArticleWrapper from '../ArticleWrapper'
import Input from '../Input'
import Alert from '../Alert'
import createNewArticle from '../../service/createNewArticle'
import editArticle from '../../service/editArticle'

const NewArticle = () => {
  const history = useHistory()
  let editing = false
  const loc = useLocation()
  if (loc.pathname.includes('edit')) editing = true

  const header = editing ? 'Edit article' : 'Create new article'

  const [showError, setShowError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: 'onSubmit', defaultValues: { tags: '' } })

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  const { article: thisArticle } = useSelector((state) => state.singleArticle)

  useEffect(() => {
    if (editing) {
      const formatted = _formatToReset(thisArticle)
      console.log('after reset ', formatted)
      reset(formatted)
    }
  }, [])

  function onSubmit(data) {
    console.log(data)
    const dataFormatted = _formatToPost(data)
    console.log(dataFormatted)

    if (editing) {
      editArticle(dataFormatted, thisArticle.slug)
        .then(() => {
          history.push('/')
        })
        .catch((e) => setShowError(e))
    } else {
      createNewArticle(dataFormatted)
        // .then(() => reset())
        .then(() => {
          history.push('/')
        })
        .catch((e) => setShowError(e))
    }
  }

  function _formatToPost(data) {
    return {
      article: {
        title: data.title,
        description: data['short description'],
        body: data.text,
        tagList: data.tags,
      },
    }
  }

  function _formatToReset(data) {
    console.log('before reset ', data)
    return {
      title: data.title,
      'short description': data.description,
      text: data.body,
      tags: data.tagList,
    }
  }

  return (
    <>
      {showError && <Alert description={showError} />}
      <ArticleWrapper extraClass={['account-form', 'account-form--w-full']}>
        <h3 className="form__header">{header}</h3>
        <form name="new-article" className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            error={errors}
            label="Title"
            name="title"
            max={[100, 'Title should be up to 100 characters']}
          />

          <Input
            register={register}
            error={errors}
            label="Short description"
            name="short description"
            max={[300, 'Description should be up to 300 characters']}
          />

          <label className="form__label">
            Text
            <textarea
              className={`form__input form__input--h-text ${errors?.text ? 'form__input--error' : null}`}
              {...register('text', {
                required: 'This field is required',
                maxLength: {
                  value: 10000,
                  message: 'TLDR: make it shorter (10000 characters max)',
                },
              })}
              placeholder="Text"
            ></textarea>
            {errors?.text && <p className="error-message">{errors?.text.message || 'Error'}</p>}
          </label>

          <label className="form__label">
            Tags
            <div className="form__tags">
              <div>
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <input
                        className={`form__input form__input--tag ${
                          errors?.tags?.[index] ? 'form__input--error' : null
                        }`}
                        {...register(`tags.${index}`, {
                          required: 'Tags cannot be empty',
                          maxLength: { value: 15, message: 'Too long. 15 char max' },
                        })}
                        placeholder="Tag"
                      />
                      <button className="button button--delete-tag" type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                      {errors?.tags?.[index] && (
                        <p className="error-message error-message--margin">
                          {errors.tags?.[index]?.message || 'Error'}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              <button
                className="button button--add-tag"
                type="button"
                onClick={() => {
                  append()
                }}
              >
                Add tag
              </button>
            </div>
          </label>

          <input type="submit" value="Send" className="form__input form__submit form__submit--article" />
        </form>
      </ArticleWrapper>
    </>
  )
}

export default NewArticle
