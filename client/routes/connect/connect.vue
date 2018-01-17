<!--  -->
<script lang="ts" src="./connect.ts"></script>

<template>
    <v-content class="route--connect route--scrollable">

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="toggle_main_drawer" class="mr-4">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-avatar size="48">
                <img class="elevation-1" :src="v_exchange_png(exchange.id)">
            </v-avatar>
            <v-toolbar-title>
                Connect Your {{ meta.name }} Account
                <!-- <span class="t-300">| Connect Instructions</span> -->
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid grid-list-xl class="my-1">
            <v-layout row>
                <v-flex xs3>

                    <v-card>
                        <v-toolbar dense flat dark color="primary">
                            <v-icon>mdi-key</v-icon>
                            <v-toolbar-title>API Key</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-tooltip class="mr-2" bottom transition="false" open-delay="0" close-delay="0">
                                <v-btn icon class="ma-0" :href="meta.keyurl" target="_blank" slot="activator">
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-btn>
                                <span>{{ meta.keyurl }}</span>
                                <!-- <span>Goto {{ meta.name }} API Setup</span> -->
                            </v-tooltip>
                        </v-toolbar>
                        <v-form class="pa-3" v-on:submit.prevent="save">
                            <v-text-field class="mb-3" label="Key" v-model="api_key.key" hide-details solo></v-text-field>
                            <v-text-field class="mb-3" label="Secret" v-model="api_key.secret" type="password" hide-details solo></v-text-field>
                            <v-btn block large class="my-0" type="submit" color="success" :disabled="disabled">Submit</v-btn>
                        </v-form>
                    </v-card>

                </v-flex>



                <v-flex xs9>
                    <v-card>
                        <v-toolbar dense flat dark color="primary">
                            <v-icon>mdi-book-open-page-variant</v-icon>
                            <v-toolbar-title>Instructions</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        
                        <v-stepper vertical class="bg-initial shadow-none" v-model="step">
                            <v-stepper-step step="1" :complete="step > 1">
                                Select an app
                                <small>Summarize if needed</small>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-step step="2" :complete="step > 2">Configure analytics for this app</v-stepper-step>
                            <v-stepper-content step="2">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-step step="3" :complete="step > 3">Select an ad format and name ad unit</v-stepper-step>
                            <v-stepper-content step="3">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 4">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-step step="4">View setup instructions</v-stepper-step>
                            <v-stepper-content step="4">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                        </v-stepper>
                        
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>

    </v-content>
</template>

