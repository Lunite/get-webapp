const imageNodesFilter = (imageNodes: any[], originalName: string) => {
  return (
    imageNodes.find(({ fluid }) => fluid.originalName === originalName) || {}
  )
}

export default imageNodesFilter
