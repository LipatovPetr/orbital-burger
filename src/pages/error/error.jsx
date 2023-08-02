import styles from "./error.module.css";
import cn from "classnames";

function ErrorPage() {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}> 😅 Упс! Что-то не так... </h2>
    </div>
  );
}

export default ErrorPage;
