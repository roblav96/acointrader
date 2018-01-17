<!--  -->
<script lang="ts" src="./accounts.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-content>

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="v_toggleMainDrawer">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>{{ v_routeDname }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon outline large class="ma-0 mr-3">
                <v-icon medium>mdi-help</v-icon>
            </v-btn> -->
        </v-toolbar>

        <v-container fluid grid-list-xl class="container--scrollable">
            <v-card>

                <v-data-table :headers="headers" :items="exchanges" :pagination.sync="v_pagination" hide-actions>
                    <template slot="items" slot-scope="props">
                        <td width="1">
                            <v-btn large icon class="ma-0" :href="props.item.website" target="_blank">
                                <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>
                        </td>
                        <td width="1">
                            <img class="elevation-1 mt-1" style="width: 36px;" :src="v_flag_png(props.item.countryCode)">
                        </td>
                        <td width="1" class="py-3">
                            <a :href="props.item.website" target="_blank">
                                <v-avatar size="48">
                                    <img class="elevation-1" :src="v_exchange_png(props.item.id)">
                                </v-avatar>
                            </a>
                        </td>
                        <td width="1" class="title">{{ props.item.name }}</td>
                        <td>{{ props.item.apiKey.key }}</td>
                        <td width="1">
                            <v-btn color="primary" class="ma-0 t-transform-none" :to="{ name: 'connect', params: { exchange: props.item.id } }">
                                <v-icon left>mdi-key-plus</v-icon>
                                Connect
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>

            </v-card>
        </v-container>

    </v-content>
</template>

