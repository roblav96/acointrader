<!--  -->
<script lang="ts" src="./auth-prompt.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog persistent scrollable max-width="400" content-class="scroll-y-none" v-model="show">
        <v-form class="card" v-on:submit.prevent="save">
            <v-toolbar flat dark color="primary">
                <v-icon medium>mdi-security</v-icon>
                <v-toolbar-title class="headline">User Authentication</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon flat large class="ma-0 mr-2" v-on:click="show = false">
                    <v-icon medium>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>

                <v-text-field ref="email_input" class="mb-3" prepend-icon="mdi-email" label="Email Address" :error="!isEmail && email.length > 0"
                    v-model="email" spellcheck="false" hide-details></v-text-field>

                <v-text-field ref="phone_input" class="mb-3" prepend-icon="mdi-phone" label="Phone Number" type="number"
                    :error="!isPhone && phone.length > 0" v-model="phone" spellcheck="false" hide-details></v-text-field>

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

