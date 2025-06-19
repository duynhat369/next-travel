'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import axiosClient from '@/lib/axios';
import { UploadedFile } from '@/types/file';
import { UploadAuthResponse } from '@/types/upload-auth';
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next';
import { motion, Reorder } from 'framer-motion';
import { AlertCircle, ImageIcon, MoveUp, Star, Upload, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  required?: boolean;
  error?: string;
  thumbnailIndex?: number;
  onThumbnailChange?: (index: number) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUpload({
  files,
  onFilesChange,
  maxFiles = 10,
  required = false,
  error,
  thumbnailIndex = 0,
  onThumbnailChange,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  // Use ref to maintain current files state during uploads
  const currentFilesRef = useRef<UploadedFile[]>(files);
  currentFilesRef.current = files;

  // Store abort controllers for each upload
  const [abortControllers, setAbortControllers] = useState<Map<string, AbortController>>(new Map());

  /**
   * Authenticates and retrieves upload credentials from ImageKit
   */
  const authenticator = async () => {
    try {
      const response: UploadAuthResponse = await axiosClient.get('/upload-auth');
      const { signature, expire, token, publicKey } = response;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication request failed');
    }
  };

  /**
   * Upload single file to ImageKit
   */
  const uploadToImageKit = async (
    file: File,
    tempFileId: string,
    onProgress: (progress: number) => void
  ): Promise<string> => {
    // Create abort controller for this upload
    const abortController = new AbortController();
    setAbortControllers((prev) => new Map(prev).set(tempFileId, abortController));

    try {
      // Get authentication parameters
      const authParams = await authenticator();
      console.log('🏆 authParams:', authParams);

      // Upload file using ImageKit SDK
      const uploadResponse = await upload({
        ...authParams,
        file,
        fileName: `product_${Date.now()}_${file.name}`,
        // folder: '/products',
        onProgress: (event) => {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        },
        abortSignal: abortController.signal,
      });

      console.log('🏆 uploadResponse:', uploadResponse);

      // Remove abort controller after successful upload
      setAbortControllers((prev) => {
        const newMap = new Map(prev);
        newMap.delete(tempFileId);
        return newMap;
      });

      return uploadResponse.url || uploadResponse.filePath || '';
    } catch (error) {
      // Remove abort controller on error
      setAbortControllers((prev) => {
        const newMap = new Map(prev);
        newMap.delete(tempFileId);
        return newMap;
      });

      // Handle specific ImageKit errors
      if (error instanceof ImageKitAbortError) {
        throw new Error('Upload bị hủy');
      } else if (error instanceof ImageKitInvalidRequestError) {
        throw new Error(`Yêu cầu không hợp lệ: ${error.message}`);
      } else if (error instanceof ImageKitUploadNetworkError) {
        throw new Error(`Lỗi mạng: ${error.message}`);
      } else if (error instanceof ImageKitServerError) {
        throw new Error(`Lỗi server: ${error.message}`);
      } else {
        throw new Error('Upload thất bại');
      }
    }
  };

  const updateFileProgress = useCallback(
    (fileId: string, progress: number) => {
      onFilesChange(
        currentFilesRef.current.map((file) => (file.id === fileId ? { ...file, progress } : file))
      );
    },
    [onFilesChange]
  );

  const updateFileUrl = useCallback(
    (fileId: string, url: string) => {
      onFilesChange(
        currentFilesRef.current.map((file) =>
          file.id === fileId ? { ...file, url, progress: 100 } : file
        )
      );
    },
    [onFilesChange]
  );

  const removeFileById = useCallback(
    (fileId: string) => {
      // Cancel upload if in progress
      const abortController = abortControllers.get(fileId);
      if (abortController) {
        abortController.abort();
        setAbortControllers((prev) => {
          const newMap = new Map(prev);
          newMap.delete(fileId);
          return newMap;
        });
      }

      const newFiles = currentFilesRef.current.filter((f) => f.id !== fileId);
      onFilesChange(newFiles);

      // Adjust thumbnail index if needed
      const removedIndex = currentFilesRef.current.findIndex((f) => f.id === fileId);
      if (removedIndex !== -1 && onThumbnailChange) {
        if (removedIndex === thumbnailIndex) {
          onThumbnailChange(0);
        } else if (removedIndex < thumbnailIndex) {
          onThumbnailChange(thumbnailIndex - 1);
        }
      }
    },
    [abortControllers, onFilesChange, thumbnailIndex, onThumbnailChange]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        setUploadError(`Tối đa ${maxFiles} ảnh`);
        return;
      }

      setUploading(true);
      setUploadError('');

      // Create temporary file objects
      const newTempFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: '',
        size: file.size,
        progress: 0,
      }));

      // Add temp files to state immediately
      const updatedFiles = [...files, ...newTempFiles];
      onFilesChange(updatedFiles);

      // Upload files sequentially to avoid overwhelming the server
      for (let i = 0; i < newTempFiles.length; i++) {
        const tempFile = newTempFiles[i];
        const file = acceptedFiles[i];

        try {
          // Validate file
          if (file.size > MAX_FILE_SIZE) {
            throw new Error('File quá lớn. Tối đa 5MB');
          }

          if (!file.type.startsWith('image/')) {
            throw new Error('File phải là hình ảnh');
          }

          // Upload to ImageKit with progress tracking
          const url = await uploadToImageKit(file, tempFile.id, (progress) =>
            updateFileProgress(tempFile.id, progress)
          );

          // Update file with final URL
          updateFileUrl(tempFile.id, url);
        } catch (error) {
          console.error(`Upload failed for ${file.name}:`, error);
          setUploadError(error instanceof Error ? error.message : 'Upload thất bại');

          // Remove failed file from list
          removeFileById(tempFile.id);
        }
      }

      setUploading(false);
    },
    [files, maxFiles, onFilesChange, updateFileProgress, updateFileUrl, removeFileById]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    disabled: uploading,
  });

  const removeFile = (fileId: string) => {
    removeFileById(fileId);
  };

  const setAsThumbnail = (index: number) => {
    onThumbnailChange?.(index);
  };

  const moveToTop = (index: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(index, 1);
    newFiles.unshift(movedFile);
    onFilesChange(newFiles);
    onThumbnailChange?.(0);
  };

  const handleReorder = (newFiles: UploadedFile[]) => {
    onFilesChange(newFiles);
    const thumbnailFile = files[thumbnailIndex];
    if (thumbnailFile) {
      const newThumbnailIndex = newFiles.findIndex((f) => f.id === thumbnailFile.id);
      if (newThumbnailIndex !== -1) {
        onThumbnailChange?.(newThumbnailIndex);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : error
            ? 'border-red-300 bg-red-50'
            : uploading
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <ImageIcon
          className={`mx-auto h-12 w-12 mb-4 ${error ? 'text-red-400' : 'text-gray-400'}`}
        />
        <p className="text-sm text-gray-600">
          <Upload className="inline w-4 h-4 mr-1" />
          {uploading ? 'Đang tải lên...' : 'Kéo thả ảnh vào đây hoặc'}{' '}
          <span className="text-blue-600 font-medium">Browse</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG, WEBP, GIF tối đa 5MB • Tối đa {maxFiles} ảnh
          {required && <span className="text-red-500 ml-1">*</span>}
        </p>
        {files.length > 0 && (
          <p className="text-xs text-blue-600 mt-2">
            Ảnh đầu tiên sẽ là thumbnail. Kéo thả để sắp xếp lại thứ tự.
          </p>
        )}
      </div>

      {/* Validation Errors */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {/* Image Grid with Drag & Drop */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Ảnh đã tải lên ({files.length}/{maxFiles})
            </h4>
            <p className="text-xs text-gray-500">Kéo thả để sắp xếp lại</p>
          </div>

          <Reorder.Group
            axis="y"
            values={files}
            onReorder={handleReorder}
            className="space-y-2"
            layoutScroll
            style={{ overflowY: 'visible' }}
          >
            {files.map((file, index) => (
              <Reorder.Item
                key={file.id}
                value={file}
                dragListener={file.progress === 100}
                className={`group ${file.progress !== 100 ? 'pointer-events-none' : ''}`}
              >
                <motion.div
                  layout
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    index === thumbnailIndex
                      ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: file.progress === 100 ? 1.01 : 1 }}
                  whileDrag={{ scale: 1.05, zIndex: 1000 }}
                >
                  {/* Image Preview */}
                  <div className="relative">
                    {file.url ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded border"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}

                    {/* Thumbnail Badge */}
                    {index === thumbnailIndex && file.progress === 100 && (
                      <Badge className="absolute -top-1 -right-1 text-xs bg-blue-600 text-white px-1 py-0">
                        <Star className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    {/* Progress Bar */}
                    {file.progress !== undefined && file.progress < 100 && (
                      <div className="mt-1">
                        <Progress value={file.progress} className="h-1" />
                        <p className="text-xs text-gray-500 mt-1">
                          {file.progress === 0
                            ? 'Đang chuẩn bị upload...'
                            : `Đang tải lên... ${file.progress}%`}
                        </p>
                      </div>
                    )}

                    {file.progress === 100 && (
                      <p className="text-xs text-green-600 mt-1">✓ Upload thành công</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {file.progress === 100 && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {index !== thumbnailIndex && (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setAsThumbnail(index)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Đặt làm thumbnail"
                          >
                            <Star className="w-4 h-4" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToTop(index)}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                            title="Di chuyển lên đầu"
                          >
                            <MoveUp className="w-4 h-4" />
                          </Button>
                        </>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Xóa ảnh"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Cancel Upload Button */}
                  {file.progress !== undefined && file.progress < 100 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Hủy upload"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && required && (
        <div className="text-center text-red-500 text-sm">Vui lòng tải ít nhất 01 ảnh</div>
      )}
    </div>
  );
}
