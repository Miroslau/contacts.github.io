<template>
    <div class="header">
        <h2>Мой список контактов</h2>
        <form @submit.prevent="onSubmit">
            <input type="text" v-model="title">
            <button type="submit">Добавить</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
        }
    },

    methods: {
        onSubmit() {
            if (this.title.trim()) {
                const newContact = {
                    id: Date.now(),
                    title: this.title,
                    completed: false,
                };

                this.$emit('add-contact', newContact);
                this.title = '';
            }
        },
    },
}
</script>

<style scoped>
    .header {
        background-color: #f44336;
        padding: 30px 40px;
        color: white;
        text-align: center;
        margin-bottom: 50px;
    }

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    input {
        margin: 0;
        border: none;
        border-radius: 0;
        width: 75%;
        padding: 10px;
        font-size: 16px;
    }

    button {
        max-width: 150px;
        width: 100%;
        padding: 10px;
        border: none;
        background: #d9d9d9;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
    }

    button:hover {
        background-color: #bbb;
    }
</style>