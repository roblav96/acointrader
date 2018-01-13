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
    <v-app dark :class="{ 'anim-loading': initing === true, 'animated animated-fast fadeIn': initing === false }">

        <main-drawer></main-drawer>

        <v-toolbar class="dummy-toolbar" app fixed flat dark color="primary"></v-toolbar>

        <!-- <v-slide-x-reverse-transition mode="out-in"> -->
        <v-fade-transition mode="out-in">
            <router-view></router-view>
        </v-fade-transition>

        <pin-dialog></pin-dialog>

    </v-app>
</template>

