<template>
    <div class="container bg-stone-100 h-screen px-2 relative">
        <div class="absolute right-[20px] bottom-[50px]" v-if="!showForm">
            <button
                type="button"
                class="w-fit py-2 px-6 drop-shadow shadow text-[40px] border border-transparent font-medium rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none transition ease-in-out duration-150"
                :onclick="() => (showForm = true)">
                +
            </button>
        </div>
    
        <div class="flex flex-row w-full flex-wrap">

            <div class="flex flex-col w-full text-lg font-semibold py-5 my-5">Agenda</div>

            <div class="flex flex-col w-full mb-5" v-if="showForm">
                <form @submit.prevent="submitForm">
                    <div class="grid grid-cols-5 gap-x-2 bg-green-200 p-2 rounded">
                        <div>
                            <input type="text" v-model="formData.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Nome" required />
                        </div>
                        <div>
                            <input type="text" v-model="formData.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Email" required />
                        </div>
                        <div>
                            <input type="text" v-model="formData.endereco"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Endereço" required />
                        </div>
                        <div>
                            <input type="text" v-model="formData.telefone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Telefone" required />
                        </div>
                        <div>
                            <ButtonGroup :buttons="[
                    { className: 'text-red-500 bg-white', label: 'CANCELAR', onclick: cancelar, small: true },
                    { className: 'text-white bg-green-500', label: 'SALVAR', onclick: salvar, small: true }
                ]" />
                        </div>
                    </div>
                </form>
            </div>

            <div class="flex flex-col w-full">
                <div v-for="(item, index) in agendaList" :key="index"
                    class="grid grid-cols-5 border-b border-slate-300 my-2 py-2">
                    <div class="content-center">{{ item.name }}</div>
                    <div class="content-center">{{ item.email }}</div>
                    <div class="content-center">{{ item.endereco }}</div>
                    <div class="content-center">{{ item.telefone }}</div>
                    <div class="content-center">
                        <ButtonGroup :buttons="[
                    { className: 'text-white bg-blue-500', label: 'EDITAR', onclick: () => { }, small: true },
                    { className: 'text-white bg-red-500', label: 'EXCLUIR', onclick: () => { deleteContact(item.id) }, small: true }
                ]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import ButtonGroup from './ButtonGroup';

const formData = ref({
    name: '',
    email: '',
    telefone: '',
    endereco: ''
});

const showForm = ref(false);

const submitForm = async () => {
    try {
        const response = await axios.post('/agenda/admin', formData.value);
        window.location.reload();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

const deleteContact = async (id) => {
    try {
        const response = await axios.delete('/agenda/admin/' + id);
        window.location.reload();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

const salvar = () => {
    submitForm();
    showForm.value = false;
};

const cancelar = () => {
    showForm.value = false;
};

// Define os props
const props = defineProps({
    agendaList: {
        type: Array,
        required: true
    }
});

</script>
