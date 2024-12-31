"use client";
import { sidebarLinks } from "@/lib/sidebarLinks";
import { LinkType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.logoBox}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="logo"
          width={67}
          height={67}
        />
        <strong>Doct.</strong>
      </div>
      <nav className={styles.sidebarLinks}>
        {sidebarLinks.map((link: LinkType) => (
          <Link
            key={link.title}
            href={link.url}
            className={`${styles.link} ${
              link.url === "/"
                ? pathname === link.url
                  ? styles.active
                  : ""
                : pathname.startsWith(link.url)
                ? styles.active
                : ""
            }`}
          >
            <Image
              className={styles.linkIcon}
              src={link.iconPath}
              alt="link-icon"
              width={20}
              height={20}
            />
            {link.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;
