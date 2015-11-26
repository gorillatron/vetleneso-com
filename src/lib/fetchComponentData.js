

// Passing dispatch and the components that are to be rendered
// We look up the static param 'query' of each components and dispatch them.
// The query should be a list of action creators.

export default async function fetchComponentData(dispatch, components, params) {
  const query = components.reduce( (prev, current) => {
    return (current.query || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.query : []) || [])
      .concat(prev);
    }, [])

    const promises = query.map(need => dispatch(need(params)))

    return Promise.all(promises)
}