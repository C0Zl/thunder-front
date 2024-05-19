<template>
    <div>
        <h1>MyThunder</h1>
        <div class="thunder-tab">
            <RouterLink :to="{ name: 'remain' }" class="tab active">예정된 번개</RouterLink>
            <RouterLink :to="{ name: 'past' }" class="tab">지난 번개</RouterLink>
        </div>
        <RouterView/>
    </div>
</template>

<script setup>
import PastMyThunder from '@/components/mythunder/PastMyThunder.vue';

</script>

<style scoped>
    .thunder-tab {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
    }

    .tab {
        padding: 10px 20px;
        border-radius: 20px;
        text-align: center;
        cursor: pointer;
    }

    .tab.active {
        background-color: #ffc107;
        color: white;
    }

</style>