export const getAssigned = (data) => {
  let obj = {}
  Object.keys(data).forEach((key) => {
    obj = {
      ...obj,
      [key]: data[key].length,
    }
  })
  return obj
}

export const getCompleted = (data) => {
  let obj = {}
  Object.keys(data).forEach((key) => {
    obj = {
      ...obj,
      [key]: data[key].filter((item) => item.status === "Completed").length,
    }
  })
  return obj
}

export const getInProgress = (data) => {
  let obj = {}
  Object.keys(data).forEach((key) => {
    obj = {
      ...obj,
      [key]: data[key].filter((item) => item.status === "In Progress").length,
    }
  })
  return obj
}

export const getPending = (data) => {
  let obj = {}
  Object.keys(data).forEach((key) => {
    obj = {
      ...obj,
      [key]: data[key].filter((item) => item.surveyid === null).length,
    }
  })
  return obj
}

export const generateChartData = (data: any) => {
  var data1 = [
    {
      type: "# Assigned",
      ...getAssigned(data),
    },
    {
      type: "# Completed",
      ...getCompleted(data),
    },
    {
      type: "# In Progress",
      ...getInProgress(data),
    },
    {
      type: "# Pending",
      ...getPending(data),
    },
  ]
  return data1
}

export const generateSeries = (data: any) => {
  let series: any = []
  Object.keys(data).forEach((key, index) => {
    const outerOffset = index === 0 ? 0 : -40 - index
    let obj = {
      type: "pie",
      labelKey: "type",
      angleKey: key,
      label: { enabled: false },
      title: { text: key },
      outerRadiusOffset: outerOffset,
    }
    series.push(obj)
  })

  return series
}
