import React from 'react'

const PageTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    return (
        <h1 className={`text-center text-6xl font-semibold text-foreground ${className ? className : ""}`}>{children}</h1>
    )
}

export default PageTitle