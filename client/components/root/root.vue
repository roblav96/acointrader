<!--  -->
<script lang="ts" src="./root.ts"></script>
<!--  -->
<style>
/*  */


/*  */

</style>
<!--  -->
<template>
    <!-- <div id="root" :class="{ 'anim-loading': initing === true, 'animated animated-faster fadeIn': initing === false }"> -->
    <div id="root">

        <div class="block">
            <b-icon icon="account" size="is-large" type="is-success"></b-icon>
            <b-icon icon="home" size="is-large" type="is-info"></b-icon>
            <b-icon icon="view-dashboard" size="is-large" type="is-primary"></b-icon>
        </div>

        <button class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
        </button>

        <b-loading :active.sync="$store.state.blockui" :canCancel="false"></b-loading>

    </div>
</template>

