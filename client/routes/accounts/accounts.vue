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

        <v-dialog v-model="deleteDialog" persistent>
            <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
                        <td class="title">{{ props.item.apiKey.key }}</td>
                        <td width="1">
                            <v-btn v-if="props.item.apiKey.key" block color="error" class="ma-0 t-transform-none" v-on:click="v_deleteApiKey(props.item.id)">
                                <v-icon left>mdi-key-remove</v-icon>
                                Disconnect
                            </v-btn>
                            <v-btn v-else block color="success" class="ma-0 t-transform-none" :to="{ name: 'connect', params: { exchange: props.item.id } }">
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

