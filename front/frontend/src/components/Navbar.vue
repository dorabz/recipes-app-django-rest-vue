<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <strong>Recipes</strong>
            </router-link>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <template v-if="$store.state.isAuthenticated">
                    <router-link to="/dashboard/recipes" class="navbar-item">Recipes</router-link>
                    <router-link to="/dashboard/users" class="navbar-item">Users</router-link>
                </template>

                <div class="navbar-item">
                    <div class="buttons">
                        <template v-if="!$store.state.isAuthenticated">
                            <router-link to="/register" class="button is-light"><strong>Register</strong></router-link>
                            <router-link to="/login" class="button is-success">Log in</router-link>
                        </template>
                        <template v-else>
                            <router-link to="/dashboard/my-account" class="button is-info">My account</router-link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>