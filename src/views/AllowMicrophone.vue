<template>
    <div id="mainContainer">
        <h1>Pour le bon fonctionnement de l'application, nous avons besoin d'utiliser votre microphone et votre sortie audio.</h1>
        <MainButton @click="startPage" message="Autoriser"/>
    </div>
</template>

<script>
    import router from '../router/index'
    import MainButton from '../components/MainButton.vue'

    export default {
        name : 'AllowMicrophone',
        components : {
            MainButton
        },
        methods : {
            startPage() {
                router.push('/startPage')
            }
        }
    }
</script>
