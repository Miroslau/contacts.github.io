<template>
    <div class="container">
        <nav class="nav">
            <router-link
                :to="{name: 'Contacts', params: {data: contact.contacts}}"
            >
                Назад к контактам
            </router-link>
        </nav>
        <div class="changes">
            <span @click="returnParams" title="Отмена одного действия">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                    
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                </svg>
            </span>
            <span @click="create" title="Создание нового поля">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </span>
        </div>
        <div
            v-for="(field, id) in contactObject"
            :key="id"
            class="contact"
        >
            <span class="contact__text-name">
                {{id}}:
            </span>
            <span class="contact__text-name">
                {{field}}
            </span>
            <span class="change" @click="changeParams(id)" title="Изменение параметра контакта">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
            </span>

            <span class="remove" @click="removeParams(id)" title="Удаление параметра контакта">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </span>

            <form v-if="inputId == id" @click.prevent="" class="form">
                <input type="text" v-model="value" :placeholder="id" />

                <button @click="changeParams(id, value)">Change</button>
                
                <button @click="cancel">Cancel</button>
            </form>
        </div>
        <form v-if="isClick" @click.prevent="" class="form">
            <input type="text" v-model="fieldName" placeholder="Field name" />
            
            <input type="text" v-model="fieldValue" placeholder="Field value" />

            <button @click="create(fieldName, fieldValue)">Change</button>
        </form>
    </div>
</template>

<script>
export default {
    created() {
        console.log(this.contactObject)
    },

    data() {
        return {
            fieldName: null,
            fieldValue: null,
            isClick: false,
            oldData: null,
            contact: {},
            contactObject: null,
            value: null,
            inputId: null
        }
    },

    methods: {
        create(fieldName, fieldValue) {
            this.isClick = true;

            if(fieldName.trim() && fieldValue.trim()) {
                this.oldData = JSON.stringify(this.contactObject);
                this.contactObject[`${fieldName}`] = fieldValue;
                this.contact.contacts[this.contact.id] = this.contactObject;

                for(let i = 0; i < this.contact.contacts.length; i++) {
                    let contactData = this.contact.contacts[i];
                    let yes = false;

                    (fieldName in contactData) ? yes = true : yes = false;
                            
                    if(!yes) {
                        contactData[`${fieldName}`] = '';
                        this.contact.contacts[i] = contactData;
                    }
                }
            }

            this.fieldName = ''
            this.fieldValue = ''

            this.isClick = false;
        },

        returnParams() { // Функция для отмены изменения параметра
            this.contactObject = JSON.parse(this.oldData);

            this.contact.contacts[this.contact.id] = this.contactObject; // Обновление списка контактов
            this.contactObject = this.contact.contacts[this.contact.id];
        },

        changeParams(id, value) { // Функция для изменения параметра
            debugger;
            if(id) { // Проверка на выбор нужного параметра для отображения поля ввода для его замены
                if(id && value) { // Проверка на заполненное поле с новыми данными
                    this.oldData = JSON.stringify(this.contactObject); // Добавление прошлого значения в хранилище

                    this.contactObject[`${id}`] = value;
                    this.contact.contacts[this.contact.id] = this.contactObject; // Обновление списка контактов
                        
                    this.value = ''; // Очистка поля с данными
                    this.inputId = ''; // Делаем невидиммой форму 
                }  else {
                    this.inputId = id;
                }
            }
        },

        removeParams(id) { // Функция для удаления параметра
                if(id) {
                    if (confirm("Удалить пользователя")) { // Подтверждение для удаления 
                        this.oldData = JSON.stringify(this.contactObject); // Добавление прошлого значения в хранилище
    
                        this.contactObject[`${id}`] = '';
                        
                        this.contact.contacts[this.contact.id] = this.contactObject;
                    } else {
                        alert("Вы нажали кнопку отмена")
                    }
                }
            },

        cancel() { // Функция для отмены редактирования поля контакта
            if (confirm("Отменить редактирование?")) { // Подтверждение для удаления 
                this.inputId = null;
            } else {
                alert("Вы нажали кнопку отмена")
            }
        },
    },

    watch: {
        $route: {
            immediate: true,
            handler(to) { // Получаем данные выбранного контакта
                this.contact = to.params;
                this.contactObject = this.contact.contacts[this.contact.id]
            }
        }
    }
}
</script>

<style scoped>

    .nav {
        height: 50px;
        display: flex;
        align-items: center;
        padding-left: 50px;
    }

    .nav a {
        color: black;
        font-size: 24px;
        font-weight: 600;
    }

    .changes {
        height: 50px;
        padding-left: 25px;
        display: flex;
        align-items: center;
    }

    .changes svg {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .container {
        border: 1px solid red;
    }

    .contact {
        padding-left: 30px;
        display: flex;
    }

    .contact .contact__text-name {
        font-size: 18px;
        font-weight: 600;
    }

    .contact .contact__text-value {
        display: block;
        margin-left: 15px;
        height: 20px;
        width: 20px;
    }

    .contact .change, .remove {
        margin-left: 5px;
        height: 20px;
        width: 20px;
    }

    .form {
        width: 100%;
        padding-left: 30px;
        margin: 20px 0;
        display: flex;
        flex-wrap: wrap;
    }

    .form input {
        padding: 5px;
        margin-right: 10px;
    }

    .form button {
        padding: 5px;
        margin-right: 5px;
    }
</style>