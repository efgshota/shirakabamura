"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./PropertyGallery.module.css";

type Props = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={images[activeIndex]}
          alt={title}
          width={900}
          height={600}
          priority
          className={styles.mainImg}
        />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ""}`}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                width={140}
                height={100}
                className={styles.thumbImg}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
