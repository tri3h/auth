<template>
    <q-page class="column items-center justify-center q-gutter-md">

        <h1 class="user__title">Профиль</h1>

        <!-- <p>{{mes}}</p> -->


        <q-btn v-if="!profileFilled" label="Создать" type="submit" color="primary" class="user__button" @click="createProfile"/>

        <q-btn v-if="profileFilled" label="Редактировать" type="submit" color="primary" class="user__button" @click="editProfile"/>

        <q-btn v-if="profileFilled" label="Удалить" type="submit" color="primary" class="user__button" @click="deleteProfile"/>

        <q-btn label="Выйти" type="submit" color="primary" class="user__button" @click="logout"/>


    </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { baseURL } from 'assets/constants'

const router = useRouter();
let profileFilled = false;

const axios = require('axios').default;
const axios_instance = axios.create({
    baseURL: baseURL
});
//добавить во все запросы токен
// axios_instance.defaults.headers.post['Content-Type'] = 'application/json'
// axios_instance.defaults.headers.get['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

axios_instance.get('users', {

})
    .then(function(resp: any) {
        console.log(resp)
        console.log(axios_instance.defaults.headers)
    })

function logout() {
    //запрос на сервер на занесение токена в блэклист?
    localStorage.removeItem('access_token');
    router.push({path: '/'});
}

// function createProfile() {

// }

// function editProfile() {

// }

// function deleteProfile() {

// }
</script>

<style lang="scss">
.user {
    &__title {
        font-size: x-large;
    }

    &__button {
        width: $width;
    }
}

</style>