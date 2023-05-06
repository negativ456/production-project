import { componentRender } from '@/shared/config/tests/componentRender/componentRender'
import { AppRouter } from '../ui/AppRouter'
import { AppRoutes, routes } from '@/shared/const/router'
import { screen } from '@testing-library/react'
import { UserRole } from '@/entities/User'

describe('app/router/AppRouter', function () {
  test('Render page', async () => {
    componentRender(<AppRouter/>, {
      route: routes[AppRoutes.ABOUT]()
    })
    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })
  test('Redirect to not found page', async () => {
    componentRender(<AppRouter/>, {
      route: '/eofkeof'
    })
    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })
  test('Redirect to main page(unauthorized)', async () => {
    componentRender(<AppRouter/>, {
      route: routes[AppRoutes.PROFILE]('1')
    })
    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })
  test('Profile page', async () => {
    componentRender(<AppRouter/>, {
      route: routes[AppRoutes.PROFILE]('1'),
      initialState: {
        user: { mounted: true, userData: { username: 'user', id: '1' } }
      }
    })
    const page = await screen.findByTestId('ProfilePage')
    expect(page).toBeInTheDocument()
  })
  test('Forbidden page', async () => {
    componentRender(<AppRouter/>, {
      route: routes[AppRoutes.ADMIN_PANEL](),
      initialState: {
        user: { mounted: true, userData: { username: 'user', id: '1' } }
      }
    })
    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })
  test('Admin page', async () => {
    componentRender(<AppRouter/>, {
      route: routes[AppRoutes.ADMIN_PANEL](),
      initialState: {
        user: { mounted: true, userData: { username: 'user', id: '1', roles: [UserRole.ADMIN] } }
      }
    })
    const page = await screen.findByTestId('AdminPage')
    expect(page).toBeInTheDocument()
  })
})
