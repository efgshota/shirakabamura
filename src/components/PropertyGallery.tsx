"use client";

import Image from "next/image";
import { useState } from "react";
import PropertyImagePlaceholder from "./PropertyImagePlaceholder";
import styles from "./PropertyGallery.module.css";

type Props = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: Props) {
  const validImages = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <PropertyImagePlaceholder className={styles.mainImg} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={validImages[activeIndex]}
          alt={title}
          width={900}
          height={600}
          priority
          className={styles.mainImg}
        />
      </div>
      {validImages.length > 1 && (
        <div className={styles.thumbs}>
          {validImages.map((img, i) => (
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
