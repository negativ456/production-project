let currentArticleId = '';
describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((data) => {
      currentArticleId = data.id;
      cy.visit(`articles/${currentArticleId}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('и видит содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Content').should('exist');
  });
  it('и видит список рекомендаций', () => {
    cy.getByTestId('ArticleDetails.Content').should('exist');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('и ставит оценку', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Content').should('exist');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
