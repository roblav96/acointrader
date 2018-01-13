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

        <main-drawer></main-drawer>

        <v-toolbar class="dummy-toolbar" app fixed flat dark color="primary"></v-toolbar>

        <!-- <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
            <router-view class="animated animated-fastest" :class="{ 'anim-loading': initing }"></router-view>
        </transition> -->

        <!-- <v-slide-x-reverse-transition mode="out-in"> -->
        <v-fade-transition mode="out-in">
            <router-view></router-view>
        </v-fade-transition>

        <pin-dialog></pin-dialog>

    </v-app>
</template>

