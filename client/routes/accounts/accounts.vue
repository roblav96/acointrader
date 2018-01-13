<!--  -->
<script lang="ts" src="./accounts.ts"></script>

<style>
/**/

div.tabs.accounts--tabs div.tabs__container {
	height: 100px !important;
}

div.tabs.accounts--tabs img {
	height: 48px;
	margin-bottom: 8px;
}

div.tabs.accounts--tabs a.tabs__item {
	font-size: 16px;
}

div.tabs.accounts--tabs div.tabs__slider {
	height: 4px;
}

/*li.expansion-panel__container--active div.expansion-panel__header p {
    color: #21CE99;
    font-weight: bold;
}*/


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



        <v-tabs icons-and-text v-model="tab_index" class="accounts--tabs">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab class="t-transform-none" v-for="item in exchanges" :key="item.id">
                {{ item.dname }}
                <!-- <v-icon>favorite</v-icon> -->
                <img :src="v_exchange_png(item.id)">
            </v-tab>
        </v-tabs>



        <!-- <v-container fluid grid-list-xl>
            <v-layout row>



                <v-flex xs4>
                    <v-card>

                        <v-toolbar dense flat dark color="primary">
                            <v-icon medium>mdi-key</v-icon>
                            <v-toolbar-title>Exchange API Keys</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-expansion-panel class="shadow-none">
                            <v-expansion-panel-content :ripple="true" v-for="(item, index) in exchanges" :key="index" :value="visibles[index]">
                                <p class="select-none" slot="header" v-on:click="setTutsId(item.id)">
                                    {{ item.dname }}
                                </p>
                                <v-divider></v-divider>
                                <v-card>
                                    <v-card-text>
                                        Lorem ipsum dsfgolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                    </v-card>
                </v-flex>



                <v-flex xs8>
                    <v-card v-if="tuts_id">

                        <v-toolbar dense flat dark color="primary">
                            <v-icon medium>mdi-book-open-page-variant</v-icon>
                            <v-toolbar-title>
                                {{ tutsing.dname }}: Aquiring API Key Step-by-Step Instructions
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

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
        </v-container> -->

    </v-content>
</template>

