import axios from 'axios';

export const Singup = async (username, email, password) => {
  try {
    const response = await axios.post('/signup', {
      username: username,
      email: email,
      password: password,
    });
    const token = await response.data.newUser;
    // console.log(response.data.newUser.email)

    if(token){

      localStorage.setItem('token', token);
    }
    return response.data; // You can return the data or perform other actions

  } catch (error) {
    // Handle errors here
    console.error('Error registering user:', error.message);
    throw error; // You can throw the error to be caught by the calling function or component
  }
};


export const Login = async (email, password) => {
  try {
    // Make a POST request to the login endpoint with the email and password
    const response = await axios.post('/login', {
      email: email,
      password: password,
    });

    // Extract the token from the response data
    const token = await response.data.user;
    // console.log("from helper login",token);

    // Check if the token exists
    if (token) {
      // Store the token in local storage
      localStorage.setItem('token', token);
    }

    return response.data; // Return the data or perform other actions

  } catch (error) {
    // Handle errors here
    console.error('Error logging in:', error.message);
    throw error; // Throw the error to be caught by the calling function or component
  }
};

export const Logout = async() => {
  try {
    // Remove the token from local storage
    const loge = await axios.get('/logout');
    console.log(loge.data,"from logut functon")
    localStorage.removeItem('token');

    // Optionally perform other logout actions, such as redirecting the user or clearing user state

    return true; // Return true to indicate successful logout

  } catch (error) {
    // Handle errors here
    console.error('Error logging out:', error.message);
    throw error; // Throw the error to be caught by the calling function or component
  }
};


export const getChats=async()=>{
    try {
        const response = await axios.get('/chat/userChat');
        console.log("data",response.data.user.chats);
        return response.data.user.chats; 
        
    } catch (error) {
        console.error('getting all chats:', error.message);
    throw error; // You can throw the error to be caught by the calling function or component
  
    }

}

export const sendChat = async(chat)=>{
  try {
    const response = await axios.post('/chat/new-chat', {
      text:chat
    });

    // Handle the response here, for example:
    console.log('chat is send to data succesfully and response:', response.data);
    return response.data; // You can return the data or perform other actions

  } catch (error) {
    // Handle errors here
    console.error('Error in sending :', error.message);
    throw error; // You can throw the error to be caught by the calling function or component
  }
}
