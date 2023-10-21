export default function ({ $axios, error, app }) {

  $axios.onError(err => {
    const code = parseInt(err.response && err.response.status);

    if (code === 404) {
      error({statusCode: code});
      return true;
    } else if (code === 422) {
      if (err.response.data.errors) {
        Object.values(err.response.data.errors).forEach((val) => {
          app.$toast.error(val[0])
        })
      }
    }
  });
}
