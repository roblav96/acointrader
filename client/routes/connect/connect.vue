<!--  -->
<script lang="ts" src="./connect.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-content class="route--scrollable connect--route">

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="toggle_main_drawer" class="mr-4">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-avatar size="48">
                <img class="elevation-1" :src="v_exchange_png(exchange.id)">
            </v-avatar>
            <v-toolbar-title>
                {{ meta.name }} | Connecting Your Account
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
                            </v-tooltip>
                        </v-toolbar>
                        <v-form class="pa-3" v-on:submit.prevent="save">
                            <v-text-field class="mb-3" label="Key" v-model="api_key.key" hide-details></v-text-field>
                            <v-text-field class="mb-3" label="Secret" v-model="api_key.secret" type="password" hide-details></v-text-field>
                            <v-btn block large class="ma-0" type="submit" color="success" :disabled="disabled">Save</v-btn>
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

                        <v-stepper vertical non-linear class="bg-initial shadow-none" v-model="step">

                            <v-stepper-step step="1" :editable="step != 1">
                                <v-layout row align-center class="mx-0">
                                    <p class="subheading mr-2">Goto your {{ meta.name }} account API settings</p>
                                    <v-btn outline class="my-0 t-transform-none t-400" v-on:click.stop="href_keyurl(meta.keyurl)">
                                        <v-icon left>mdi-open-in-new</v-icon>
                                        {{ meta.keyurl }}
                                    </v-btn>
                                </v-layout>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <div class="pa-2">
                                    <v-btn class="mt-2" color="primary" v-on:click="step++">Continue</v-btn>
                                </div>
                            </v-stepper-content>

                            <v-stepper-step step="2" :editable="step != 2">
                                <span class="subheading">
                                    In the
                                    <code>API Access</code> tab, under the
                                    <code>API Keys</code> section, click the
                                    <code>+ New API Key</code> button
                                </span>
                            </v-stepper-step>
                            <v-stepper-content step="2">
                                <div class="pa-2">
                                    <img class="elevation-1 br-2 w-100" src="/img/connect/coinbase-2.png">
                                    <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                                </div>
                            </v-stepper-content>

                            <v-stepper-step step="3" :editable="step != 3">
                                <span class="subheading">
                                    In the
                                    <code>Accounts</code> section, click the
                                    <code>all</code> checkbox
                                </span>
                            </v-stepper-step>
                            <v-stepper-content step="3">
                                <div class="pa-2">
                                    <img class="elevation-1 br-2 w-100" src="/img/connect/coinbase-3.png">
                                    <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                                </div>
                            </v-stepper-content>

                            <v-stepper-step step="4" :editable="step != 4">
                                <span class="subheading">
                                    In the
                                    <code>Permissions</code> section, at the bottom of
                                    <code>API v2 permissions</code> click
                                    <code>Select all</code>
                                </span>
                            </v-stepper-step>
                            <v-stepper-content step="4">
                                <div class="pa-2">
                                    <img class="elevation-1 br-2 w-100" src="/img/connect/coinbase-4.png">
                                    <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                                </div>
                            </v-stepper-content>

                            <v-stepper-step step="5" :editable="step != 5">
                                <span class="subheading">
                                    In the
                                    <code>Notifications</code> section, set the
                                    <code>Notification URL</code> to
                                    <code class="red--text">https://acointrader.com/api/coinbase/notifications</code>
                                    <br>Then in the
                                    <code>Security settings</code> section, set the
                                    <code>Allowed IP Addresses</code> to
                                    <code class="red--text">192.34.85.234</code>
                                    <br>Finally click the
                                    <code class="light-blue--text">Create</code> button
                                </span>
                            </v-stepper-step>
                            <v-stepper-content step="5">
                                <div class="pa-2">
                                    <img class="elevation-1 br-2 w-100" src="/img/connect/coinbase-5.png">
                                    <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                                </div>
                            </v-stepper-content>

                        </v-stepper>

                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>

    </v-content>
</template>

