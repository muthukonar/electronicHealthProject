import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: { cloudName: string; uploadPreset: string },
        callback: (error: string, result: object) => void
      ) => { open: () => void };
    };
  }
}

const UploadWidget = () => {
  const cloudinaryRef = useRef<typeof window.cloudinary | null>(null);
  const widgetRef = useRef<{ open: () => void } | null>(null);

  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "drzewrxld",
          uploadPreset: "yklaxxrd",
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
          } else {
            console.log("Upload result:", result);
          }
        }
      );
    } else {
      console.error("Cloudinary is not loaded");
    }
  }, []);

  return (
    <button onClick={() => widgetRef.current?.open()}>
      Upload Profile Picture
    </button>
  );
};

export default UploadWidget;
