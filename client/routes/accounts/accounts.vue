<!--  -->
<script lang="ts" src="./accounts.ts"></script>

<style>
/**/

main.accounts--route table img {
    background-color: white;
}


/**/

</style>

<template>
    <v-content class="accounts--route route-scroll-y">

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="toggle_main_drawer">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>{{ router_dname }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon outline large class="ma-0 mr-3">
                <v-icon medium>mdi-help</v-icon>
            </v-btn> -->
        </v-toolbar>



        <v-container fluid grid-list-xl>

            <v-card>
                <!-- <v-toolbar dense flat dark color="primary">
                    <v-toolbar-title>Supported Exchanges</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar> -->
                <v-data-table class="accounts--table" :headers="headers" :items="exchanges" :pagination.sync="pagination"
                    hide-actions>
                    <template slot="items" slot-scope="props">
                        <td width="1">
                            <v-btn large icon class="ma-0" :href="props.item.url" target="_blank">
                                <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>
                            <!-- <v-btn flat class="ma-0 t-transform-none t-400" :href="props.item.url" target="_blank">
                            <v-icon left>mdi-open-in-new</v-icon>{{ v_domain(props.item.url) }}
                        </v-btn> -->
                        </td>
                        <!-- <td width="1">
                            <v-icon>{{ props.item.active ? 'mdi-lan-connect' : 'mdi-lan-disconnect' }}</v-icon>
                        </td> -->
                        <td width="1">
                            <img class="mt-1 elevation-1" style="width: 36px;" :src="v_flag_png(props.item.country)">
                            <!-- <v-layout row align-center>
                                <img class="elevation-1" style="width: 36px;" :src="v_flag_png(props.item.country)">
                                <p class="ml-2">{{ props.item.country }}</p>
                            </v-layout> -->
                        </td>
                        <td width="1" class="py-3">
                            <a :href="props.item.url" target="_blank">
                                <v-avatar size="48">
                                    <img class="elevation-1" :src="v_exchange_png(props.item.id)">
                                </v-avatar>
                            </a>
                        </td>
                        <td width="1" class="title">{{ props.item.name }}</td>
                        <td>{{ props.item.key }}</td>
                        <td width="1">
                            <!-- {{ props.item.key }} -->
                            <v-btn color="primary" class="ma-0 t-transform-none" :to="{ name: 'connect', params: { exchange: props.item.id } }">
                                <v-icon left>mdi-key-plus</v-icon>
                                Connect
                                <!-- Connect your {{ props.item.name }} Account -->
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>



        <!-- <v-fab-transition>
            <v-btn v-show="fab" dark fab fixed bottom right large color="primary" class="ma-4">
                <v-icon large>add</v-icon>
            </v-btn>
        </v-fab-transition> -->

    </v-content>
</template>

