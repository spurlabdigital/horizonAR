import { useGlobalState } from './store'
import { createRouter, createWebHashHistory } from 'vue-router'
import PersonsList from '../components/routes/biographies/TheBiographies.vue'
import PlacesList from '../components/routes/places/ThePlacesList.vue'
import PlacePanel from '../components/routes/place/ThePlace.vue'
import TheIntroScreen from '../components/routes/home/TheHome.vue'
import PersonPanel from '../components/routes/biography/TheBiography.vue'
import ThePlacesMapbox from '../components/routes/map/TheMap.vue'
import InfoScreen from '../components/routes/info/TheInfo.vue'
import InfoListScreen from '../components/routes/info/TheInfoList.vue'
import TheARPerson from '../components/routes/ar/TheArPerson.vue'
import TheArPlace from '../components/routes/ar/TheArPlace.vue'
import TheArSearchBox from '../components/routes/ar/TheArSearchBox.vue'
import TheHilfeTiles from '../components/routes/hilfe/TheHilfeTiles.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheIntroScreen
  },
  {
    path: '/horizon',
    name: 'horizon',
    component: TheArSearchBox,
    children: [
      {
        name: 'horizon-biography',
        path: 'biography/:id',
        component: TheARPerson
      },
      {
        name: 'horizon-place',
        path: 'place/:id',
        component: TheArPlace
      }
    ]
  },
  {
    path: '/biographies',
    name: 'biographies',
    component: PersonsList
  },
  {
    path: '/biography/:id',
    name: 'person',
    component: PersonPanel
  },
  {
    path: '/map',
    name: 'map',
    component: ThePlacesMapbox
  },
  {
    path: '/places',
    name: 'places',
    component: PlacesList
  },
  {
    path: '/place/:id',
    name: 'place',
    component: PlacePanel
  },
  {
    path: '/info',
    name: 'infoList',
    component: InfoListScreen
  },
  {
    path: '/info/:id',
    name: 'info',
    component: InfoScreen
  },
  {
    path: '/hilfe',
    name: 'hilfe',
    component: TheHilfeTiles
  },
  { path: '/:pathMatch(.*)*', name: '404', component: TheIntroScreen }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  // document.getElementById('app').scrollTo(0, 0)
  window.scrollTo(0, 0)
  const globalState = useGlobalState()
  const isAR = to.matched.some((record) => record.name === 'horizon')
  globalState.setARMode(isAR)
})

export default router
