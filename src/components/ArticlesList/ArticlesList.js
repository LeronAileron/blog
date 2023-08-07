import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchArticles } from '../../store/articlesSlice'
import ArticleWrapper from '../ArticleWrapper'
import ArticlePreview from '../ArticlePreview'
import Spinner from '../Spinner'
import Error from '../Error'

import styles from './articlesList.module.scss'

const ArticlesList = ({ page }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles(page))
  }, [page])

  const { articles: fetchedArticles, error, status } = useSelector((state) => state.articles)

  let key = 100

  const articles = fetchedArticles.map((el) => {
    key++
    return (
      <li key={key} className={styles.list__item}>
        <ArticleWrapper>
          <ArticlePreview article={el} />
        </ArticleWrapper>
      </li>
    )
  })
  return (
    <>
      {error && <Error description={error} />}
      {status === 'loading' && <Spinner />}
      <ul className={styles.list}>{articles}</ul>
    </>
  )
}

export default ArticlesList

ArticlesList.propTypes = {
  page: PropTypes.number.isRequired,
}

// var theArticles = {
//   articles: [
//     {
//       slug: 'proverka-ab3hj1',
//       title: 'Проверка',
//       description: 'Последняя проверка',
//       body: 'Кажется всё работает.... остались лайки',
//       createdAt: '2023-08-04T13:45:37.285Z',
//       updatedAt: '2023-08-05T08:26:22.749Z',
//       tagList: ['проверка', 'тестирование', 'тест'],
//       favorited: false,
//       favoritesCount: 4,
//       author: {
//         username: 'alyona',
//         image: 'https://vk.com/sticker/1-4277-512',
//         following: false,
//       },
//     },
//     {
//       slug: 'htytytyr-6cz31j',
//       title: 'htytytyr',
//       description: 'ryyrtytyty',
//       body: 'tyrtyrty',
//       createdAt: '2023-08-04T13:24:57.193Z',
//       updatedAt: '2023-08-05T08:26:23.668Z',
//       tagList: ['2112121'],
//       favorited: false,
//       favoritesCount: 2,
//       author: {
//         username: 'only222',
//         image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
//         following: false,
//       },
//     },
//     {
//       slug: '34345345-ie4gu4',
//       title: '34345345',
//       description: '345345',
//       body: '345354',
//       createdAt: '2023-08-04T13:18:39.227Z',
//       updatedAt: '2023-08-05T08:26:24.850Z',
//       tagList: [],
//       favorited: false,
//       favoritesCount: 2,
//       author: {
//         username: '112312312311',
//         image:
//           'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
//         following: false,
//       },
//     },
//     {
//       slug: '12-bofvf2',
//       title: '12',
//       description: '12',
//       body: '12',
//       createdAt: '2023-08-04T13:14:44.351Z',
//       updatedAt: '2023-08-05T08:26:25.945Z',
//       tagList: [],
//       favorited: false,
//       favoritesCount: 1,
//       author: {
//         username: '112312312311',
//         image:
//           'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
//         following: false,
//       },
//     },
//     {
//       slug: '345-ihyqqj',
//       title: '345',
//       description: '34',
//       body: '34',
//       createdAt: '2023-08-04T13:14:35.628Z',
//       updatedAt: '2023-08-05T08:26:26.795Z',
//       tagList: [],
//       favorited: false,
//       favoritesCount: 2,
//       author: {
//         username: '112312312311',
//         image:
//           'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
//         following: false,
//       },
//     },
//   ],
//   articlesCount: 160,
// }
