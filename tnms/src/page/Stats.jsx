import styles from "./Stats.module.css"

import StatsFilter from "../component/StatsComponent/StatsFilter";

export default function Stats() {
  return (
    <div className={styles.wrapper}>
      <div className="max-w-[1500px] mx-auto pt-[100px] pb-[150px]">
        <StatsFilter />
      </div>
    </div>
  );
}