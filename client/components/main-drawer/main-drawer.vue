<!--  -->
<script lang="ts" src="./main-drawer.ts"></script>

<style>
/**/


/*aside.main-drawer {
    transition-timing-function: ease-in !important;
    transition-duration: 0.3s !important;
}*/

aside.main-drawer div.list__tile__action > img {
    width: 24px;
}

aside.main-drawer div.list__tile__title > img {
    height: 24px;
}

aside.main-drawer a.list__tile.list__tile--active div.list__tile__title {
    font-weight: 500;
}

aside.main-drawer div.list__tile__content {
    transition: opacity 0.1s linear;
    white-space: nowrap;
}

aside.main-drawer hr.divider {
    display: inherit !important;
    transition: opacity 0.1s linear;
}


/**/

</style>

<template>
    <v-navigation-drawer app fixed permanent stateless class="main-drawer pb-0" :mini-variant="!main_drawer.show">

        <v-layout column fill-height>
            <!-- <v-layout column fill-height v-on:mouseover="hovering = true" v-on:mouseleave="hovering = false"> -->

            <v-list two-line class="pt-0 pb-5">

                <template v-for="item in routes">
                    <v-list-tile v-ripple :to="{ name: item.name }" :key="item.name">
                        <v-list-tile-action>
                            <v-icon medium :class="{ 't-bold': item.bold }">{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.dname }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>

        </v-layout>
    </v-navigation-drawer>
</template>

