


// @ts-ignore
export const normalizeData = (data: any) => {
    const result = {...data}

    console.log(result, 'RESULT')

    result.threat = Object.values(result.Threat).map(item => item)
    result.time = Object.values(result.Time).map(item => item)



    return result
}