import { useState, useEffect } from 'react'

const usePersistentState = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default usePersistentState

// Usage in component
// import React from 'react';
// import usePersistentState from './usePersistentState';

// const MyComponent = () => {
//   const [name, setName] = usePersistentState<string>('name', '');

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={name} onChange={handleNameChange} />
//       <p>Hello, {name}!</p>
//     </div>
//   );
// };

// export default MyComponent
