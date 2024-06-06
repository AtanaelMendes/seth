<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    agenda: {
        type: String,
        required: true,
    }
});

const renderAgenda = () => {
    return agenda.map((item)=>{
        return (
            <div key={{item.id}}>
            </div>
        );
    });
}
</script>

<template>
    <Head title="Agenda" />

        hello

    <div>{{JSON.stringify(agenda)}}</div>
</template>