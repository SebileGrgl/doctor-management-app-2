"use client";
import { useLoading } from "@/contexts/LoadingContext";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.header}>
        <div className={styles.header1}>
          <div
            className={`${styles.loader} ${styles.box_1}`}
            style={{ width: "500px", height: "60px" }}
          >
            <div className={styles.gradient}></div>
          </div>

          <div
            className={`${styles.loader} ${styles.box_2}`}
            style={{ width: "140px", height: "60px" }}
          >
            <div className={styles.gradient}></div>
          </div>
        </div>
        <div
          className={`${styles.loader} ${styles.header2}`}
          style={{ width: "100%", height: "60px" }}
        >
          <div className={styles.gradient}></div>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.row1}>
          <div
            className={styles.leftCol}
            style={{
              width: "60%",
              height: "350px",
            }}
          >
            <div
              className={`${styles.loader} ${styles.box_3}`}
              style={{
                width: "50%",
                height: "100%",
              }}
            >
              <div className={styles.gradient}></div>
            </div>
            <div
              className={`${styles.loader} ${styles.box_4}`}
              style={{
                width: "50%",
                height: "100%",
              }}
            >
              <div className={styles.gradient}></div>
            </div>
          </div>

          <div
            className={`${styles.loader} ${styles.box_5}`}
            style={{
              width: "40%",
              height: "350px",
            }}
          >
            <div className={styles.gradient}></div>
          </div>
        </div>
        <div className={styles.row2}>
          <div
            className={`${styles.loader} ${styles.box_6}`}
            style={{
              width: "60%",
              height: "200px",
            }}
          >
            <div className={styles.gradient}></div>
          </div>
          <div
            className={`${styles.loader} ${styles.box_7}`}
            style={{
              width: "40%",
              height: "200px",
            }}
          >
            <div className={styles.gradient}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
