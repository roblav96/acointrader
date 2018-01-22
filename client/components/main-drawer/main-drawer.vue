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


/**/

</style>

<template>
    <v-navigation-drawer app fixed permanent stateless floating class="main--drawer card br-0 pb-0" :mini-variant="!state.show">
        <v-layout column fill-height>

            <v-list two-line class="py-0 scroll-y scrollbar-small">
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





            <template v-if="v_development">
                <v-spacer></v-spacer>

                <v-list class="py-0">
                    <v-divider></v-divider>
                    <v-list-tile v-ripple v-on:click="state.debugBreakpoints = !state.debugBreakpoints">
                        <v-list-tile-action>
                            <v-icon medium>mdi-format-line-style</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Debug Breakpoints</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
                <v-spacer></v-spacer>

                <v-list class="py-0">
                    <v-divider></v-divider>
                    <v-tooltip right color="error" transition="false" open-delay="0" close-delay="0">
                        <v-list-tile v-ripple v-on:click v-on:dblclick="clearLocalStorage" slot="activator">
                            <v-list-tile-action>
                                <v-icon medium>mdi-delete-forever</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Wipe Data, Hard Reload</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span>Double click to wipe and reload</span>
                    </v-tooltip>
                    <v-divider></v-divider>
                </v-list>
                <v-spacer></v-spacer>

            </template>

            <v-spacer v-else></v-spacer>





            <v-list two-line class="py-0">
                <v-divider></v-divider>
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

    </v-navigation-drawer>
</template>

