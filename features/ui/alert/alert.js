import styles from "./alert.module.scss";
import { Button } from "features/ui/button/button";
import Image from "next/image";

export function Alert({ message, alertType, onButtonClick }) {
  return (
    <div id={styles[alertType]} className={styles.alert}>
      <span className={styles.message}>
        {alertType === "error" && (
          <Image
            alt="Alert icon"
            src="./icons/alert-circle.svg"
            width="20"
            height="20"
          />
        )}
        {message}
      </span>
      {alertType === "error" && (
        <Button className={styles.button} onClick={onButtonClick}>
          Try again
          <Image
            alt="Right arrow icon"
            src="./icons/arrow-right-error.svg"
            width="20"
            height="20"
          />
        </Button>
      )}
    </div>
  );
}
