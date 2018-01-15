<!--  -->
<script lang="ts" src="./accounts.ts"></script>

<style>
/**/

main.accounts--route table img {
    background-color: white;
}


/*li.expansion-panel__container--active div.expansion-panel__header p {
    color: #21CE99;
    font-weight: bold;
}*/


/*div.tabs.accounts--tabs div.tabs__container {
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
}*/


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
            <v-btn icon outline large class="ma-0 mr-3">
                <v-icon medium>mdi-help</v-icon>
            </v-btn>
        </v-toolbar>



        <v-container fluid grid-list-xl>

            <v-card>
                <v-toolbar dense flat dark color="primary">
                    <v-toolbar-title>Supported Exchanges</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-data-table class="accounts--table" :headers="headers" :items="exchanges" :pagination.sync="pagination"
                    hide-actions>
                    <template slot="items" slot-scope="props">
                        <!-- <td width="1">
                            <v-icon>{{ props.item.active ? 'mdi-lan-connect' : 'mdi-lan-disconnect' }}</v-icon>
                        </td> -->
                        <td width="1">
                            <img class="mt-1 elevation-1" style="width: 36px;" :src="v_flag_png(props.item.country)">
                        </td>
                        <td width="1" class="py-2">
                            <v-avatar size="48">
                                <img class="elevation-1" :src="v_exchange_png(props.item.id)">
                            </v-avatar>
                        </td>
                        <td width="1" class="subheading t-500">{{ props.item.name }}</td>
                        <td>
                            <!-- {{ props.item.key }} -->
                            <v-btn color="primary" class="ma-0 t-transform-none" :href="props.item.url" target="_blank">
                                <v-icon left>mdi-cloud-sync</v-icon>
                                Sync
                                <!-- Connect your {{ props.item.name }} Account -->
                            </v-btn>
                        </td>
                        <td width="1">
                            <v-btn large icon class="ma-0" :href="props.item.url" target="_blank">
                                <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>
                            <!-- <v-btn flat class="ma-0 t-transform-none t-400" :href="props.item.url" target="_blank">
                            <v-icon left>mdi-open-in-new</v-icon>{{ v_domain(props.item.url) }}
                        </v-btn> -->
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>



        <!-- <v-tabs show-arrows icons-and-text v-model="tab_index" class="accounts--tabs">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab class="t-transform-none" v-for="item in exchanges" :key="item.id">
                {{ item.dname }}
                <img :src="v_exchange_png(item.id)">
            </v-tab>
        </v-tabs> -->



        <!-- <v-container fluid grid-list-xl>
            <v-layout row>



                <v-flex xs4>
                    <v-card>

                        <v-toolbar dense flat dark color="primary">
                            <v-toolbar-title>Supported Exchanges</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-list two-line class="accounts--exchanges py-0">
                            <template v-for="(item, index) in exchanges">
                                <v-list-tile avatar :key="item.id">
                                    <v-list-tile-avatar>
                                        <img class="elevation-1" :src="v_exchange_png(item.id)">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                        <v-list-tile-sub-title>
                                        	<p>Inactive</p>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                    	<v-list-tile-action-text>Inavtive</v-list-tile-action-text>
                                        <img class="elevation-1 w-4" :src="v_flag_png(item.country)">
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider v-if="index < exchanges.length - 1" inset></v-divider>
                            </template>
                        </v-list> -->

        <!-- <v-list two-line>
                            <v-list-tile avatar v-for="item in exchanges" :key="item.id">
                                <v-list-tile-avatar>
                                    <v-icon>mdi-open</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.dname }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn icon ripple>
                                        <v-icon>info</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list> -->

        <!-- <v-toolbar dense flat dark color="primary">
                            <v-icon medium>mdi-key</v-icon>
                            <v-toolbar-title>API Keys</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-expansion-panel class="shadow-none">
                            <v-expansion-panel-content :lazy="true" :ripple="true" v-for="(item, index) in exchanges" :key="index">
                                <div slot="header">
                                    <p class="select-none">{{ item.dname }}</p>
                                </div>
                                <v-divider></v-divider>
                                <v-card>
                                    <v-card-text>
                                        Lorem ipsum dsfgolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel> -->

        <!-- </v-card>
                </v-flex>



                <v-flex xs8>
                    <v-card>

                        <v-toolbar dense flat dark color="primary">
                            <v-icon medium>mdi-book-open-page-variant</v-icon>
                            <v-toolbar-title>
                                Aquiring API Key Step-by-Step Instructions
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-stepper vertical class="bg-initial shadow-none" v-model="step">
                            <v-stepper-step step="1" :complete="step > 1">
                                Select an app
                                <small>Summarize if needed</small>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-step step="2" :complete="step > 2">Configure analytics for this app</v-stepper-step>
                            <v-stepper-content step="2">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-step step="3" :complete="step > 3">Select an ad format and name ad unit</v-stepper-step>
                            <v-stepper-content step="3">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 4">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                            <v-stepper-step step="4">View setup instructions</v-stepper-step>
                            <v-stepper-content step="4">
                                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                                <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
                                <v-btn flat>Cancel</v-btn>
                            </v-stepper-content>
                        </v-stepper>

                    </v-card>
                </v-flex>



            </v-layout>
        </v-container> -->



        <!-- <v-fab-transition appear>
            <v-btn dark fab fixed bottom right large color="primary">
                <v-icon>close</v-icon>
            </v-btn>
        </v-fab-transition> -->

    </v-content>
</template>

