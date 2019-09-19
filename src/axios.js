// import * as axios from 'axios';
// import deviceStorage from './methods/deviceStorage';

// var instance = {}
// var credentials = {}
// var url = ""
// async function getToken(){
// 	let token = await deviceStorage.retrieveItem("token");
// 	let server = await deviceStorage.retrieveItem("server");
// 	credentials = {
// 		token : token,
// 	}
// 	console.log('credentials')
// 	console.log(credentials)
// 	return credentials;
// }
// getToken().then(token =>{
// 	console.log(token)
// 	instance = axios.create({
// 	  baseURL: '127.0.0.1:3000',
// 	  headers: {"X-Authorization": "Bearer "+credentials.token}
// 	});
// 	instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     	console.log("interceptors config ____________________________")
//     	url = config.url
//     	// console.log(config)
// 	    return config;
// 	}, function (error) {
//     	console.log("interceptors config  error ____________________________")
// 	    // Do something with request error
//     	// console.log(error)

// 	    return Promise.reject(error);
// 	});

// 	instance.interceptors.response.use(function (response) {
// 	    // Do something with response data
// 	    console.log("interceptors response ____________________________")
//     	// console.log(response)
// 	    return response;
// 	}, async function (error) {
// 	    // Do something with response error
// 	    console.log("interceptors response error ____________________________")
// 	    // console.log(error)
//     	if(error.response){
// 	    	if(error.response.data)
// 		    	if(error.response.data.status == "401"){
// 		    		console.log("tb.refreshTokenUser()");
// 		    		await tb.refreshTokenUser();
// 		    		return {reload: true}
// 		    	}
// 	    }
//     	return Promise.reject(error);
// 	});
	
// })

// export { instance as default };