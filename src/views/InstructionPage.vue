<template>
    <div>
        <form @submit="nextStep" id="mainContainer">
            <h1>Vous allez désormais tester {{ product }} {{ productNumber }}</h1>
            <MainButton message="Étape suivante"/>
            <MicrophoneText message="Étape suivante"/>
        </form>
    </div>
</template>

<style scoped>
    @import '../../public/styles/main.css';
</style>

<script>
    import MainButton from '../components/MainButton.vue'
    import MicrophoneText from '../components/MicrophoneText.vue'

    export default {
        name : 'InstructionPage',
        components : {
            MainButton,
            MicrophoneText
        },
        data() {
            return {
                product : undefined,
                productNumber : undefined
            }
        },
        mounted() {
            this.product = "Les chips",
            this.productNumber = 1
        },
        methods() {
            nextStep()
        }
    }
</script>
