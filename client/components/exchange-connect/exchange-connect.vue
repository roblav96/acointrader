<!--  -->
<script lang="ts" src="./exchange-connect.ts"></script>

<style>
/**/


/**/

</style>

<template>
    <v-dialog persistent :max-width="300" v-model="exchange_connect.show">
        <v-card>
            <v-form v-on:submit.prevent="save">

                <v-card-title primary-title class="pb-0">
                    <div>
                        <p class="headline">Security PIN</p>
                        <p class="grey--text">Encrypts your sensitive data</p>
                    </div>
                </v-card-title>

                <v-card-text>
                    <v-text-field ref="exchange_connect_input" prepend-icon="security" label="4-digit number" :mask="'####'" v-model="pin" solo></v-text-field>
                </v-card-text>

                <!-- <v-card-actions>
                    <v-btn block large type="submit" color="primary" :disabled="!valid">Submit</v-btn>
                </v-card-actions> -->

            </v-form>
        </v-card>
    </v-dialog>
</template>

