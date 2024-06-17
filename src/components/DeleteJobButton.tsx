import React from 'react'
import { useToast } from './ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteJobAction } from '@/utils/actions'
import { Button } from './ui/button'
import { Delete } from 'lucide-react'

const DeleteJobButton = ({ id }: { id: string }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        })
        return
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })
      toast({ title: 'Success', description: 'job removed' })
    },
  })
  return (
    <Button
      size="sm"
      disabled={isPending}
      className="flex gap-2 capitalize"
      onClick={() => {
        mutate(id)
      }}
    >
      <Delete />
      {isPending ? ' deleting...' : ' delete'}
    </Button>
  )
}

export default DeleteJobButton
