import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentError = (state: StateSchema) => state.articleComments?.error;
export const getArticleCommentLoading = (state: StateSchema) => state.articleComments?.isLoading;
