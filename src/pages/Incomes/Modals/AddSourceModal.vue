<script setup>
  import { ref, defineProps, computed } from 'vue';

  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";

  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import PopUp from "../../../components/partials/PopUp.vue";

  const props = defineProps(["onClose", "addSource", "msg"]);

  const title = ref('');

  const rules = computed(() => ({ 
    title: { required },
  }));
  const v$ = useVuelidate(rules, { title });

  async function saveSource() {
    const account_id = localStorage.getItem("accountId");
    const source = {
      title: title.value,
      description: "",
      order: 0,
      account_id,
    };
    await props.addSource(source);
  }
</script>

<template>
  <PopUp :header="$t('incomes.addSource')" :onClose="props.onClose">
    <label>
      <TextInput
        :placeholder="$t('incomes.title') + '...'"
        @inputChange="(data) => (title = data)"
        :max-length="18"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveSource"
      :title="$t('common.add')"
    />
  </PopUp>
</template>

<style lang="scss" scoped></style>
