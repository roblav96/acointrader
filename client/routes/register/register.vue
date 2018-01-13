<!--  -->
<script lang="ts" src="./register.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-content>

        <v-toolbar app fixed dark color="primary">
            <v-toolbar-title>{{ router_dname }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid grid-list-xl>
            <v-layout row>

                <v-flex xs4>
                    <v-card>
                        <v-toolbar dense flat color="primary">
                            <v-icon>mdi-key</v-icon>
                            <v-toolbar-title>Exchange API Keys</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-list class="py-0">
                            <template v-for="(v, k, i) in keys">
                                <v-list-tile avatar ripple v-on:click="editing = k" :key="k">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ k }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ v.api_key }}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{ v.api_secret }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <!-- <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text> -->
                                        <v-icon color="yellow">star</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <!-- <v-divider v-if="index + 1 < items.length" :key="index"></v-divider> -->
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>

                <v-flex xs8>
                    <v-card>
                        <v-card-text>8</v-card-text>
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>

    </v-content>
</template>

