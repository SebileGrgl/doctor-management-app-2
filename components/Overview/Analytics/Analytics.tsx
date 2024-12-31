import Image from "next/image";
import AnalyticInfo from "./AnalyticInfo";
import styles from "./Analytics.module.scss";

const Analytics: React.FC = () => {
  return (
    <div className={styles.analyticsContainer}>
      {AnalyticInfo().map((analytic) => (
        <div
          className={styles.analyticBox}
          style={{ backgroundColor: analytic.color }}
          key={analytic.title}
        >
          <div className={styles.iconBox}>
            <Image
              src={analytic.icon}
              alt="analytic-icon"
              width={26}
              height={26}
              className={styles.icon}
            />
          </div>
          <div className={styles.details}>
            <span>{analytic.total}</span>
            <p>{analytic.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
