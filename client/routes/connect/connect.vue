<!--  -->
<script lang="ts" src="./connect.ts"></script>

<style>
/**/

main.connect--route div.stepper.stepper--vertical span.stepper__step__step {
    margin-right: 24px;
}


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
                <p class="t-lh2 subheading t-300 mb-1">Connect with API Key Pair</p>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid grid-list-xl class="h-100">
            <v-layout column class="ma-0 h-100">

                <v-card class="info mb-4">
                    <!-- <v-toolbar card dense dark color="info">
                        <v-toolbar-title>API Key Pair</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn outline class="ma-0 mr-2 t-transform-none t-400" v-on:click.stop="v_hrefSettingsUrl(exchange.settingsUrl)">
                            <v-icon left>mdi-open-in-new</v-icon>
                            {{ exchange.settingsUrl }}
                        </v-btn>
                    </v-toolbar> -->
                    <v-form v-on:submit.prevent="save">
                        <v-layout row align-center class="ma-0 pa-2">
                            <v-text-field ref="key_input" class="mr-2" color="info" prepend-icon="mdi-key" label="API Key" v-model="apiKey.key"
                                spellcheck="false" clearable solo hide-details></v-text-field>
                            <v-text-field class="mr-2" color="info" prepend-icon="mdi-eye-off" label="API Secret" v-model="apiKey.secret"
                                type="password" spellcheck="false" clearable solo hide-details></v-text-field>
                            <v-text-field v-if="apiKey.passphrase !== undefined" class="mr-2" color="info" prepend-icon="mdi-lock"
                                label="Passphrase" v-model="apiKey.passphrase" type="password" spellcheck="false" clearable
                                solo hide-details></v-text-field>
                            <v-btn :large="valid" outline dark class="ma-0 btn-bold" type="submit" color="white" :disabled="disabled"
                                :loading="saving">
                                <v-icon v-show="valid" left class="animated-none">mdi-lan-pending</v-icon>
                                Connect
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card>



                <v-card>
                    <!-- <v-toolbar card dense dark color="primary"> -->
                    <v-toolbar card dense color="transparent">
                        <!-- <v-icon>mdi-book-open-page-variant</v-icon> -->
                        <!-- <v-icon>mdi-account-key</v-icon> -->
                        <v-toolbar-title>Creating a {{ exchange.name }} API Key Pair</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- <v-btn class="ma-0 mr-2 px-2" color="primary" v-on:click="step++">
                            Next Step
                            <v-icon right>mdi-hand-pointing-right</v-icon>
                        </v-btn> -->
                    </v-toolbar>
                    <v-divider></v-divider>
                </v-card>
                <v-card class="scroll-y br-0">

                    <v-stepper vertical non-linear class="bg-initial shadow-none" v-model="step">

                        <v-stepper-step :step="1" :editable="step != 1" class="subheading">
                            Click the following link to your {{ exchange.name }} API settings:
                            <br>
                            <a class="t-bold" :href="exchange.settingsUrl" target="_blank" v-on:click="clickedUrl">
                                {{ exchange.settingsUrl }}
                            </a>
                            <!-- <div class="flex-row align-center mb-2">
                                <p class="mr-3">
                                    <a :href="exchange.settingsUrl" target="_blank">
                                        <code class="text">{{ exchange.settingsUrl }}</code>
                                    </a>
                                </p> -->
                            <!-- <v-btn outline small class="ma-0 t-transform-none t-400 px-2" :href="exchange.settingsUrl" target="_blank"
                                    v-on:click="v_clickedUrl">
                                    <v-icon left small>mdi-open-in-new</v-icon>
                                    Open Link in New Tab
                                </v-btn> -->
                            <!-- </div> -->
                            <!-- <v-text-field class="" :value="exchange.settingsUrl" disabled solo hide-details></v-text-field> -->
                            <!-- <p class="subheading mb-2">Click this link to access your {{ exchange.name }} account API settings:</p> -->
                            <!-- <v-btn outline class="ma-0 t-transform-none t-400" v-on:click.stop="v_hrefSettingsUrl(exchange.settingsUrl)">
                                <v-icon left>mdi-open-in-new</v-icon>
                                {{ exchange.settingsUrl }}
                            </v-btn> -->
                        </v-stepper-step>
                        <!-- <v-stepper-content :step="1">
                            <div class="pa-2">
                                <v-btn class="mt-2" large color="success" v-on:click="step++">Continue</v-btn>
                            </div>
                        </v-stepper-content> -->

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

                    </v-stepper>

                </v-card>

            </v-layout>
        </v-container>

    </v-content>
</template>

