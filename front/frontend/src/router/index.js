import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import MyAccountView from '../views/MyAccountView.vue'
import RecipesView from '../views/RecipesView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import RecipeView from '../views/RecipeView.vue'
import EditRecipeView from '../views/EditRecipeView.vue'
import UsersView from '../views/UsersView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccountView
  },
  {
    path: '/dashboard/recipes',
    name: 'Recipes',
    component: RecipesView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/recipes/:id',
    name: 'Recipe',
    component: RecipeView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/recipes/add',
    name: 'AddRecipe',
    component: AddRecipeView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/recipes/:id/edit',
    name: 'EditRecipe',
    component: EditRecipeView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/users',
    name: 'Users',
    component: UsersView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
