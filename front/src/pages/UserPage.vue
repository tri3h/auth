<template>
    <q-page class="column items-center justify-center">

        <div class="q-gutter-md" style="width: 350px">

            <div class="row justify-between items-center no-margin">

                <label class="text-h6">Профиль</label>

                <q-btn label="Выйти" type="submit" color="primary" @click="logout" />

            </div>

            <q-form ref="userForm" class="no-margin q-gutter-md">

                <q-input filled stack-label label="Имя" v-model="name" placeholder="Введите имя" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите имя']" :hint="hint" dense
                    class="full-width" />

                <q-input filled stack-label label="Телефон" mask="+###########" v-model="phone"
                    placeholder="Введите телефон" lazy-rules
                    :rules="[val => val && val.length >= 11 || 'Введите телефон в формате +# (###) ### - ####']"
                    :hint="hint" dense class="full-width" />

                <q-input filled stack-label label="Адрес" v-model="address" placeholder="Введите адрес" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Введите адрес']" :hint="hint" dense
                    class="full-width" />

                <q-input filled stack-label label="Информация о себе" v-model="info"
                    placeholder="Введите информацию о себе" dense autogrow class="full-width"
                    maxlength="355" />

                <q-btn v-if="!profileFilled" label="Создать профиль" color="primary" class="full-width"
                    @click="createProfile" />

                <q-btn v-if="profileFilled" label="Сохранить изменения" color="primary" class="full-width"
                    @click="editProfile" />

            </q-form>

            <q-btn v-if="profileFilled" label="Удалить профиль" color="primary" class="full-width"
                @click="confirmDeletion" />

            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <span class="q-ml-sm">Вы уверены, что хотите удалить профиль?</span>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Да" color="primary" v-close-popup @click="deleteProfile" />
                        <q-btn flat label="Нет" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>

        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { baseURL } from 'src/utils/constants';

const router = useRouter();
const $q = useQuasar()

const profileFilled = ref(false);
const name = ref('');
const phone = ref('');
const address = ref('');
const info = ref('');
const hint = ref('Обязательное поле');
const userForm = ref();
const confirm = ref(false);

const axios = require('axios').default.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.data.statusCode == 401) {
        logout();
    }
    return Promise.reject(error);
});

getProfile();

window.onpopstate = () => logout();

function getProfile() {
    axios.get('users')
        .then((resp) => {
            if (resp.data.name != null) {
                insertData(resp.data);
            }
        })
        .catch((error) => {
            $q.notify({
                message: error.response.data.message,
                color: 'negative'
            })
        });
}

function logout() {
    localStorage.removeItem('access_token');
    router.replace('login');
}

function createProfile() {
    userForm.value.validate().then((success: boolean) => {
        if (success) {
            axios.post('users', {
                name: name.value,
                phone: phone.value,
                address: address.value,
                info: info.value
            })
                .then((resp) => {
                    insertData(resp.data);
                    $q.notify({
                        message: 'Профиль создан',
                        color: 'positive'
                    })
                })
                .catch((error) => {
                    $q.notify({
                        message: error.response.data.message,
                        color: 'negative'
                    })
                });
        }
    })
}

function insertData(data) {
    name.value = data.name;
    phone.value = data.phone;
    address.value = data.address;
    info.value = data.info;
    profileFilled.value = true;
}

function removeData() {
    name.value = '';
    phone.value = '';
    address.value = '';
    info.value = '';
    profileFilled.value = false;
}

function editProfile() {
    userForm.value.validate().then((success: boolean) => {
        if (success) {
            axios.put('users', {
                name: name.value,
                phone: phone.value,
                address: address.value,
                info: info.value
            })
                .then((resp) => {
                    insertData(resp.data);
                    $q.notify({
                        message: 'Профиль изменен',
                        color: 'positive'
                    })
                })
                .catch((error) => {
                    $q.notify({
                        message: error.response.data.message,
                        color: 'negative'
                    })
                });
        }
    })
}

function confirmDeletion() {
    confirm.value = true;
}

function deleteProfile() {
    axios.delete('users')
        .then(() => {
            removeData();
            $q.notify({
                message: 'Профиль удален',
                color: 'positive'
            })
        })
        .catch((error) => {
            $q.notify({
                message: error.response.data.message,
                color: 'negative'
            })
        });
}
</script>