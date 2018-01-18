<!--  -->
<script lang="ts" src="./snackbar.ts"></script>

<style>
/**/

.snackbar--wrapper {
    position: absolute;
    top: 0px;
    right: 50%;
    width: 50%;
    transform: translateX(50%);
    z-index: 9999;
}


/**/

</style>

<template>
    <div class="snackbar--wrapper">
        <v-alert v-for="item in items" :key="item.id" :color="item.color" :icon="item.icon" class="br-2 elevation-4 ma-0 mt-3 py-2 px-3"
            :value="true" transition="slide-y-transition" v-on:click="splice(item.id)" v-on:mouseenter="onmouseenter(item.id)">
            <v-layout row align-center>
                <p class="flex-1 mr-3 subheading t-500">{{ item.message }}</p>
                <v-btn dark icon class="ma-0">
                    <v-icon medium>close</v-icon>
                </v-btn>
            </v-layout>
        </v-alert>
    </div>
</template>

