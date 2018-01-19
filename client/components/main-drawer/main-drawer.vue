<!--  -->
<script lang="ts" src="./main-drawer.ts"></script>

<style>
/**/

aside.main--drawer ul.list img {
    width: 24px;
    height: 24px;
}

aside.main--drawer a.list__tile.list__tile--active div.list__tile__title {
    font-weight: 500;
}

aside.main--drawer div.list__tile__content {
    transition: opacity 0.2s ease;
    white-space: nowrap;
}

aside.main--drawer.navigation-drawer--mini-variant hr.divider {
    display: inherit !important;
    transition: opacity 0.2s ease;
    opacity: 0;
}


/*aside.main--drawer.navigation-drawer--mini-variant hr.divider.divider--inset {
    opacity: 0;
}*/

/*aside.main--drawer table.debug--breakpoints {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999999;
}*/


/**/

</style>

<template>
    <v-navigation-drawer app fixed permanent stateless floating class="main--drawer card br-0 pb-0" :mini-variant="!state.show">
        <v-layout column fill-height>

            <v-list two-line class="pt-0 pb-3 scroll-y scrollbar-mini scrollbar-small">

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
                    <v-divider inset></v-divider>
                </template>

            </v-list>

            <v-spacer></v-spacer>

            <v-list two-line class="py-0">
                <v-divider></v-divider>
                <template v-if="v_development">
                    <v-list-tile v-ripple v-on:click="clearLocalStorage">
                        <v-list-tile-action>
                            <v-icon medium>mdi-delete-sweep</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Clear Local Storage</v-list-tile-title>
                            <v-list-tile-sub-title>And hard reload page</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                </template>
                <v-list-tile v-ripple v-on:click="$root.toggleTheme">
                    <v-list-tile-action>
                        <v-icon medium>{{ $root.theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Toggle Theme</v-list-tile-title>
                        <v-list-tile-sub-title>Light or Dark</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-layout>



        <!-- <table class="debug--breakpoints card">
            <tr class="">
                <th width="1">Width</th>
                <th width="1">Height</th>
            </tr>
            <tr class="">
                <td>0px</td>
                <td>0px</td>
            </tr>
        </table> -->



    </v-navigation-drawer>
</template>

