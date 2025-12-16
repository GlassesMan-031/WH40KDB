<script setup lang="ts"></script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div id="modal" class="modal-container">
        <div class="modal-header"><slot name="header"></slot></div>
        <div class="modal-body"><slot name="body"></slot></div>
        <div class="modal-footer"><slot name="footer"></slot></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 10px 20px;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 1rem 0;
}

.modal-footer {
  float: right;
}
</style>
