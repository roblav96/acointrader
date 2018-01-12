<!--  -->
<script lang="ts" src="./pin-dialog.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog persistent :max-width="300" v-model="pin_dialog.show">
        <v-card>
            <v-form v-on:submit.prevent="save">

                <v-card-title primary-title class="pb-0">
                    <div>
                        <p class="headline">Security PIN</p>
                        <p class="grey--text">This will encrypt your sensitive data</p>
                    </div>
                </v-card-title>

                <v-card-text>
                    <v-text-field ref="pin_dialog_input" prepend-icon="security" label="4-digit number" :mask="'####'" v-model="pin" solo></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn block large type="submit" color="primary" :disabled="!valid">Save</v-btn>
                </v-card-actions>

            </v-form>
        </v-card>
    </v-dialog>
</template>

