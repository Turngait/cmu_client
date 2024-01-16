<script setup>
  import { ref, defineProps, computed } from 'vue';

  import { useVuelidate } from "@vuelidate/core";
  import { required, minValue } from "@vuelidate/validators";
  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import PopUp from "../../../components/partials/PopUp.vue";

  const props = defineProps(["onClose", "editTarget", "msg", "target"]);
  const amount = ref(props.target.amount);

  const rules = computed(() => ({ 
      amount: {
        minValueValue: minValue(0), 
        required
      },
    }));
  const v$ = useVuelidate(rules, { amount });

  async function saveTarget() {
    const editableTarget = {
      id: props.target.id,
      type: props.target.type,
      amount: +amount.value,
      group_id: +props.target.group_id,
      account_id: +props.target.account_id,
    };

     await props.editTarget(editableTarget);
  }

</script>

<template>
  <PopUp :header="$t('costs.editTarget')" :onClose="props.onClose">
    <label>
      <TextInput
        :placeholder="$t('costs.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
        :val="amount"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.amount.$invalid"
      :onClick="saveTarget"
      :title="$t('common.save')"
    />
  </PopUp>
</template>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.modal {
  &__addGroupBox {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  &_msg {
    font-size: 1.6rem;
    color: $red;
    font-weight: 700;
    text-align: center;
    line-height: 2rem;
  }
}
</style>
