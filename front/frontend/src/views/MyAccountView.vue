<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
            </div>

            <div class="column is-12">
                <div class="buttons">
                    <button @click="logout()" class="button is-danger">Log out</button>
                </div>
                

                <div class="column is-6">
                <div class="box">
                    <p><strong>ID: </strong>{{  user.id }}</p>
                    <p><strong>Username: </strong>{{ user.username }}</p>
                    <p><strong>First name: </strong>{{ user.first_name }}</p>
                </div>
            </div>

            <div class="column is-6">
                <div class="box">
                    <p><strong>Recipes: </strong>{{ user.recipes }}</p>
                    <ul>
                        <li v-for="recipe in recipes" :key="recipe.id">{{ recipe.name }}</li>
                    </ul>
                </div>
            </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'MyAccountView',
        data() {
            return {
                user: {},
                recipes: []
             }
        },
        mounted() {
            this.getUser()
        }, 
        methods: {
            async logout() {
                await axios
                    .post('/api/v1/token/logout/')
                    .then(response => {
                        console.log('Logged out')
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error))
                    })
                
                axios.defaults.headers.common['Authorization'] = ''
                this.$store.commit('removeToken')

                this.$router.push('/')
            },
            async getUser() {
                const userID = this.$store.state.user.id

                await axios
                 .get(`/api/v1/users/${userID}/`)
                 .then(response => {
                    this.user = response.data


                    axios
                        .get(`/api/users/${userID}/recipes/`)
                        .then(response => {
                             this.recipes = response.data
                        })
                     .catch(error => {
                         console.log(error)
                     })

                })
                .catch(error => {
                    console.log(error)
                 })
             }
        }
    }
</script>