export const addComment = (text: string = 'text') => {
  cy.getByTestId('AddCommentForm.Input').type(text);
  cy.getByTestId('AddCommentForm.Button').click();
};

export const removeComment = (articleId: string) => {
  return cy
    .request({
      method: 'DELETE',
      url: `http://localhost:8000/articles/${articleId}`,
      headers: { Authorization: 'asd' },
    })
    .then(({ body }) => {
      return body;
    });
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text?: string): Chainable<void>;
      removeComment(articleId: string): Chainable<void>;
    }
  }
}
