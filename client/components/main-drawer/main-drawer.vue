<!--  -->
<script lang="ts" src="./main-drawer.ts"></script>

<style>
/**/

aside.main-drawer > ul.list div.list__tile__action > img {
    width: 24px;
}

aside.main-drawer > ul.list div.list__tile__title > img {
    height: 24px;
}


/**/

</style>

<template>
    <v-navigation-drawer app fixed permanent stateless class="main-drawer pb-0" :mini-variant="!hovering">
        <v-layout column fill-height v-on:mouseover="hovering = true" v-on:mouseleave="hovering = false">

            <v-list>

                <v-list-tile v-for="item in routes" :to="{ name: item.name }" :key="item.name">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.dname }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <!-- <v-list-tile :to="{ name: 'coinbase' }">
                <v-list-tile-action>
                    <img src="img/coinbase-logo.png">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Coinbase
                        <img src="img/coinbase-text.png">
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile> -->

            </v-list>

        </v-layout>
    </v-navigation-drawer>
</template>

