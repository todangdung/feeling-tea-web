import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getMemberVouchers } from "../../services/api/userApis";

function MyVoucher() {
  const [vouchers, setVouchers] = useState();

  useEffect(() => {
    getMemberVouchers({
      onSuccess: (resp) => {
        setVouchers(resp.data);
      },
      onError: (err) => console.log(err),
    });
  }, []);

  return (
    <div className="mb-20">
      <Header title={"Voucher"} />
      {vouchers?.objects?.length > 0 ? (
        vouchers.objects.map((voucher, index) => (
          <div key={index}>voucheritem</div>
        ))
      ) : (
        <p className="text-center mt-8">No data</p>
      )}
    </div>
  );
}

export default MyVoucher;
