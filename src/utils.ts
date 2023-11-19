


export const normalizeData = (data) => {
    const result = {...data}

    console.log(result, 'RESULT')

    result.threat = Object.values(result.Threat).map(item => item)
    result.time = Object.values(result.Time).map(item => item)



    return result
}