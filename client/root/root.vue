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
    <v-app dark>

        <main-drawer />

        <v-toolbar class="dummy-toolbar" app fixed dark color="primary"></v-toolbar>

        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
            <router-view class="animated animated-fastest" :class="{ 'anim-loading': initing }" />
        </transition>

        <pin-dialog />

    </v-app>
</template>


