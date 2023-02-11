import React from 'react'
import { useNavigate } from 'react-router-dom'

export const navigateTo = (path: string, navigate) => {
  navigate(`${path}`)
}
