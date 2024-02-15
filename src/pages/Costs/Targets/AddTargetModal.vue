<script setup>
  import { ref, defineProps, computed } from 'vue';

  import { useVuelidate } from "@vuelidate/core";
  import { required, minValue } from "@vuelidate/validators";
  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import PopUp from "../../../components/partials/PopUp.vue";

  const props = defineProps(["onClose", "groups", "addTarget", "msg", "isDailyTargetExists"]);
  const type = ref("month");
  const amount = ref("");
  const groupId = ref(Array.isArray(props.groups) && props.groups.length > 0
          ? props.groups[0].id
          : "");
  const rules = computed(() => ({ 
      amount: {
        minValueValue: minValue(0), 
        required
      },
    }));
  const v$ = useVuelidate(rules, { amount });

  async function saveTarget() {
    const accountId = localStorage.getItem("accountId");
    const target = {
      type: type.value,
      amount: +amount.value,
      group_id: groupId.value,
      account_id: accountId,
    };

    await props.addTarget(target);
  }
</script>

<template>
  <PopUp class="overlay" :header="$t('costs.addTarget')" :onClose="props.onClose">
    <select class="selectCost" v-model="type">
      <option value="month" selected>
        {{ $t("costs.targetTypeMonth") }}
      </option>
      <option value="day" v-if="!isDailyTargetExists">
        {{ $t("costs.targetTypeDay") }}
      </option>
    </select>
    <label>
      <TextInput
        :placeholder="$t('costs.amount') + '...'"
        typeInput="number"
        @inputChange="(data) => (amount = data)"
      />
      <div v-if="v$.amount.$invalid">{{ $t("msg.amountReg") }}</div>
    </label>
    <select class="selectCost" v-model="groupId" v-if="type !== 'day'">
      <option v-for="group in props.groups" :key="group.id" :value="group.id">
        {{ group.title }}
      </option>
    </select>
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.amount.$invalid"
      :onClick="saveTarget"
      :title="$t('common.add')"
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

.selectCost {
  border: 1px solid $light-grey;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 1.6rem;
  width: 100%;
  background: $white;
}
</style>
