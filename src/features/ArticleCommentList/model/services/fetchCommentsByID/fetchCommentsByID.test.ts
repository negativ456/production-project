import { fetchCommentsByID } from './fetchCommentsByID';
import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { CommentTypes } from '@/entities/Comment';
const comments: CommentTypes[] = [
  {
    id: '1',
    user: { id: '1', username: 'username' },
    text: 'text',
  },
];
describe('fetchCommentsByID.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByID);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));
    const result = await thunk.callThunk('1');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(comments);
  });
  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByID);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
