const imageNodesFilter = (imageNodes: any[], originalName: string) => {
  const image = imageNodes.find(
    ({ fluid }) => fluid.originalName === originalName
  )

  if (!image) {
    return undefined
  }

  const {
    fluid: { src, aspectRatio, sizes, srcSet, srcSetWebp, srcWebp },
  } = image

  return {
    fluid: {
      src,
      aspectRatio,
      sizes,
      srcSet,
      srcSetWebp,
      srcWebp,
    },
  }
}

export default imageNodesFilter
