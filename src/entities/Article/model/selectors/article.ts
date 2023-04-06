import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetailsData'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'

export const getCanEditArticle = createSelector(getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false
    }
    return article.user.id === user.id
  })
