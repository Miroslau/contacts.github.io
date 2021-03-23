<template>
    <li>
        <span>
            <strong>{{index + 1}}</strong>
            <router-link
                :to="{name: 'ContactPage', params: {contacts: contacts, id: index}}"
            >
                {{contact.title}}
            </router-link>
        </span>
        <button 
            class="rm"
            @click="$emit('open-modal', contact.id)"
        >
            &times;
        </button>
    </li>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        },
        index: Number,
        contacts: {
            type: Array,
        }
    }
}
</script>

<style scoped>
    li {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: .5rem 2rem;
        margin-bottom: 1rem;
        background: #eee;
        font-size: 18px;
        transition: 0.2s;
    }

    .myUl li:nth-child(odd) {
        background: #f9f9f9;
    }

    .myUl li:hover {
        background: #ddd;
    }

    .rm {
        background: red;
        color: #fff;
        border-radius: 50%;
        font-weight: bold;
        cursor: pointer;
    }
</style>