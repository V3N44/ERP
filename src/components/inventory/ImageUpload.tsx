import { ImagePlus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getImagePreviewUrl } from "@/utils/imageUtils";

interface ImageUploadProps {
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
}

export const ImageUpload = ({
  selectedImages,
  setSelectedImages,
  imageUrls,
  setImageUrls
}: ImageUploadProps) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...files]);
      
      // Create URLs for preview using the blob data
      const newImageUrls = await Promise.all(
        files.map(async (file) => {
          const blobData = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          return blobData;
        })
      );
      
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label>Vehicle Images</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={getImagePreviewUrl(url)}
              alt={`Vehicle preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-purple-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 cursor-pointer bg-white/50 transition-colors">
          <div className="flex flex-col items-center space-y-2">
            <ImagePlus className="h-8 w-8 text-purple-500" />
            <span className="text-sm text-purple-600">Add Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};