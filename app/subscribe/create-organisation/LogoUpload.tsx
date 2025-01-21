import { useState } from "react";
import { PhotoIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface LogoUploadProps {
  logo: File | null;
  setLogo: React.Dispatch<React.SetStateAction<File | null>>;
}

const LogoUpload = ({ logo, setLogo }: LogoUploadProps) => {
  //   const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a temporary preview URL
    }
  };

  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-900 sm:pt-1.5"
      >
        Logo
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <div className="flex max-w-2xl justify-center rounded-lg bg-white px-6 py-10 outline outline-2 -outline-offset-1 outline-gray-300">
          <div className="text-center">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Uploaded Logo"
                className="mx-auto mb-4 h-16 w-16 rounded-md object-cover"
                width={60}
                height={60}
              />
            ) : (
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-300"
              />
            )}
            {logo && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                <CheckCircleIcon className="h-6 w-6" />
                <span className="text-sm font-medium">
                  &quot;{logo.name}&quot;
                </span>
              </div>
            )}
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500"
              >
                {logo ? (
                  <span>Choose a different file</span>
                ) : (
                  <span>Upload a file</span>
                )}
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              {logo ? null : <p className="pl-1">or drag and drop</p>}
            </div>
            {logo ? null : (
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
