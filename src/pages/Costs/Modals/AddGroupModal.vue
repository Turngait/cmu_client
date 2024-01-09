<script setup>
  import { ref, defineProps, computed } from 'vue';
  import 'vue-toast-notification/dist/theme-bootstrap.css';

  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";

  import PopUp from "../../../components/partials/PopUp.vue";
  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";

  const props = defineProps(["onClose", "addGroup", "msg"]);

  const title = ref('');
  const descr = ref('');

  const rules = computed(() => ({ 
      title: { required },
    }));
  const v$ = useVuelidate(rules, { title });

  async function saveGroup() {
      const account_id = localStorage.getItem("accountId");

      const group = {
        title: title.value,
        description: descr.value,
        order: 0,
        account_id,
      };
      await props.addGroup(group);
    }
</script>

<template>
  <PopUp :header="$t('costs.addGroup')" :onClose="props.onClose">
    <label>
      <TextInput
        :placeholder="$t('costs.title') + '...'"
        @inputChange="(data) => (title = data)"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveGroup"
      :title="$t('common.add')"
    />
  </PopUp>
</template>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.modal {
  &_msg {
    font-size: 1.6rem;
    color: $red;
    font-weight: 700;
    text-align: center;
    line-height: 2rem;
  }
}
</style>
