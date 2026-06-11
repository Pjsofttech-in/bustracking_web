import React, { useState } from 'react'
function UseState() {
    const [count, setCount] = useState(0)
    return (
        <>
            <h1>Count:{count}</h1>
            <button onClick={()=>setCount(count + 1)}>plus</button>
            <button onClick={()=>setCount(count - 1)}>minus</button>
        </>
    )
}

export default UseState