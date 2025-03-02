export interface SearchCriteria{
    q:string
}


export let SEARCHTERMS: SearchCriteria[] = [
    {
        q: 'SINGAPORE'
    },
    {
        q: 'LONDON'
    },
    {
        q: 'MALAYSIA'
    },
    {
        q: 'JAPAN'
    },
]


export interface successResult {
    name: string
    description: string
    temp: number
    icon: string
}

export interface errorResults{
    status: number
    message: string
}