import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('User authorized', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    });
    it('Profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });
    it('Articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
  describe('User not authorized', () => {
    it('Main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Main page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Not found page', () => {
      cy.visit('/asdf');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
});
