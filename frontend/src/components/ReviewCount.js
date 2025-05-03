import React from 'react'

function ReviewCount() {
  return (
    <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
        <button type="button" class="btn btn-review"><span className='bi bi-hand-thumbs-up-fill' style={{color:"green"}}></span> 45 Positive reviews</button>
        <button type="button" class="btn btn-review"><span className='bi bi-hand-thumbs-down-fill' style={{color:"red"}}></span> 10 Negative reviews</button>
    </div>
  )
}

export default React.memo(ReviewCount)