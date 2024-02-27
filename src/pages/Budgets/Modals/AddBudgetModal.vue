<script setup>
  import { ref, defineProps, computed } from 'vue';

  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import PopUp from "../../../components/partials/PopUp.vue";
  
  const props = defineProps(["onClose", "addBudget", "msg"]);
  const title = ref('');
  const isCalc = ref(true);
  const description = ref('');

  function saveBudget() {
    const accountId = localStorage.getItem("accountId");
    const budget = {
      title: title.value,
      description: description.value,
      is_calculating: isCalc.value,
      account_id: accountId,
      created_at: new Date(),
    };
    props.addBudget(budget);
  }
  const rules = computed(() => ({ 
    title: { required },
  }));
  const v$ = useVuelidate(rules, { title });

</script>

<template>
  <PopUp :header="$t('budgets.add')" :onClose="props.onClose">
    <label>
      <TextInput
        :placeholder="$t('budgets.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
        :max-length="18"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <!-- <label>
        <input type="checkbox" v-model="isCalc" />
        {{ $t("budgets.isCalc") }}
      </label> -->
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveBudget"
      :title="$t('common.add')"
      dataTest="addBudgetBtn"
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
