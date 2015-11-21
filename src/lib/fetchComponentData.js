
export default async function fetchComponentData(dispatch, components, params) {
  const query = components.reduce( (prev, current) => {
    return (current.query || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.query : []) || [])
      .concat(prev);
    }, [])

    const promises = query.map(need => dispatch(need(params)))

    return Promise.all(promises)
}