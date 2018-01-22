<!--  -->
<script lang="ts" src="./connect.ts"></script>

<style>
/**/


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
            <v-toolbar-title>
                <p class="t-lh2 headline t-500">{{ exchange.name }}</p>
                <p class="t-lh2 subheading t-300 mb-1">Connect via API Key Pair</p>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid grid-list-xl fill-height class="container--scrollable">
            <v-layout column class="ma-0">

                <v-card class="flex-0 mb-4">
                    <v-form v-on:submit.prevent="save">
                        <v-toolbar card dense dark color="info">
                            <v-toolbar-title>API Key Pair</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn outline class="ma-0 mr-2 t-transform-none t-400" v-on:click.stop="v_hrefSettingsUrl(exchange.settingsUrl)">
                                <v-icon left>mdi-open-in-new</v-icon>
                                {{ exchange.settingsUrl }}
                            </v-btn>
                        </v-toolbar>
                        <v-layout row align-center class="ma-0 pa-3">
                            <v-text-field ref="key_input" class="mr-3" color="info" prepend-icon="mdi-key" label="API Key" v-model="apiKey.key"
                                solo hide-details></v-text-field>
                            <v-text-field class="mr-3" color="info" prepend-icon="mdi-eye-off" label="API Secret" v-model="apiKey.secret"
                                type="password" solo hide-details></v-text-field>
                            <v-text-field v-if="apiKey.passphrase !== undefined" class="mr-3" color="info" prepend-icon="mdi-lock"
                                label="Passphrase" v-model="apiKey.passphrase" type="password" solo hide-details></v-text-field>
                            <v-btn large class="ma-0" type="submit" color="info" :disabled="disabled" :loading="saving">
                                Connect
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card>

                <v-card class="flex-1">
                    <v-toolbar card prominent color="transparent">
                        <v-icon medium>mdi-book-open-page-variant</v-icon>
                        <v-toolbar-title class="headline">Creating a {{ exchange.name }} API Key Pair</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn large class="mr-2" color="success" v-on:click="step++">
                            Next Step
                            <v-icon right>mdi-hand-pointing-right</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-divider></v-divider>

                    <v-stepper non-linear class="bg-initial shadow-none" v-model="step">
                        <v-stepper-header class="shadow-none">
                            <v-stepper-step step="1" :editable="step != 1">API Settings</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="2" :complete="step > 2"></v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="3">Name of step 3</v-stepper-step>
                        </v-stepper-header>
                        <v-divider></v-divider>
                        <v-stepper-items>
                            <v-stepper-content class="pa-4" step="1">
                                <p class="subheading mb-3">Goto your {{ exchange.name }} account API settings by clicking this link:</p>
                                <v-btn outline large class="ma-0 t-transform-none t-400" v-on:click.stop="v_hrefSettingsUrl(exchange.settingsUrl)">
                                    <v-icon left>mdi-open-in-new</v-icon>
                                    {{ exchange.settingsUrl }}
                                </v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-card color="grey lighten-1" class="mb-5" height="20px"></v-card>
                                <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="3">
                                <v-card color="grey lighten-1" class="mb-5" height="20px"></v-card>
                                <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-card>

            </v-layout>

        </v-container>

        <!-- <v-stepper non-linear class="bg-initial shadow-none" v-model="step">

            <v-stepper-step :step="1" :editable="step != 1">
                <p class="subheading mb-2">Goto your {{ exchange.name }} account API settings by clicking this link:</p>
                <v-btn outline class="ma-0 t-transform-none t-400" v-on:click.stop="v_hrefSettingsUrl(exchange.settingsUrl)">
                    <v-icon left>mdi-open-in-new</v-icon>
                    {{ exchange.settingsUrl }}
                </v-btn>
            </v-stepper-step>
            <v-stepper-content :step="1">
                <div class="pa-2">
                    <v-btn class="mt-2" large color="success" v-on:click="step++">Continue</v-btn>
                </div>
            </v-stepper-content>

            <template v-for="(item, index) in steps">
                <v-stepper-step :step="index + 2" :editable="step != (index + 2)">
                    <span class="subheading" v-render="item"></span>
                </v-stepper-step>
                <v-stepper-content :step="index + 2">
                    <div class="pa-2">
                        <img class="elevation-1 br-2 w-100" style="max-width: 800px;" :src="'/img/connect/' + exchange.id + '-' + (index + 2) + '.png'">
                        <br>
                        <v-btn v-if="index + 2 <= steps.length" large color="success" v-on:click="step++">Continue</v-btn>
                    </div>
                </v-stepper-content>
            </template>

        </v-stepper> -->

    </v-content>
</template>

