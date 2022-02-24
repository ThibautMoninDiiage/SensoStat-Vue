<template>
    <div id="mainContainer">
        <h1>Pour le bon fonctionnement de l'application, nous avons besoin d'utiliser votre microphone et votre sortie audio.</h1>
        <MainButton @click="startPage" message="Autoriser"/>
    </div>
</template>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'
    import STTService from '../services/speechToTextService'

    export default {
        name : 'AllowMicrophone',
        components : {
            MainButton
        },
        data() {
            return {
                instruction : undefined,
                product : undefined,
                productNumber : undefined,
                text : undefined,
                STTService : new STTService()
            }
        },
        methods : {
            startPage() {
                this.STTService.speechToText()
                router.push('/startPage')
            }
        }
    }
</script>
