<!--  -->
<script lang="ts" src="./root.ts"></script>

<style src="./root.css"></style>

<template>
    <section class="section">

        <div class="container">
            <h1 class="title">
                Hello World
            </h1>
            <p class="subtitle">
                My first website with
                <strong>Bulma</strong>!
            </p>
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
        </div>

        <!-- <b-loading :active.sync="$store.state.loading" :canCancel="false"></b-loading> -->

    </section>
</template>

