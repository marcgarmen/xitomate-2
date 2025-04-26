import Image from "next/image";
import styles from "./CardNews.module.css";
import Link from "next/link";

interface CardNewsProps {
  imageSrc: string;
  tag: string;
  title: string;
  date: string;
  description: string;
  href: string;
}

export default function CardNews({
  imageSrc,
  tag,
  title,
  date,
  description,
  href,
}: CardNewsProps) {
  return (
    <div className={styles.card}>
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={200}
        className={styles.image}
        priority
      />
      <div className={styles.content}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>📅 {date}</p>
        <p className={styles.description}>{description}</p>
        <Link href={href} className={styles.button}>
          Leer artículo completo
        </Link>
      </div>
    </div>
  );
}
