import React from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

function ReviewCount() {
  return (
    <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
        <button type="button" class="btn btn-review"><ThumbsUp size={16} className='rc-icon text-success'/> 45 Positive reviews</button>
        <button type="button" class="btn btn-review"><ThumbsDown size={16} className='rc-icon text-danger' /> 10 Negative reviews</button>
    </div>
  )
}

export default React.memo(ReviewCount)