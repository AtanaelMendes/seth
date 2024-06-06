<script setup>
import { Head } from '@inertiajs/vue3';
import AgendaList from '../Components/AgendaList.vue';

// Define os props
const props = defineProps({
    agenda: {
        type: Array,
        required: true,
    }
});

</script>

<template>
    <Head title="Agenda" />
    <AgendaList :agendaList="props.agenda" />
</template>
