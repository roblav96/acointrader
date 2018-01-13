<!--  -->
<script lang="ts" src="./main-drawer.ts"></script>

<style>
/**/

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
}


/**/

</style>

<template>
    <v-navigation-drawer app fixed permanent stateless class="main-drawer pb-0" :mini-variant="!hovering">

        <v-layout column fill-height v-on:mouseover="ishovering = true" v-on:mouseleave="ishovering = false">

            <v-list two-line class="pb-5">

                <template v-for="item in routes">

                    <v-list-tile v-ripple :to="{ name: item.name }" :key="item.name">
                        <v-list-tile-action>
                            <v-icon medium>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.dname }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider inset></v-divider>
                </template>



                <!-- <v-subheader inset>Folders</v-subheader>
                <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
                    <v-list-tile-avatar>
                        <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-subheader inset>Files</v-subheader>
                <v-list-tile v-for="item in items2" v-bind:key="item.title" avatar @click="">
                    <v-list-tile-avatar>
                        <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile> -->

                <!-- <v-list-tile v-ripple v-for="item in routes" :to="{ name: item.name }" :key="item.name">
                    <v-list-tile-action>
                        <v-icon medium>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.dname }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile> -->

                <!-- <v-list-tile :to="{ name: 'coinbase' }">
                <v-list-tile-action>
                    <img src="img/coinbase-logo.png">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Coinbase
                        <img src="img/coinbase-banner.png">
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile> -->

            </v-list>

        </v-layout>
    </v-navigation-drawer>
</template>

