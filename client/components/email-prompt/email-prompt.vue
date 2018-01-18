<!--  -->
<script lang="ts" src="./email-prompt.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog max-width="400" v-model="show">
        <v-form class="card" v-on:submit.prevent="save">
            <v-toolbar flat color="transparent">
                <span class="headline">Recovery Email</span>
                <v-spacer></v-spacer>
                <v-btn icon flat large class="ma-0 mr-2" v-on:click="show = false">
                    <v-icon medium>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-3">
                <v-text-field ref="email_input" prepend-icon="mdi-email-secure" label="Your Email Address" :error="!valid && email.length > 0"
                    v-model="email" spellcheck="false" solo hide-details></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="pa-3 text--light">
                We've perfected the art of keeping your assets safe. If your browser cache gets cleared, your email will
                be used to recover any lost API Key Pairs.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-3">
                <v-btn large block class="ma-0" type="submit" color="success" :disabled="!valid">Submit</v-btn>
            </v-card-actions>
        </v-form>
    </v-dialog>
</template>

