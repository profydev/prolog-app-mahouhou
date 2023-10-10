import Image from "next/image";
import styles from "./footer.module.scss";

const menuItems = [
  { text: "Docs", href: "#" },
  { text: "API", href: "#" },
  { text: "Help", href: "#" },
  { text: "Community", href: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span
        className={styles.version}
        data-version={process.env.NEXT_PUBLIC_APP_VERSION}
      >
        Version: {process.env.NEXT_PUBLIC_APP_VERSION}
      </span>
      <ul className={styles.list}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.href} className={styles.menuLink}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      <figure className={styles.logoWrap}>
        <Image
          className={styles.logo}
          src="/icons/logo-small.svg"
          alt="ProLog"
          width="23"
          height="33"
        />
      </figure>
    </footer>
  );
}
