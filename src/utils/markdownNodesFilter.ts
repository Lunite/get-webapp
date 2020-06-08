const markdownNodesFilter = (markdownNodes, parentSlug) => {
  if (!markdownNodes?.length) {
    return []
  }

  return (
    markdownNodes.filter(node => {
      return node.fileAbsolutePath.indexOf(`/content/${parentSlug}/`) > -1
    }) || []
  )
}

export default markdownNodesFilter
