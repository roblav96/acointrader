<!--  -->
<script lang="ts" src="./root.ts"></script>

<template>
    <v-app dark>

        <main-drawer />

        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
            <router-view class="animated animated-fastest" />
        </transition>

        <pin-dialog />

    </v-app>
</template>

