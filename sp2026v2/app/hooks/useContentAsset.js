import {useQuery} from '@tanstack/react-query'

import {useCommerceApi} from '@salesforce/commerce-sdk-react'

const orgId = "f_ecom_zzab_002";


const getContentAsset = async (assetId) => {
    const response = await fetch(
        `/mobify/proxy/api/content/shopper-content/v1/organizations/${orgId}/content/${assetId}`
    )

    if (!response.ok) {
        throw new Error('Failed to fetch content asset')
    }

    return response.json()
}

export const useContentAsset = (assetId) => {


const api = useCommerceApi()

console.log(Object.keys(api))

    return useQuery({
        queryKey: ['content-asset', assetId],
        queryFn: () => getContentAsset(assetId),
        enabled: !!assetId
    })
}