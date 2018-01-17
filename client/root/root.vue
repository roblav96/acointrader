<!--  -->
<script lang="ts" src="./root.ts"></script>

<style>
/**/

div.application--wrap > nav.toolbar.dummy-toolbar {
    z-index: 0;
}


/**/

</style>

<template>
    <v-app id="root" :light="theme == 'light'" :dark="theme == 'dark'" :class="{ 'anim-loading': fading === true, 'animated animated-fast fadeIn': fading === false }">

        <main-drawer></main-drawer>

        <!-- this is here so the toolbar doesnt disappear during transition -->
        <v-toolbar class="dummy-toolbar" app fixed flat dark color="primary"></v-toolbar>

        <v-fade-transition mode="out-in">
            <router-view></router-view>
        </v-fade-transition>

        <!-- <pin-dialog></pin-dialog> -->
        <!-- <exchange-connect></exchange-connect> -->

    </v-app>
</template>

