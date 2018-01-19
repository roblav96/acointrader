<!--  -->
<script lang="ts" src="./root.ts"></script>

<style>
/**/

div.application--wrap > nav.toolbar.dummy-toolbar {
    z-index: 0;
}


/**/

div.debug--breakpoints {
    position: fixed;
    z-index: 999;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    /*pointer-events: none;*/
}


/**/

</style>

<template>
    <v-fade-transition mode="out-in">
        <v-app v-show="!theming" id="root" :light="theme == 'light'" :dark="theme == 'dark'" :class="{ 'anim-loading': initing === true, 'animated animated-faster fadeIn': initing === false }">

            <main-drawer></main-drawer>

            <v-toolbar class="dummy-toolbar" app fixed flat dark color="primary"></v-toolbar>

            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>

            <snackbar></snackbar>



            <v-slide-y-transition appear>
                <v-card v-if="$store.state.mainDrawer.debugBreakpoints" class="debug--breakpoints pa-2">
                    <table>
                        <tr class="t-left" v-for="(v, k, i) in $vuetify.breakpoint" :key="k">
                            <th class="body-1">{{ k }}</th>
                            <th class="body-2">{{ v }}</th>
                        </tr>
                    </table>
                </v-card>
            </v-slide-y-transition>



        </v-app>
    </v-fade-transition>
</template>

