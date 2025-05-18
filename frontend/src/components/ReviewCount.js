import React from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

function ReviewCount({positive, negative}) {
  return (
    <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
        <button type="button" className="btn btn-review"><ThumbsUp size={16} className='rc-icon text-success'/> {positive} Positive reviews</button>
        <button type="button" className="btn btn-review"><ThumbsDown size={16} className='rc-icon text-danger' /> {negative} Negative reviews</button>
    </div>
  )
}

export default React.memo(ReviewCount)