const checkStatus = (state) => {
  if (state === "validated") {
    return "success";
  } else if (state === "pending") {
    return "pending";
  } else if (state === "cancelled") {
    return "cancel";
  }
};

const checkTransactionValue = (transaction_type) => {
  if (
    transaction_type === "topup" ||
    transaction_type === "promotion" ||
    transaction_type === "promotion_topup"
  ) {
    return "+ ";
  } else {
    return "- ";
  }
};

const checkTransactionType = (transaction_type, t) => {
  return transaction_type === "topup"
    ? t("wallet.transactionHistory.topup")
    : transaction_type === "withdraw"
    ? t("wallet.transactionHistory.withdraw")
    : transaction_type === "promotion"
    ? t("wallet.transactionHistory.promotion")
    : transaction_type === "payment"
    ? t("wallet.transactionHistory.payment")
    : transaction_type === "refund_topup"
    ? t("wallet.transactionHistory.refund_topup")
    : transaction_type === "refund_withdraw"
    ? t("wallet.transactionHistory.refund_withdraw")
    : transaction_type === "refund_promotion"
    ? t("wallet.transactionHistory.refund_promotion")
    : transaction_type === "promotion_topup"
    ? t("wallet.transactionHistory.promotion_topup")
    : transaction_type === "referrer_point"
    ? t("wallet.transactionHistory.referrer_point")
    : transaction_type === "pricing_upgrade_rank"
    ? t("wallet.transactionHistory.pricing_upgrade_rank")
    : t("wallet.transactionHistory.refund");
};

export { checkStatus, checkTransactionType, checkTransactionValue };
