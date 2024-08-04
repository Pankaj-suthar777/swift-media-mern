import { Label } from "./label";

interface Props {
  onChange: React.Dispatch<React.SetStateAction<File | null>>;
  image: string;
  label?: string;
}

const FileInput = ({ onChange, image, label = "Image" }: Props) => {
  return (
    <div className="flex-1 items-center max-w-screen-sm mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
      <div className="relative w-full">
        <div className="items-center justify-center max-w-xl mx-auto">
          <Label>{label}</Label>
          <label
            className="flex mt-2 justify-center w-full max-h-[200px] min-h-[100px] px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            id="drop"
          >
            {image ? (
              <img
                src={image}
                className="h-full w-full object-cover max-h-[200px]"
              />
            ) : (
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline ml-[4px]">
                    browse
                  </span>
                </span>
              </span>
            )}
            <input
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  onChange(e.target.files?.[0]);
                }
              }}
              type="file"
              name="file_upload"
              className="hidden"
              accept="image/png,image/jpeg"
              id="input"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
