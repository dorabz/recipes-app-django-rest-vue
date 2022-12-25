<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">{{ recipe.name }}</h1>

                <div class="buttons">
                    <router-link :to="'/dashboard/recipes/' + recipe.id + '/edit'" class="button is-light mt-4">Edit</router-link>
                    <button @click="deleteRecipe" class="button is-danger">Delete</button>
                </div>
            </div>

            <div class="column is-6">
                <div class="box">
                    <h2 class="subtitle">Details</h2>
                    <template v-if="recipe.owner"> 
                        <p><strong>Owner: </strong>{{ recipe.owner }}</p>
                    </template>
                    <p><strong>Description: </strong>{{ recipe.description }}</p>
                    <p><strong>Created at: </strong>{{ recipe.created }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { toast } from 'bulma-toast'

    export default {
        name: 'RecipeView',
        data() {
            return {
                recipe: {}
            }
        },
        mounted() {
            this.getRecipe()
        },
        methods: {
            async deleteRecipe() {
                this.$store.commit('setIsLoading', true)

                const recipeID = this.$route.params.id

                await axios
                    .delete(`/api/recipes/${recipeID}/`)
                    .then(response => {
                        console.log(response.data)
                        this.$router.push('/dashboard/recipes')
                    })
                    .catch(error => {
                        toast({
                            message: 'Not authorized!',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            },
            async getRecipe() {
                this.$store.commit('setIsLoading', true)

                const recipeID = this.$route.params.id

                await axios
                    .get(`/api/recipes/${recipeID}/`)
                    .then(response => {
                        this.recipe = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            },
        }
    }
</script>