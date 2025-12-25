import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface ProcessStage {
  id: string
  image: string
  name: string
  caption?: string
}

interface ProcessStagesEditorProps {
  stages: ProcessStage[]
  onChange: (stages: ProcessStage[]) => void
}

function SortableStageItem({
  stage,
  onUpdate,
  onRemove,
}: {
  stage: ProcessStage
  onUpdate: (id: string, field: 'name' | 'caption', value: string) => void
  onRemove: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg group hover:border-accent/30 transition-colors"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="mt-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Thumbnail */}
      <div className="w-20 h-20 rounded bg-muted flex-shrink-0 overflow-hidden">
        {stage.image && (
          <img
            src={stage.image}
            alt={stage.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Inputs */}
      <div className="flex-1 space-y-3">
        <div>
          <Label htmlFor={`name-${stage.id}`} className="text-xs">
            Stage name
          </Label>
          <Input
            id={`name-${stage.id}`}
            value={stage.name}
            onChange={(e) => onUpdate(stage.id, 'name', e.target.value)}
            placeholder="Stage name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`caption-${stage.id}`} className="text-xs">
            Caption (optional)
          </Label>
          <Input
            id={`caption-${stage.id}`}
            value={stage.caption || ''}
            onChange={(e) => onUpdate(stage.id, 'caption', e.target.value)}
            placeholder="Optional caption"
            className="mt-1"
          />
        </div>
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(stage.id)}
        className="mt-2 h-8 w-8 p-0 text-muted-foreground hover:text-red-500"
        title="Remove stage"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function ProcessStagesEditor({
  stages,
  onChange,
}: ProcessStagesEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = stages.findIndex((s) => s.id === active.id)
      const newIndex = stages.findIndex((s) => s.id === over.id)
      onChange(arrayMove(stages, oldIndex, newIndex))
    }
  }

  const handleAddStage = () => {
    const newStage: ProcessStage = {
      id: `stage-${Date.now()}`,
      image: '',
      name: '',
      caption: '',
    }
    onChange([...stages, newStage])
  }

  const handleUpdateStage = (
    id: string,
    field: 'name' | 'caption',
    value: string
  ) => {
    onChange(
      stages.map((stage) =>
        stage.id === id ? { ...stage, [field]: value } : stage
      )
    )
  }

  const handleRemoveStage = (id: string) => {
    onChange(stages.filter((stage) => stage.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Process Stages</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddStage}
          type="button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stage
        </Button>
      </div>

      {/* Stages list */}
      {stages.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stages.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {stages.map((stage) => (
                <SortableStageItem
                  key={stage.id}
                  stage={stage}
                  onUpdate={handleUpdateStage}
                  onRemove={handleRemoveStage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        // Empty state
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">No stages added</p>
          <p className="text-xs text-muted-foreground mb-4">
            Add your first stage to show the creative process
          </p>
          <Button variant="outline" size="sm" onClick={handleAddStage} type="button">
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>
      )}
    </div>
  )
}
