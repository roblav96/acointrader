<!--  -->
<script lang="ts" src="./connect.ts"></script>

<style>
/**/

main.connect--route .stepper--vertical .stepper__step {
	/*padding-bottom: 24px;*/
}


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
                Connect Your {{ meta.name }} Account
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
                            <v-text-field class="mb-3" label="Key" v-model="api_key.key" hide-details solo></v-text-field>
                            <v-text-field class="mb-3" label="Secret" v-model="api_key.secret" type="password" hide-details solo></v-text-field>
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

                            <v-stepper-step step="1" editable>
                                <span class="subheading mb-2">Click the following link to create a {{ meta.name }} API key:</span>
                                <!-- <v-btn outline class="ma-0 t-transform-none t-400" :href="meta.keyurl" target="_blank"> -->
                                <v-btn outline class="ma-0 t-transform-none t-400" v-on:click="v_href(meta.keyurl)">
                                    {{ meta.keyurl }}
                                </v-btn>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <img class="card w-100" src="/img/connect/coinbase-1.png">
                                <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                            </v-stepper-content>

                            <v-stepper-step step="2" editable>
                                <span class="subheading">In the "Accounts" section, select "all"</span>
                            </v-stepper-step>
                            <v-stepper-content step="2">
                                <img class="card w-100" src="/img/connect/coinbase-2.png">
                                <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                            </v-stepper-content>

                            <v-stepper-step step="3" editable>
                                <span class="subheading">In the "Permissions" section, click "Select all"</span>
                            </v-stepper-step>
                            <v-stepper-content step="3">
                                <img class="card w-100" src="/img/connect/coinbase-3.png">
                                <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                            </v-stepper-content>

                            <v-stepper-step step="4" editable>
                                <span class="subheading">
                                    In the "Notifications" section, set <code>https://acointrader.com/api/coinbase/notifications</code>
                                </span>
                            </v-stepper-step>
                            <v-stepper-content step="4">
                                <img class="card w-100" src="/img/connect/coinbase-4.png">
                                <v-btn color="primary" v-on:click="step++">Continue</v-btn>
                            </v-stepper-content>

                        </v-stepper>

                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>

    </v-content>
</template>

