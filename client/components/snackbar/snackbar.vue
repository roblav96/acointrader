<!--  -->
<script lang="ts" src="./snackbar.ts"></script>

<style>
/**/

div.snackbar--wrapper {
    position: absolute;
    top: -4px;
    right: 50%;
    transform: translateX(50%);
    z-index: 99;
}


/**/

</style>

<template>
    <div class="snackbar--wrapper">
        <v-slide-y-transition>
            <v-alert v-for="item in items" :key="item.id" :color="item.color" class="br-2 elevation-8 ma-0 mt-3 py-0 px-3"
                :value="true" v-on:click="splice(item.id)" v-on:mouseenter="onmouseenter(item.id)">
                <v-layout row align-center>
                    <v-icon medium class="ml-1 mr-3">{{ item.icon }}</v-icon>
                    <p class="flex-1 py-3 subheading t-500">{{ item.message }}</p>
                    <v-btn dark icon large class="ma-0 ml-3">
                        <v-icon medium>close</v-icon>
                    </v-btn>
                </v-layout>
            </v-alert>
        </v-slide-y-transition>
    </div>
</template>

