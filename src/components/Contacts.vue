<template>
    <div>
      <add-contact
        @add-contact="addContact"
      />
      <contact-list 
        :contacts="contactsList"
        @open-modal="openModal"
      />
      <dialog-component 
        :modalOpened="modalOpened"
        :contactItem="contactItem"
        @close="closeModal"
        @remove-contact="removeContact"
      >
        <template v-slot:title>
          <h2>Вы действительно хотите удалить контакт?</h2>
        </template>
      </dialog-component>
    </div>
</template>

<script>

import ContactList from '../components/ContactList.vue';
import AddContact from '../components/AddContact.vue';
import DialogComponent from '../components/DialogComponent.vue'

export default {

  data() {
    return {
      contactsList: [],
      modalOpened: false,
      contactItem: null,
    }
  },

  mounted() { // функция жизненного цикла для вывода запроса данных
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
    .then(response => response.json())
    .then(json => {
      setTimeout(() => {
            this.contactsList = json
      }, 1000)
    })
  },

  methods: {
    removeContact(id) { // удаление контакта
      this.contactsList = this.contactsList.filter(c => c.id !== id)
      this.closeModal() // закрытие диалогового окна
    },

    addContact(contact) {
      this.contactsList.push(contact)
    },

    openModal(id) {
      this.modalOpened = true;
      this.contactItem = id;
    },

    closeModal() {
      this.modalOpened = false;
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.contactsList = to.params.data;
      }
    }
  },

  components: {
    ContactList,
    AddContact,
    DialogComponent,
  }
}
</script>