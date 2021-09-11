<template>
  <div class="container">
    <fieldset class="main_border">
      <legend align="left">
        <slot name="title"></slot>
      </legend>
      <slot name="content"></slot>
    </fieldset>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.main_border {
  border-radius: 4px;
}
</style>
