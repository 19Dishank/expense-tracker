import React from 'react'

const RefreshButton = ({ type, text }) => {
    return (
        <button
            type={type}
            className="group relative flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-full shadow-sm hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 ease-out active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
            <span>{text}</span>
            <span className="transform transition-transform duration-500 ease-in-out group-hover:rotate-180 group-active:rotate-180 text-indigo-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                </svg>
            </span>
        </button>
    )
}

export default RefreshButton