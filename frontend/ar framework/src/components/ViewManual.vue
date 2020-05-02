<template>
<pdf src="./assets/pdf/manaul.pdf">คู่มือประกอบการใช้งาน</pdf>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    name: "manual",
  components: {
    pdf
  }
}
