<template>
    <div id="mainContainer">
        <h1>Vous n'êtes pas autorisé à aller sur cette page depuis cet endroit.</h1>
        <button @click="goBack" class="orangeRoundedButton">Retour</button>
    </div>
</template>

<script>
    import router from '../router/index'

    export default {
        name : 'NotAllowed',
        methods : {
            goBack(){
                router.back()
            }
        }
    }
</script>
