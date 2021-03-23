<template>
    <div>
        <ul class="myUl">
            <contact-item
                v-for="(contact, index) of contacts"
                :contact="contact"
                :contacts="contacts"
                :key="contact.id"
                :index="index"
                @open-modal="$emit('open-modal', contact.id)"
            />
        </ul>
    </div>
</template>

<script>
import ContactItem from '../components/ContactItem.vue';
export default {
    props: ['contacts'],

    components: {
        ContactItem,
    },

    methods: {
        removeContact(id) {
            this.$emit('remove-contact', id);
        }
    }
}
</script>

<style scoped>
    .myUl {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>