<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span class="close-modal-button" @click="$emit('close')">x</span>
          <slot name="content">

          </slot>
          
          <!-- <button class="modal-default-button" @click="$emit('close')">
            <slot name="button text">Ok</slot>
          </button> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

