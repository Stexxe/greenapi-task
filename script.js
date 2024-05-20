const apiUrl = "https://7103.api.greenapi.com"

const idInstanceEl = document.getElementById("idInstance")
const apiTokenEl = document.getElementById("apiTokenInstance")
const settingsBtn = document.getElementById("getSettings")
const stateInstanceBtn = document.getElementById("getStateInstance")
const responseArea = document.getElementById("response")
const phoneNumberEl = document.getElementById("phoneNumber")
const messageEl = document.getElementById("message")
const sendMessageBtn = document.getElementById("sendMessage")
const phoneNumberEl2 = document.getElementById("phoneNumber2")
const fileUrlEl = document.getElementById("fileUrl")
const sendFileByUrlBtn = document.getElementById("sendFileByUrl")

settingsBtn.addEventListener("click", (e) => {
  e.preventDefault()
  fetchApi("getSettings").then(updateResponse).catch(updateResponseError)
})

stateInstanceBtn.addEventListener("click", (e) => {
  e.preventDefault()
  fetchApi("getStateInstance").then(updateResponse).catch(updateResponseError)
})

sendMessageBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const data = {
    chatId: `${phoneNumberEl.value}@c.us`,
    message: messageEl.value
  }
  fetchApi("sendMessage", "POST", data).then(updateResponse).catch(updateResponseError)
})

sendFileByUrlBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const fileUrl = fileUrlEl.value
  const data = {
    chatId: `${phoneNumberEl2.value}@c.us`,
    urlFile: fileUrl,
    fileName: fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
  }
  fetchApi("sendFileByUrl", "POST", data).then(updateResponse).catch(updateResponseError)
})

function updateResponse(response) {
  response.text().then((text) => {
    responseArea.value = JSON.stringify(JSON.parse(text), null, 2)
  })
}

function updateResponseError(error) {
  responseArea.value = error.message;
}

function fetchApi(method, httpMethod = "GET", body = {}) {
  const instance = idInstanceEl.value;
  const token = apiTokenEl.value;

  const url = `${apiUrl}/waInstance${instance}/${method}/${token}`
  const options = {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
    }
  }

  if (httpMethod === "POST") {
    options.body = JSON.stringify(body)
  }

  return fetch(url, options)
}
