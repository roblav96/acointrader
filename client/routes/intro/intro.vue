<!--  -->
<script lang="ts" src="./intro.ts"></script>

<template>
    <v-content>

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="v_toggleMainDrawer">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>{{ v_routeDname }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid>
            <v-layout column>
                <p>this is intro</p>
            </v-layout>
        </v-container>

    </v-content>
</template>

