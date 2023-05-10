let profileId = '';
describe('Profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${profileId}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('Profile page init', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
  });
  it('Edit profile', () => {
    const newName = 'new';
    const newLastname = 'lastname';
    cy.updateProfile(newName, newLastname);
    cy.getByTestId('ProfileCard.firstName').should('have.value', newName);
    cy.getByTestId('ProfileCard.lastName').should('have.value', newLastname);
  });
});
