<template>
  <transition name="modal-transition">
    <div class="modal" v-if="modalOpened">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="menu">
            <svg @click="emitClose" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="512px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve">
          <g class="st2" id="cross">
              <g class="st0">
                  <line class="st1" x1="112.5" x2="401" y1="112.5" y2="401"/>
                  <line class="st1" x1="401" x2="112.5" y1="112.5" y2="401"/>
              </g>
          </g>
          <g id="cross_copy">
              <path d="M268.064,256.75l138.593-138.593c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256.75,245.436   
              L118.157,106.843c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L245.436,256.75L106.843,395.343   
              c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256.75,268.064l138.593,138.593  
               c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L268.064,256.75z"/>
          </g>
        </svg>
        </div>
        <slot name="title"></slot>
        <div class="form">
            <button @click="$emit('remove-contact', contactItem)" style="background: red;" class="button">Удалить</button>
            <button style="background: blue;" class="button" @click="emitClose">Отмена</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    props: {
        modalOpened: {
            type: Boolean
        },
        contactItem: {
            type: Number,
        }
    },

    data() {
      return {
        
      }
    },

    methods: {
        emitClose() {
            this.$emit('close')
        }
    }
};
</script>

<style scoped>
.modal,
.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

.menu {
    display: flex;
    justify-content: flex-end;
}

.form {
    display: flex;
    justify-content: space-around;
}

.button {
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.menu > svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
} 

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s ease, transform 1s ease;
}

.modal-content {
  background-color: white;
  z-index: 50;
  padding: 2em;
  width: 350px;
  height: 180px;
  border-radius: 20px;
}

.modal-background {
  background-color: rgba(10, 10, 10, 0.8);
  z-index: 40;
}

.modal-transition-enter-active {
  opacity: 1;
}

.modal-transition-enter {
  opacity: 0;
  transform: scale(1.5, 1.5);
}

.modal-transition-leave-active {
  opacity: 0;
  transform: scale(1.5, 1.5);
}

.modal-transition-leave {
  opacity: 1;
}
</style>