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
    <v-fade-transition mode="out-in">
        <v-app v-show="!theming" id="root" :light="theme == 'light'" :dark="theme == 'dark'" :class="{ 'anim-loading': initing === true, 'animated animated-faster fadeIn': initing === false }">

            <main-drawer></main-drawer>

            <v-toolbar class="dummy-toolbar" app fixed flat dark color="primary"></v-toolbar>

            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>

            <snackbar></snackbar>

        </v-app>
    </v-fade-transition>
</template>

