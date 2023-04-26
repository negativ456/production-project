import { addCommentForArticle } from './addCommentForArticle'
import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk'
import { Article } from '@/entities/Article'
const article: Article = {
  id: '1',
  title: 'title',
  subtitle: 'sub',
  img: 'img',
  views: 12,
  createdAt: '12',
  user: { id: '1', username: 'user' },
  type: [],
  blocks: []
}
describe('addCommentForArticle.test', () => {
  test('success', async () => {
    const comment = {
      id: '1',
      user: { id: '1', username: 'username' },
      text: 'text'
    }
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: {
        userData: {
          id: '1', username: 'username'
        }
      },
      articleDetails: {
        data: article
      }
    })
    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }))
    const result = await thunk.callThunk('text')
    expect(thunk.api.post).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(comment)
  })
  test('error', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: {
        userData: null
      },
      articleDetails: {
        data: null
      }
    })
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk('')
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })
})
