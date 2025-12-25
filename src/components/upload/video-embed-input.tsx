import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

type VideoProvider = 'youtube' | 'vimeo' | 'url'

interface StageTimestamp {
  label: string
  timestamp: number // in seconds
}

interface VideoEmbedInputProps {
  provider: VideoProvider
  videoId: string
  onProviderChange: (provider: VideoProvider) => void
  onVideoIdChange: (id: string) => void
  stages?: StageTimestamp[]
  onStagesChange?: (stages: StageTimestamp[]) => void
}

export function VideoEmbedInput({
  provider,
  videoId,
  onProviderChange,
  onVideoIdChange,
  stages = [],
  onStagesChange,
}: VideoEmbedInputProps) {
  const [showTimestamps, setShowTimestamps] = useState(false)

  // Extract YouTube ID from URL
  const extractYouTubeId = (input: string): string => {
    if (!input) return ''

    // Already an ID
    if (input.length === 11 && !input.includes('/')) {
      return input
    }

    // Standard URL
    const standardMatch = input.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    )
    if (standardMatch) return standardMatch[1]

    return input
  }

  // Extract Vimeo ID from URL
  const extractVimeoId = (input: string): string => {
    if (!input) return ''

    // Already an ID
    if (/^\d+$/.test(input)) {
      return input
    }

    // Standard URL
    const match = input.match(/vimeo\.com\/(\d+)/)
    if (match) return match[1]

    return input
  }

  const handleInputChange = (value: string) => {
    let extracted = value

    if (provider === 'youtube') {
      extracted = extractYouTubeId(value)
    } else if (provider === 'vimeo') {
      extracted = extractVimeoId(value)
    }

    onVideoIdChange(extracted)
  }

  const getEmbedUrl = () => {
    if (!videoId) return null

    switch (provider) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}`
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`
      case 'url':
        return videoId
      default:
        return null
    }
  }

  const embedUrl = getEmbedUrl()

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(':')
    if (parts.length === 2) {
      const mins = parseInt(parts[0]) || 0
      const secs = parseInt(parts[1]) || 0
      return mins * 60 + secs
    }
    return 0
  }

  return (
    <div className="space-y-4">
      {/* Provider selector */}
      <div>
        <Label className="mb-2 block">Video Provider</Label>
        <Tabs value={provider} onValueChange={(v) => onProviderChange(v as VideoProvider)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="vimeo">Vimeo</TabsTrigger>
            <TabsTrigger value="url">Direct URL</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Video input */}
      <div>
        <Label htmlFor="video-input">
          {provider === 'youtube' && 'YouTube Video ID or URL'}
          {provider === 'vimeo' && 'Vimeo Video ID or URL'}
          {provider === 'url' && 'Direct Video URL'}
        </Label>
        <Input
          id="video-input"
          value={videoId}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={
            provider === 'youtube'
              ? 'dQw4w9WgXcQ or https://youtube.com/watch?v=...'
              : provider === 'vimeo'
              ? '123456789 or https://vimeo.com/...'
              : 'https://...'
          }
          className="mt-2"
        />
        {provider === 'youtube' && (
          <p className="text-xs text-muted-foreground mt-1">
            e.g., dQw4w9WgXcQ or https://youtube.com/watch?v=dQw4w9WgXcQ
          </p>
        )}
        {provider === 'vimeo' && (
          <p className="text-xs text-muted-foreground mt-1">
            e.g., 123456789 or https://vimeo.com/123456789
          </p>
        )}
      </div>

      {/* Video preview */}
      {embedUrl && (
        <div className="rounded-lg overflow-hidden bg-black">
          {provider === 'url' ? (
            <video src={embedUrl} controls className="w-full aspect-video" />
          ) : (
            <iframe
              src={embedUrl}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      )}

      {!embedUrl && videoId && (
        <div className="text-sm text-red-500">
          Invalid video {provider === 'youtube' ? 'ID' : provider === 'vimeo' ? 'ID' : 'URL'}
        </div>
      )}

      {/* Stage timestamps */}
      {onStagesChange && stages.length > 0 && (
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTimestamps(!showTimestamps)}
            type="button"
            className="w-full"
          >
            {showTimestamps ? 'Hide' : 'Show'} Timestamp Markers ({stages.length})
          </Button>

          {showTimestamps && (
            <div className="space-y-2 p-4 border border-border rounded-lg">
              <p className="text-sm font-medium mb-3">Stage Timestamps</p>
              {stages.map((stage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Label className="flex-1 text-sm">{stage.label}</Label>
                  <Input
                    type="text"
                    placeholder="MM:SS"
                    value={formatTime(stage.timestamp)}
                    onChange={(e) => {
                      const newTimestamp = parseTime(e.target.value)
                      const newStages = [...stages]
                      newStages[index] = { ...stage, timestamp: newTimestamp }
                      onStagesChange(newStages)
                    }}
                    className="w-24"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
