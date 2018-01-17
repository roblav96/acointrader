<!--  -->
<script lang="ts" src="./connect.ts"></script>

<style>
/**/


/*main.connect--route div.stepper img {}*/


/**/

</style>

<template>
    <v-content class="connect--route">

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="v_toggleMainDrawer" class="mr-4">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-avatar size="48">
                <img class="elevation-1" :src="v_exchange_png(exchange.id)">
            </v-avatar>
            <v-toolbar-title class="t-lh2">
                <p>{{ exchange.name }}</p>
                <p class="subheading t-300">Connecting Your Account</p>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid grid-list-xl class="container--scrollable">
            <v-layout row>
                <v-flex xs3>

                    <v-card ref="key_form" class="z-9">
                        <v-toolbar dense flat dark color="info">
                            <v-toolbar-title>API Key Pair</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-tooltip class="mr-2" bottom transition="false" open-delay="0" close-delay="0">
                                <v-btn icon class="ma-0" :href="exchange.settingsUrl" target="_blank" slot="activator">
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-btn>
                                <span>{{ exchange.settingsUrl }}</span>
                            </v-tooltip>
                        </v-toolbar>
                        <v-form class="pa-3" v-on:submit.prevent="save">
                            <v-text-field ref="key_input" class="mb-3" color="info" prepend-icon="mdi-key" label="API Key" v-model="apiKey.key" hide-details></v-text-field>
                            <v-text-field class="mb-3" color="info" prepend-icon="mdi-eye-off" label="API Secret" v-model="apiKey.secret"
                                type="password" hide-details></v-text-field>
                            <v-text-field v-if="apiKey.passphrase !== undefined" class="mb-3" color="info" prepend-icon="mdi-lock"
                                label="Passphrase" v-model="apiKey.passphrase" type="password" hide-details></v-text-field>
                            <div class="pt-2">
                                <v-btn block large class="ma-0" type="submit" color="info" :disabled="!valid">Save</v-btn>
                            </div>
                        </v-form>
                    </v-card>

                </v-flex>
                <v-flex xs9>

                    <v-card>
                        <v-toolbar dense flat color="transparent">
                            <v-icon>mdi-book-open-page-variant</v-icon>
                            <!-- <v-toolbar-title>Instructions</v-toolbar-title> -->
                            <v-toolbar-title>
                                Create an
                                <code class="info white--text">API Key Pair</code>
                                <!-- for {{ exchange.name }} -->
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>

                        <v-stepper vertical non-linear class="bg-initial shadow-none" v-model="step">

                            <v-stepper-step :step="1" :editable="step != 1">
                                <v-layout row align-center class="mx-0">
                                    <p class="subheading mr-2">Goto your {{ exchange.name }} account API settings</p>
                                    <v-btn outline class="my-0 t-transform-none t-400" v-on:click.stop="v_hrefSettingsUrl(exchange.settingsUrl)">
                                        <v-icon left>mdi-open-in-new</v-icon>
                                        {{ exchange.settingsUrl }}
                                    </v-btn>
                                </v-layout>
                            </v-stepper-step>
                            <v-stepper-content :step="1">
                                <div class="pa-2">
                                    <v-btn class="mt-2" large color="primary" v-on:click="step++">Continue</v-btn>
                                </div>
                            </v-stepper-content>

                            <template v-for="(item, index) in steps">
                                <v-stepper-step :step="index + 2" :editable="step != (index + 2)">
                                    <span class="subheading" v-render="item"></span>
                                </v-stepper-step>
                                <v-stepper-content :step="index + 2">
                                    <div class="pa-2">
                                        <img class="elevation-1 br-2 w-100" :src="'/img/connect/' + exchange.id + '-' + (index + 2) + '.png'">
                                        <v-btn v-if="index + 2 <= steps.length" large color="primary" v-on:click="step++">Continue</v-btn>
                                        <!-- <v-btn v-else large color="info" v-on:click="v_focusKeyInput">Input API Key Pair</v-btn> -->
                                    </div>
                                </v-stepper-content>
                            </template>

                        </v-stepper>

                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>

    </v-content>
</template>

