<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Add recipe</h1>
            </div>

            <div class="column is-12">
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Name</label>
                        <div class="control">
                            <input type="text" class="input" v-model="name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Description</label>
                        <div class="control">
                            <input type="text" class="input" v-model="description">
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-success">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import { toast } from 'bulma-toast'

    export default {
        name: 'AddRecipeView',
        data() {
            return {
                name: 'Name of your recipe.',
                description: 'Description of your recipe.',
            }
        },
        methods: {
            async submitForm() {
                this.$store.commit('setIsLoading', true)

                const recipe = {
                    name: this.name,
                    description: this.description,
                }

                await axios
                    .post('/api/recipes/', recipe)
                    .then(response => {
                        toast({
                            message: 'The recipe was added.',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })

                        this.$router.push('/dashboard/recipes')
                    })
                    .catch(error => {
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>