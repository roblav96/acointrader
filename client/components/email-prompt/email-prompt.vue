<!--  -->
<script lang="ts" src="./email-prompt.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog scrollable max-width="400" content-class="scroll-y-none" v-model="show">
        <v-form class="card" v-on:submit.prevent="save">
            <v-toolbar flat color="transparent">
                <v-toolbar-title class="headline t-400">Recovery Email</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon flat large class="ma-0 mr-2" v-on:click="show = false">
                    <v-icon medium>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field ref="email_input" class="mb-3" prepend-icon="mdi-email-secure" label="Your Email Address"
                    :error="!valid && email.length > 0" v-model="email" spellcheck="false" solo hide-details></v-text-field>
                <p class="subtitle t-400">Restore your API Key Pairs with this email.</p>
                <p class="body-1 text--light">
                    We've perfected the art of keeping your assets safe. Occasionally your web browser will automatically
                    cleanup after itself to preserve disk memory. Your API Key Pairs could get swept
                    away by this common process. Your email will be used to recover any lost API Key
                    Pairs.
                </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-3">
                <v-btn large block class="ma-0" type="submit" color="success" :disabled="!valid">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-dialog>
</template>

