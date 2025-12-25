import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageUploader } from '@/components/upload/image-uploader'
import { ProcessStagesEditor, ProcessStage } from '@/components/upload/process-stages-editor'
import { VideoEmbedInput } from '@/components/upload/video-embed-input'
import { projectSchema, ProjectFormData } from '@/lib/project-schema'

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormData>
  onSubmit: (data: ProjectFormData) => Promise<void>
}

const availableTags = ['portrait', 'landscape', 'digital', 'sketch', 'study']

export function ProjectForm({ defaultValues, onSubmit }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultValues?.tags || [])
  const [projectType, setProjectType] = useState<'single' | 'process'>(
    defaultValues?.type || 'single'
  )
  const [processStages, setProcessStages] = useState<ProcessStage[]>(
    defaultValues?.processStages || []
  )
  const [videoProvider, setVideoProvider] = useState<'youtube' | 'vimeo' | 'url'>(
    defaultValues?.video?.provider || 'youtube'
  )
  const [videoId, setVideoId] = useState(defaultValues?.video?.videoId || '')
  const [featuredImage, setFeaturedImage] = useState(defaultValues?.featuredImage || '')
  const [published, setPublished] = useState(defaultValues?.published || false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      slug: defaultValues?.slug || '',
      description: defaultValues?.description || '',
      year: defaultValues?.year || new Date().getFullYear(),
      type: defaultValues?.type || 'single',
      tags: defaultValues?.tags || [],
      published: defaultValues?.published || false,
      order: defaultValues?.order || 0,
    },
  })

  const title = watch('title')

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setValue('slug', slug)
  }

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    setValue('tags', newTags)
  }

  const handleFormSubmit = async (data: ProjectFormData) => {
    setIsLoading(true)
    try {
      await onSubmit({
        ...data,
        type: projectType,
        tags: selectedTags,
        featuredImage: projectType === 'single' ? featuredImage : undefined,
        processStages: projectType === 'process' ? processStages : undefined,
        video:
          projectType === 'process' && videoId
            ? {
                provider: videoProvider,
                videoId,
                timestamps: processStages.map((stage, index) => ({
                  label: stage.name,
                  timestamp: index * 60, // Default timestamps
                })),
              }
            : undefined,
        published,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-5xl mx-auto">
      <div className="flex gap-6">
        {/* Main form column */}
        <div className="flex-1 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Project title"
                  className="mt-2"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="slug"
                    {...register('slug')}
                    placeholder="project-slug"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSlug}
                    title="Regenerate from title"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  yoursite.com/work/{watch('slug') || 'project-slug'}
                </p>
                {errors.slug && (
                  <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  placeholder="Brief description of the project..."
                  className="mt-2"
                />
              </div>

              {/* Year */}
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  {...register('year', { valueAsNumber: true })}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Type</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={projectType}
                onValueChange={(value) => setProjectType(value as 'single' | 'process')}
                className="grid grid-cols-2 gap-4"
              >
                <label
                  className={`flex flex-col items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    projectType === 'single'
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="single" id="type-single" />
                    <span className="font-medium">Single Image</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    One featured artwork
                  </p>
                </label>

                <label
                  className={`flex flex-col items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    projectType === 'process'
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="process" id="type-process" />
                    <span className="font-medium">Process</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Multiple stages with optional video
                  </p>
                </label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag)
                        ? 'bg-accent text-white hover:bg-accent/90'
                        : 'hover:border-accent/50'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <span className="ml-1">×</span>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Media Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projectType === 'single' ? (
                <div>
                  <Label>Featured Image</Label>
                  <div className="mt-2">
                    <ImageUploader
                      value={featuredImage}
                      onChange={(url) => setFeaturedImage(url || '')}
                      aspectRatio="3/4"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Process Stages */}
                  <ProcessStagesEditor
                    stages={processStages}
                    onChange={setProcessStages}
                  />

                  {/* Process Video */}
                  <div className="pt-6 border-t border-border">
                    <Label className="text-base mb-4 block">
                      Timelapse Video (Optional)
                    </Label>
                    <VideoEmbedInput
                      provider={videoProvider}
                      videoId={videoId}
                      onProviderChange={setVideoProvider}
                      onVideoIdChange={setVideoId}
                      stages={processStages.map((stage) => ({
                        label: stage.name,
                        timestamp: 0,
                      }))}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Publishing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="published" className="text-base">
                    Published
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Make this project visible on your site
                  </p>
                </div>
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
              </div>

              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  {...register('order', { valueAsNumber: true })}
                  placeholder="0"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lower numbers appear first
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-3 pb-6">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPublished(false)
                handleSubmit(handleFormSubmit)()
              }}
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : published ? 'Publish' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Preview sidebar */}
        <div className="w-80 space-y-4">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mini preview */}
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  {featuredImage && (
                    <img
                      src={featuredImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <p className="font-medium truncate">
                    {title || 'Untitled Project'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {watch('year')} • {projectType} • {selectedTags.length} tags
                  </p>
                </div>

                <p className="text-xs text-muted-foreground">
                  How it will appear in gallery
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
