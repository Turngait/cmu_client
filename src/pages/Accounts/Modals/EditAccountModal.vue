<script setup>
  import { ref, defineProps, computed } from 'vue';
  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";

  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import TxtArea from "../../../components/controls/TxtArea.vue";

  import PopUp from "../../../components/partials/PopUp.vue";

  const props = defineProps(["onClose", "currencies", "msg", "onEdit", "item"]);

  const title = ref(props.item.title);
  const description = ref(props.item.description);
  const currency = ref(props.item.currency);

  async function saveAccount() {
    const account = {
      id: props.item.id,
      title: title.value,
      description: description.value,
      currency: currency.value,
      balance: props.item.balance,
      created_at: props.item.created_at,
    };
    await props.onEdit(account);
  }

  const rules = computed(() => ({ 
      title: { required },
    }));
  const v$ = useVuelidate(rules, { title });
</script>

<template>
  <PopUp :header="$t('accounts.edit')" :onClose="props.onClose">
    <label>
      <TextInput
        :placeholder="$t('accounts.title') + '...'"
        @inputChange="(data) => (title = data)"
        :val="title"
        :max-length="16"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <select class="modal__select" v-model="currency">
      <option
        v-for="curr of props.currencies"
        :key="curr.abbreviation"
        :value="curr.abbreviation"
      >
        {{ curr.currency }}
      </option>
    </select>
    <TxtArea
      :placeholder="$t('accounts.description') + '...'"
      @areaChange="(data) => (description = data)"
      :val="description"
    />
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveAccount"
      :title="$t('common.save')"
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
  &__select {
    border: 1px solid $light-grey;
    border-radius: 5px;
    padding: 7px 20px;
    font-size: 1.6rem;
    width: 100%;
    background: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
