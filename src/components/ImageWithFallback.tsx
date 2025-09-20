"use client";

import Image from "next/image";
import React, { useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const {
    src,
    alt,
    style,
    className,
    width = 88,
    height = 88,
    fill = false,
    priority = false,
    ...rest
  } = props;

  // If src is empty or invalid, show fallback immediately
  if (
    !src ||
    src === "" ||
    (typeof src === "string" && src.includes("google.com/url"))
  ) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-100 text-center align-middle ${
          className ?? ""
        }`}
        style={{ width: width, height: height, ...style }}
      >
        <Image
          src={ERROR_IMG_SRC}
          alt="Default avatar"
          width={width}
          height={height}
          {...rest}
          priority={priority}
        />
      </div>
    );
  }

  return didError ? (
    <div
      className={`inline-flex items-center justify-center bg-gray-100 text-center align-middle ${
        className ?? ""
      }`}
      style={{ width: width, height: height, ...style }}
    >
      <Image
        src={ERROR_IMG_SRC}
        alt="Error loading image"
        width={width}
        height={height}
        {...rest}
        data-original-url={src}
        priority={priority}
      />
    </div>
  ) : (
    <Image
      src={src as string}
      alt={alt as string}
      className={className}
      style={style}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      {...rest}
      onError={handleError}
    />
  );
}
