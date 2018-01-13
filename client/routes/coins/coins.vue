<!--  -->
<script lang="ts" src="./coins.ts"></script>

<template>
    <v-content>

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="toggle_main_drawer">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>{{ router_dname }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid>
            <v-layout column>
                <p>this is coins</p>
            </v-layout>
        </v-container>

    </v-content>
</template>

