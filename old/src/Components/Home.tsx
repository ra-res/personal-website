import React, { useState } from "react";

// Useful Comment
export default function Home() {
  const [state, setstate] = useState(false);

  return (
    <div>
      <p className='home__hello'>---Hello World---</p>
    </div>
  );
}
