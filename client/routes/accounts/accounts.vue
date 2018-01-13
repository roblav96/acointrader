<!--  -->
<script lang="ts" src="./accounts.ts"></script>

<style>
/**/

li.expansion-panel__container--active div.expansion-panel__header p {
    color: #21CE99;
    font-weight: bold;
}


/**/

</style>

<template>
    <v-content>

        <v-toolbar app fixed dark color="primary">
            <v-btn icon large v-on:click="toggle_main_drawer">
                <v-icon medium>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>{{ router_dname }}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>



        <v-container fluid grid-list-xl>
            <v-layout row>



                <v-flex xs4>
                    <v-card>

                        <v-toolbar dense flat dark color="primary">
                            <v-icon>mdi-key</v-icon>
                            <v-toolbar-title>Exchange API Keys</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-expansion-panel class="shadow-none">
                            <v-expansion-panel-content :ripple="true" v-for="(item, index) in exchanges" :key="index">
                                <p class="select-none" slot="header">
                                    {{ item.dname }}
                                </p>
                                <v-divider></v-divider>
                                <v-card>
                                    <v-card-text>
                                        Lorem ipsum dsfgolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                    </v-card>
                </v-flex>




                <!-- <v-flex xs3>
                    <v-card>
                        <v-toolbar dense flat dark color="primary">
                            <v-icon>mdi-key</v-icon>
                            <v-toolbar-title>Exchange API Keys</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-list class="py-0">
                            <template v-for="(item, index) in exchanges">
                                <v-list-tile avatar ripple v-on:click="editing = item.id" :key="item.id">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.dname }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ item.api_key.key }}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{ item.api_key.secret }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                    	
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider v-if="index + 1 < exchanges.length" :key="index"></v-divider>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex> -->

                <v-flex xs8>
                    <v-card>

                        <v-stepper vertical class="bg-initial shadow-none" v-model="step">
                            <v-stepper-header>
                                <v-stepper-step step="1" :complete="step > 1">Name of step 1</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step step="2" :complete="step > 2">Name of step 2</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step step="3">Name of step 3</v-stepper-step>
                            </v-stepper-header>
                            <v-stepper-items>
                                <v-stepper-content step="1">
                                    <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                    <v-btn color="primary" v-on:click="step = 2">Continue</v-btn>
                                    <v-btn flat>Cancel</v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="2">
                                    <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                    <v-btn color="primary" v-on:click="step = 3">Continue</v-btn>
                                    <v-btn flat>Cancel</v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="3">
                                    <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                    <v-btn color="primary" v-on:click="step = 1">Continue</v-btn>
                                    <v-btn flat>Cancel</v-btn>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>

                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>

    </v-content>
</template>

