<!--  -->
<script lang="ts" src="./accounts.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-content class="content--scrollable accounts--route">

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="v_toggleMainDrawer">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>{{ v_routeDname }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon outline large class="ma-0 mr-3">
                <v-icon medium>mdi-help</v-icon>
            </v-btn> -->

            <!-- <v-form class="flex-row align-center" v-on:submit.prevent="submitsearch(imagesearch)">
                <v-text-field light ref="image_input" class="mr-3" style="max-width: 300px;" prepend-icon="mdi-magnify"
                    label="Exchange Image Search..." v-model="imagesearch" spellcheck="false" solo></v-text-field>
                <v-btn icon flat large class="ma-0" type="submit" color="white">
                    <v-icon medium>mdi-open-in-new</v-icon>
                </v-btn>
            </v-form> -->

        </v-toolbar>

        <v-container fluid grid-list-xl>
            <v-card>

                <v-data-table :headers="headers" :items="exchanges" :pagination.sync="pagination" hide-actions>
                    <template slot="items" slot-scope="props">
                        <!-- <tr class="my-2"> -->
                            <!-- <td width="1">
                            <v-btn large icon class="ma-0" :href="props.item.website" target="_blank">
                                <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>
                        </td> -->
                            <td width="1">
                                <!-- <v-tooltip right transition="false" open-delay="0" close-delay="0" class="ma-0 pa-0"> -->
                                <img class="elevation-1 mt-1" style="width: 36px;" :src="v_flag_png(props.item.countryCode)" slot="activator">
                                <!-- <span>{{ props.item.countryCode }}</span> -->
                                <!-- </v-tooltip> -->
                            </td>
                            <td width="1">
                                <a :href="props.item.website" target="_blank">
                                    <v-avatar size="48">
                                        <img class="elevation-1" :src="v_exchange_png(props.item.id)">
                                    </v-avatar>
                                </a>
                            </td>
                            <td width="1" class="title">{{ props.item.name }}</td>
                            <td class="body-1">{{ v_truncate(props.item.apiKey.key) }}</td>
                            <td width="1">
                                <v-btn v-if="props.item.connectable == false" block large disabled class="ma-0 t-transform-none">
                                    <v-icon left medium>mdi-worker</v-icon>
                                    WIP
                                </v-btn>
                                <v-btn v-else-if="props.item.apiKey.key" block large color="error" class="ma-0 t-transform-none" v-on:click="disconnectApiKey(props.item.id)">
                                    <v-icon left medium>mdi-key-remove</v-icon>
                                    Disconnect
                                </v-btn>
                                <v-btn v-else block large color="primary" class="ma-0 t-transform-none" :to="{ name: 'connect', params: { exchange: props.item.id } }">
                                    <v-icon left medium>mdi-key-plus</v-icon>
                                    Connect
                                </v-btn>
                            </td>
                        <!-- </tr> -->
                    </template>
                </v-data-table>

            </v-card>
        </v-container>

        <v-dialog persistent lazy scrollable max-width="50%" content-class="scroll-y-none" v-model="deletingDialog">
            <v-card>
                <v-toolbar flat dark color="error">
                    <v-toolbar-title>Delete {{ deleting.name }} API Key</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn outline class="my-0 mr-3 t-transform-none t-400" :href="deleting.settingsUrl" target="_blank">
                        <v-icon left>mdi-open-in-new</v-icon>
                        {{ deleting.settingsUrl }}
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <img class="elevation-1 br-2 w-100" :src="'/img/connect/' + deleting.id + '-delete.png'">
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pa-3">
                    <p class="title t-400">
                        Delete the API key
                        <code v-if="deleting.id" class="py-1">{{ deleting.apiKey.key }}</code>
                        from your {{ deleting.name }} account settings then click disconnect
                    </p>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-3">
                    <v-btn large flat class="ma-0 mr-3" v-on:click="deletingDialog = false">Cancel</v-btn>
                    <v-btn large block class="ma-0" color="error" v-on:click="deleteApiKey(deleting.id)">Disconnect</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-content>
</template>

