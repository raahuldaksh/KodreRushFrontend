import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TaskDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultStatus = 'todo',
}) {
  const isEdit = Boolean(initialData && initialData._id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: defaultStatus,
    dueDate: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        status: initialData.status || defaultStatus,
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: defaultStatus,
        dueDate: '',
      });
    }
    setError('');
  }, [initialData, defaultStatus, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'title' && value.trim()) {
      setError('');
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400">
            {isEdit
              ? 'Update the details and priority for this task.'
              : 'Add a new task to your Kanban workflow.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Title Field */}
          <div className="space-y-1.5">
            <Label htmlFor="task-title" className="text-zinc-300">
              Task Title <span className="text-red-400">*</span>
            </Label>
            <Input
              id="task-title"
              name="title"
              placeholder="e.g. Implement user authentication"
              value={formData.title}
              onChange={handleChange}
              className={error ? 'border-red-500 focus-visible:ring-red-400' : 'bg-zinc-900 border-zinc-800 text-white'}
              autoFocus
            />
            {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <Label htmlFor="task-desc" className="text-zinc-300">Description</Label>
            <Textarea
              id="task-desc"
              name="description"
              placeholder="Add extra context, checklist items, or links..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          {/* Priority & Status Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-zinc-300">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(val) => handleSelectChange('priority', val)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800">
                  <SelectItem value="low">⚫ Low</SelectItem>
                  <SelectItem value="medium">🔘 Medium</SelectItem>
                  <SelectItem value="high">⚪ High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-300">Column</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => handleSelectChange('status', val)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800">
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date Field */}
          <div className="space-y-1.5">
            <Label htmlFor="task-date" className="text-zinc-300">Due Date</Label>
            <Input
              id="task-date"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="bg-zinc-900 border-zinc-800 text-white [color-scheme:dark]"
            />
          </div>

          <DialogFooter className="pt-3 border-t border-zinc-800/80 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black hover:bg-zinc-200 min-w-[100px] font-semibold cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDialog;
