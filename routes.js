// This file doesn’t go through Babel and thus can’t use ES2015 modules.
import routes from 'next-routes'

// Dynamic routes should be added below.
const router = routes()

router
  .add('project', '/project/:projectSlug')
  .add('locales', '/project/:projectSlug/locales')

export default router
