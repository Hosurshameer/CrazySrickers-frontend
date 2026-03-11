import React from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BackToHome() {
  return (
    <div>
      <Link
                  to="/home"
                  className="inline-flex items-center text-primary dark:text-light font-medium    px-8 py-3 bg-primary text-white rounded-md text-lg hover:bg-primary/80"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back To Home
                </Link>
    </div>
  )
}
