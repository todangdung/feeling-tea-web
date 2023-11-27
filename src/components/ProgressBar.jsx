import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProgressBar() {
  const [percentage, setPercentage] = useState(0);

  const loadingState = useSelector((state) => state.loading.value);

  useEffect(() => {}, [loadingState]);

  if (percentage < 100 && loadingState) {
    setTimeout(() => setPercentage(percentage + 1), loadingState ? 1 : 10);
  }

  return (
    <div className="h-1 w-full bg-black fixed top-0">
      <div className="h-1 bg-red" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default ProgressBar;
