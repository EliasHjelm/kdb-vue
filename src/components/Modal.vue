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

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease-in-out;

  .modal-wrapper {
    display: table-cell;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .modal-container {
    position: relative;
    top: 50px;
    width: 100%;
    max-width: 620px;
    min-height: 10vh;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease-in-out;
    font-family: Helvetica, Arial, sans-serif;

    .close-modal-button {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 150%;
      color: rgba(0, 0, 0, .5);
    }

    .modal-header {
      border-bottom: solid 1px rgba(0, 0, 0, .2);
      padding: 16px;
      
      h3 {
        font-weight: 500;
      }
    }

    .modal-body {
      padding: 16px;
      border-bottom: solid 1px rgba(0, 0, 0, .2);

      .red-text {
        color: red;
      }
      
      p {
        margin: 0.5rem 0;
      }

      input {
        width: 100%;
        padding: 6px 12px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, .3);
        font-size: 100%;
        margin-bottom: 0.5rem;
        color: #495057;

        &.invalid {
          border-color: red;
          border-width: 1.5px;
        }

        &.valid {
          border-color: green;
          border-width: 1.5px;
        }
      }

      select {
        width: 100%;
        padding: 6px 12px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, .3);
        color: #495057;
        font-size: 100%;
        
        option {
          margin-bottom: 2.3px;
        }
      }
    }

    .modal-footer {
      min-height: 75px;
      padding: 16px;
      display: grid;
      grid-template-columns: 1fr max-content;
      grid-column-gap: 1rem;
      align-items: start;

      input {
        width: 100px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, .3);
        color: #495057;
        padding: 3px 6px;
      }

      button {
        grid-column-start: 2;
        cursor: pointer;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, .3);
        padding: 0.5rem;
        background-color: #333;
        color: #eee;
        font-size: 100%;
        margin: 0;

        &:hover {
          background-color: #444;
        }

        &[disabled] {
          background-color: #aaa;
          cursor: default;
          border-color: #aaa;
        }
      }

      .error-message{
        color: red;
      }
    }
  }

  .modal-default-button {
    float: right;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>


