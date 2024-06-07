<template>
    <div class="container h-screen relative bg-amber-50	shadow-xl">
        <div class="absolute right-[20px] bottom-[50px]" v-if="!showForm">
            <button type="button"
                class="w-fit py-2 px-6 drop-shadow text-[40px] border border-transparent font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none transition ease-in-out duration-150"
                :onclick="() => (showForm = true)">
                +
            </button>
        </div>

        <div class="flex flex-row w-full flex-wrap">

            <div class="flex flex-col w-full text-2xl font-semibold p-5 my-5">Agenda</div>

            <div class="flex flex-col w-full mb-5" v-if="showForm">
                <form @submit.prevent="submitForm">
                    <div :class="`grid grid-cols-5 gap-2 p-2 rounded ${formData.id ? 'bg-blue-200' : 'bg-green-200'}`">
                        <div class="col-span-5 sm:col-span-2 lg:col-span-1">
                            <input type="text" v-model="formData.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Nome" required />
                        </div>
                        <div class="col-span-5 sm:col-span-2 lg:col-span-1">
                            <input type="email" v-model="formData.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Email" required />
                        </div>
                        <div class="col-span-5 sm:col-span-2 lg:col-span-1">
                            <input type="text" v-model="formData.endereco"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Endereço" required />
                        </div>
                        <div class="col-span-5 sm:col-span-2 lg:col-span-1">
                            <input type="text" v-model="formData.telefone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                placeholder="Telefone" required />
                        </div>
                        <div class="col-span-5 sm:col-span-2 lg:col-span-1 text-right">
                            <ButtonGroup :buttons="[
                                { className: 'text-red-500 bg-white', label: 'CANCELAR', onclick: cancelar, small: true },
                                { className: 'text-white bg-green-500', label: 'SALVAR', onclick: salvar, small: true }
                            ]" />
                        </div>
                    </div>
                </form>
            </div>

            <div class="flex flex-col w-full">
                <div v-for="(item, index) in tempAgendaList" :key="index"
                    class="grid grid-cols-5 border-b border-slate-300 odd:bg-white even:bg-gray-200 text-sm p-2 gap-2">
                    <div class="col-span-2 lg:col-span-1 content-center">
                        <div class="text-[10px] text-slate-500">Nome:</div>
                        {{ item.name }}
                    </div>
                    <div class="col-span-2 lg:col-span-1 content-center">
                        <div class="text-[10px] text-slate-500">Email:</div>
                        {{ item.email }}
                    </div>
                    <div class="col-span-2 lg:col-span-1 content-center">
                        <div class="text-[10px] text-slate-500">Endereço:</div>
                        {{ item.endereco }}
                    </div>
                    <div class="col-span-2 lg:col-span-1 content-center">
                        <div class="text-[10px] text-slate-500">Telefone:</div>
                        {{ item.telefone }}
                    </div>
                    <div class="col-span-2 lg:col-span-1 content-center">
                        <ButtonGroup :buttons="[
                            { className: 'text-white bg-blue-500', label: 'EDITAR', onclick: () => { editAgenda(item) }, small: true },
                            { className: 'text-white bg-red-500', label: 'EXCLUIR', onclick: () => { deleteContact(item.id) }, small: true }
                    ]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import ButtonGroup from './ButtonGroup';

const formData = ref({
    id: '',
    name: '',
    email: '',
    telefone: '',
    endereco: ''
});

const resetForm = () => {
    formData.value = {
        id:'',
        name: '',
        email: '',
        telefone: '',
        endereco: ''
    }
}

const editAgenda = (agenda) => {
    formData.value = {
        id: agenda.id,
        name: agenda.name,
        email: agenda.email,
        telefone: agenda.telefone,
        endereco: agenda.endereco
    };
    showForm.value = true;
}

const updateAgenda = async () => {
    if (!formData.value.id) {
        alert('Opps, algo deu errado');
        return;
    }
    try {
        await axios.patch('/agenda/admin/' + formData.value.id, formData.value);
        getAgendaList();
        resetForm();
        showForm.value = false;
    } catch (error) {
        console.error('Error:', error);
    }
}

const showForm = ref(false);
const tempAgendaList = ref([]);

onMounted(() => {
    tempAgendaList.value = props.agendaList;
})

const submitForm = async () => {
    const { name, email, telefone, endereco } = formData.value;

    if (!name || !email || !telefone || !endereco) {
        alert("Faltam informações para salvar");
        return;
    }

    try {
        await axios.post('/agenda/admin', formData.value);
        getAgendaList();
        resetForm();
        showForm.value = false;
    } catch (error) {
        console.error('Error:', error);
    }
};

const getAgendaList = async () => {
    try {
        const response = await axios.get('/agenda/admin');
        tempAgendaList.value = response.data;
    } catch (error) {
        console.error('Oops', error);
    }
}

const deleteContact = async (id) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
        const response = await axios.delete('/agenda/admin/' + id);
        getAgendaList();
    } catch (error) {
        console.error('Oops', error);
    }
}

const salvar = () => {
    if (formData.value.id) {
        updateAgenda();
    } else {
        submitForm();
    }
};

const cancelar = () => {
    resetForm();
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
