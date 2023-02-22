// GET REQUEST
function getTodos() {
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/posts",
  //   params: {
  //     _limit: 5
  //   }
  // }).then((res) => showOutput(res))
  //   .catch(err => console.log(err))
  axios.get("https://jsonplaceholder.typicode.com/posts", {
    params: {
      _limit: 5
    }
  }).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  axios.post("https://jsonplaceholder.typicode.com/posts", {
    title: "vikash",
    cpmpleted: true,
  }).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch("https://jsonplaceholder.typicode.com/posts/1", {
    title: "vikash",
    cpmpleted: true,
  }).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {

  axios({
    method: "delete",
    url: "https://jsonplaceholder.typicode.com/posts/1"
  }).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

//axios global
axios.defaults.headers.common['X-TOKEN-TYPE'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// SIMULTANEOUS DATA
function getData() {
  // axios.all([axios.get("https://jsonplaceholder.typicode.com/posts"),
  // axios.get("https://jsonplaceholder.typicode.com/todos"),]).then((res) => {
  //   console.log(res[0])
  //   console.log(res[1])
  //   showOutput(res[1])
  // }).catch((err) => console.log(err))
  axios.all([axios.get("https://jsonplaceholder.typicode.com/posts"),
  axios.get("https://jsonplaceholder.typicode.com/todos"),]).then(
    axios.spread((post, todos) => {
      console.log(post);
      console.log(todos)
      showOutput(todos)
    })).catch((err) => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "some token"
    }
  }
  axios.post("https://jsonplaceholder.typicode.com/posts", {
    title: "vikash",
    cpmpleted: true,
  }, config).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'POST',
    url: "https://jsonplaceholder.typicode.com/posts",
    data: {
      title: "this is a  title",
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// ERROR HANDLING
function errorHandling() {

  axios.get("https://jsonplaceholder.typicode.com/postss",
    {
      validateStatus: function (status) {
        return status < 500  //reject only if status is greater or equal to 500
      }
    }
  ).then((res) => showOutput(res))
    .catch(err => {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        console.log(err.request)
      } else if (err.response.status < 500) {
        console.error("some is wrong")
      }
    })
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get("https://jsonplaceholder.typicode.com/todos", {
    cancelToken: source.token
  }).then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log("request cancelled", thrown.message)
      }
    })
  if (true) {
    source.cancel("request cancelled")
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(
    `${config.method} sent to ${config.url} at ${new Date().getTime()}}`)
  return config
}, err => { return Promise.reject(err) }
)

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

// axiosInstance.get("/todos").then((res) => showOutput(res)).catch((err) => console.log(err))

//TIME OUT 
// axios.get("https://jsonplaceholder.typicode.com/posts", { timeout: 5000 }).then((res) => showOutput(res))
//   .catch(err => console.log(err))



// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
