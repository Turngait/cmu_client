<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__headerBox">
        <h3 class="modal__headerBox__title">
          {{ $t("onboarding.ftAccounts.title") }}
        </h3>
      </div>
      <div class="modal__info__txt">
        {{ $t("onboarding.ftAccounts.text1") }}
      </div>
      <img
        v-if="this.$i18n.locale === 'ru'"
        class="modal__info__img1"
        src="../../assets/onboarding/onboarding_first_accounts.png"
      />
      <img
        v-else
        class="modal__info__img1"
        src="../../assets/onboarding/onboarding_first_accounts_eng.png"
      />
      <div class="modal__info__txt">
        {{ $t("onboarding.ftAccounts.text2") }}
      </div>
      <img
        class="modal__info__img1"
        src="../../assets/onboarding/onboarding_first_accounts2.png"
      />
      <div class="modal__info__txt">
        {{ $t("onboarding.ftAccounts.text3") }}
      </div>
      <Button :onClick="closeModal" :title="$t('common.ok')" />
    </div>
  </div>
</template>

<script>
import Button from "../controls/Button.vue";

export default {
  name: "FirstTimeAccounts",
  methods: {
    async closeModal() {
      this.onClose();
    },
  },
  components: { Button },
  props: ["onClose"],
};
</script>

<style lang="scss" scoped>
@import "/src/styles/main.scss";

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $black-transp;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  width: 100rem;
  max-height: 90%;
  overflow-y: auto;
  background: $white;
  border: 1px solid rgba(230, 230, 230, 0.65);
  box-shadow: 4px 4px 8px rgba(68, 68, 68, 0.25);
  border-radius: 5px;
  color: $black;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  &__headerBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;

    &__title {
      font-weight: 700;
      font-size: 2.2rem;
    }
  }

  &__info {
    &__img1 {
      width: 60rem;
    }

    &__txt {
      font-size: 1.6rem;
      color: $black;
    }
  }
}
</style>
