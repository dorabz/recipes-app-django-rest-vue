<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Users</h1>

            <div class="column is-12">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Recipes</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="user in users"
                            v-bind:key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.username}}</td>
                                <td>{{ user.first_name}}</td>
                                <td>{{ user.recipes}}</td>

    
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'UsersView',
        data() {
            return {
                users: [" "]
            }
        },
        mounted() {
            this.getUsers()
        },
        methods: {
            async getUsers() {
                this.$store.commit('setIsLoading', true)

                await axios
                    .get('/api/users/')
                    .then(response => {
                        console.log(response.data)
                        this.users = response.data
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>