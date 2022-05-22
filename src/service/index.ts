import request from "../utils/http";

export const getSiteInfo = () => {
    return request({
        url: "/v1/componentSite/getSite"
    })
}


export const getComponentList = (params: { name: string }) => {
    return request({
        url: "/v1/component/getComponent",
        params
    })
}

export const getComponentItem = (params: { id: string }) => {
    return request({
        url: "/v1/component/getComponent/one",
        params
    })
}