<!--  -->
<script lang="ts" src="./snackbar.ts"></script>

<style>
/**/

div.snackbar--wrapper {
    position: absolute;
    min-width: 500px;
    width: 50%;
    top: 0px;
    right: 50%;
    transform: translateX(50%);
    z-index: 99;
}


/**/

</style>

<template>
    <transition-group class="snackbar--wrapper" name="slide-y-transition" tag="div">
        <v-alert v-for="item in items" :key="item.message" :color="item.color" class="br-2 elevation-4 ma-0 mt-3 py-0 pl-4 pr-3"
            :value="true" v-on:click="splice(item.id)" v-on:mouseenter="onmouseenter(item.id)">
            <v-layout row align-center>
                <v-icon v-if="item.icon" dark medium class="mr-4">{{ item.icon }}</v-icon>
                <p class="flex-1 my-3 subheading t-500" v-on:click.stop>{{ item.message }}</p>
                <v-btn dark icon large class="ma-0 ml-3">
                    <v-icon dark medium>close</v-icon>
                </v-btn>
            </v-layout>
        </v-alert>
    </transition-group>
</template>

