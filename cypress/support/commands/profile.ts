import { User } from '../../../src/entities/User';

export const updateProfile = (fistname: string, lastname: string) => {
  cy.getByTestId('EditHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstName').clear().type(fistname);
  cy.getByTestId('ProfileCard.lastName').clear().type(lastname);
  cy.getByTestId('EditHeader.SaveButton').click();
};
export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: '21',
    },
    body: {
      id: '4',
      first: 'test',
      lastname: 'test',
      age: 465,
      currency: 'EUR',
      country: 'Ukraine',
      city: 'Moscow',
      username: 'test test',
      avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
    },
  });
};
declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(fistname: string, lastname: string): Chainable<User>;
      resetProfile(profileId: string): Chainable<HTMLElement>;
    }
  }
}
