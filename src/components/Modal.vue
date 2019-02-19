<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span class="close-modal-button" @click="$emit('close')">x</span>
          <slot name="content">

          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

