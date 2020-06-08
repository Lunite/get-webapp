const markdownNodesFilter = (markdownNodes, parentSlug) => {
  return (
    markdownNodes.filter(node => {
      return node.fileAbsolutePath.indexOf(`/content/${parentSlug}/`) > -1
    }) || []
  )
}

export default markdownNodesFilter
