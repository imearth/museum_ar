<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">

        </div>

        <v-spacer></v-spacer>

    </v-app-bar>

    <v-content class="app-bg">
        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        //
    }),
};
</script>

<style>
.app-bg {
    background-color: #f8f8fa;
}
</style>
