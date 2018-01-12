<!--  -->
<script lang="ts" src="./root.ts"></script>

<template>
    <v-app>

        <main-drawer />

        <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
            <router-view class="animated animated-fastest" />
        </transition>

    </v-app>
</template>

