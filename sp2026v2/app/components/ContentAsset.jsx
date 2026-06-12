import React from 'react'
import {useContentAsset} from '../hooks/useContentAsset'

const ContentAsset = ({id, className = ''}) => {
    const {data, isLoading, error} = useContentAsset(id)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading content</div>

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{
                __html: data?.c_body || ''
            }}
        />
    )
}

export default ContentAsset