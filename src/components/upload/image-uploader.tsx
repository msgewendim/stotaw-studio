import { useState, useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string | null) => void
  accept?: string
  maxSize?: number // in bytes
  aspectRatio?: string
  className?: string
}

export function ImageUploader({
  value,
  onChange,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  aspectRatio,
  className,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file: File) => {
    setError(null)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
      return
    }

    setIsLoading(true)
    setFileName(file.name)

    try {
      // In production, upload to S3/Cloudinary/etc
      // For now, create a local URL
      const url = URL.createObjectURL(file)
      onChange(url)
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = () => {
    onChange(null)
    setFileName(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  if (value) {
    // Preview state
    return (
      <div className={cn('relative rounded-lg overflow-hidden group', className)}>
        <div
          className="relative w-full bg-muted"
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBrowseClick}
              type="button"
            >
              Replace
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              type="button"
            >
              Remove
            </Button>
          </div>
        </div>

        {fileName && (
          <p className="text-xs text-muted-foreground mt-2 truncate">
            {fileName}
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    )
  }

  // Empty/Upload state
  return (
    <div className={className}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        className={cn(
          'relative rounded-lg border-2 border-dashed transition-all cursor-pointer',
          'bg-muted/30 hover:bg-muted/50',
          isDragging
            ? 'border-accent bg-accent/5'
            : 'border-border hover:border-accent/50',
          aspectRatio && 'aspect-[' + aspectRatio + ']',
          isLoading && 'pointer-events-none opacity-50'
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {isLoading ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent mb-3" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <ImagePlus className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium mb-1">
                Drag & drop image here
              </p>
              <p className="text-xs text-muted-foreground mb-3">or</p>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleBrowseClick()
                }}
              >
                Browse files
              </Button>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  )
}
