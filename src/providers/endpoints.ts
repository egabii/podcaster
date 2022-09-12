export default {
  podcasts:() =>  '/api/podcasts',
  episodes: (id) => `/api/podcasts/${id}/episodes`
}