<!--  -->
<script lang="ts" src="./root.ts"></script>
<!--  -->
<style src="./root.css"></style>
<!--  -->
<template>
    <div id="root" :class="{ 'anim-loading': initing === true, 'animated animated-faster fadeIn': initing === false }">

        <section class="hero is-bold app-navbar animated slideInDown">
            <div class="hero-head">
                <nav class="nav">
                    <div class="nav-left">
                        <a class="nav-item is-hidden-tablet"><i aria-hidden="true" class="fa fa-bars"></i></a>
                    </div>
                    <div class="nav-center">
                    	haii
                    </div>
                    <div class="nav-right is-flex"></div>
                </nav>
            </div>
        </section>

        <b-loading :active.sync="$store.state.blockui" :canCancel="false"></b-loading>

    </div>
</template>

