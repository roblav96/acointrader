<!--  -->
<script lang="ts" src="./email-prompt.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog persistent scrollable max-width="400" content-class="scroll-y-none" v-model="show">
        <v-form class="card" v-on:submit.prevent="save">
            <v-toolbar flat dark color="primary">
                <v-icon medium>mdi-security</v-icon>
                <v-toolbar-title class="headline">Recovery Setup</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon flat large class="ma-0 mr-2" v-on:click="show = false">
                    <v-icon medium>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field ref="email_input" class="mb-3" prepend-icon="mdi-email" label="Email Address" :error="!valid && email.length > 0"
                    v-model="email" spellcheck="false" solo hide-details></v-text-field>
                <p class="subheading text--light">Restore your API Key Pairs with this email</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-3">
                <v-btn large block class="ma-0" type="submit" color="success" :disabled="!valid">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-dialog>
</template>

