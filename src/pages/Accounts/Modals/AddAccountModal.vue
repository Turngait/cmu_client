<script setup>
  import { ref, defineProps, computed } from 'vue';
  import { useVuelidate } from "@vuelidate/core";
  import { required, minValue, helpers } from "@vuelidate/validators";

  import Button from "../../../components/controls/Button.vue";
  import TextInput from "../../../components/controls/TextInput.vue";
  import TxtArea from "../../../components/controls/TxtArea.vue";
  import PopUp from "../../../components/partials/PopUp.vue";

  const props = defineProps(["onClose", "currencies", "msg", "addAccount"]);

  const title = ref('');
  const description = ref('');
  const currency = ref("$");
  const amount = ref(0);

  function saveAccount() {
    const newAccount = {
      title: title.value,
      description: description.value,
      currency: currency.value,
      balance: amount.value,
      created_at: new Date(),
    };
    props.addAccount(newAccount);
  }

  const mustBeCurrency = helpers.regex(/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/);

  const rules = computed(() => ({ 
      title: { required },
      amount: {
        minValueValue: minValue(0), 
        required,
        mustBeCurrency
      },
    }));
  const v$ = useVuelidate(rules, { title, amount });

</script>

<template>
  <PopUp :header="$t('accounts.add')" :onClose="props.onClose">
    <label>
      <TextInput
        :placeholder="$t('accounts.title') + '...'"
        @inputChange="(data) => (title = data)"
        dataTest="title"
        :max-length="16"
      />
      <div v-if="v$.title.$invalid">{{ $t("msg.titleReg") }}</div>
    </label>
    <label>
      <TextInput
        typeInput="number"
        :placeholder="$t('accounts.initialBalance') + '...'"
        @inputChange="(data) => (amount = data)"
        dataTest="balance"
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
    />
    <p class="modal_msg">{{ props.msg }}</p>
    <Button
      :isActive="!v$.title.$invalid"
      :onClick="saveAccount"
      :title="$t('common.add')"
      dataTest="addAccountBtn"
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
