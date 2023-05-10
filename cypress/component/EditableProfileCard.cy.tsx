import { TestProvider } from '@/shared/config/tests/componentRender/componentRender';
import { EditableProfileCard } from '@/features/EditableProfileCard';

describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.mount(
      <TestProvider
        options={{
          initialState: {
            user: {
              userData: { id: '1', username: 'test' },
            },
          },
        }}>
        <EditableProfileCard id={'1'} />
      </TestProvider>
    );
  });
});
