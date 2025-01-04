export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file); // Changed to ArrayBuffer for BLOB handling
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        // Convert ArrayBuffer to Base64 string for API transmission
        const bytes = new Uint8Array(reader.result);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);
        resolve(`data:${file.type};base64,${base64}`);
      } else {
        reject(new Error('Failed to convert image to binary data'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

export const getImagePreviewUrl = (base64String: string): string => {
  return base64String.startsWith('data:') ? base64String : `data:image/jpeg;base64,${base64String}`;
};