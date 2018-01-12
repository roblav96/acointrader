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


/**/

</style>

<template>
    <v-navigation-drawer app fixed v-model="drawer" class="main-drawer">
        <v-list>

            <v-list-tile :to="{ name: 'signup' }">
                <v-list-tile-action>
                    <v-icon>mdi-account-plus</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Signup</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'coinbase' }">
                <v-list-tile-action>
                    <img src="img/coinbase-logo.png">
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Coinbase
                        <!-- <img src="img/coinbase-text.png"> -->
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
    </v-navigation-drawer>
</template>

