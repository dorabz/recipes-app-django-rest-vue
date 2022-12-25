<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Recipes</h1>

                    <router-link to="/dashboard/recipes/add" class="button is-dark mt-4">Add recipe</router-link>

            <div class="column is-12">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created</th>
                            <th>Owner</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="recipe in recipes"
                            v-bind:key="recipe.id">
                                <td>{{ recipe.name }}</td>
                                <td>{{ recipe.description }}</td>
                                <td>{{ recipe.created }}</td>
                                <td>
                                    {{ recipe.owner }}
                                </td>
                                <td>
                                    <router-link :to="'/dashboard/recipes/' + recipe.id" class="button is-light mt-4">Details</router-link>
                                </td>
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
        name: 'RecipesView',
        data() {
            return {
                recipes: [" "]
            }
        },
        mounted() {
            this.getRecipes()
        },
        methods: {
            async getRecipes() {
                this.$store.commit('setIsLoading', true)

                await axios
                    .get('/api/recipes/')
                    .then(response => {
                        console.log(response.data)
                        this.recipes = response.data
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>