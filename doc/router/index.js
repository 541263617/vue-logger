
import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'


export const routes = [
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },
  {
    path: '/',
    redirect: '/Introduce'
  },
  
]
