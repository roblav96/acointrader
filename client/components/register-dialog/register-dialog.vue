<!--  -->
<script lang="ts" src="./register-dialog.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog scrollable persistent lazy max-width="400" content-class="scroll-y-none" v-model="state.show">
        <v-form class="card" v-on:submit.prevent="save">
            <v-toolbar flat dark color="primary">
                <v-toolbar-title class="headline">Recovery Email</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon flat large class="ma-0 mr-2" v-on:click="state.show = false">
                    <v-icon medium>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <p class="body-1 text--light">
                    We've perfected the art of keeping your assets safe. Occasionally your web browser will automatically
                    cleanup after itself to preserve disk memory. Your API Key Pairs could get swept
                    away by this common process. Your email will be used to recover any lost API Key
                    Pairs.
                </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-3">
                <v-btn large block class="ma-0" type="submit" color="success">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-dialog>
</template>

