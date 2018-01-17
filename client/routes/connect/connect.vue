<!--  -->
<script lang="ts" src="./connect.ts"></script>

<template>
    <v-content>

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="toggle_main_drawer" class="mr-4">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-avatar size="48">
                <img class="img--exchange elevation-1" :src="v_exchange_png(exchange.id)">
            </v-avatar>
            <v-toolbar-title>
                {{ name }} | Connect Instructions
                <!-- <span class="t-300">| Connect Instructions</span> -->
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid grid-list-xl>
            <v-layout row>
                <v-flex xs4>
                    <v-card>
                        <v-toolbar dense flat dark color="primary">
                            <v-icon medium>mdi-key</v-icon>
                            <v-toolbar-title>API Key</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-form class="pa-3">
                            <v-text-field class="mb-3" label="Key" v-model="api_key.key" hide-details solo></v-text-field>
                            <v-text-field class="mb-3" label="Secret" v-model="api_key.secret" type="password" hide-details solo></v-text-field>
                            <v-btn block color="success">Submit</v-btn>
                        </v-form>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </v-content>
</template>

